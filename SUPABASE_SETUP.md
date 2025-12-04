# Supabase Setup and Verification

This app uses Supabase Auth for admin login and a simple `site_content` table to edit page content via the Admin Dashboard.

## 1) Configure Environment

Create `.env` in the project root (already created) and set your anon key:

```
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

The project URL is currently hardcoded in `src/Api/supabaseClient.js` as:

```
https://dsoelyxbdthtcaufuhbe.supabase.co
```

If you want, we can switch this to an env var later.

Restart Vite whenever `.env` changes:

```powershell
npm run dev
```

## 2) Create Tables and Policies

Run the following SQL in the Supabase SQL editor.

Admins (optional profile table linked to Auth)

```sql
create table if not exists admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  created_at timestamptz default now()
);

alter table admins enable row level security;

create policy "Admin can read own profile" on admins
for select using (auth.uid() = id);

create policy "Admin can upsert own profile" on admins
for insert with check (auth.uid() = id);
```

Site content (simple key-value CMS)

```sql
create table if not exists site_content (
  key text primary key,
  value text,
  updated_at timestamptz default now(),
  updated_by uuid references auth.users(id)
);

alter table site_content enable row level security;

-- Public website can read content
create policy "Public can read content" on site_content
for select using (true);

-- Only authenticated admins can write content
create policy "Admins write content" on site_content
for insert with check (exists (select 1 from admins a where a.id = auth.uid()));
create policy "Admins update content" on site_content
for update using (exists (select 1 from admins a where a.id = auth.uid()));
```

Seed content (optional, helps verify quickly)

```sql
insert into site_content (key, value) values
  ('header_title', 'Your Header Title from Supabase'),
  ('about_text', 'About content controlled in Supabase')
on conflict (key) do update set value = excluded.value;
```

## 3) Verify Auth and Content

1. Visit `/admin/signup` to create an admin (check your email to confirm).
2. Visit `/admin` to sign in; you will be redirected to `/admin/dashboard`.
3. Edit "Header Title" and "About Text", click "Save Content".
4. Go back to `/` and confirm the Header and About sections reflect your changes.

## 4) Where Things Live

- `src/Api/supabaseClient.js` — Supabase client
- `src/Api/adminService.js` — Signup/login/logout and profile upsert
- `src/Api/contentService.js` — Read/write `site_content`
- `src/Components/Admin/AdminDashboard.jsx` — Content editor UI + sign out
- `src/Components/Header/Header.jsx` — Reads `header_title`
- `src/Components/About/About.jsx` — Reads `about_text`
- Routes: `/admin`, `/admin/signup`, `/admin/dashboard`

## 5) Troubleshooting

- If you see "Supabase anon key missing", set `VITE_SUPABASE_ANON_KEY` in `.env` and restart `npm run dev`.
- If you see casing warnings (`TakeHome` vs `takehome`), keep folder casing consistent on Windows and restart the dev server.
- If Dashboard save fails, ensure the `site_content` policies were created and that your signed-in user has a row in `admins` (signup flow creates it, or insert manually).
