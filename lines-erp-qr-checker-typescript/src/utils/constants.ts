// API Configuration
// export const API_BASE_URL = 'https://erp.thebidify.com';
export const API_BASE_URL = 'http://localhost:9090';
export const CERT_NO = 'PXB29X';

// Timing Constants
export const QR_CODE_REFRESH_INTERVAL_MS = 300000; // 5 minutes
export const AUTH_CHECK_DELAY_MS = 100; // Small delay for UI updates

// Storage Keys
export const ACCESS_TOKEN_KEY = 'accessToken';
export const CERT_NO_KEY = 'certNo';

// API Endpoints
export const ENDPOINTS = {
   LOGIN: '/signin/authorized',
  QR_CODE: (certNo: string) => `/company-calendar/qr-code/${certNo}`,
} as const; 