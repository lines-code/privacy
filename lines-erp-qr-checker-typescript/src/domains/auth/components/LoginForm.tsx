'use client';

import { useState } from 'react';
import { LoginCredentials } from '../types';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onLogin, isLoading, error }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(credentials);
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Validation logic colocated with the form
  const isFormValid = credentials.email.trim() !== '' && credentials.password.trim() !== '';

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">시스템 관리자 QR 접근</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="이메일 입력"
          value={credentials.email}
          onChange={handleInputChange('email')}
          disabled={isLoading}
          className="w-70 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          required
        />
        
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={credentials.password}
          onChange={handleInputChange('password')}
          disabled={isLoading}
          className="w-70 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          required
        />
        
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-70 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md">
          {error}
        </div>
      )}
    </div>
  );
} 