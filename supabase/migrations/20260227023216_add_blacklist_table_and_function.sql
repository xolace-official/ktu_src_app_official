
  create table "public"."account_deletion_blacklist" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "deleted_at" timestamp with time zone not null default now()
      );


alter table "public"."account_deletion_blacklist" enable row level security;

CREATE UNIQUE INDEX account_deletion_blacklist_pkey ON public.account_deletion_blacklist USING btree (id);

alter table "public"."account_deletion_blacklist" add constraint "account_deletion_blacklist_pkey" PRIMARY KEY using index "account_deletion_blacklist_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_user_account()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
   DECLARE
     _uid uuid := auth.uid();
     _email text;
   BEGIN
     IF _uid IS NULL THEN
       RAISE EXCEPTION 'Not authenticated';
     END IF;
  
    -- Grab the user's email before we delete anything.
     SELECT email INTO _email FROM auth.users WHERE id = _uid;
  
     -- Insert into the blacklist.
     INSERT INTO public.account_deletion_blacklist (email)
     VALUES (_email);
  
     -- Nullify FK columns on tables that reference profiles without CASCADE or SET NULL.
     UPDATE public.announcements SET author_id = NULL WHERE author_id = _uid;
     UPDATE public.news SET author_id = NULL WHERE author_id = _uid;
  
     -- Remove notifications referencing this user.
     DELETE FROM public.notifications
       WHERE actor_id = _uid OR recipient_id = _uid;
  
     -- Delete the auth user — cascades to profiles, event_attendance, event_invites.
     DELETE FROM auth.users WHERE id = _uid;
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

grant delete on table "public"."account_deletion_blacklist" to "anon";

grant insert on table "public"."account_deletion_blacklist" to "anon";

grant references on table "public"."account_deletion_blacklist" to "anon";

grant select on table "public"."account_deletion_blacklist" to "anon";

grant trigger on table "public"."account_deletion_blacklist" to "anon";

grant truncate on table "public"."account_deletion_blacklist" to "anon";

grant update on table "public"."account_deletion_blacklist" to "anon";

grant delete on table "public"."account_deletion_blacklist" to "authenticated";

grant insert on table "public"."account_deletion_blacklist" to "authenticated";

grant references on table "public"."account_deletion_blacklist" to "authenticated";

grant select on table "public"."account_deletion_blacklist" to "authenticated";

grant trigger on table "public"."account_deletion_blacklist" to "authenticated";

grant truncate on table "public"."account_deletion_blacklist" to "authenticated";

grant update on table "public"."account_deletion_blacklist" to "authenticated";

grant delete on table "public"."account_deletion_blacklist" to "postgres";

grant insert on table "public"."account_deletion_blacklist" to "postgres";

grant references on table "public"."account_deletion_blacklist" to "postgres";

grant select on table "public"."account_deletion_blacklist" to "postgres";

grant trigger on table "public"."account_deletion_blacklist" to "postgres";

grant truncate on table "public"."account_deletion_blacklist" to "postgres";

grant update on table "public"."account_deletion_blacklist" to "postgres";

grant delete on table "public"."account_deletion_blacklist" to "service_role";

grant insert on table "public"."account_deletion_blacklist" to "service_role";

grant references on table "public"."account_deletion_blacklist" to "service_role";

grant select on table "public"."account_deletion_blacklist" to "service_role";

grant trigger on table "public"."account_deletion_blacklist" to "service_role";

grant truncate on table "public"."account_deletion_blacklist" to "service_role";

grant update on table "public"."account_deletion_blacklist" to "service_role";

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

grant delete on table "public"."feedback" to "postgres";

grant insert on table "public"."feedback" to "postgres";

grant references on table "public"."feedback" to "postgres";

grant select on table "public"."feedback" to "postgres";

grant trigger on table "public"."feedback" to "postgres";

grant truncate on table "public"."feedback" to "postgres";

grant update on table "public"."feedback" to "postgres";

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

grant delete on table "public"."listing_payments" to "postgres";

grant insert on table "public"."listing_payments" to "postgres";

grant references on table "public"."listing_payments" to "postgres";

grant select on table "public"."listing_payments" to "postgres";

grant trigger on table "public"."listing_payments" to "postgres";

grant truncate on table "public"."listing_payments" to "postgres";

grant update on table "public"."listing_payments" to "postgres";

grant delete on table "public"."listing_submissions" to "postgres";

grant insert on table "public"."listing_submissions" to "postgres";

grant references on table "public"."listing_submissions" to "postgres";

grant select on table "public"."listing_submissions" to "postgres";

grant trigger on table "public"."listing_submissions" to "postgres";

grant truncate on table "public"."listing_submissions" to "postgres";

grant update on table "public"."listing_submissions" to "postgres";

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

grant delete on table "public"."payments" to "postgres";

grant insert on table "public"."payments" to "postgres";

grant references on table "public"."payments" to "postgres";

grant select on table "public"."payments" to "postgres";

grant trigger on table "public"."payments" to "postgres";

grant truncate on table "public"."payments" to "postgres";

grant update on table "public"."payments" to "postgres";

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

grant delete on table "public"."temp_representatives" to "postgres";

grant insert on table "public"."temp_representatives" to "postgres";

grant references on table "public"."temp_representatives" to "postgres";

grant select on table "public"."temp_representatives" to "postgres";

grant trigger on table "public"."temp_representatives" to "postgres";

grant truncate on table "public"."temp_representatives" to "postgres";

grant update on table "public"."temp_representatives" to "postgres";


  create policy "Allow all users to insert"
  on "public"."account_deletion_blacklist"
  as permissive
  for insert
  to authenticated
with check (true);


