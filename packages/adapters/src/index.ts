/**
 * @rag-sdk/adapters
 *
 * Adapter implementations for various LLM providers and vector stores.
 */

import type { Embedder, Retriever } from '@rag-sdk/core';

/**
 * Base LLM adapter interface
 */
export interface LLMAdapter {
  complete(prompt: string, options?: CompletionOptions): Promise<string>;
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<string>;
}

/**
 * Base vector store adapter interface
 */
export interface VectorStoreAdapter {
  add(documents: Array<{ id: string; embedding: number[]; metadata?: Record<string, unknown> }>): Promise<void>;
  search(query: number[], topK?: number): Promise<Array<{ id: string; score: number }>>;
  delete(ids: string[]): Promise<void>;
}

/**
 * Completion options
 */
export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
}

/**
 * Chat message
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Chat options
 */
export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
}
