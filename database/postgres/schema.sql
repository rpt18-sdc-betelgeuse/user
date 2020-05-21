-- schema.sql
-- Since we might run the import many times we'll drop if exists
--DROP DATABASE IF EXISTS sdcuser;

--CREATE DATABASE sdcuser;

-- Make sure we are using our `sdcuser` database
--\c sdcuser;

-- We can create our user table
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  handle VARCHAR (255) NOT NULL,
  name VARCHAR (255) NOT NULL,
  image_url VARCHAR (255) NOT NULL,
  track_count INTEGER NOT NULL,
  follower_count INTEGER NOT NULL,
  join_date DATE DEFAULT CURRENT_DATE
);

--docker run -v pgdata:/var/lib/postgresql/data -v /Users/czilla/Repositories/SDC/user/database/postgres:/postgres_stuff --name postgres-0 -e POSTGRES_PASSWORD=qwerty -d -p 5432:5432 postgres:alpine
--docker exec -it postgres-0 bash
--COPY users(handle,name,image_url,track_count,follower_count,join_date) FROM '/postgres_stuff/users.csv' DELIMITER ',' CSV HEADER;
--psql -U postgres -f /postgres_stuff/schema.sql

--docker run -v pgdata:/var/lib/postgresql/data -v /home/ubuntu/postgres:/postgres_stuff --name sdc-postgres-container -e POSTGRES_PASSWORD=qwerty -d -p 5432:5432 postgres:alpine



