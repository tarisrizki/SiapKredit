-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Table: profil
create table if not exists public.profil (
  id uuid references auth.users(id) on delete cascade not null primary key,
  "namaUsaha" text,
  "jenisUsaha" text,
  "lamaUsaha" text,
  kota text,
  "omsetPerBulan" text,
  "keuanganTerpisah" boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Table: dokumen
create table if not exists public.dokumen (
  id uuid references auth.users(id) on delete cascade not null primary key,
  ktp boolean default false,
  kk boolean default false,
  nib boolean default false,
  npwp boolean default false,
  "fotoUsaha" boolean default false,
  "rekeningBank" boolean default false,
  "bpjsTK" boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Table: transaksi
create table if not exists public.transaksi (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('pemasukan', 'pengeluaran')),
  amount numeric not null,
  category text not null,
  description text,
  date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE ROW LEVEL SECURITY (RLS)
alter table public.profil enable row level security;
alter table public.dokumen enable row level security;
alter table public.transaksi enable row level security;

-- POLICIES FOR PROFIL
create policy "User can view their own profil" on public.profil for select using (auth.uid() = id);
create policy "User can insert their own profil" on public.profil for insert with check (auth.uid() = id);
create policy "User can update their own profil" on public.profil for update using (auth.uid() = id);

-- POLICIES FOR DOKUMEN
create policy "User can view their own dokumen" on public.dokumen for select using (auth.uid() = id);
create policy "User can insert their own dokumen" on public.dokumen for insert with check (auth.uid() = id);
create policy "User can update their own dokumen" on public.dokumen for update using (auth.uid() = id);

-- POLICIES FOR TRANSAKSI
create policy "User can view their own transaksi" on public.transaksi for select using (auth.uid() = user_id);
create policy "User can insert their own transaksi" on public.transaksi for insert with check (auth.uid() = user_id);
create policy "User can update their own transaksi" on public.transaksi for update using (auth.uid() = user_id);
create policy "User can delete their own transaksi" on public.transaksi for delete using (auth.uid() = user_id);
