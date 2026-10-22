"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { getAppBySlug } from "@/lib/apps";
import {
  calculatePrediction,
  interpretPct,
  type PredictionInput,
  type PredictionResult,
} from "@/lib/sixmwt/calc";
import { AppIcon } from "../../components/AppIcon";
import { Sparkle } from "../../components/Decorations";

const EMPTY: PredictionInput = {
  age: "",
  height: "",
  weight: "",
  sex: "male",
  dist: "",
};

export function Calculator() {
  const [input, setInput] = useState<PredictionInput>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof PredictionInput) => (value: string) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  function handleCalculate() {
    const outcome = calculatePrediction(input);
    if (!outcome.ok) {
      setError(outcome.error);
      return;
    }
    setError(null);
    setResult(outcome.result);
    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function handleReset() {
    setInput(EMPTY);
    setError(null);
    setResult(null);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 sm:p-8 dark:bg-night-900 dark:ring-night-700">
        <h2 className="mb-5 font-bold text-slate-900 dark:text-white">
          基本情報と歩行距離を入力
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField label="年齢" unit="歳" placeholder="72" value={input.age} onChange={set("age")} />
          <Field label="性別">
            <select
              value={input.sex}
              onChange={(e) => set("sex")(e.target.value)}
              className={INPUT}
            >
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </Field>
          <NumberField label="身長" unit="cm" placeholder="162" step="0.1" value={input.height} onChange={set("height")} />
          <NumberField label="体重" unit="kg" placeholder="58.0" step="0.1" value={input.weight} onChange={set("weight")} />
          <div className="sm:col-span-2">
            <NumberField label="6分間の歩行距離（実測）" unit="m" placeholder="320" value={input.dist} onChange={set("dist")} />
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-3">
        {error && (
          <p
            role="alert"
            className="w-full rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-800 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-800/60"
          >
            {error}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            className="rounded-full bg-linear-to-r from-ocean to-turquoise px-8 py-3.5 font-semibold text-white shadow-lg shadow-ocean/30 transition hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
          >
            予測値を計算する
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:ring-turquoise dark:bg-night-800 dark:text-slate-300 dark:ring-night-700"
          >
            リセット
          </button>
        </div>
      </div>

      <div ref={resultRef} className="scroll-mt-24">
        {result && <Result result={result} />}
      </div>

      <AppPromo />
    </div>
  );
}

function Result({ result }: { result: PredictionResult }) {
  return (
    <section
      aria-label="計算結果"
      className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/80 dark:bg-night-900 dark:ring-night-700"
    >
      <dl className="grid bg-linear-135 from-ocean via-[#1a9fc9] to-turquoise text-white sm:grid-cols-2 dark:from-night-800 dark:via-ocean/60 dark:to-night-800">
        <div className="px-6 py-6 sm:px-8">
          <dt className="text-xs font-semibold tracking-widest text-white/80">
            予測歩行距離（Enright式）
          </dt>
          <dd className="mt-1 font-display text-4xl font-bold">
            {result.predicted} <span className="text-xl">m</span>
          </dd>
        </div>
        <div className="border-t border-white/20 px-6 py-6 sm:border-t-0 sm:border-l sm:px-8">
          <dt className="text-xs font-semibold tracking-widest text-white/80">
            達成率（実測 {result.dist}m ÷ 予測）
          </dt>
          <dd className="mt-1 font-display text-4xl font-bold">
            {result.pct} <span className="text-xl">%</span>
          </dd>
        </div>
      </dl>
      <div className="px-6 py-5 sm:px-8">
        <p className="leading-relaxed text-slate-800 dark:text-slate-100">
          {interpretPct(result.pct)}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          ※計算値は推定値です。診断や運動処方は、医師・医療専門職の判断のもとで行ってください。
        </p>
      </div>
    </section>
  );
}

const APP_FEATURES = [
  "推定VO₂・METs による運動耐容能の評価",
  "Borg 指数を用いた AT 域の判定",
  "865件の活動データベースから、日常生活・仕事の活動強度を参照",
  "測定結果の PDF 出力",
];

const PROMO_APPS = [
  {
    slug: "6mwt-guide",
    pitch: "予測値の自動計算と VO₂・METs 換算に、800項目以上の活動データベースとPDFレポート。",
  },
  {
    slug: "6mw-record",
    pitch: "予測歩行距離と運動強度（VO₂・METs・RPP）をオフラインで計算。Pro で活動データベースとPDF出力。",
  },
];

function AppPromo() {
  return (
    <section className="rounded-3xl bg-linear-to-br from-cyan-50 via-white to-orange-50 p-6 ring-1 ring-turquoise/20 sm:p-8 dark:from-night-900 dark:via-night-900 dark:to-night-800 dark:ring-night-700">
      <p className="font-display text-xs font-semibold tracking-[0.25em] text-cyan-700 uppercase dark:text-turquoise">
        Apps
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
        さらに詳しい分析は専用アプリで
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        HOKU Design の6分間歩行アプリでは、予測値の計算に加えて次のことができます。
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {APP_FEATURES.map((feature) => (
          <li
            key={feature}
            className="flex gap-2.5 rounded-2xl bg-white/80 px-4 py-3 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200/70 dark:bg-night-950/50 dark:text-slate-200 dark:ring-night-700"
          >
            <Sparkle className="mt-1 w-3.5 shrink-0 text-sunset" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        ※使える機能はアプリやプランによって異なります。詳しくは各アプリのページをご覧ください。
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {PROMO_APPS.map(({ slug, pitch }) => {
          const app = getAppBySlug(slug);
          if (!app) return null;
          return (
            <li
              key={slug}
              className="flex gap-4 rounded-2xl bg-white/90 p-4 ring-1 ring-slate-200/80 dark:bg-night-950/60 dark:ring-night-700"
            >
              <AppIcon app={app} size={64} className="size-16" />
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white">{app.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {pitch}
                </p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  <Link
                    href={`/apps/${app.slug}`}
                    className="text-slate-500 hover:text-ocean dark:text-slate-400 dark:hover:text-turquoise"
                  >
                    詳しく見る
                  </Link>
                  {app.storeUrl && <StoreLink href={app.storeUrl} label="App Store" />}
                  {app.playStoreUrl && <StoreLink href={app.playStoreUrl} label="Google Play" />}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ocean hover:text-turquoise dark:text-turquoise"
    >
      {label} ↗
    </a>
  );
}

// ---- フォーム部品 ----

const INPUT =
  "w-full rounded-xl bg-white px-3.5 py-2.5 text-base text-slate-900 ring-1 ring-slate-200 transition outline-none placeholder:text-slate-300 focus:ring-2 focus:ring-turquoise dark:bg-night-950 dark:text-white dark:ring-night-700 dark:placeholder:text-slate-600";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function NumberField({
  label,
  unit,
  value,
  onChange,
  ...rest
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: string;
}) {
  return (
    <Field label={label}>
      <span className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT}
          {...rest}
        />
        <span className="shrink-0 text-sm text-slate-500 dark:text-slate-400">{unit}</span>
      </span>
    </Field>
  );
}
