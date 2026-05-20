/**
 * @rag-sdk/runtime
 *
 * Runtime environment and execution context for RAG pipelines.
 */

import type { RAGConfig, Document } from '@rag-sdk/core';

/**
 * Runtime execution context
 */
export interface RuntimeContext {
  config: RAGConfig;
  traceId: string;
  metadata: Record<string, unknown>;
}

/**
 * RAG runtime executor
 */
export class RAGRuntime {
  private context: RuntimeContext;

  constructor(config: RAGConfig, traceId?: string) {
    this.context = {
      config,
      traceId: traceId ?? crypto.randomUUID?.() ?? Date.now().toString(),
      metadata: {},
    };
  }

  /**
   * Execute a RAG query
   */
  async query(question: string, topK: number = 5): Promise<Document[]> {
    const { retriever } = this.context.config;
    return retriever.retrieve(question, topK);
  }

  /**
   * Get the current runtime context
   */
  getContext(): Readonly<RuntimeContext> {
    return this.context;
  }
}
