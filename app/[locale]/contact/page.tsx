"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { Hibiscus } from "../../components/Decorations";
import { submitContact } from "./actions";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("locale", locale);

    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "");
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white dark:bg-night-900">
        {/* Hero */}
        <section className="relative overflow-hidden bg-linear-135 from-ocean via-[#1a9fc9] to-turquoise px-6 py-20 text-center text-white sm:py-28 dark:from-night-800 dark:via-ocean/60 dark:to-night-800">
          <div aria-hidden className="absolute -top-24 -right-16 size-72 rounded-full bg-sunset/50 blur-3xl dark:bg-sunset/25" />
          <Hibiscus accent="rgb(255 255 255 / 0.9)" className="absolute -bottom-10 -left-8 w-40 -rotate-12 text-white opacity-20 sm:w-52 dark:opacity-10" />
          <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-bold break-keep sm:text-4xl">{t("title")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{t("lead")}</p>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
          {status === "success" ? (
            <div className="rounded-2xl bg-emerald-50 p-10 text-center dark:bg-emerald-900/20">
              <p className="text-4xl">✅</p>
              <p className="mt-4 text-lg font-bold text-emerald-700 dark:text-emerald-400">{t("successTitle")}</p>
              <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-300">{t("successBody")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="name">
                  {t("labelName")} <span className="text-sunset">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("placeholderName")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-night-600 dark:bg-night-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-ocean"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="email">
                  {t("labelEmail")} <span className="text-sunset">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("placeholderEmail")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-night-600 dark:bg-night-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-ocean"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="subject">
                  {t("labelSubject")} <span className="text-sunset">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder={t("placeholderSubject")}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-night-600 dark:bg-night-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-ocean"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="message">
                  {t("labelMessage")} <span className="text-sunset">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={t("placeholderMessage")}
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20 dark:border-night-600 dark:bg-night-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-ocean"
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  ⚠️ {errorMsg || t("errorGeneric")}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-ocean px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ocean/25 transition hover:bg-ocean/90 disabled:opacity-60 dark:bg-ocean/80 dark:hover:bg-ocean"
              >
                {status === "submitting" ? t("submitting") : t("submit")}
              </button>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
