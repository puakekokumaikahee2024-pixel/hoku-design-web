// Multilingual overrides for app detail pages.
// Only apps/languages with translations are listed here.
// Missing entries fall back to the Japanese content in app-details.ts.

import type { AppDetail } from "./app-details";

type AppDetailI18n = Pick<
  AppDetail,
  "seoPurpose" | "seoDescription" | "catchcopy" | "overview" | "features" | "audience" | "pricing"
>;

type LocaleKey = "en" | "es" | "de" | "zh-TW" | "ko";

export const APP_DETAILS_I18N: Record<
  string,
  Partial<Record<LocaleKey, AppDetailI18n>>
> = {
  clinstats: {
    en: {
      seoPurpose: "Clinical Statistics App for Mobile",
      seoDescription:
        "Clinstats is a clinical statistics app that runs entirely on your smartphone. Supports 13 statistical tests including t-test, Mann-Whitney U, one-way ANOVA, Kruskal-Wallis, chi-square, Fisher exact, correlation, regression, and ROC curve analysis. Import data via CSV, view effect sizes, graphs, interpretations, and APA-format paper examples.",
      catchcopy: "Complete clinical statistical analysis — right from your smartphone.",
      overview: [
        "Clinstats is a clinical statistics app that runs entirely on your smartphone.",
        "It supports 13 statistical tests, from two-group comparisons and multi-group comparisons to categorical data, correlation, predictive models, and diagnostic test evaluation.",
        "Calculation results are verified against scipy, statsmodels, and sklearn with a precision of 1e-8 to 1e-12, confirmed by over 800 automated tests.",
        "Results are displayed across 5 tabs — Summary, Details, Graph, Interpretation, and Paper Example — and APA-format paper examples can also be exported (Pro).",
      ],
      features: [
        {
          title: "13 Statistical Tests",
          items: [
            "Two-group: Independent t-test (Welch), paired t-test, Mann-Whitney U, Wilcoxon signed-rank",
            "Multi-group: One-way ANOVA, Kruskal-Wallis",
            "Categorical: Chi-square (Yates correction), Fisher exact",
            "Correlation: Pearson, Spearman",
            "Predictive models: Linear regression, logistic regression",
            "Diagnostic evaluation: ROC curve analysis (AUC, Youden J, cut-off)",
            "Descriptive statistics",
          ],
        },
        {
          title: "Verified Calculation Accuracy",
          body: "Matches scipy, statsmodels, and sklearn to 1e-8–1e-12 precision, confirmed by 800+ automated tests.",
        },
        {
          title: "Easy Data Input",
          items: [
            "CSV upload",
            "Template CSV per test type",
            "3 sample datasets",
            "6-step variable setup wizard",
          ],
        },
        {
          title: "5 Tabs of Results",
          body: "Summary / Details (including effect sizes) / Graph (bar, box plot, scatter) / Interpretation / Paper Example.",
        },
        {
          title: "Export",
          items: ["CSV (free)", "PNG (Pro)", "APA-format paper example (Pro)"],
        },
        {
          title: "6 Languages & Analysis History",
          body: "Available in English, Japanese, German, Traditional Chinese, Spanish, and Korean. Analysis history is saved.",
        },
      ],
      audience: [
        "Rehabilitation professionals and healthcare workers analyzing clinical data",
        "Statistics beginners who want help interpreting results and writing paper examples",
        "Anyone who wants to complete analyses on a smartphone without a computer",
      ],
      pricing: "Core features free / Clinstats Pro $9.99/month (7-day free trial)",
    },
    es: {
      seoPurpose: "App de Estadística Clínica para Móvil",
      seoDescription:
        "Clinstats es una app de estadística clínica que funciona completamente en tu smartphone. Compatible con 13 pruebas estadísticas: t de Student, Mann-Whitney U, ANOVA de un factor, Kruskal-Wallis, chi-cuadrado, prueba exacta de Fisher, correlación, regresión y análisis de curva ROC. Importa datos por CSV y visualiza tamaños del efecto, gráficas, interpretaciones y ejemplos en formato APA.",
      catchcopy: "Análisis estadístico clínico completo — directamente desde tu smartphone.",
      overview: [
        "Clinstats es una app de estadística clínica que funciona completamente en tu smartphone.",
        "Compatible con 13 pruebas estadísticas: desde comparaciones de dos grupos y múltiples grupos hasta datos categóricos, correlación, modelos predictivos y evaluación de pruebas diagnósticas.",
        "Los resultados de cálculo se verifican frente a scipy, statsmodels y sklearn con una precisión de 1e-8 a 1e-12, confirmada mediante más de 800 pruebas automáticas.",
        "Los resultados se muestran en 5 pestañas — Resumen, Detalles, Gráfica, Interpretación y Ejemplo de artículo — y también se pueden exportar ejemplos en formato APA (Pro).",
      ],
      features: [
        {
          title: "13 Pruebas Estadísticas",
          items: [
            "Dos grupos: t de Student independiente (Welch), t pareada, Mann-Whitney U, Wilcoxon de rangos con signo",
            "Múltiples grupos: ANOVA de un factor, Kruskal-Wallis",
            "Categóricos: Chi-cuadrado (corrección de Yates), prueba exacta de Fisher",
            "Correlación: Pearson, Spearman",
            "Modelos predictivos: Regresión lineal, regresión logística",
            "Evaluación diagnóstica: Análisis de curva ROC (AUC, índice de Youden J, punto de corte)",
            "Estadística descriptiva",
          ],
        },
        {
          title: "Precisión de Cálculo Verificada",
          body: "Coincide con scipy, statsmodels y sklearn con una precisión de 1e-8 a 1e-12, confirmada con más de 800 pruebas automáticas.",
        },
        {
          title: "Entrada de Datos Sencilla",
          items: [
            "Carga de CSV",
            "CSV plantilla por tipo de prueba",
            "3 conjuntos de datos de muestra",
            "Asistente de configuración de variables en 6 pasos",
          ],
        },
        {
          title: "Resultados en 5 Pestañas",
          body: "Resumen / Detalles (incluyendo tamaños del efecto) / Gráfica (barras, diagrama de caja, dispersión) / Interpretación / Ejemplo de artículo.",
        },
        {
          title: "Exportar",
          items: ["CSV (gratuito)", "PNG (Pro)", "Ejemplo de artículo en formato APA (Pro)"],
        },
        {
          title: "6 Idiomas e Historial de Análisis",
          body: "Disponible en inglés, japonés, alemán, chino tradicional, español y coreano. Se guarda el historial de análisis.",
        },
      ],
      audience: [
        "Profesionales de la rehabilitación y sanitarios que analizan datos clínicos",
        "Principiantes en estadística que desean ayuda para interpretar resultados y redactar ejemplos de artículos",
        "Quienes quieren completar análisis en el smartphone sin necesidad de un ordenador",
      ],
      pricing: "Funciones básicas gratuitas / Clinstats Pro 9,99 $/mes (7 días de prueba gratis)",
    },
    de: {
      seoPurpose: "Klinische Statistik-App für Smartphones",
      seoDescription:
        "Clinstats ist eine klinische Statistik-App, die komplett auf dem Smartphone läuft. Unterstützt 13 statistische Tests: t-Test, Mann-Whitney U, einfaktorielle ANOVA, Kruskal-Wallis, Chi-Quadrat, exakter Fisher-Test, Korrelation, Regression und ROC-Kurvenanalyse. Daten per CSV importieren, Effektgrößen, Grafiken, Interpretationen und APA-Formatbeispiele anzeigen.",
      catchcopy: "Klinisch-statistische Analyse — vollständig auf deinem Smartphone.",
      overview: [
        "Clinstats ist eine klinische Statistik-App, die komplett auf dem Smartphone läuft.",
        "Sie unterstützt 13 statistische Tests — von Zwei-Gruppen-Vergleichen über Mehr-Gruppen-Vergleiche bis zu kategorischen Daten, Korrelation, Vorhersagemodellen und diagnostischer Testevaluation.",
        "Die Berechnungsergebnisse werden gegenüber scipy, statsmodels und sklearn mit einer Präzision von 1e-8 bis 1e-12 verifiziert, bestätigt durch über 800 automatisierte Tests.",
        "Ergebnisse werden in 5 Tabs angezeigt — Zusammenfassung, Details, Diagramm, Interpretation und Papierbeispiel — und APA-formatierte Papierbeispiele können exportiert werden (Pro).",
      ],
      features: [
        {
          title: "13 Statistische Tests",
          items: [
            "Zwei Gruppen: unabhängiger t-Test (Welch), verbundener t-Test, Mann-Whitney U, Wilcoxon-Vorzeichen-Rang-Test",
            "Mehrere Gruppen: Einfaktorielle ANOVA, Kruskal-Wallis",
            "Kategorial: Chi-Quadrat (Yates-Korrektur), exakter Fisher-Test",
            "Korrelation: Pearson, Spearman",
            "Vorhersagemodelle: Lineare Regression, logistische Regression",
            "Diagnostische Evaluation: ROC-Kurvenanalyse (AUC, Youden J, Schwellenwert)",
            "Deskriptive Statistik",
          ],
        },
        {
          title: "Verifizierte Berechnungsgenauigkeit",
          body: "Stimmt mit scipy, statsmodels und sklearn mit einer Präzision von 1e-8 bis 1e-12 überein, bestätigt durch 800+ automatisierte Tests.",
        },
        {
          title: "Einfache Dateneingabe",
          items: [
            "CSV-Upload",
            "Vorlagen-CSV pro Testtyp",
            "3 Beispieldatensätze",
            "6-Schritt-Variablenkonfigurations-Assistent",
          ],
        },
        {
          title: "5 Tabs für Ergebnisse",
          body: "Zusammenfassung / Details (inkl. Effektgrößen) / Diagramm (Balken, Box-Plot, Streudiagramm) / Interpretation / Papierbeispiel.",
        },
        {
          title: "Export",
          items: ["CSV (kostenlos)", "PNG (Pro)", "APA-formatiertes Papierbeispiel (Pro)"],
        },
        {
          title: "6 Sprachen & Analysehistorie",
          body: "Verfügbar in Englisch, Japanisch, Deutsch, Traditionelles Chinesisch, Spanisch und Koreanisch. Analysehistorie wird gespeichert.",
        },
      ],
      audience: [
        "Rehabilitationsfachkräfte und medizinisches Personal, die klinische Daten analysieren",
        "Statistik-Einsteiger, die Hilfe bei der Interpretation von Ergebnissen und beim Schreiben von Papierbeispielen benötigen",
        "Alle, die Analysen auf dem Smartphone ohne Computer abschließen möchten",
      ],
      pricing: "Kernfunktionen kostenlos / Clinstats Pro 9,99 $/Monat (7 Tage kostenlose Testversion)",
    },
    "zh-TW": {
      seoPurpose: "手機版臨床統計分析應用程式",
      seoDescription:
        "Clinstats 是一款可在智慧型手機上完整執行的臨床統計應用程式，支援13種統計檢定：t檢定、Mann-Whitney U、單因子ANOVA、Kruskal-Wallis、卡方、Fisher精確檢定、相關、迴歸及ROC曲線分析。可透過CSV匯入資料，顯示效應量、圖形、解釋說明及APA格式論文範例。",
      catchcopy: "臨床統計分析，只需一支手機即可完成。",
      overview: [
        "Clinstats 是一款可在智慧型手機上完整執行的臨床統計應用程式。",
        "支援13種統計檢定，涵蓋兩組比較、多組比較、類別資料、相關、預測模型及診斷測試評估。",
        "計算結果與scipy、statsmodels及sklearn的比對精度達1e-8至1e-12，並通過800項以上的自動化測試確認。",
        "結果以5個分頁呈現——摘要、詳細、圖形、解釋及論文範例——並可輸出APA格式論文範例（Pro）。",
      ],
      features: [
        {
          title: "13種統計檢定",
          items: [
            "兩組：獨立t檢定（Welch）、配對t檢定、Mann-Whitney U、Wilcoxon符號等級",
            "多組：單因子ANOVA、Kruskal-Wallis",
            "類別：卡方檢定（Yates校正）、Fisher精確檢定",
            "相關：Pearson、Spearman",
            "預測模型：線性迴歸、羅吉斯迴歸",
            "診斷評估：ROC曲線分析（AUC、Youden J、截切點）",
            "描述性統計",
          ],
        },
        {
          title: "經過驗證的計算精度",
          body: "與scipy、statsmodels及sklearn的比對精度達1e-8至1e-12，通過800項以上自動化測試確認。",
        },
        {
          title: "簡便的資料輸入",
          items: [
            "CSV上傳",
            "各檢定類型的範本CSV",
            "3組範例資料集",
            "6步驟變數設定精靈",
          ],
        },
        {
          title: "5個分頁呈現結果",
          body: "摘要 / 詳細（含效應量）/ 圖形（長條、箱型、散布圖）/ 解釋 / 論文範例。",
        },
        {
          title: "匯出",
          items: ["CSV（免費）", "PNG（Pro）", "APA格式論文範例（Pro）"],
        },
        {
          title: "6種語言與分析記錄",
          body: "支援英文、日文、德文、繁體中文、西班牙文及韓文。可儲存分析記錄。",
        },
      ],
      audience: [
        "分析臨床資料的復健專業人員及醫療工作者",
        "希望獲得結果解釋及論文範例參考的統計初學者",
        "希望不用電腦、直接在智慧型手機上完成分析的使用者",
      ],
      pricing: "基本功能免費 / Clinstats Pro 每月9.99美元（7天免費試用）",
    },
    ko: {
      seoPurpose: "모바일 임상 통계 분석 앱",
      seoDescription:
        "Clinstats는 스마트폰으로 완결되는 임상 통계 분석 앱입니다. t검정, Mann-Whitney U, 일원분산분석, Kruskal-Wallis, 카이제곱, Fisher 정확검정, 상관, 회귀, ROC 곡선 분석 등 13가지 통계 검정을 지원합니다. CSV로 데이터를 불러오고 효과 크기, 그래프, 해석, APA 형식 논문 예시를 확인하세요.",
      catchcopy: "스마트폰 하나로 임상 통계 분석을 완결하세요.",
      overview: [
        "Clinstats는 스마트폰으로 완결되는 임상 통계 분석 앱입니다.",
        "2군 비교부터 3군 이상 비교, 범주형 데이터, 상관, 예측 모델, 진단 검사 평가까지 13가지 통계 검정을 지원합니다.",
        "계산 결과는 scipy, statsmodels, sklearn과 1e-8~1e-12 정밀도로 일치하며, 800개 이상의 자동화 테스트로 확인하였습니다.",
        "결과는 요약·상세·그래프·해석·논문 예시 5개의 탭으로 확인할 수 있으며, APA 형식 논문 예시도 출력할 수 있습니다(Pro).",
      ],
      features: [
        {
          title: "13가지 통계 검정",
          items: [
            "2군 비교: 독립표본 t검정(Welch), 대응표본 t검정, Mann-Whitney U, Wilcoxon 부호순위 검정",
            "다군 비교: 일원분산분석, Kruskal-Wallis 검정",
            "범주형: 카이제곱 검정(Yates 보정), Fisher 정확검정",
            "상관: Pearson 상관, Spearman 상관",
            "예측 모델: 선형 회귀, 로지스틱 회귀",
            "진단 검사 평가: ROC 곡선 분석(AUC, Youden J, 컷오프)",
            "기술 통계",
          ],
        },
        {
          title: "검증된 계산 정확도",
          body: "scipy, statsmodels, sklearn과 1e-8~1e-12 정밀도로 일치. 800개 이상의 자동화 테스트로 확인하였습니다.",
        },
        {
          title: "간편한 데이터 입력",
          items: [
            "CSV 업로드",
            "검정 유형별 템플릿 CSV",
            "샘플 데이터 3종",
            "6단계 변수 설정 마법사",
          ],
        },
        {
          title: "5개 탭으로 결과 표시",
          body: "요약 / 상세(효과 크기 포함) / 그래프(막대, 상자수염, 산점도) / 해석 / 논문 예시.",
        },
        {
          title: "내보내기",
          items: ["CSV(무료)", "PNG(Pro)", "APA 형식 논문 예시(Pro)"],
        },
        {
          title: "6개 언어 지원 및 분석 기록",
          body: "영어, 일본어, 독일어, 번체 중국어, 스페인어, 한국어를 지원하며 분석 기록을 저장할 수 있습니다.",
        },
      ],
      audience: [
        "임상 데이터를 분석하는 재활 전문가 및 의료 종사자",
        "검정 결과 해석과 논문 예시를 참고하고 싶은 통계 초보자",
        "컴퓨터 없이 스마트폰으로 분석을 완결하고 싶은 분",
      ],
      pricing: "기본 기능 무료 / Clinstats Pro 월 9.99달러(7일 무료 체험)",
    },
  },
};

/** Get localized app detail, falling back to the default (Japanese) detail */
export function getLocalizedAppDetail<T extends AppDetailI18n>(
  slug: string,
  defaultDetail: T,
  locale: string,
): T {
  if (locale === "ja" || !locale) return defaultDetail;
  const i18n = APP_DETAILS_I18N[slug];
  if (!i18n) return defaultDetail;
  const localeDetail = i18n[locale as LocaleKey];
  if (!localeDetail) return defaultDetail;
  return { ...defaultDetail, ...localeDetail } as T;
}
