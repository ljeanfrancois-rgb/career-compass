import { careerPaths, type CareerPath } from "@/data/career-data";

export function getCareerPathById(pathId: string | null, customPaths: CareerPath[] = []) {
  if (!pathId) {
    return null;
  }

  return [...careerPaths, ...customPaths].find((path) => path.id === pathId) ?? null;
}

export function getCareerPathsForField(fieldId: string, customPaths: CareerPath[] = []) {
  return [...careerPaths, ...customPaths].filter((path) => path.field === fieldId);
}

export function getAllCareerPaths(customPaths: CareerPath[] = []) {
  return [...careerPaths, ...customPaths];
}
