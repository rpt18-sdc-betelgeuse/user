-- schema.sql
-- Since we might run the import many times we'll drop if exists
DROP DATABASE IF EXISTS sdcuser;

CREATE DATABASE sdcuser;

-- Make sure we are using our `blog` database
\c sdcuser;

-- We can create our user table
CREATE TABLE IF NOT EXISTS "users" (
  id SERIAL PRIMARY KEY,
  handle VARCHAR (255) UNIQUE NOT NULL,
  name VARCHAR (255) NOT NULL,
  image_url VARCHAR (255) NOT NULL,
  track_count INTEGER NOT NULL,
  follower_count INTEGER NOT NULL,
  join_date DATE DEFAULT CURRENT_DATE
);
