create type feedback_type as enum ('suggestion', 'bug', 'compliment', 'complaint');

create table "public"."feedback" (
  "id"           uuid          primary key default gen_random_uuid(),
  "profile_id"   uuid          references profiles(id) on delete set null,
  "type"         feedback_type not null,
  "category"     text          not null,
  "rating"       smallint      check (rating between 1 and 5),
  "message"      text          not null check (char_length(message) between 10 and 1000),
  "is_anonymous" boolean       not null default false,
  "created_at"   timestamptz   not null default now()
);

alter table "public"."feedback" enable row level security;

create policy "Authenticated users can submit feedback"
  on "public"."feedback"
  for insert
  to authenticated
  with check (
    profile_id is null or profile_id = auth.uid()
  );