create type "public"."feedback_type" as enum ('suggestion', 'bug', 'compliment', 'complaint');


  create table "public"."feedback" (
    "id" uuid not null default gen_random_uuid(),
    "profile_id" uuid,
    "type" public.feedback_type not null,
    "category" text not null,
    "rating" smallint,
    "message" text not null,
    "is_anonymous" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."feedback" enable row level security;


  create table "public"."listing_payments" (
    "id" uuid not null default gen_random_uuid(),
    "payment_id" uuid not null,
    "listing_id" uuid,
    "submission_id" uuid,
    "placement_type" text not null default 'normal'::text,
    "is_featured" boolean not null default false,
    "fee_amount" numeric(12,2) not null,
    "fee_currency" text not null default 'GHS'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."listing_payments" enable row level security;


  create table "public"."listing_submissions" (
    "id" uuid not null default gen_random_uuid(),
    "submitter_id" uuid,
    "title" text not null,
    "description" text,
    "price" numeric(12,2) not null,
    "currency" character(3) not null default 'GHS'::bpchar,
    "category_id" uuid,
    "stock_qty" integer,
    "condition" text,
    "placement_type" text not null default 'normal'::text,
    "call_contact" text,
    "whatsapp_contact" text,
    "photos" jsonb not null default '[]'::jsonb,
    "fee_plan_id" uuid,
    "status" public.listing_submission_status not null default 'submitted'::public.listing_submission_status,
    "approved_by" uuid,
    "approved_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "reference_code" text
      );


alter table "public"."listing_submissions" enable row level security;


  create table "public"."payments" (
    "id" uuid not null default gen_random_uuid(),
    "profile_id" uuid,
    "amount" numeric(12,2) not null,
    "currency" text not null default 'GHS'::text,
    "provider" text,
    "provider_payment_id" text,
    "status" text not null default 'pending'::text,
    "type" text not null,
    "metadata" jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."payments" enable row level security;


  create table "public"."temp_representatives" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "position" text not null,
    "bio" text not null default ''::text,
    "image_url" text,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."temp_representatives" enable row level security;

CREATE UNIQUE INDEX feedback_pkey ON public.feedback USING btree (id);

CREATE INDEX idx_listing_submissions_status ON public.listing_submissions USING btree (status, created_at DESC);

CREATE INDEX idx_listing_submissions_submitter ON public.listing_submissions USING btree (submitter_id);

CREATE INDEX idx_payments_profile ON public.payments USING btree (profile_id);

CREATE UNIQUE INDEX listing_payments_pkey ON public.listing_payments USING btree (id);

CREATE UNIQUE INDEX listing_submissions_pkey ON public.listing_submissions USING btree (id);

CREATE UNIQUE INDEX listing_submissions_reference_code_key ON public.listing_submissions USING btree (reference_code);

CREATE UNIQUE INDEX payments_pkey ON public.payments USING btree (id);

CREATE UNIQUE INDEX temp_representatives_pkey ON public.temp_representatives USING btree (id);

alter table "public"."feedback" add constraint "feedback_pkey" PRIMARY KEY using index "feedback_pkey";

alter table "public"."listing_payments" add constraint "listing_payments_pkey" PRIMARY KEY using index "listing_payments_pkey";

alter table "public"."listing_submissions" add constraint "listing_submissions_pkey" PRIMARY KEY using index "listing_submissions_pkey";

alter table "public"."payments" add constraint "payments_pkey" PRIMARY KEY using index "payments_pkey";

alter table "public"."temp_representatives" add constraint "temp_representatives_pkey" PRIMARY KEY using index "temp_representatives_pkey";

alter table "public"."feedback" add constraint "feedback_message_check" CHECK (((char_length(message) >= 10) AND (char_length(message) <= 1000))) not valid;

alter table "public"."feedback" validate constraint "feedback_message_check";

alter table "public"."feedback" add constraint "feedback_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."feedback" validate constraint "feedback_profile_id_fkey";

alter table "public"."feedback" add constraint "feedback_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."feedback" validate constraint "feedback_rating_check";

alter table "public"."listing_payments" add constraint "listing_payments_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES public.market_listings(id) ON DELETE SET NULL not valid;

alter table "public"."listing_payments" validate constraint "listing_payments_listing_id_fkey";

alter table "public"."listing_payments" add constraint "listing_payments_payment_id_fkey" FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE CASCADE not valid;

alter table "public"."listing_payments" validate constraint "listing_payments_payment_id_fkey";

alter table "public"."listing_payments" add constraint "listing_payments_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES public.listing_submissions(id) ON DELETE SET NULL not valid;

alter table "public"."listing_payments" validate constraint "listing_payments_submission_id_fkey";

alter table "public"."listing_submissions" add constraint "listing_submissions_approved_by_fkey" FOREIGN KEY (approved_by) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."listing_submissions" validate constraint "listing_submissions_approved_by_fkey";

alter table "public"."listing_submissions" add constraint "listing_submissions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public.market_categories(id) ON DELETE SET NULL not valid;

alter table "public"."listing_submissions" validate constraint "listing_submissions_category_id_fkey";

alter table "public"."listing_submissions" add constraint "listing_submissions_fee_plan_id_fkey" FOREIGN KEY (fee_plan_id) REFERENCES public.listing_fee_plans(id) ON DELETE SET NULL not valid;

alter table "public"."listing_submissions" validate constraint "listing_submissions_fee_plan_id_fkey";

alter table "public"."listing_submissions" add constraint "listing_submissions_price_check" CHECK ((price >= (0)::numeric)) not valid;

alter table "public"."listing_submissions" validate constraint "listing_submissions_price_check";

alter table "public"."listing_submissions" add constraint "listing_submissions_reference_code_key" UNIQUE using index "listing_submissions_reference_code_key";

alter table "public"."listing_submissions" add constraint "listing_submissions_submitter_id_fkey" FOREIGN KEY (submitter_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."listing_submissions" validate constraint "listing_submissions_submitter_id_fkey";

alter table "public"."payments" add constraint "payments_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."payments" validate constraint "payments_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.generate_submission_reference_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
  BEGIN
    NEW.reference_code := UPPER(SUBSTRING(REPLACE(NEW.id::text, '-', ''), 1, 8));
    RETURN NEW;
  END;
  $function$
;

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

grant delete on table "public"."announcements" to "postgres";

grant insert on table "public"."announcements" to "postgres";

grant references on table "public"."announcements" to "postgres";

grant select on table "public"."announcements" to "postgres";

grant trigger on table "public"."announcements" to "postgres";

grant truncate on table "public"."announcements" to "postgres";

grant update on table "public"."announcements" to "postgres";

grant delete on table "public"."departments" to "postgres";

grant insert on table "public"."departments" to "postgres";

grant references on table "public"."departments" to "postgres";

grant select on table "public"."departments" to "postgres";

grant trigger on table "public"."departments" to "postgres";

grant truncate on table "public"."departments" to "postgres";

grant update on table "public"."departments" to "postgres";

grant delete on table "public"."event_attendance" to "postgres";

grant insert on table "public"."event_attendance" to "postgres";

grant references on table "public"."event_attendance" to "postgres";

grant select on table "public"."event_attendance" to "postgres";

grant trigger on table "public"."event_attendance" to "postgres";

grant truncate on table "public"."event_attendance" to "postgres";

grant update on table "public"."event_attendance" to "postgres";

grant delete on table "public"."event_invites" to "postgres";

grant insert on table "public"."event_invites" to "postgres";

grant references on table "public"."event_invites" to "postgres";

grant select on table "public"."event_invites" to "postgres";

grant trigger on table "public"."event_invites" to "postgres";

grant truncate on table "public"."event_invites" to "postgres";

grant update on table "public"."event_invites" to "postgres";

grant delete on table "public"."event_scopes" to "postgres";

grant insert on table "public"."event_scopes" to "postgres";

grant references on table "public"."event_scopes" to "postgres";

grant select on table "public"."event_scopes" to "postgres";

grant trigger on table "public"."event_scopes" to "postgres";

grant truncate on table "public"."event_scopes" to "postgres";

grant update on table "public"."event_scopes" to "postgres";

grant delete on table "public"."events" to "postgres";

grant insert on table "public"."events" to "postgres";

grant references on table "public"."events" to "postgres";

grant select on table "public"."events" to "postgres";

grant trigger on table "public"."events" to "postgres";

grant truncate on table "public"."events" to "postgres";

grant update on table "public"."events" to "postgres";

grant delete on table "public"."faculties" to "postgres";

grant insert on table "public"."faculties" to "postgres";

grant references on table "public"."faculties" to "postgres";

grant select on table "public"."faculties" to "postgres";

grant trigger on table "public"."faculties" to "postgres";

grant truncate on table "public"."faculties" to "postgres";

grant update on table "public"."faculties" to "postgres";

grant delete on table "public"."feedback" to "anon";

grant insert on table "public"."feedback" to "anon";

grant references on table "public"."feedback" to "anon";

grant select on table "public"."feedback" to "anon";

grant trigger on table "public"."feedback" to "anon";

grant truncate on table "public"."feedback" to "anon";

grant update on table "public"."feedback" to "anon";

grant delete on table "public"."feedback" to "authenticated";

grant insert on table "public"."feedback" to "authenticated";

grant references on table "public"."feedback" to "authenticated";

grant select on table "public"."feedback" to "authenticated";

grant trigger on table "public"."feedback" to "authenticated";

grant truncate on table "public"."feedback" to "authenticated";

grant update on table "public"."feedback" to "authenticated";

grant delete on table "public"."feedback" to "postgres";

grant insert on table "public"."feedback" to "postgres";

grant references on table "public"."feedback" to "postgres";

grant select on table "public"."feedback" to "postgres";

grant trigger on table "public"."feedback" to "postgres";

grant truncate on table "public"."feedback" to "postgres";

grant update on table "public"."feedback" to "postgres";

grant delete on table "public"."feedback" to "service_role";

grant insert on table "public"."feedback" to "service_role";

grant references on table "public"."feedback" to "service_role";

grant select on table "public"."feedback" to "service_role";

grant trigger on table "public"."feedback" to "service_role";

grant truncate on table "public"."feedback" to "service_role";

grant update on table "public"."feedback" to "service_role";

grant delete on table "public"."hostel_photos" to "postgres";

grant insert on table "public"."hostel_photos" to "postgres";

grant references on table "public"."hostel_photos" to "postgres";

grant select on table "public"."hostel_photos" to "postgres";

grant trigger on table "public"."hostel_photos" to "postgres";

grant truncate on table "public"."hostel_photos" to "postgres";

grant update on table "public"."hostel_photos" to "postgres";

grant delete on table "public"."hostels" to "postgres";

grant insert on table "public"."hostels" to "postgres";

grant references on table "public"."hostels" to "postgres";

grant select on table "public"."hostels" to "postgres";

grant trigger on table "public"."hostels" to "postgres";

grant truncate on table "public"."hostels" to "postgres";

grant update on table "public"."hostels" to "postgres";

grant delete on table "public"."listing_fee_plans" to "postgres";

grant insert on table "public"."listing_fee_plans" to "postgres";

grant references on table "public"."listing_fee_plans" to "postgres";

grant select on table "public"."listing_fee_plans" to "postgres";

grant trigger on table "public"."listing_fee_plans" to "postgres";

grant truncate on table "public"."listing_fee_plans" to "postgres";

grant update on table "public"."listing_fee_plans" to "postgres";

grant delete on table "public"."listing_payments" to "anon";

grant insert on table "public"."listing_payments" to "anon";

grant references on table "public"."listing_payments" to "anon";

grant select on table "public"."listing_payments" to "anon";

grant trigger on table "public"."listing_payments" to "anon";

grant truncate on table "public"."listing_payments" to "anon";

grant update on table "public"."listing_payments" to "anon";

grant delete on table "public"."listing_payments" to "authenticated";

grant insert on table "public"."listing_payments" to "authenticated";

grant references on table "public"."listing_payments" to "authenticated";

grant select on table "public"."listing_payments" to "authenticated";

grant trigger on table "public"."listing_payments" to "authenticated";

grant truncate on table "public"."listing_payments" to "authenticated";

grant update on table "public"."listing_payments" to "authenticated";

grant delete on table "public"."listing_payments" to "postgres";

grant insert on table "public"."listing_payments" to "postgres";

grant references on table "public"."listing_payments" to "postgres";

grant select on table "public"."listing_payments" to "postgres";

grant trigger on table "public"."listing_payments" to "postgres";

grant truncate on table "public"."listing_payments" to "postgres";

grant update on table "public"."listing_payments" to "postgres";

grant delete on table "public"."listing_payments" to "service_role";

grant insert on table "public"."listing_payments" to "service_role";

grant references on table "public"."listing_payments" to "service_role";

grant select on table "public"."listing_payments" to "service_role";

grant trigger on table "public"."listing_payments" to "service_role";

grant truncate on table "public"."listing_payments" to "service_role";

grant update on table "public"."listing_payments" to "service_role";

grant delete on table "public"."listing_submissions" to "anon";

grant insert on table "public"."listing_submissions" to "anon";

grant references on table "public"."listing_submissions" to "anon";

grant select on table "public"."listing_submissions" to "anon";

grant trigger on table "public"."listing_submissions" to "anon";

grant truncate on table "public"."listing_submissions" to "anon";

grant update on table "public"."listing_submissions" to "anon";

grant delete on table "public"."listing_submissions" to "authenticated";

grant insert on table "public"."listing_submissions" to "authenticated";

grant references on table "public"."listing_submissions" to "authenticated";

grant select on table "public"."listing_submissions" to "authenticated";

grant trigger on table "public"."listing_submissions" to "authenticated";

grant truncate on table "public"."listing_submissions" to "authenticated";

grant update on table "public"."listing_submissions" to "authenticated";

grant delete on table "public"."listing_submissions" to "postgres";

grant insert on table "public"."listing_submissions" to "postgres";

grant references on table "public"."listing_submissions" to "postgres";

grant select on table "public"."listing_submissions" to "postgres";

grant trigger on table "public"."listing_submissions" to "postgres";

grant truncate on table "public"."listing_submissions" to "postgres";

grant update on table "public"."listing_submissions" to "postgres";

grant delete on table "public"."listing_submissions" to "service_role";

grant insert on table "public"."listing_submissions" to "service_role";

grant references on table "public"."listing_submissions" to "service_role";

grant select on table "public"."listing_submissions" to "service_role";

grant trigger on table "public"."listing_submissions" to "service_role";

grant truncate on table "public"."listing_submissions" to "service_role";

grant update on table "public"."listing_submissions" to "service_role";

grant delete on table "public"."market_categories" to "postgres";

grant insert on table "public"."market_categories" to "postgres";

grant references on table "public"."market_categories" to "postgres";

grant select on table "public"."market_categories" to "postgres";

grant trigger on table "public"."market_categories" to "postgres";

grant truncate on table "public"."market_categories" to "postgres";

grant update on table "public"."market_categories" to "postgres";

grant delete on table "public"."market_listing_variants" to "postgres";

grant insert on table "public"."market_listing_variants" to "postgres";

grant references on table "public"."market_listing_variants" to "postgres";

grant select on table "public"."market_listing_variants" to "postgres";

grant trigger on table "public"."market_listing_variants" to "postgres";

grant truncate on table "public"."market_listing_variants" to "postgres";

grant update on table "public"."market_listing_variants" to "postgres";

grant delete on table "public"."market_listings" to "postgres";

grant insert on table "public"."market_listings" to "postgres";

grant references on table "public"."market_listings" to "postgres";

grant select on table "public"."market_listings" to "postgres";

grant trigger on table "public"."market_listings" to "postgres";

grant truncate on table "public"."market_listings" to "postgres";

grant update on table "public"."market_listings" to "postgres";

grant delete on table "public"."market_photos" to "postgres";

grant insert on table "public"."market_photos" to "postgres";

grant references on table "public"."market_photos" to "postgres";

grant select on table "public"."market_photos" to "postgres";

grant trigger on table "public"."market_photos" to "postgres";

grant truncate on table "public"."market_photos" to "postgres";

grant update on table "public"."market_photos" to "postgres";

grant delete on table "public"."news" to "postgres";

grant insert on table "public"."news" to "postgres";

grant references on table "public"."news" to "postgres";

grant select on table "public"."news" to "postgres";

grant trigger on table "public"."news" to "postgres";

grant truncate on table "public"."news" to "postgres";

grant update on table "public"."news" to "postgres";

grant delete on table "public"."notifications" to "postgres";

grant insert on table "public"."notifications" to "postgres";

grant references on table "public"."notifications" to "postgres";

grant select on table "public"."notifications" to "postgres";

grant trigger on table "public"."notifications" to "postgres";

grant truncate on table "public"."notifications" to "postgres";

grant update on table "public"."notifications" to "postgres";

grant delete on table "public"."payments" to "anon";

grant insert on table "public"."payments" to "anon";

grant references on table "public"."payments" to "anon";

grant select on table "public"."payments" to "anon";

grant trigger on table "public"."payments" to "anon";

grant truncate on table "public"."payments" to "anon";

grant update on table "public"."payments" to "anon";

grant delete on table "public"."payments" to "authenticated";

grant insert on table "public"."payments" to "authenticated";

grant references on table "public"."payments" to "authenticated";

grant select on table "public"."payments" to "authenticated";

grant trigger on table "public"."payments" to "authenticated";

grant truncate on table "public"."payments" to "authenticated";

grant update on table "public"."payments" to "authenticated";

grant delete on table "public"."payments" to "postgres";

grant insert on table "public"."payments" to "postgres";

grant references on table "public"."payments" to "postgres";

grant select on table "public"."payments" to "postgres";

grant trigger on table "public"."payments" to "postgres";

grant truncate on table "public"."payments" to "postgres";

grant update on table "public"."payments" to "postgres";

grant delete on table "public"."payments" to "service_role";

grant insert on table "public"."payments" to "service_role";

grant references on table "public"."payments" to "service_role";

grant select on table "public"."payments" to "service_role";

grant trigger on table "public"."payments" to "service_role";

grant truncate on table "public"."payments" to "service_role";

grant update on table "public"."payments" to "service_role";

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

grant delete on table "public"."projects" to "postgres";

grant insert on table "public"."projects" to "postgres";

grant references on table "public"."projects" to "postgres";

grant select on table "public"."projects" to "postgres";

grant trigger on table "public"."projects" to "postgres";

grant truncate on table "public"."projects" to "postgres";

grant update on table "public"."projects" to "postgres";

grant delete on table "public"."spotlights" to "postgres";

grant insert on table "public"."spotlights" to "postgres";

grant references on table "public"."spotlights" to "postgres";

grant select on table "public"."spotlights" to "postgres";

grant trigger on table "public"."spotlights" to "postgres";

grant truncate on table "public"."spotlights" to "postgres";

grant update on table "public"."spotlights" to "postgres";

grant delete on table "public"."temp_representatives" to "anon";

grant insert on table "public"."temp_representatives" to "anon";

grant references on table "public"."temp_representatives" to "anon";

grant select on table "public"."temp_representatives" to "anon";

grant trigger on table "public"."temp_representatives" to "anon";

grant truncate on table "public"."temp_representatives" to "anon";

grant update on table "public"."temp_representatives" to "anon";

grant delete on table "public"."temp_representatives" to "authenticated";

grant insert on table "public"."temp_representatives" to "authenticated";

grant references on table "public"."temp_representatives" to "authenticated";

grant select on table "public"."temp_representatives" to "authenticated";

grant trigger on table "public"."temp_representatives" to "authenticated";

grant truncate on table "public"."temp_representatives" to "authenticated";

grant update on table "public"."temp_representatives" to "authenticated";

grant delete on table "public"."temp_representatives" to "postgres";

grant insert on table "public"."temp_representatives" to "postgres";

grant references on table "public"."temp_representatives" to "postgres";

grant select on table "public"."temp_representatives" to "postgres";

grant trigger on table "public"."temp_representatives" to "postgres";

grant truncate on table "public"."temp_representatives" to "postgres";

grant update on table "public"."temp_representatives" to "postgres";

grant delete on table "public"."temp_representatives" to "service_role";

grant insert on table "public"."temp_representatives" to "service_role";

grant references on table "public"."temp_representatives" to "service_role";

grant select on table "public"."temp_representatives" to "service_role";

grant trigger on table "public"."temp_representatives" to "service_role";

grant truncate on table "public"."temp_representatives" to "service_role";

grant update on table "public"."temp_representatives" to "service_role";


  create policy "Authenticated users can submit feedback"
  on "public"."feedback"
  as permissive
  for insert
  to authenticated
with check (((profile_id IS NULL) OR (profile_id = auth.uid())));



  create policy "Enable read access for all users"
  on "public"."listing_fee_plans"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable read access for all users"
  on "public"."listing_payments"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable insert access for all auth users"
  on "public"."listing_submissions"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all auth users"
  on "public"."listing_submissions"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."payments"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all auth users"
  on "public"."temp_representatives"
  as permissive
  for select
  to authenticated
using (true);


CREATE TRIGGER trg_listing_submissions_set_reference_code BEFORE INSERT ON public.listing_submissions FOR EACH ROW EXECUTE FUNCTION public.generate_submission_reference_code();

CREATE TRIGGER trg_listing_submissions_set_updated_at BEFORE UPDATE ON public.listing_submissions FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

CREATE TRIGGER trg_payments_set_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.set_timestamp_updated_at();

drop trigger if exists "protect_buckets_delete" on "storage"."buckets";

drop trigger if exists "protect_objects_delete" on "storage"."objects";


  create policy "Give users authenticated access to bucket 1lxqt1y_0"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'market-submissions'::text) AND (auth.role() = 'authenticated'::text)));



  create policy "Give users authenticated access to bucket 1lxqt1y_1"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'market-submissions'::text) AND (auth.role() = 'authenticated'::text)));




