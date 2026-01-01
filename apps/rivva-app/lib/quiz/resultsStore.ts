import { readJSON, writeJSON } from "@/lib/storage/local";
import type { QuizResult } from "@/lib/quiz/schema";
import { DEFAULT_QUIZ } from "@/lib/quiz/schema";

const KEY = "rivva_quiz_result_v1";

export function loadQuizResult(): QuizResult {
  return readJSON<QuizResult>(KEY, DEFAULT_QUIZ);
}

export function saveQuizResult(next: QuizResult) {
  writeJSON(KEY, next);
}
