'use client';

import { useEffect } from 'react';
import { useAuth } from '@/domains/auth/hooks/useAuth';
import { useQRCode } from '@/domains/qr/hooks/useQRCode';
import { LoginForm } from '@/domains/auth/components/LoginForm';
import { QRCodeDisplay } from '@/domains/qr/components/QRCodeDisplay';

export function QRCheckerApp() {
  const { authState, login, logout, getAccessToken } = useAuth();
  const { qrState, startAutoRefresh, stopAutoRefresh, fetchQRCode } = useQRCode({
    accessToken: getAccessToken(),
    onTokenExpired: logout,
  });

  // Handle authentication state changes
  useEffect(() => {
    const isAuthenticated = authState.status === 'authenticated';
    
    if (isAuthenticated) {
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }

    // Cleanup function
    return () => {
      stopAutoRefresh();
    };
  }, [authState.status, startAutoRefresh, stopAutoRefresh]);

  // Determine which UI to show based on auth status
  const renderContent = () => {
    switch (authState.status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">🔓 저장된 토큰으로 자동 로그인 중...</p>
          </div>
        );

      case 'authenticated':
        return (
          <div className="flex flex-col items-center space-y-6">
            {/* Logout Button */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">회사 캘린더 QR 코드</h1>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                로그아웃
              </button>
            </div>

            {/* QR Code Display */}
            <QRCodeDisplay 
              qrState={qrState} 
              onRefresh={fetchQRCode}
            />
          </div>
        );

      case 'unauthenticated':
      case 'error':
      default:
        return (
          <LoginForm
            onLogin={login}
            isLoading={false}
            error={authState.error}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      {renderContent()}
    </div>
  );
} 