import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logger: LoggerService, private zone: NgZone) {}

  handleError(error: any): void {
    this.zone.run(() => {
      this.logger.error('GLOBAL ERROR: ', error);
    });
  }
}