'use client';

import { QRCodeState } from '../types';

interface QRCodeDisplayProps {
  qrState: QRCodeState;
  onRefresh: () => void;
}

export function QRCodeDisplay({ qrState, onRefresh }: QRCodeDisplayProps) {
  const { responseData, isLoading, error } = qrState;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* QR Code Image */}
      <div className="relative">
        {responseData?.qr_code ? (
          <img
            src={responseData?.qr_code}
            alt="QR 코드"
            className="w-72 h-72 border border-gray-300 rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-72 h-72 border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500">QR 코드 로딩 중...</span>
          </div>
        )}
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '새로고침 중...' : '수동 새로고침'}
      </button>

      {/* Auto-refresh Indicator */}
      <div className="text-sm text-gray-600 text-center">
        <p>🔄 자동 새로고침: 5분마다 자동으로 업데이트됩니다</p>
        <p className="text-xs text-gray-500 mt-1">
          로그인이 유지되는 동안 QR 코드가 자동으로 업데이트됩니다
        </p>
        <p className="text-xs text-gray-500 mt-1">
          본인의 휴대폰을 이용해서 QR을 인식 시켜주세요.
        </p>
      </div>
    </div>
  );
} 