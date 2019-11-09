-- DROP SCHEMA IF EXISTS sdc CASCADE;
-- CREATE SCHEMA IF NOT EXISTS sdc;

CREATE TABLE IF NOT EXISTS sdc.tracks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  comments INT NOT NULL DEFAULT 0,
  plays INT NOT NULL DEFAULT 0,
  image_url VARCHAR(100)
);

-- DROP TABLE IF EXISTS sdc.genres CASCADE;
CREATE TABLE IF NOT EXISTS sdc.genres (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL
);

-- DROP TABLE IF EXISTS sdc.artists;
CREATE TABLE IF NOT EXISTS sdc.artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(50),
  followers INT NOT NULL DEFAULT 0,
  image_url VARCHAR(100),
  pro_status BOOLEAN NOT NULL
);

-- DROP TABLE IF EXISTS sdc.albums;
CREATE TABLE IF NOT EXISTS sdc.albums (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_url VARCHAR(100),
  media_type VARCHAR(10) NOT NULL,
  release_year SMALLINT NOT NULL
);

-- DROP TABLE IF EXISTS sdc.track_albums;
CREATE TABLE IF NOT EXISTS sdc.track_albums (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL,
  album_id INT NOT NULL,
  FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  FOREIGN KEY (album_id) REFERENCES sdc.albums (id)
);

-- ALTER TABLE sdc.track_albums
  -- ADD CONSTRAINT constraint_track_id_fk
  -- FOREIGN KEY (track_id)
  -- REFERENCES tracks(id)
  -- ON DELETE CASCADE;

-- DROP TABLE IF EXISTS sdc.track_artists;
CREATE TABLE IF NOT EXISTS sdc.track_artists (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL,
  artist_id INT NOT NULL,
  FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  FOREIGN KEY (artist_id) REFERENCES sdc.artists (id)
);

-- DROP TABLE IF EXISTS sdc.track_genres;
CREATE TABLE IF NOT EXISTS sdc.track_genres (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL,
  genre_id INT NOT NULL,
  FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  FOREIGN KEY (genre_id) REFERENCES sdc.genres (id)
);

-- COPY sdc.tracks (title,comments,plays,image_url) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/tracks.csv' (DELIMITER ',');

-- COPY sdc.genres (type) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/genres.csv' (DELIMITER ',');

-- COPY sdc.artists (name,location,followers,image_url,pro_status) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/artists.csv' (DELIMITER ',');

-- COPY sdc.albums (name,image_url,release_year,media_type) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/albums.csv' (DELIMITER ',');

-- COPY sdc.track_albums (track_id,album_id) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_albums.csv' (DELIMITER ',');

-- COPY sdc.track_artists (track_id,artist_id) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_artists.csv' (DELIMITER ',');

-- COPY sdc.track_genres (track_id,genre_id) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_genres.csv' (DELIMITER ',');



-- DROP TABLE IF EXISTS sdc.users CASCADE;
CREATE TABLE IF NOT EXISTS sdc.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  followers INT,
  image_url VARCHAR(100)
);

DROP TABLE IF EXISTS sdc.track_likes CASCADE;
CREATE TABLE IF NOT EXISTS sdc.track_likes (
  id SERIAL PRIMARY KEY,
  track_id INT,
  user_id INT,
  timestamp TIMESTAMPTZ NOT NULL
);
  -- FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  -- FOREIGN KEY (user_id) REFERENCES sdc.users (id)

-- ALTER TABLE sdc.track_likes
--   ADD CONSTRAINT constraint_track_id_fk
--   FOREIGN KEY (track_id)
--   REFERENCES tracks(id)
--   ON DELETE CASCADE;
  
-- ALTER TABLE sdc.track_likes
--   ADD CONSTRAINT constraint_user_id_fk
--   FOREIGN KEY (user_id)
--   REFERENCES users(id)
--   ON DELETE CASCADE;

