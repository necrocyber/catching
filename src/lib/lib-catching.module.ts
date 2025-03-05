import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { GlobalErrorHandler } from './handlers/global-error-handler.service';
import { LOGGER_CONFIG, LoggerService } from './services/logger.service';
import { LoggerConfig } from './services/logger-config';


@NgModule({})
export class LibCatchingModule {
  static forRoot(config: LoggerConfig): ModuleWithProviders<LibCatchingModule> {
    return {
      ngModule: LibCatchingModule,
      providers: [
        { provide: LOGGER_CONFIG, useValue: config },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        LoggerService
      ]
    };
  }
}
