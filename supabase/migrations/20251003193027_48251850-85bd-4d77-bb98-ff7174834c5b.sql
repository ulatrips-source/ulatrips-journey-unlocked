-- Create app_role enum
create type public.app_role as enum ('admin', 'user');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create destinations table
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  description text not null,
  image_url text not null,
  duration text not null,
  time_slot text not null default '12:00 PM - 1:00 PM',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.destinations enable row level security;

create policy "Anyone can view destinations"
  on public.destinations for select
  using (true);

create policy "Admins can insert destinations"
  on public.destinations for insert
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update destinations"
  on public.destinations for update
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete destinations"
  on public.destinations for delete
  using (public.has_role(auth.uid(), 'admin'));

-- Create bookings table
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  destination_id uuid references public.destinations(id) on delete cascade not null,
  booking_date date not null,
  time_slot text not null,
  status text not null default 'pending',
  created_at timestamptz default now() not null
);

alter table public.bookings enable row level security;

create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all bookings"
  on public.bookings for select
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all bookings"
  on public.bookings for update
  using (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to destinations
create trigger update_destinations_updated_at
  before update on public.destinations
  for each row
  execute function public.update_updated_at_column();

-- Create function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  -- Assign default 'user' role
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();