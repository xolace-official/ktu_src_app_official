-- Blacklist table: stores emails of users who deleted their accounts.
    CREATE TABLE IF NOT EXISTS public.account_deletion_blacklist (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL,
      deleted_at timestamptz NOT NULL DEFAULT now()
    );
   
    ALTER TABLE public.account_deletion_blacklist ENABLE ROW LEVEL SECURITY;
   
   -- No public read/write — only accessible via the SECURITY DEFINER function below.
  
   -- RPC function for authenticated users to delete their own account.
   -- 1. Blacklists the user's email
   -- 2. Nullifies orphan-prone FK columns (no CASCADE/SET NULL on those tables)
   -- 3. Deletes notifications referencing the user
   -- 4. Deletes the auth.users row which cascades to profiles → event_attendance,
   --    event_invites. Tables with ON DELETE SET NULL (events, market_listings,
   --    feedback, payments, listing_submissions) are handled automatically.
  
   CREATE OR REPLACE FUNCTION public.delete_user_account()
   RETURNS void
   LANGUAGE plpgsql
   SECURITY DEFINER
   SET search_path = public, auth
   AS $$
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
   $$;
  
   -- Only authenticated users can call this function.
   REVOKE ALL ON FUNCTION public.delete_user_account() FROM PUBLIC;
   GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;