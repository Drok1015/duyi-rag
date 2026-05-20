/**
 * @rag-sdk/eval
 *
 * Evaluation metrics and benchmarking for RAG pipelines.
 */

/**
 * Evaluation result for a single query
 */
export interface EvalResult {
  query: string;
  expectedAnswer: string;
  actualAnswer: string;
  retrievedDocs: number;
  latency: number;
  scores: EvalScores;
}

/**
 * Evaluation scores
 */
export interface EvalScores {
  precision?: number;
  recall?: number;
  f1?: number;
  relevance?: number;
  faithfulness?: number;
}

/**
 * Compute basic string similarity score
 */
export function computeSimilarity(expected: string, actual: string): number {
  if (expected === actual) return 1.0;
  if (expected.length === 0 || actual.length === 0) return 0.0;

  const expectedWords = new Set(expected.toLowerCase().split(/\s+/));
  const actualWords = new Set(actual.toLowerCase().split(/\s+/));

  let overlap = 0;
  for (const word of actualWords) {
    if (expectedWords.has(word)) overlap++;
  }

  return overlap / Math.max(expectedWords.size, actualWords.size);
}

/**
 * Evaluate a set of results
 */
export function aggregateResults(results: EvalResult[]): {
  avgPrecision: number;
  avgRecall: number;
  avgF1: number;
  avgLatency: number;
} {
  const n = results.length;
  if (n === 0) return { avgPrecision: 0, avgRecall: 0, avgF1: 0, avgLatency: 0 };

  return {
    avgPrecision: results.reduce((sum, r) => sum + (r.scores.precision ?? 0), 0) / n,
    avgRecall: results.reduce((sum, r) => sum + (r.scores.recall ?? 0), 0) / n,
    avgF1: results.reduce((sum, r) => sum + (r.scores.f1 ?? 0), 0) / n,
    avgLatency: results.reduce((sum, r) => sum + r.latency, 0) / n,
  };
}
