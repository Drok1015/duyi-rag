/**
 * @rag-sdk/core
 *
 * Core abstractions and interfaces for the RAG SDK.
 */

import type { generateId } from '@rag-sdk/utils';

/**
 * Document representation in the RAG pipeline
 */
export interface Document {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
}

/**
 * Embedding vector type
 */
export type Embedding = number[];

/**
 * Chunking strategy configuration
 */
export interface ChunkingConfig {
  chunkSize: number;
  chunkOverlap: number;
}

/**
 * Base retriever interface
 */
export interface Retriever {
  retrieve(query: string, topK?: number): Promise<Document[]>;
}

/**
 * Base embedder interface
 */
export interface Embedder {
  embed(text: string): Promise<Embedding>;
  embedBatch(texts: string[]): Promise<Embedding[]>;
}

/**
 * RAG pipeline configuration
 */
export interface RAGConfig {
  embedder: Embedder;
  retriever: Retriever;
  chunking?: ChunkingConfig;
}
