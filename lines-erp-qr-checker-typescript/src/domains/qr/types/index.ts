export interface QRCodeResponse {
  company_no?: string;
  qr_code?: string;
  [key: string]: unknown;
}

export interface QRCodeState {
  imageUrl: string | null;
  responseData: QRCodeResponse | null;
  isLoading: boolean;
  error: string | null;
} 