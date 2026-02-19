

 -- Insert default plan
 insert into public.listing_fee_plans (name, normal_fee, featured_fee) values ('default', 10.00, 14.00);

 -- listing_submissions
 create table public.listing_submissions (
   id uuid not null default gen_random_uuid(),
   submitter_id uuid references public.profiles(id) on delete set null,
   title text not null,
   description text null,
   price numeric(12,2) not null,
   currency character(3) not null default 'GHS',
   category_id uuid references public.market_categories(id) on delete set null,
   stock_qty integer null,
   condition text null,
   placement_type text not null default 'normal',
   call_contact text null,
   whatsapp_contact text null,
   photos jsonb not null default '[]',
   fee_plan_id uuid references public.listing_fee_plans(id) on delete set null,
   status public.listing_submission_status not null default 'submitted',
   approved_by uuid references public.profiles(id) on delete set null,
   approved_at timestamp with time zone null,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now(),
   constraint listing_submissions_pkey primary key (id),
   constraint listing_submissions_price_check check (price >= 0)
 );

 create index idx_listing_submissions_submitter on public.listing_submissions(submitter_id);
 create index idx_listing_submissions_status on public.listing_submissions(status, created_at desc);

 create trigger trg_listing_submissions_set_updated_at
   before update on listing_submissions
   for each row execute function set_timestamp_updated_at();

 -- payments
 create table public.payments (
   id uuid not null default gen_random_uuid(),
   profile_id uuid references public.profiles(id) on delete set null,
   amount numeric(12,2) not null,
   currency text not null default 'GHS',
   provider text null,
   provider_payment_id text null,
   status text not null default 'pending',
   type text not null,
   metadata jsonb null,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now(),
   constraint payments_pkey primary key (id)
 );

 create index idx_payments_profile on public.payments(profile_id);

 create trigger trg_payments_set_updated_at
   before update on payments
   for each row execute function set_timestamp_updated_at();

 -- listing_payments
 create table public.listing_payments (
   id uuid not null default gen_random_uuid(),
   payment_id uuid not null references public.payments(id) on delete cascade,
   listing_id uuid references public.market_listings(id) on delete set null,
   submission_id uuid references public.listing_submissions(id) on delete set null,
   placement_type text not null default 'normal',
   is_featured boolean not null default false,
   fee_amount numeric(12,2) not null,
   fee_currency text not null default 'GHS',
   created_at timestamp with time zone not null default now(),
   constraint listing_payments_pkey primary key (id)
 );