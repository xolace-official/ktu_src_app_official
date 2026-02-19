create table "public"."temp_representatives" (
  "id"            uuid        primary key default gen_random_uuid(),
  "name"          text        not null,
  "position"      text        not null,
  "bio"           text        not null default '',
  "image_url"     text,
  "display_order" int         not null default 0,
  "created_at"    timestamptz not null default now()
);

alter table "public"."temp_representatives" enable row level security;

create policy "Authenticated users can view representatives"
  on "public"."temp_representatives"
  for select
  to authenticated
  using (true);
