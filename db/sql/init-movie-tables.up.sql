-- Create category table
CREATE TABLE IF NOT EXISTS "category" (
  "id" VARCHAR NOT NULL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "slug" VARCHAR NOT NULL UNIQUE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create country table
CREATE TABLE IF NOT EXISTS "country" (
  "id" VARCHAR NOT NULL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "slug" VARCHAR NOT NULL UNIQUE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create movie table
CREATE TABLE IF NOT EXISTS "movie" (
  "id" VARCHAR NOT NULL PRIMARY KEY,
  "is_single" BOOLEAN NOT NULL DEFAULT TRUE,
  "name" VARCHAR NOT NULL,
  "slug" VARCHAR NOT NULL UNIQUE,
  "origin_name" VARCHAR,
  "description" TEXT,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "poster" VARCHAR,
  "thumbnail" VARCHAR,
  "duration" INTEGER,
  "trailer" VARCHAR,
  "source" VARCHAR,
  "current_episode" INTEGER DEFAULT 0,
  "total_episode" INTEGER DEFAULT 0,
  "country_id" VARCHAR,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY ("country_id") REFERENCES "country" ("id") ON DELETE SET NULL
);

-- Create episode table
CREATE TABLE IF NOT EXISTS "episode" (
  "id" VARCHAR NOT NULL PRIMARY KEY,
  "movie_id" VARCHAR NOT NULL,
  "slug" VARCHAR NOT NULL,
  "order" INTEGER NOT NULL,
  "source" VARCHAR,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE,
  UNIQUE ("movie_id", "order")
);

-- Create movie_category junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS "movie_category" (
  "movie_id" VARCHAR NOT NULL,
  "category_id" VARCHAR NOT NULL,
  PRIMARY KEY ("movie_id", "category_id"),
  FOREIGN KEY ("movie_id") REFERENCES "movie" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "idx_movie_country_id" ON "movie" ("country_id");
CREATE INDEX IF NOT EXISTS "idx_episode_movie_id" ON "episode" ("movie_id");
CREATE INDEX IF NOT EXISTS "idx_movie_category_movie_id" ON "movie_category" ("movie_id");
CREATE INDEX IF NOT EXISTS "idx_movie_category_category_id" ON "movie_category" ("category_id");