-- 1. Create Favorites Table
create table if not exists favorites (
  user_id uuid references auth.users(id) on delete cascade not null,
  cat_id bigint references cats(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, cat_id)
);

-- 2. Favorites RLS
alter table favorites enable row level security;

create policy "Users can view their own favorites" 
  on favorites for select using (auth.uid() = user_id);

create policy "Users can add their own favorites" 
  on favorites for insert with check (auth.uid() = user_id);

create policy "Users can remove their own favorites" 
  on favorites for delete using (auth.uid() = user_id);

-- 3. User Trigger (Auto-create Profile)
-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
