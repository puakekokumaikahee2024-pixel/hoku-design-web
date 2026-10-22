"use client";

import { useEffect } from "react";

/** 同時に画面に入った要素を、上→下・左→右の順にこの間隔でずらす */
const STAGGER_MS = 80;
/** 表示アニメーションが終わったとみなすまでの時間（この後に演出用スタイルを外す） */
const SETTLE_MS = 900;
const COUNT_UP_MS = 1000;
/** 写真ズームの最大倍率 */
const ZOOM_MAX = 1.08;
/** 写真ズームが進むスクロール区間の最小値（px） */
const ZOOM_MIN_RANGE = 200;
/** sticky ヘッダーの高さ */
const HEADER_HEIGHT = 64;

/**
 * ページ全体のスクロール演出をまとめて動かす。描画するものはない。
 * - [data-reveal]       画面に入ったら data-revealed を付けて表示（CSS 側でアニメーション）
 *     "heading" / "words" は少し早めに、それ以外は少し画面に入ってから
 * - [data-count-to]     reveal と同時に 0 から数え上げる
 * - [data-zoom]         画面内にある間、スクロール位置に応じて拡大
 * head の inline script が data-motion="on" を付けた環境でだけ動く。
 */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    // 印がない = 演出なし（開発時の Strict Mode で2回目に呼ばれたときは "ready" になっている）
    if (!root.dataset.motion) return;
    // 保険のタイマー表示（globals.css）を止める
    root.dataset.motion = "ready";

    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const reveal = (targets: Element[]) => {
      targets.sort(byPosition).forEach((target, i) => {
        const el = target as HTMLElement;
        if (el.dataset.revealed) return;
        const delay = el.dataset.reveal === "words" ? 0 : i * STAGGER_MS;
        el.style.setProperty("--reveal-delay", `${delay}ms`);
        el.dataset.revealed = "in";
        countUp(el, delay);
        // 文節リビールは .word 側だけにスタイルが当たるので、そのままでよい
        if (el.dataset.reveal !== "words") {
          const settle = () => {
            if (el.dataset.revealed !== "in") return;
            el.dataset.revealed = "done";
            el.style.removeProperty("--reveal-delay");
          };
          const onEnd = (e: TransitionEvent) => {
            if (e.target !== el || e.propertyName !== "opacity") return;
            el.removeEventListener("transitionend", onEnd);
            settle();
          };
          el.addEventListener("transitionend", onEnd);
          // 読み込み直後などで transitionend が来なかったときの保険
          later(settle, delay + SETTLE_MS * 2);
        }
      });
    };

    const countUp = (el: HTMLElement, delay: number) => {
      const nodes = el.matches("[data-count-to]")
        ? [el]
        : Array.from(el.querySelectorAll<HTMLElement>("[data-count-to]"));
      for (const node of nodes) {
        const to = Number(node.dataset.countTo);
        node.textContent = "0";
        later(() => {
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / COUNT_UP_MS);
            node.textContent = String(Math.round(to * (1 - (1 - t) ** 3)));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }, delay);
      }
    };

    const makeObserver = (rootMargin: string) =>
      new IntersectionObserver(
        (entries, observer) => {
          const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target);
          visible.forEach((el) => observer.unobserve(el));
          if (visible.length) reveal(visible);
        },
        { rootMargin },
      );
    const earlyObserver = makeObserver("0px 0px -4% 0px");
    const normalObserver = makeObserver("0px 0px -10% 0px");

    // ---- 写真ズーム ----
    const zooming = new Set<HTMLElement>();
    let frame = 0;
    // 写真全体が画面に入った位置（下端が画面下）から、上端がヘッダー下に届くまでの間で拡大する。
    // 画面を通り過ぎる全区間に割り振ると、写真が見えている間の変化が小さすぎて気づけないため
    const updateZoom = () => {
      frame = 0;
      const vh = window.innerHeight;
      zooming.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // 写真が画面より大きい場合も、最低 ZOOM_MIN_RANGE は拡大の区間を確保する
        const start = Math.max(vh - rect.height, HEADER_HEIGHT + ZOOM_MIN_RANGE);
        const progress = Math.min(
          1,
          Math.max(0, (start - rect.top) / (start - HEADER_HEIGHT)),
        );
        const scale = 1 + (ZOOM_MAX - 1) * progress;
        el.style.transform = `scale3d(${scale}, ${scale}, 1)`;
      });
    };
    const onScroll = () => {
      if (zooming.size && !frame) frame = requestAnimationFrame(updateZoom);
    };
    const zoomObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) zooming.add(el);
        else zooming.delete(el);
      }
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- 監視対象の登録（絞り込みやページ遷移で増えた要素も拾う） ----
    const register = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
        const early = el.dataset.reveal === "heading" || el.dataset.reveal === "words";
        (early ? earlyObserver : normalObserver).observe(el);
      });
      scope.querySelectorAll<HTMLElement>("[data-zoom]").forEach((el) => zoomObserver.observe(el));
    };
    register(document);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches("[data-reveal], [data-zoom]")) register(node.parentNode ?? node);
          else register(node);
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const teardown = () => {
      earlyObserver.disconnect();
      normalObserver.disconnect();
      zoomObserver.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };

    // 途中で「動きを減らす」に切り替わったら、演出をやめて全部見える状態にする
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (!reduceMotion.matches) return;
      teardown();
      root.removeAttribute("data-motion");
      zooming.forEach((el) => (el.style.transform = ""));
      document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
        el.textContent = el.dataset.countTo ?? el.textContent;
      });
    };
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      teardown();
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return null;
}

function byPosition(a: Element, b: Element) {
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  return Math.round(ra.top) - Math.round(rb.top) || ra.left - rb.left;
}
