 CREATE TYPE spotlight_type AS ENUM ('general', 'platform', 'product', 'event', 'announcement');

 CREATE TABLE spotlights (
   id                   uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
   title                text          NOT NULL,
   description          text          NOT NULL,
   type                 spotlight_type NOT NULL DEFAULT 'general',
   submitter_name       text,                          -- org/person name shown as subtitle
   submitter_avatar_url text,                          -- optional avatar image
   submitter_initials   text          NOT NULL DEFAULT 'SRC',
   link_url             text,                          -- optional URL (external or deep link)
   gradient_colors      text[]        NOT NULL DEFAULT ARRAY['#3c87f7', '#6366f1'],
   is_active            boolean       NOT NULL DEFAULT true,
   starts_at            timestamptz,                   -- null = always active
   ends_at              timestamptz,                   -- null = no expiry
   created_at           timestamptz   NOT NULL DEFAULT now()
 );

 ALTER TABLE spotlights ENABLE ROW LEVEL SECURITY;

 CREATE POLICY "Authenticated users can view active spotlights"
   ON spotlights FOR SELECT TO authenticated
   USING (
     is_active = true
     AND (starts_at IS NULL OR starts_at <= now())
     AND (ends_at   IS NULL OR ends_at   >= now())
   );