// API Configuration
export const API_BASE_URL = 'https://erp.thebidify.com';
export const CERT_NO = 'PXB29X';

// Timing Constants
export const QR_CODE_REFRESH_INTERVAL_MS = 10000; // 10 seconds
export const AUTH_CHECK_DELAY_MS = 100; // Small delay for UI updates

// Storage Keys
export const ACCESS_TOKEN_KEY = 'accessToken';

// API Endpoints
export const ENDPOINTS = {
   LOGIN: '/client/login',
  QR_CODE: (certNo: string) => `/company-calendar/qr-code/${certNo}`,
} as const; 