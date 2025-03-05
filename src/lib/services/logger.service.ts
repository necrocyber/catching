import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogEntry, LoggerConfig } from './logger-config';

export const LOGGER_CONFIG = new InjectionToken<LoggerConfig>('logger.config');

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    @Inject(LOGGER_CONFIG) private config: LoggerConfig, 
    private http: HttpClient
  ) {}

  private log(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', message: string, error?: any) {
    if (level === 'DEBUG' && !this.config.enableDebug) return;
    
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      stack: error?.stack || null,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    const consoleMethods: Record<'DEBUG' | 'INFO' | 'WARN' | 'ERROR', (message?: any, ...optionalParams: any[]) => void> = {
      DEBUG: console.debug,
      INFO: console.info,
      WARN: console.warn,
      ERROR: console.error
    };


    // Enviar log al servidor solo si es ERROR o WARN
    if (level === 'ERROR' || level === 'WARN') {
      switch (this.config.mode) {
        case 'LOCAL':
          consoleMethods[level](logEntry);
          break;
        case 'HTTP':  
          this.http.post(this.config.logServerUrl.serverUrl, logEntry).subscribe(); 
          break;
        case 'FIREBASE':
          break;
        case 'GOOGLE':
          break;
        case 'SR':
          this.config.sr(logEntry);
          break;
        default:
          break;
      }
    }
  }

  debug(message: string) {
    this.log('DEBUG', message);
  }

  info(message: string) {
    this.log('INFO', message);
  }

  warn(message: string, error?: any) {
    this.log('WARN', message, error);
  }

  error(message: string, error?: any) {
    this.log('ERROR', message, error);
  }
}
