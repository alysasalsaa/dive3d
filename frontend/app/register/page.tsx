'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);
    
    // Simulasikan delay untuk request API
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register Details:', { name, email, password });
      alert("Simulasi Register Berhasil. Cek Console.");
      // TODO: Hubungkan dengan Backend
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Buat Akun</h2>
            <p className="text-gray-400">Silakan isi data diri Anda di bawah ini</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="confirmPassword">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Memproses...' : 'Daftar Akun'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-500 font-medium hover:text-blue-400 transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
