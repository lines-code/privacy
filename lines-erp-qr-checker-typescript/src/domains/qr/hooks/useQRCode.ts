import { useState, useCallback, useEffect, useRef } from 'react';
import { QRCodeState, QRCodeResponse } from '../types';
import { API_BASE_URL, ENDPOINTS, QR_CODE_REFRESH_INTERVAL_MS } from '@/utils/constants';
import { getStoredCertNo } from '@/utils/storage';

interface UseQRCodeProps {
  accessToken: string | null;
  onTokenExpired: () => void;
}

export function useQRCode({ accessToken, onTokenExpired }: UseQRCodeProps) {
  const [qrState, setQRState] = useState<QRCodeState>({
    imageUrl: null,
    responseData: null,
    isLoading: false,
    error: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchQRCode = useCallback(async (): Promise<void> => {
    if (!accessToken) {
      setQRState(prev => ({ ...prev, error: '액세스 토큰이 없습니다' }));
      return;
    }

    setQRState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const certNoResult = getStoredCertNo();
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.QR_CODE(certNoResult.data || '')}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Check for token expiration
      const isTokenExpired = response.status === 401;
      if (isTokenExpired) {
        onTokenExpired();
        setQRState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: '🔐 인증 만료됨. 다시 로그인 해주세요.' 
        }));
        return;
      }

      if (!response.ok) {
        throw new Error('API 호출 실패');
      }

      const data: QRCodeResponse = await response.json();

      // Determine which URL to use for the QR code image
      const qrImageUrl = (() => {
        if (data.company_no) return data.company_no;
        if (data.qr_code) return data.qr_code;
        return null;
      })();

      setQRState({
        imageUrl: qrImageUrl,
        responseData: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
      setQRState(prev => ({
        ...prev,
        isLoading: false,
        error: `QR 코드 로딩 에러: ${errorMessage}`,
      }));
    }
  }, [accessToken, onTokenExpired]);

  const startAutoRefresh = useCallback(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Initial fetch
    fetchQRCode();

    // Set up auto-refresh
    intervalRef.current = setInterval(fetchQRCode, QR_CODE_REFRESH_INTERVAL_MS);
  }, [fetchQRCode]);

  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    qrState,
    fetchQRCode,
    startAutoRefresh,
    stopAutoRefresh,
  } as const;
} 