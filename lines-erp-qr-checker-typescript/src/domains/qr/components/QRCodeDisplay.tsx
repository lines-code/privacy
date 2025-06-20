'use client';

import { QRCodeState } from '../types';

interface QRCodeDisplayProps {
  qrState: QRCodeState;
  onRefresh: () => void;
}

export function QRCodeDisplay({ qrState, onRefresh }: QRCodeDisplayProps) {
  const { imageUrl, responseData, isLoading, error } = qrState;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* QR Code Image */}
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
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

      {/* Response Data Log */}
      <div className="w-80 max-h-72 overflow-y-auto bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-2">응답 데이터:</h3>
        
        {error ? (
          <div className="text-red-600 whitespace-pre-wrap">{error}</div>
        ) : responseData ? (
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        ) : (
          <div className="text-gray-500">데이터 없음</div>
        )}
      </div>

      {/* Auto-refresh Indicator */}
      <div className="text-sm text-gray-600 text-center">
        <p>🔄 자동 새로고침: 10초마다</p>
        <p className="text-xs text-gray-500 mt-1">
          로그인이 유지되는 동안 QR 코드가 자동으로 업데이트됩니다
        </p>
      </div>
    </div>
  );
} 