DROP TABLE IF EXISTS sdc.track_reposts CASCADE;
CREATE TABLE IF NOT EXISTS sdc.track_reposts (
  id SERIAL PRIMARY KEY,
  track_id INT,
  user_id INT,
  timestamp TIMESTAMPTZ NOT NULL
);
  -- FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  -- FOREIGN KEY (user_id) REFERENCES sdc.users (id)

-- ALTER TABLE sdc.track_reposts
--   ADD CONSTRAINT constraint_track_id_fk
--   FOREIGN KEY (track_id)
--   REFERENCES tracks(id)
--   ON DELETE CASCADE;
  
-- ALTER TABLE sdc.track_reposts
--   ADD CONSTRAINT constraint_user_id_fk
--   FOREIGN KEY (user_id)
--   REFERENCES users(id)
--   ON DELETE CASCADE;

-- DROP TABLE IF EXISTS sdc.playlists CASCADE;
CREATE TABLE IF NOT EXISTS sdc.playlists (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  image_url VARCHAR(100),
  likes INT NOT NULL DEFAULT 0,
  reposts INT NOT NULL DEFAULT 0
);
  -- FOREIGN KEY (user_id) REFERENCES sdc.users (id)

-- ALTER TABLE sdc.playlists
--   ADD CONSTRAINT constraint_user_id_fk
--   FOREIGN KEY (user_id)
--   REFERENCES users(id)
--   ON DELETE CASCADE;

DROP TABLE IF EXISTS sdc.track_playlists CASCADE;
CREATE TABLE IF NOT EXISTS sdc.track_playlists (
  id SERIAL PRIMARY KEY,
  track_id INT NOT NULL,
  playlist_id INT NOT NULL
);
  -- FOREIGN KEY (track_id) REFERENCES sdc.tracks (id),
  -- FOREIGN KEY (playlist_id) REFERENCES sdc.playlists (id)

-- ALTER TABLE sdc.track_playlists
--   ADD CONSTRAINT constraint_track_id_fk
--   FOREIGN KEY (track_id)
--   REFERENCES tracks(id)
--   ON DELETE CASCADE;
  
-- ALTER TABLE sdc.track_playlists
--   ADD CONSTRAINT constraint_playlist_id_fk
--   FOREIGN KEY (playlist_id)
--   REFERENCES playlists(id)
--   ON DELETE CASCADE;

-- COPY sdc.users (name,followers,image_url) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/users.csv' (DELIMITER ',');

-- COPY sdc.track_likes (user_id,track_id,timestamp) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_likes.csv' (DELIMITER ',');

-- COPY sdc.track_reposts (user_id,track_id,timestamp) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_reposts.csv' (DELIMITER ',');

-- COPY sdc.playlists (user_id,name,image_url,likes,reposts) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/playlists.csv' (DELIMITER ',');

-- COPY sdc.track_playlists (track_id, playlist_id) FROM '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/track_playlists.csv' (DELIMITER ',');


------------------ SEARCHES ------------------------

-- SELECT albums.name, genres.type, genres.id, track_albums.track_id 
  -- FROM albums 
  -- INNER JOIN track_albums ON albums.id = track_albums.album_id 
  -- INNER JOIN track_genres ON track_albums.track_id = track_genres.track_id 
  -- INNER JOIN genres ON track_genres.genre_id = genres.id 
  -- WHERE albums.id = 330000 
  -- ORDER BY track_albums.track_id;

  -- SELECT tracks.title, artists.name, albums.name, genres.type
  --   FROM tracks
  --   INNER JOIN track_albums ON track_albums.track_id = tracks.id
  --   INNER JOIN albums ON track_albums.album_id = albums.id
  --   INNER JOIN track_genres ON track_genres.track_id = tracks.id 
  --   INNER JOIN genres ON track_genres.genre_id = genres.id 
  --   INNER JOIN track_artists ON track_artists.track_id = tracks.id
  --   INNER JOIN artists ON track_artists.artist_id = artists.id
  --   WHERE tracks.id = 9900000;
