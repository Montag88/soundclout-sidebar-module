COPY sdc.tracks TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/tracks_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.genres TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/genres_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.artists TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/artists_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.albums TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/albums_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_albums TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_albums_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_artists TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_artists_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_genres TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_genres_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.users TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/users_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_likes TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_likes_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_reposts TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_reposts_exp.csv' DELIMITER ',' CSV HEADER;

-- SPLIT TO TWO EXPORTS
-- WITHOUT FOREIGN KEYS
COPY sdc.playlists(id,name,image_url,likes,reposts) TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/playlists_exp.csv' DELIMITER ',' CSV HEADER;
-- WITH FOREIGN KEYS
COPY sdc.playlists(id,user_id) TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/playlists_foreign_exp.csv' DELIMITER ',' CSV HEADER;

COPY sdc.track_playlists TO '/Users/patrick/Documents/Git Repository/soundclout-sidebar-module/csv/track_playlists_exp.csv' DELIMITER ',' CSV HEADER;