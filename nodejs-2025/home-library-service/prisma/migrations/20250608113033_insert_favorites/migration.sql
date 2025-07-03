CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO "Favorites" ("id") VALUES (gen_random_uuid());
