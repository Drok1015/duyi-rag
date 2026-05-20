/**
 * @rag-sdk/indexing
 *
 * Document indexing, chunking, and embedding pipeline.
 */

import type { Document, ChunkingConfig, Embedder } from '@rag-sdk/core';
import { generateId } from '@rag-sdk/utils';

/**
 * Text chunk with metadata
 */
export interface Chunk {
  id: string;
  content: string;
  documentId: string;
  chunkIndex: number;
  metadata: Record<string, unknown>;
}

/**
 * Split text into overlapping chunks
 */
export function chunkText(text: string, config: ChunkingConfig): string[] {
  const { chunkSize, chunkOverlap } = config;
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start = end - chunkOverlap;
    if (chunkOverlap >= chunkSize && chunks.length > 0) break;
  }

  return chunks;
}

/**
 * Index a document by chunking and embedding
 */
export async function indexDocument(
  document: Document,
  embedder: Embedder,
  chunkingConfig: ChunkingConfig,
): Promise<Array<{ chunk: Chunk; embedding: number[] }>> {
  const chunks = chunkText(document.content, chunkingConfig);
  const embeddings = await embedder.embedBatch(chunks);

  return chunks.map((content, index) => ({
    chunk: {
      id: generateId(),
      content,
      documentId: document.id,
      chunkIndex: index,
      metadata: { ...document.metadata },
    },
    embedding: embeddings[index],
  }));
}
