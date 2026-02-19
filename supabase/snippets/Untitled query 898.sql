create table "public"."temp_representatives" (
         "id"            uuid        primary key default gen_random_uuid(),
        "name"          text        not null,
         "position"      text        not null,
         "bio"           text        not null default '',
         "image_url"     text,
         "display_order" int         not null default 0,
         "created_at"    timestamptz not null default now()
       );