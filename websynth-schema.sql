CREATE TABLE "users" (
  "username" TEXT PRIMARY KEY,
  "password" TEXT NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE "profiles" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT REFERENCES users,
  "profile_name" TEXT NOT NULL,
  "effects" JSON
);

-- CREATE TABLE "effects" (
--   "id" SERIAL PRIMARY KEY,
--   "effects_name" TEXT,
--   "meta" JSON
-- );

-- CREATE TABLE "users_profiles" (
--   "id" SERIAL PRIMARY KEY,
--   "username" TEXT REFERENCES users ON DELETE CASCADE,
--   "profile_id" INT REFERENCES profiles ON DELETE CASCADE
-- );

-- CREATE TABLE "maps" (
--   "id" SERIAL PRIMARY KEY,
--   "map_name" TEXT,
--   "meta" JSON
-- );

-- CREATE TABLE "profiles_maps" (
--   "id" SERIAL PRIMARY KEY,
--   "profile_id" INT,
--   "map_id" INT
-- );

-- CREATE TABLE "profiles_effects" (
--   "id" SERIAL PRIMARY KEY,
--   "profile_id" INT REFERENCES profiles ON DELETE CASCADE,
--   "effects_id" INT REFERENCES effects ON DELETE CASCADE
-- );

-- ALTER TABLE "profiles" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

-- -- ALTER TABLE "maps" ADD FOREIGN KEY ("id") REFERENCES "profiles_maps" ("map_id");

-- -- ALTER TABLE "profiles" ADD FOREIGN KEY ("id") REFERENCES "profiles_maps" ("profile_id");

-- ALTER TABLE "effects" ADD FOREIGN KEY ("id") REFERENCES "profiles_effects" ("effects_id");

-- ALTER TABLE "profiles" ADD FOREIGN KEY ("id") REFERENCES "profiles_effects" ("profile_id");

-- ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "users_profiles" ("username");

-- ALTER TABLE "profiles" ADD FOREIGN KEY ("id") REFERENCES "users_profiles" ("profile_id");