import React, { useState } from 'react';
import { supabase, supabaseAdmin, isSupabaseConfigured } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      toast.error('Supabase belum dikonfigurasi. Cek .env');
      return;
    }

    const fakeEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@siapkredit.local`;

    if (username.length < 3) {
      toast.error('Username minimal 3 karakter huruf/angka');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        // Gunakan Admin API untuk mendaftarkan user dan mem-bypass kewajiban konfirmasi email
        // Ini menghindari error "email rate limit exceeded"
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: fakeEmail,
          password: password,
          email_confirm: true
        });
        if (error) throw error;
        toast.success('Pendaftaran berhasil! Silakan login.');
        setIsRegister(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: fakeEmail,
          password,
        });
        if (error) throw error;
        toast.success('Login berhasil!');
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.message.includes('rate limit')) {
        toast.error('Batas limit daftar. Matikan "Confirm Email" di Supabase.');
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error('Username atau Password salah!');
      } else if (error.message.includes('already registered')) {
        toast.error('Username ini sudah dipakai orang lain.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border text-center">
          <AlertCircle className="w-12 h-12 text-warning-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Supabase Belum Dikonfigurasi</h2>
          <p className="text-muted-foreground mb-4">
            Aplikasi ini membutuhkan database real-time. Silakan masukkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-foreground">SiapKredit</h1>
          <p className="text-muted-foreground mt-2">
            {isRegister ? 'Buat akun baru untuk toko Anda' : 'Masuk ke akun SiapKredit Anda'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Username (Tanpa Spasi)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background"
              placeholder="Misal: tokobudi"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background"
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isRegister ? 'Daftar Sekarang' : 'Masuk'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
          >
            {isRegister
              ? 'Sudah punya akun? Masuk di sini'
              : 'Belum punya akun? Daftar gratis'}
          </button>
        </div>
      </div>
    </div>
  );
}
