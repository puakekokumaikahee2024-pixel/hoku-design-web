// 6分間歩行試験（6MWT）の予測値・達成率の計算。
// 元ツール（6mwt-generator/generator-v6.html）の calculate() から、予測値と達成率の部分だけを
// そのまま移植している。式・下限・丸め方は変えないこと。
// 入力はフォームの value と同じく文字列で受け取り、元と同じ parseFloat で数値にする。

export type Sex = "male" | "female";

export type PredictionInput = {
  age: string;
  height: string;
  weight: string;
  sex: Sex;
  /** 実測の歩行距離（m） */
  dist: string;
};

export type PredictionResult = {
  dist: number;
  /** 予測6MWT距離（Enright式）。元ツールと同じく toFixed(2) の文字列 */
  predicted: string;
  /** 達成率（実測 ÷ 予測 × 100）。toFixed(2) の文字列 */
  pct: string;
};

export type PredictionOutcome =
  | { ok: true; result: PredictionResult }
  | { ok: false; error: string };

export function calculatePrediction(input: PredictionInput): PredictionOutcome {
  const age = parseFloat(input.age);
  const height = parseFloat(input.height);
  const weight = parseFloat(input.weight);
  const sex = input.sex;
  const dist = parseFloat(input.dist);

  // バリデーション
  if (!age || !height || !weight || !dist) {
    return { ok: false, error: "年齢・身長・体重・歩行距離を入力してください。" };
  }
  if (age < 18 || age > 110) return { ok: false, error: "年齢は18〜110歳の範囲で入力してください。" };
  if (height < 100 || height > 220) return { ok: false, error: "身長は100〜220cmの範囲で入力してください。" };
  if (weight < 20 || weight > 200) return { ok: false, error: "体重は20〜200kgの範囲で入力してください。" };

  let predicted =
    sex === "male"
      ? 7.57 * height - 5.02 * age - 1.76 * weight - 309
      : 2.11 * height - 2.29 * weight - 5.78 * age + 667;
  predicted = Math.max(predicted, 1);
  const pct = ((dist / predicted) * 100).toFixed(2);

  return { ok: true, result: { dist, predicted: predicted.toFixed(2), pct } };
}

/** 達成率に応じた簡単な解釈文（区切りは元ツールの判定と同じ 70% / 85%） */
export function interpretPct(pct: string) {
  const value = parseFloat(pct);
  if (value >= 100) return "同年代・同体格の予測値以上の距離を歩けています。";
  if (value >= 85) return "予測値に近い距離を歩けています。";
  if (value >= 70) return "予測値をやや下回っています。体調や測定条件もふまえて、経過を見ていきましょう。";
  return "予測値を大きく下回っています。結果の解釈については、医師や医療専門職にご相談ください。";
}
