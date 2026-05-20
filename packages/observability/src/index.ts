/**
 * @rag-sdk/observability
 *
 * Observability, logging, and tracing for RAG pipelines.
 */

/**
 * Log level enum
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * Structured log entry
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  traceId?: string;
  data?: Record<string, unknown>;
}

/**
 * Telemetry span
 */
export interface TelemetrySpan {
  traceId: string;
  spanId: string;
  operation: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  status: 'ok' | 'error';
  attributes: Record<string, unknown>;
}

/**
 * Simple logger
 */
export class Logger {
  private minLevel: LogLevel;

  constructor(minLevel: LogLevel = LogLevel.INFO) {
    this.minLevel = minLevel;
  }

  log(entry: Omit<LogEntry, 'timestamp'>): void {
    if (entry.level < this.minLevel) return;

    const fullEntry: LogEntry = { ...entry, timestamp: new Date() };
    const label = LogLevel[entry.level];
    console.log(`[${label}] ${entry.message}`, entry.data ?? '');
  }

  debug(message: string, data?: Record<string, unknown>, traceId?: string): void {
    this.log({ level: LogLevel.DEBUG, message, data, traceId });
  }

  info(message: string, data?: Record<string, unknown>, traceId?: string): void {
    this.log({ level: LogLevel.INFO, message, data, traceId });
  }

  warn(message: string, data?: Record<string, unknown>, traceId?: string): void {
    this.log({ level: LogLevel.WARN, message, data, traceId });
  }

  error(message: string, data?: Record<string, unknown>, traceId?: string): void {
    this.log({ level: LogLevel.ERROR, message, data, traceId });
  }
}
