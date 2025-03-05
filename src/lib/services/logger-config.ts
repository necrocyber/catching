interface logServerUrl {
    enabled: boolean;
    serverUrl: string;
}

export interface LoggerConfig {
    mode: 'SR' | 'HTTP' | 'FIREBASE' | 'GOOGLE' | 'LOCAL';
    enableDebug: boolean;
    logServerUrl: logServerUrl;
    logHosting: any;
}