create type "public"."event_attendance_status" as enum ('interested', 'going', 'not_going');

create type "public"."event_scope_type" as enum ('faculty', 'department', 'level');

create type "public"."event_visibility" as enum ('public', 'scoped', 'invite_only');

create type "public"."hostel_payment_term" as enum ('yearly', 'semester', 'academic_year');

create type "public"."listing_submission_status" as enum ('submitted', 'payment_pending', 'paid', 'approved', 'rejected');

create type "public"."market_placement_type" as enum ('normal', 'featured');

create type "public"."payment_status" as enum ('pending', 'succeeded', 'failed', 'refunded');

create type "public"."payment_type" as enum ('listing_fee', 'purchase', 'wallet_topup', 'booking_fee');

drop policy "Select departments (authenticated)" on "public"."departments";

drop policy "Select faculties (authenticated)" on "public"."faculties";

drop policy "Enable read access for all auth users" on "public"."programs";


  create table "public"."announcements" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "subtitle" text,
    "summary" text,
    "body" text,
    "notice" text,
    "heads_up" text,
    "category" text not null default 'announcement'::text,
    "is_important" boolean not null default false,
    "pinned" boolean not null default false,
    "starts_at" timestamp with time zone,
    "ends_at" timestamp with time zone,
    "is_public" boolean not null default true,
    "location" text,
    "address" text,
    "contact" text,
    "quick_facts" jsonb not null default '[]'::jsonb,
    "attachments" jsonb not null default '[]'::jsonb,
    "author_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."announcements" enable row level security;


  create table "public"."event_attendance" (
    "id" uuid not null default gen_random_uuid(),
    "event_id" uuid not null,
    "profile_id" uuid not null,
    "status" public.event_attendance_status not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."event_attendance" enable row level security;


  create table "public"."event_invites" (
    "id" uuid not null default gen_random_uuid(),
    "event_id" uuid not null,
    "profile_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."event_invites" enable row level security;


  create table "public"."event_scopes" (
    "id" uuid not null default gen_random_uuid(),
    "event_id" uuid not null,
    "scope_type" public.event_scope_type not null,
    "scope_value" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."event_scopes" enable row level security;


  create table "public"."events" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text,
    "location" text,
    "is_featured" boolean not null default false,
    "starts_at" timestamp with time zone not null,
    "ends_at" timestamp with time zone,
    "category" text not null default 'general'::text,
    "cover_image" text,
    "organizer_id" uuid,
    "capacity" integer,
    "visibility" public.event_visibility not null default 'public'::public.event_visibility,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "going_count" integer not null default 0,
    "interested_count" integer not null default 0,
    "can_book_canopy" boolean not null default false,
    "disable_attendance" boolean not null default false
      );


alter table "public"."events" enable row level security;


  create table "public"."hostel_photos" (
    "id" uuid not null default gen_random_uuid(),
    "hostel_id" uuid not null,
    "storage_path" text not null,
    "caption" text,
    "is_featured" boolean not null default false,
    "position" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."hostel_photos" enable row level security;


  create table "public"."hostels" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text,
    "address" text,
    "contact" text,
    "bedrooms" integer,
    "bathrooms" integer,
    "campus" boolean not null default false,
    "price" numeric(12,2) not null,
    "rating" numeric(3,1) default 0,
    "type" text not null default 'Hostel'::text,
    "payment_term" public.hostel_payment_term,
    "facilities" text[] not null default '{}'::text[],
    "hero_image_url" text,
    "agent_name" text,
    "agent_email" text,
    "agent_avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "is_featured" boolean not null default false
      );


alter table "public"."hostels" enable row level security;


  create table "public"."listing_fee_plans" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "currency" character(3) not null default 'GHS'::bpchar,
    "normal_fee" numeric(12,2) not null,
    "featured_fee" numeric(12,2) not null,
    "active" boolean not null default true,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."listing_fee_plans" enable row level security;


  create table "public"."market_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "icon" text,
    "created_at" timestamp with time zone not null default now(),
    "color" text
      );


alter table "public"."market_categories" enable row level security;


  create table "public"."market_listing_variants" (
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid not null,
    "label" text not null,
    "sku" text,
    "price" numeric(12,2),
    "currency" character(3),
    "stock_qty" integer,
    "is_in_stock" boolean not null default true,
    "attributes" jsonb not null default '{}'::jsonb,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."market_listing_variants" enable row level security;


  create table "public"."market_listings" (
    "id" uuid not null default gen_random_uuid(),
    "seller_id" uuid,
    "title" text not null,
    "description" text,
    "price" numeric(12,2) not null,
    "currency" character(3) not null default 'GHS'::bpchar,
    "category_id" uuid,
    "stock_qty" integer,
    "is_in_stock" boolean not null default true,
    "condition" text,
    "is_active" boolean not null default true,
    "is_approved" boolean not null default false,
    "call_contact" text,
    "whatsapp_contact" text,
    "placement_type" public.market_placement_type not null default 'normal'::public.market_placement_type,
    "is_featured" boolean not null default false,
    "placement_fee_paid" boolean not null default false,
    "placement_paid_at" timestamp with time zone,
    "placement_fee_amount" numeric(12,2),
    "placement_fee_currency" character(3),
    "hero_image_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "rating" numeric(3,2) not null default 0,
    "rating_count" integer not null default 0
      );


alter table "public"."market_listings" enable row level security;


  create table "public"."market_photos" (
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid not null,
    "storage_path" text not null,
    "caption" text,
    "is_featured" boolean not null default false,
    "position" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."market_photos" enable row level security;


  create table "public"."news" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "body" text not null,
    "excerpt" text,
    "author_id" uuid,
    "publisher" text,
    "publisher_image" text,
    "category" text,
    "source" text,
    "cover_image" text,
    "is_draft" boolean not null default true,
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."news" enable row level security;


  create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "recipient_id" uuid not null,
    "actor_id" uuid,
    "type" text not null,
    "title" text not null,
    "body" text,
    "data" jsonb not null default '{}'::jsonb,
    "link_type" text,
    "link_id" uuid,
    "read" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."notifications" enable row level security;

CREATE UNIQUE INDEX announcements_pkey ON public.announcements USING btree (id);

CREATE UNIQUE INDEX event_attendance_event_id_profile_id_key ON public.event_attendance USING btree (event_id, profile_id);

CREATE UNIQUE INDEX event_attendance_pkey ON public.event_attendance USING btree (id);

CREATE UNIQUE INDEX event_invites_event_id_profile_id_key ON public.event_invites USING btree (event_id, profile_id);

CREATE UNIQUE INDEX event_invites_pkey ON public.event_invites USING btree (id);

CREATE UNIQUE INDEX event_scopes_pkey ON public.event_scopes USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX hostel_photos_pkey ON public.hostel_photos USING btree (id);

CREATE UNIQUE INDEX hostels_pkey ON public.hostels USING btree (id);

CREATE INDEX idx_event_attendance_event_status ON public.event_attendance USING btree (event_id, status);

CREATE INDEX idx_event_attendance_profile_status ON public.event_attendance USING btree (profile_id, status);

CREATE INDEX idx_event_invites_event_id ON public.event_invites USING btree (event_id);

CREATE INDEX idx_event_invites_profile_id ON public.event_invites USING btree (profile_id);

CREATE INDEX idx_event_scopes_event_id ON public.event_scopes USING btree (event_id);

CREATE INDEX idx_event_scopes_type_value ON public.event_scopes USING btree (scope_type, scope_value);

CREATE INDEX idx_events_category_starts_at ON public.events USING btree (category, starts_at);

CREATE INDEX idx_events_organizer_id ON public.events USING btree (organizer_id);

CREATE INDEX idx_events_starts_at ON public.events USING btree (starts_at);

CREATE INDEX idx_events_visibility_starts_at ON public.events USING btree (visibility, starts_at);

CREATE INDEX idx_hostel_photos_hostel_position ON public.hostel_photos USING btree (hostel_id, "position");

CREATE UNIQUE INDEX idx_listing_fee_plans_name_currency ON public.listing_fee_plans USING btree (lower(name), currency);

CREATE UNIQUE INDEX idx_market_categories_name ON public.market_categories USING btree (lower(name));

CREATE INDEX idx_market_listing_variants_listing ON public.market_listing_variants USING btree (listing_id, is_active);

CREATE INDEX idx_market_listings_active_featured_created ON public.market_listings USING btree (is_active, is_featured, created_at DESC);

CREATE INDEX idx_market_listings_category_active ON public.market_listings USING btree (category_id, is_active);

CREATE INDEX idx_market_listings_seller ON public.market_listings USING btree (seller_id);

CREATE INDEX idx_market_photos_listing_position ON public.market_photos USING btree (listing_id, "position");

CREATE INDEX idx_notifications_recipient_created_at ON public.notifications USING btree (recipient_id, created_at DESC);

CREATE INDEX idx_notifications_recipient_unread ON public.notifications USING btree (recipient_id) WHERE (NOT read);

CREATE UNIQUE INDEX listing_fee_plans_pkey ON public.listing_fee_plans USING btree (id);

CREATE UNIQUE INDEX market_categories_pkey ON public.market_categories USING btree (id);

CREATE UNIQUE INDEX market_listing_variants_pkey ON public.market_listing_variants USING btree (id);

CREATE UNIQUE INDEX market_listings_pkey ON public.market_listings USING btree (id);

CREATE UNIQUE INDEX market_photos_pkey ON public.market_photos USING btree (id);

CREATE UNIQUE INDEX news_pkey ON public.news USING btree (id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

alter table "public"."announcements" add constraint "announcements_pkey" PRIMARY KEY using index "announcements_pkey";

alter table "public"."event_attendance" add constraint "event_attendance_pkey" PRIMARY KEY using index "event_attendance_pkey";

alter table "public"."event_invites" add constraint "event_invites_pkey" PRIMARY KEY using index "event_invites_pkey";

alter table "public"."event_scopes" add constraint "event_scopes_pkey" PRIMARY KEY using index "event_scopes_pkey";

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."hostel_photos" add constraint "hostel_photos_pkey" PRIMARY KEY using index "hostel_photos_pkey";

alter table "public"."hostels" add constraint "hostels_pkey" PRIMARY KEY using index "hostels_pkey";

alter table "public"."listing_fee_plans" add constraint "listing_fee_plans_pkey" PRIMARY KEY using index "listing_fee_plans_pkey";

alter table "public"."market_categories" add constraint "market_categories_pkey" PRIMARY KEY using index "market_categories_pkey";

alter table "public"."market_listing_variants" add constraint "market_listing_variants_pkey" PRIMARY KEY using index "market_listing_variants_pkey";

alter table "public"."market_listings" add constraint "market_listings_pkey" PRIMARY KEY using index "market_listings_pkey";

alter table "public"."market_photos" add constraint "market_photos_pkey" PRIMARY KEY using index "market_photos_pkey";

alter table "public"."news" add constraint "news_pkey" PRIMARY KEY using index "news_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."announcements" add constraint "announcements_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.profiles(id) not valid;

alter table "public"."announcements" validate constraint "announcements_author_id_fkey";

alter table "public"."event_attendance" add constraint "event_attendance_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."event_attendance" validate constraint "event_attendance_event_id_fkey";

alter table "public"."event_attendance" add constraint "event_attendance_event_id_profile_id_key" UNIQUE using index "event_attendance_event_id_profile_id_key";

alter table "public"."event_attendance" add constraint "event_attendance_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_attendance" validate constraint "event_attendance_profile_id_fkey";

alter table "public"."event_invites" add constraint "event_invites_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."event_invites" validate constraint "event_invites_event_id_fkey";

alter table "public"."event_invites" add constraint "event_invites_event_id_profile_id_key" UNIQUE using index "event_invites_event_id_profile_id_key";

alter table "public"."event_invites" add constraint "event_invites_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."event_invites" validate constraint "event_invites_profile_id_fkey";

alter table "public"."event_scopes" add constraint "event_scopes_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE not valid;

alter table "public"."event_scopes" validate constraint "event_scopes_event_id_fkey";

alter table "public"."events" add constraint "events_capacity_check" CHECK (((capacity IS NULL) OR (capacity >= 0))) not valid;

alter table "public"."events" validate constraint "events_capacity_check";

alter table "public"."events" add constraint "events_ends_after_start" CHECK (((ends_at IS NULL) OR (ends_at >= starts_at))) not valid;

alter table "public"."events" validate constraint "events_ends_after_start";

alter table "public"."events" add constraint "events_organizer_id_fkey" FOREIGN KEY (organizer_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."events" validate constraint "events_organizer_id_fkey";

alter table "public"."hostel_photos" add constraint "hostel_photos_hostel_id_fkey" FOREIGN KEY (hostel_id) REFERENCES public.hostels(id) ON DELETE CASCADE not valid;

alter table "public"."hostel_photos" validate constraint "hostel_photos_hostel_id_fkey";

alter table "public"."listing_fee_plans" add constraint "listing_fee_plans_featured_fee_check" CHECK ((featured_fee >= (0)::numeric)) not valid;

alter table "public"."listing_fee_plans" validate constraint "listing_fee_plans_featured_fee_check";

alter table "public"."listing_fee_plans" add constraint "listing_fee_plans_normal_fee_check" CHECK ((normal_fee >= (0)::numeric)) not valid;

alter table "public"."listing_fee_plans" validate constraint "listing_fee_plans_normal_fee_check";

alter table "public"."market_listing_variants" add constraint "market_listing_variants_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.market_listings(id) ON DELETE CASCADE not valid;

alter table "public"."market_listing_variants" validate constraint "market_listing_variants_listing_id_fkey";

alter table "public"."market_listings" add constraint "market_listings_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.market_categories(id) ON DELETE SET NULL not valid;

alter table "public"."market_listings" validate constraint "market_listings_category_id_fkey";

alter table "public"."market_listings" add constraint "market_listings_price_check" CHECK ((price >= (0)::numeric)) not valid;

alter table "public"."market_listings" validate constraint "market_listings_price_check";

alter table "public"."market_listings" add constraint "market_listings_seller_id_fkey" FOREIGN KEY (seller_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."market_listings" validate constraint "market_listings_seller_id_fkey";

alter table "public"."market_photos" add constraint "market_photos_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.market_listings(id) ON DELETE CASCADE not valid;

alter table "public"."market_photos" validate constraint "market_photos_listing_id_fkey";

alter table "public"."news" add constraint "news_author_id_fkey" FOREIGN KEY (author_id) REFERENCES public.profiles(id) not valid;

alter table "public"."news" validate constraint "news_author_id_fkey";

alter table "public"."notifications" add constraint "notifications_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES public.profiles(id) not valid;

alter table "public"."notifications" validate constraint "notifications_actor_id_fkey";

alter table "public"."notifications" add constraint "notifications_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) not valid;

alter table "public"."notifications" validate constraint "notifications_recipient_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.event_attendance_counters()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_delta_going      int := 0;
  v_delta_interested int := 0;
begin
  if tg_op = 'INSERT' then
    if new.status = 'going' then
      v_delta_going := 1;
    elsif new.status = 'interested' then
      v_delta_interested := 1;
    end if;

  elsif tg_op = 'UPDATE' then
    if old.status is distinct from new.status then
      -- Remove old
      if old.status = 'going' then
        v_delta_going := v_delta_going - 1;
      elsif old.status = 'interested' then
        v_delta_interested := v_delta_interested - 1;
      end if;

      -- Add new
      if new.status = 'going' then
        v_delta_going := v_delta_going + 1;
      elsif new.status = 'interested' then
        v_delta_interested := v_delta_interested + 1;
      end if;
    end if;

  elsif tg_op = 'DELETE' then
    if old.status = 'going' then
      v_delta_going := -1;
    elsif old.status = 'interested' then
      v_delta_interested := -1;
    end if;
  end if;

  if v_delta_going <> 0 or v_delta_interested <> 0 then
    update public.events e
    set
      going_count = greatest(coalesce(e.going_count, 0) + v_delta_going, 0),
      interested_count = greatest(coalesce(e.interested_count, 0) + v_delta_interested, 0)
    where e.id = coalesce(new.event_id, old.event_id);
  end if;

  if tg_op = 'DELETE' then
    return old;
  else
    return new;
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.hostel_photos_after_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_hostel_id uuid;
begin
  -- determine which hostel_id to refresh based on operation
  if (tg_op = 'DELETE') then
    v_hostel_id = old.hostel_id;
  else
    v_hostel_id = new.hostel_id;
  end if;

  perform public.refresh_hostel_hero_image(v_hostel_id);

  -- AFTER trigger, return appropriate row
  if (tg_op = 'DELETE') then
    return old;
  else
    return new;
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.market_photos_after_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_listing_id uuid;
begin
  if (tg_op = 'DELETE') then
    v_listing_id = old.listing_id;
  else
    v_listing_id = new.listing_id;
  end if;

  perform public.refresh_listing_hero_image(v_listing_id);

  if (tg_op = 'DELETE') then
    return old;
  else
    return new;
  end if;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.refresh_hostel_hero_image(p_hostel_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_path text;
begin
  -- pick the photo with the smallest position (and stable tie-breaker)
  select hp.storage_path
  into v_path
  from public.hostel_photos hp
  where hp.hostel_id = p_hostel_id
  order by hp.position asc, hp.created_at asc
  limit 1;

  update public.hostels h
  set hero_image_url = v_path,
      updated_at = now()
  where h.id = p_hostel_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.refresh_listing_hero_image(p_listing_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  v_path text;
begin
  select mp.storage_path
  into v_path
  from public.market_photos mp
  where mp.listing_id = p_listing_id
  order by mp.position asc, mp.created_at asc
  limit 1;

  update public.market_listings ml
  set hero_image_url = v_path,
      updated_at = now()
  where ml.id = p_listing_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  -- Insert a minimal profile row with default/null values
  insert into public.profiles (
    id,
    email,
    created_at,
    updated_at,
    completed
  )
  values (
    new.id,
    new.email,
    now(),
    now(),
    false     -- onboarding not completed by default
  )
  on conflict (id) do nothing; -- idempotent

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."announcements" to "anon";

grant insert on table "public"."announcements" to "anon";

grant references on table "public"."announcements" to "anon";

grant select on table "public"."announcements" to "anon";

grant trigger on table "public"."announcements" to "anon";

grant truncate on table "public"."announcements" to "anon";

grant update on table "public"."announcements" to "anon";

grant delete on table "public"."announcements" to "authenticated";

grant insert on table "public"."announcements" to "authenticated";

grant references on table "public"."announcements" to "authenticated";

grant select on table "public"."announcements" to "authenticated";

grant trigger on table "public"."announcements" to "authenticated";

grant truncate on table "public"."announcements" to "authenticated";

grant update on table "public"."announcements" to "authenticated";

grant delete on table "public"."announcements" to "postgres";

grant insert on table "public"."announcements" to "postgres";

grant references on table "public"."announcements" to "postgres";

grant select on table "public"."announcements" to "postgres";

grant trigger on table "public"."announcements" to "postgres";

grant truncate on table "public"."announcements" to "postgres";

grant update on table "public"."announcements" to "postgres";

grant delete on table "public"."announcements" to "service_role";

grant insert on table "public"."announcements" to "service_role";

grant references on table "public"."announcements" to "service_role";

grant select on table "public"."announcements" to "service_role";

grant trigger on table "public"."announcements" to "service_role";

grant truncate on table "public"."announcements" to "service_role";

grant update on table "public"."announcements" to "service_role";

grant delete on table "public"."departments" to "postgres";

grant insert on table "public"."departments" to "postgres";

grant references on table "public"."departments" to "postgres";

grant select on table "public"."departments" to "postgres";

grant trigger on table "public"."departments" to "postgres";

grant truncate on table "public"."departments" to "postgres";

grant update on table "public"."departments" to "postgres";

grant delete on table "public"."event_attendance" to "anon";

grant insert on table "public"."event_attendance" to "anon";

grant references on table "public"."event_attendance" to "anon";

grant select on table "public"."event_attendance" to "anon";

grant trigger on table "public"."event_attendance" to "anon";

grant truncate on table "public"."event_attendance" to "anon";

grant update on table "public"."event_attendance" to "anon";

grant delete on table "public"."event_attendance" to "authenticated";

grant insert on table "public"."event_attendance" to "authenticated";

grant references on table "public"."event_attendance" to "authenticated";

grant select on table "public"."event_attendance" to "authenticated";

grant trigger on table "public"."event_attendance" to "authenticated";

grant truncate on table "public"."event_attendance" to "authenticated";

grant update on table "public"."event_attendance" to "authenticated";

grant delete on table "public"."event_attendance" to "postgres";

grant insert on table "public"."event_attendance" to "postgres";

grant references on table "public"."event_attendance" to "postgres";

grant select on table "public"."event_attendance" to "postgres";

grant trigger on table "public"."event_attendance" to "postgres";

grant truncate on table "public"."event_attendance" to "postgres";

grant update on table "public"."event_attendance" to "postgres";

grant delete on table "public"."event_attendance" to "service_role";

grant insert on table "public"."event_attendance" to "service_role";

grant references on table "public"."event_attendance" to "service_role";

grant select on table "public"."event_attendance" to "service_role";

grant trigger on table "public"."event_attendance" to "service_role";

grant truncate on table "public"."event_attendance" to "service_role";

grant update on table "public"."event_attendance" to "service_role";

grant delete on table "public"."event_invites" to "anon";

grant insert on table "public"."event_invites" to "anon";

grant references on table "public"."event_invites" to "anon";

grant select on table "public"."event_invites" to "anon";

grant trigger on table "public"."event_invites" to "anon";

grant truncate on table "public"."event_invites" to "anon";

grant update on table "public"."event_invites" to "anon";

grant delete on table "public"."event_invites" to "authenticated";

grant insert on table "public"."event_invites" to "authenticated";

grant references on table "public"."event_invites" to "authenticated";

grant select on table "public"."event_invites" to "authenticated";

grant trigger on table "public"."event_invites" to "authenticated";

grant truncate on table "public"."event_invites" to "authenticated";

grant update on table "public"."event_invites" to "authenticated";

grant delete on table "public"."event_invites" to "postgres";

grant insert on table "public"."event_invites" to "postgres";

grant references on table "public"."event_invites" to "postgres";

grant select on table "public"."event_invites" to "postgres";

grant trigger on table "public"."event_invites" to "postgres";

grant truncate on table "public"."event_invites" to "postgres";

grant update on table "public"."event_invites" to "postgres";

grant delete on table "public"."event_invites" to "service_role";

grant insert on table "public"."event_invites" to "service_role";

grant references on table "public"."event_invites" to "service_role";

grant select on table "public"."event_invites" to "service_role";

grant trigger on table "public"."event_invites" to "service_role";

grant truncate on table "public"."event_invites" to "service_role";

grant update on table "public"."event_invites" to "service_role";

grant delete on table "public"."event_scopes" to "anon";

grant insert on table "public"."event_scopes" to "anon";

grant references on table "public"."event_scopes" to "anon";

grant select on table "public"."event_scopes" to "anon";

grant trigger on table "public"."event_scopes" to "anon";

grant truncate on table "public"."event_scopes" to "anon";

grant update on table "public"."event_scopes" to "anon";

grant delete on table "public"."event_scopes" to "authenticated";

grant insert on table "public"."event_scopes" to "authenticated";

grant references on table "public"."event_scopes" to "authenticated";

grant select on table "public"."event_scopes" to "authenticated";

grant trigger on table "public"."event_scopes" to "authenticated";

grant truncate on table "public"."event_scopes" to "authenticated";

grant update on table "public"."event_scopes" to "authenticated";

grant delete on table "public"."event_scopes" to "postgres";

grant insert on table "public"."event_scopes" to "postgres";

grant references on table "public"."event_scopes" to "postgres";

grant select on table "public"."event_scopes" to "postgres";

grant trigger on table "public"."event_scopes" to "postgres";

grant truncate on table "public"."event_scopes" to "postgres";

grant update on table "public"."event_scopes" to "postgres";

grant delete on table "public"."event_scopes" to "service_role";

grant insert on table "public"."event_scopes" to "service_role";

grant references on table "public"."event_scopes" to "service_role";

grant select on table "public"."event_scopes" to "service_role";

grant trigger on table "public"."event_scopes" to "service_role";

grant truncate on table "public"."event_scopes" to "service_role";

grant update on table "public"."event_scopes" to "service_role";

grant delete on table "public"."events" to "anon";

grant insert on table "public"."events" to "anon";

grant references on table "public"."events" to "anon";

grant select on table "public"."events" to "anon";

grant trigger on table "public"."events" to "anon";

grant truncate on table "public"."events" to "anon";

grant update on table "public"."events" to "anon";

grant delete on table "public"."events" to "authenticated";

grant insert on table "public"."events" to "authenticated";

grant references on table "public"."events" to "authenticated";

grant select on table "public"."events" to "authenticated";

grant trigger on table "public"."events" to "authenticated";

grant truncate on table "public"."events" to "authenticated";

grant update on table "public"."events" to "authenticated";

grant delete on table "public"."events" to "postgres";

grant insert on table "public"."events" to "postgres";

grant references on table "public"."events" to "postgres";

grant select on table "public"."events" to "postgres";

grant trigger on table "public"."events" to "postgres";

grant truncate on table "public"."events" to "postgres";

grant update on table "public"."events" to "postgres";

grant delete on table "public"."events" to "service_role";

grant insert on table "public"."events" to "service_role";

grant references on table "public"."events" to "service_role";

grant select on table "public"."events" to "service_role";

grant trigger on table "public"."events" to "service_role";

grant truncate on table "public"."events" to "service_role";

grant update on table "public"."events" to "service_role";

grant delete on table "public"."faculties" to "postgres";

grant insert on table "public"."faculties" to "postgres";

grant references on table "public"."faculties" to "postgres";

grant select on table "public"."faculties" to "postgres";

grant trigger on table "public"."faculties" to "postgres";

grant truncate on table "public"."faculties" to "postgres";

grant update on table "public"."faculties" to "postgres";

grant delete on table "public"."hostel_photos" to "anon";

grant insert on table "public"."hostel_photos" to "anon";

grant references on table "public"."hostel_photos" to "anon";

grant select on table "public"."hostel_photos" to "anon";

grant trigger on table "public"."hostel_photos" to "anon";

grant truncate on table "public"."hostel_photos" to "anon";

grant update on table "public"."hostel_photos" to "anon";

grant delete on table "public"."hostel_photos" to "authenticated";

grant insert on table "public"."hostel_photos" to "authenticated";

grant references on table "public"."hostel_photos" to "authenticated";

grant select on table "public"."hostel_photos" to "authenticated";

grant trigger on table "public"."hostel_photos" to "authenticated";

grant truncate on table "public"."hostel_photos" to "authenticated";

grant update on table "public"."hostel_photos" to "authenticated";

grant delete on table "public"."hostel_photos" to "postgres";

grant insert on table "public"."hostel_photos" to "postgres";

grant references on table "public"."hostel_photos" to "postgres";

grant select on table "public"."hostel_photos" to "postgres";

grant trigger on table "public"."hostel_photos" to "postgres";

grant truncate on table "public"."hostel_photos" to "postgres";

grant update on table "public"."hostel_photos" to "postgres";

grant delete on table "public"."hostel_photos" to "service_role";

grant insert on table "public"."hostel_photos" to "service_role";

grant references on table "public"."hostel_photos" to "service_role";

grant select on table "public"."hostel_photos" to "service_role";

grant trigger on table "public"."hostel_photos" to "service_role";

grant truncate on table "public"."hostel_photos" to "service_role";

grant update on table "public"."hostel_photos" to "service_role";

grant delete on table "public"."hostels" to "anon";

grant insert on table "public"."hostels" to "anon";

grant references on table "public"."hostels" to "anon";

grant select on table "public"."hostels" to "anon";

grant trigger on table "public"."hostels" to "anon";

grant truncate on table "public"."hostels" to "anon";

grant update on table "public"."hostels" to "anon";

grant delete on table "public"."hostels" to "authenticated";

grant insert on table "public"."hostels" to "authenticated";

grant references on table "public"."hostels" to "authenticated";

grant select on table "public"."hostels" to "authenticated";

grant trigger on table "public"."hostels" to "authenticated";

grant truncate on table "public"."hostels" to "authenticated";

grant update on table "public"."hostels" to "authenticated";

grant delete on table "public"."hostels" to "postgres";

grant insert on table "public"."hostels" to "postgres";

grant references on table "public"."hostels" to "postgres";

grant select on table "public"."hostels" to "postgres";

grant trigger on table "public"."hostels" to "postgres";

grant truncate on table "public"."hostels" to "postgres";

grant update on table "public"."hostels" to "postgres";

grant delete on table "public"."hostels" to "service_role";

grant insert on table "public"."hostels" to "service_role";

grant references on table "public"."hostels" to "service_role";

grant select on table "public"."hostels" to "service_role";

grant trigger on table "public"."hostels" to "service_role";

grant truncate on table "public"."hostels" to "service_role";

grant update on table "public"."hostels" to "service_role";

grant delete on table "public"."listing_fee_plans" to "anon";

grant insert on table "public"."listing_fee_plans" to "anon";

grant references on table "public"."listing_fee_plans" to "anon";

grant select on table "public"."listing_fee_plans" to "anon";

grant trigger on table "public"."listing_fee_plans" to "anon";

grant truncate on table "public"."listing_fee_plans" to "anon";

grant update on table "public"."listing_fee_plans" to "anon";

grant delete on table "public"."listing_fee_plans" to "authenticated";

grant insert on table "public"."listing_fee_plans" to "authenticated";

grant references on table "public"."listing_fee_plans" to "authenticated";

grant select on table "public"."listing_fee_plans" to "authenticated";

grant trigger on table "public"."listing_fee_plans" to "authenticated";

grant truncate on table "public"."listing_fee_plans" to "authenticated";

grant update on table "public"."listing_fee_plans" to "authenticated";

grant delete on table "public"."listing_fee_plans" to "postgres";

grant insert on table "public"."listing_fee_plans" to "postgres";

grant references on table "public"."listing_fee_plans" to "postgres";

grant select on table "public"."listing_fee_plans" to "postgres";

grant trigger on table "public"."listing_fee_plans" to "postgres";

grant truncate on table "public"."listing_fee_plans" to "postgres";

grant update on table "public"."listing_fee_plans" to "postgres";

grant delete on table "public"."listing_fee_plans" to "service_role";

grant insert on table "public"."listing_fee_plans" to "service_role";

grant references on table "public"."listing_fee_plans" to "service_role";

grant select on table "public"."listing_fee_plans" to "service_role";

grant trigger on table "public"."listing_fee_plans" to "service_role";

grant truncate on table "public"."listing_fee_plans" to "service_role";

grant update on table "public"."listing_fee_plans" to "service_role";

grant delete on table "public"."market_categories" to "anon";

grant insert on table "public"."market_categories" to "anon";

grant references on table "public"."market_categories" to "anon";

grant select on table "public"."market_categories" to "anon";

grant trigger on table "public"."market_categories" to "anon";

grant truncate on table "public"."market_categories" to "anon";

grant update on table "public"."market_categories" to "anon";

grant delete on table "public"."market_categories" to "authenticated";

grant insert on table "public"."market_categories" to "authenticated";

grant references on table "public"."market_categories" to "authenticated";

grant select on table "public"."market_categories" to "authenticated";

grant trigger on table "public"."market_categories" to "authenticated";

grant truncate on table "public"."market_categories" to "authenticated";

grant update on table "public"."market_categories" to "authenticated";

grant delete on table "public"."market_categories" to "postgres";

grant insert on table "public"."market_categories" to "postgres";

grant references on table "public"."market_categories" to "postgres";

grant select on table "public"."market_categories" to "postgres";

grant trigger on table "public"."market_categories" to "postgres";

grant truncate on table "public"."market_categories" to "postgres";

grant update on table "public"."market_categories" to "postgres";

grant delete on table "public"."market_categories" to "service_role";

grant insert on table "public"."market_categories" to "service_role";

grant references on table "public"."market_categories" to "service_role";

grant select on table "public"."market_categories" to "service_role";

grant trigger on table "public"."market_categories" to "service_role";

grant truncate on table "public"."market_categories" to "service_role";

grant update on table "public"."market_categories" to "service_role";

grant delete on table "public"."market_listing_variants" to "anon";

grant insert on table "public"."market_listing_variants" to "anon";

grant references on table "public"."market_listing_variants" to "anon";

grant select on table "public"."market_listing_variants" to "anon";

grant trigger on table "public"."market_listing_variants" to "anon";

grant truncate on table "public"."market_listing_variants" to "anon";

grant update on table "public"."market_listing_variants" to "anon";

grant delete on table "public"."market_listing_variants" to "authenticated";

grant insert on table "public"."market_listing_variants" to "authenticated";

grant references on table "public"."market_listing_variants" to "authenticated";

grant select on table "public"."market_listing_variants" to "authenticated";

grant trigger on table "public"."market_listing_variants" to "authenticated";

grant truncate on table "public"."market_listing_variants" to "authenticated";

grant update on table "public"."market_listing_variants" to "authenticated";

grant delete on table "public"."market_listing_variants" to "postgres";

grant insert on table "public"."market_listing_variants" to "postgres";

grant references on table "public"."market_listing_variants" to "postgres";

grant select on table "public"."market_listing_variants" to "postgres";

grant trigger on table "public"."market_listing_variants" to "postgres";

grant truncate on table "public"."market_listing_variants" to "postgres";

grant update on table "public"."market_listing_variants" to "postgres";

grant delete on table "public"."market_listing_variants" to "service_role";

grant insert on table "public"."market_listing_variants" to "service_role";

grant references on table "public"."market_listing_variants" to "service_role";

grant select on table "public"."market_listing_variants" to "service_role";

grant trigger on table "public"."market_listing_variants" to "service_role";

grant truncate on table "public"."market_listing_variants" to "service_role";

grant update on table "public"."market_listing_variants" to "service_role";

grant delete on table "public"."market_listings" to "anon";

grant insert on table "public"."market_listings" to "anon";

grant references on table "public"."market_listings" to "anon";

grant select on table "public"."market_listings" to "anon";

grant trigger on table "public"."market_listings" to "anon";

grant truncate on table "public"."market_listings" to "anon";

grant update on table "public"."market_listings" to "anon";

grant delete on table "public"."market_listings" to "authenticated";

grant insert on table "public"."market_listings" to "authenticated";

grant references on table "public"."market_listings" to "authenticated";

grant select on table "public"."market_listings" to "authenticated";

grant trigger on table "public"."market_listings" to "authenticated";

grant truncate on table "public"."market_listings" to "authenticated";

grant update on table "public"."market_listings" to "authenticated";

grant delete on table "public"."market_listings" to "postgres";

grant insert on table "public"."market_listings" to "postgres";

grant references on table "public"."market_listings" to "postgres";

grant select on table "public"."market_listings" to "postgres";

grant trigger on table "public"."market_listings" to "postgres";

grant truncate on table "public"."market_listings" to "postgres";

grant update on table "public"."market_listings" to "postgres";

grant delete on table "public"."market_listings" to "service_role";

grant insert on table "public"."market_listings" to "service_role";

grant references on table "public"."market_listings" to "service_role";

grant select on table "public"."market_listings" to "service_role";

grant trigger on table "public"."market_listings" to "service_role";

grant truncate on table "public"."market_listings" to "service_role";

grant update on table "public"."market_listings" to "service_role";

grant delete on table "public"."market_photos" to "anon";

grant insert on table "public"."market_photos" to "anon";

grant references on table "public"."market_photos" to "anon";

grant select on table "public"."market_photos" to "anon";

grant trigger on table "public"."market_photos" to "anon";

grant truncate on table "public"."market_photos" to "anon";

grant update on table "public"."market_photos" to "anon";

grant delete on table "public"."market_photos" to "authenticated";

grant insert on table "public"."market_photos" to "authenticated";

grant references on table "public"."market_photos" to "authenticated";

grant select on table "public"."market_photos" to "authenticated";

grant trigger on table "public"."market_photos" to "authenticated";

grant truncate on table "public"."market_photos" to "authenticated";

grant update on table "public"."market_photos" to "authenticated";

grant delete on table "public"."market_photos" to "postgres";

grant insert on table "public"."market_photos" to "postgres";

grant references on table "public"."market_photos" to "postgres";

grant select on table "public"."market_photos" to "postgres";

grant trigger on table "public"."market_photos" to "postgres";

grant truncate on table "public"."market_photos" to "postgres";

grant update on table "public"."market_photos" to "postgres";

grant delete on table "public"."market_photos" to "service_role";

grant insert on table "public"."market_photos" to "service_role";

grant references on table "public"."market_photos" to "service_role";

grant select on table "public"."market_photos" to "service_role";

grant trigger on table "public"."market_photos" to "service_role";

grant truncate on table "public"."market_photos" to "service_role";

grant update on table "public"."market_photos" to "service_role";

grant delete on table "public"."news" to "anon";

grant insert on table "public"."news" to "anon";

grant references on table "public"."news" to "anon";

grant select on table "public"."news" to "anon";

grant trigger on table "public"."news" to "anon";

grant truncate on table "public"."news" to "anon";

grant update on table "public"."news" to "anon";

grant delete on table "public"."news" to "authenticated";

grant insert on table "public"."news" to "authenticated";

grant references on table "public"."news" to "authenticated";

grant select on table "public"."news" to "authenticated";

grant trigger on table "public"."news" to "authenticated";

grant truncate on table "public"."news" to "authenticated";

grant update on table "public"."news" to "authenticated";

grant delete on table "public"."news" to "postgres";

grant insert on table "public"."news" to "postgres";

grant references on table "public"."news" to "postgres";

grant select on table "public"."news" to "postgres";

grant trigger on table "public"."news" to "postgres";

grant truncate on table "public"."news" to "postgres";

grant update on table "public"."news" to "postgres";

grant delete on table "public"."news" to "service_role";

grant insert on table "public"."news" to "service_role";

grant references on table "public"."news" to "service_role";

grant select on table "public"."news" to "service_role";

grant trigger on table "public"."news" to "service_role";

grant truncate on table "public"."news" to "service_role";

grant update on table "public"."news" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "postgres";

grant insert on table "public"."notifications" to "postgres";

grant references on table "public"."notifications" to "postgres";

grant select on table "public"."notifications" to "postgres";

grant trigger on table "public"."notifications" to "postgres";

grant truncate on table "public"."notifications" to "postgres";

grant update on table "public"."notifications" to "postgres";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."programs" to "postgres";

grant insert on table "public"."programs" to "postgres";

grant references on table "public"."programs" to "postgres";

grant select on table "public"."programs" to "postgres";

grant trigger on table "public"."programs" to "postgres";

grant truncate on table "public"."programs" to "postgres";

grant update on table "public"."programs" to "postgres";


  create policy "Enable read access for all auth users"
  on "public"."announcements"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."event_attendance"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all auth users"
  on "public"."event_attendance"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all  auth users"
  on "public"."events"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all auth users"
  on "public"."hostel_photos"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all auth users"
  on "public"."hostels"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all auth users"
  on "public"."market_categories"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."market_listing_variants"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."market_listing_variants"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for  auth users"
  on "public"."market_listings"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all auth users"
  on "public"."market_photos"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all auth users"
  on "public"."news"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all users"
  on "public"."notifications"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Select departments (authenticated)"
  on "public"."departments"
  as permissive
  for select
  to public
using (true);



  create policy "Select faculties (authenticated)"
  on "public"."faculties"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all auth users"
  on "public"."programs"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER set_announcement_updated_at AFTER UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_event_attendance_counters_aiud AFTER INSERT OR DELETE OR UPDATE ON public.event_attendance FOR EACH ROW EXECUTE FUNCTION public.event_attendance_counters();

CREATE TRIGGER trg_event_attendance_set_updated_at BEFORE UPDATE ON public.event_attendance FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_event_invites_set_updated_at BEFORE UPDATE ON public.event_invites FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_event_scopes_set_updated_at BEFORE UPDATE ON public.event_scopes FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_events_set_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_hostel_photos_after_change AFTER INSERT OR DELETE OR UPDATE ON public.hostel_photos FOR EACH ROW EXECUTE FUNCTION public.hostel_photos_after_change();

CREATE TRIGGER trg_market_listing_variants_set_updated_at BEFORE UPDATE ON public.market_listing_variants FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_market_listings_set_updated_at BEFORE UPDATE ON public.market_listings FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_market_photos_after_change AFTER INSERT OR DELETE OR UPDATE ON public.market_photos FOR EACH ROW EXECUTE FUNCTION public.market_photos_after_change();





