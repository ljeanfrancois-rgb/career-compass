import { careerPaths, fieldQuestions, questions, type CareerPath, type ScoreDimension } from "@/data/career-data";

type MatchReason = {
  answer: string;
  label: string;
  weight: number;
};

type DimensionScores = Record<ScoreDimension, number>;

function emptyDimensions(): DimensionScores {
  return {
    logic: 0,
    handsOn: 0,
    impact: 0
  };
}

export function matchCareers(
  selectedField: string | null,
  answers: Record<string, string>,
  paths: CareerPath[] = careerPaths
) {
  const scopedQuestions = selectedField
  ? [...questions, ...(fieldQuestions[selectedField as keyof typeof fieldQuestions] ?? [])]
  : questions;
  const questionOptions = scopedQuestions.flatMap((question) => question.options);

  const userDimensionScores = Object.values(answers).reduce((totals, answer) => {
    const option = questionOptions.find((item) => item.value === answer);

    if (!option) {
      return totals;
    }

    return {
      logic: totals.logic + option.dimensionWeights.logic,
      handsOn: totals.handsOn + option.dimensionWeights.handsOn,
      impact: totals.impact + option.dimensionWeights.impact
    };
  }, emptyDimensions());

  const ranked = paths
    .filter((path) => !selectedField || path.field === selectedField)
    .map((path) => {
      const answerScore = Object.values(answers).reduce((total, answer) => {
        return total + (path.answerWeights[answer] ?? 0);
      }, 0);

      const dimensionScore =
        userDimensionScores.logic * path.dimensionProfile.logic +
        userDimensionScores.handsOn * path.dimensionProfile.handsOn +
        userDimensionScores.impact * path.dimensionProfile.impact;

      const reasons: MatchReason[] = Object.entries(answers)
        .map(([, answer]) => {
          const option = questionOptions.find((item) => item.value === answer);
          return {
            answer,
            label: option?.label ?? answer,
            weight: path.answerWeights[answer] ?? 0
          };
        })
        .filter((reason) => reason.weight > 0)
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3);

      return {
        ...path,
        score: answerScore + dimensionScore,
        reasons,
        dimensionNarrative: buildDimensionNarrative(path.dimensionProfile),
        explanation:
          reasons.length > 0
            ? `This path scored well because your answers pointed toward ${reasons
                .map((reason) => reason.label.toLowerCase())
                .join(", ")}.`
            : "This path is included as a nearby option worth exploring.",
        dimensionBreakdown: {
          logic: Math.round((userDimensionScores.logic / 21) * 100),
          handsOn: Math.round((userDimensionScores.handsOn / 21) * 100),
          impact: Math.round((userDimensionScores.impact / 21) * 100)
        }
      };
    })
    .sort((a, b) => b.score - a.score);

  const topScore = Math.max(ranked[0]?.score ?? 0, 1);

  return ranked.map((path) => ({
    ...path,
    matchPercent: Math.max(55, Math.round((path.score / topScore) * 100))
  }));
}

function buildDimensionNarrative(profile: DimensionScores) {
  const ordered = Object.entries(profile)
    .sort(([, a], [, b]) => b - a)
    .map(([dimension]) => dimension as ScoreDimension);

  const [primary, secondary] = ordered;

  return `${labelDimension(primary)} leads this path, with ${labelDimension(secondary)} also playing a strong role.`;
}

function labelDimension(dimension: ScoreDimension) {
  if (dimension === "logic") {
    return "logic and math thinking";
  }

  if (dimension === "handsOn") {
    return "hands-on building";
  }

  return "people and impact";
}
