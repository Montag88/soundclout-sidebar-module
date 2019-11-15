const driver = require('./neoIndex.js');
var session = driver.session();

function queryNeo4j(query, info) {
  session
    .run(query)
    .catch(error => console.log(error))
    .then(() => {
      console.log(`${info} COMPLETED`);
      session.close();
    })
}

// NODES

var artistQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///artists_exp.csv" AS row
    CREATE (:Artists {id: toInteger(row.id), name: row.name, location: row.location, followers: toInteger(row.followers), image_url: row.image_url, pro_status: toBoolean(row.pro_status)})
  `;
var artistInfo = 'ARTISTS';

var albumQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///albums_exp.csv" AS row
    CREATE (:Albums {id: toInteger(row.id), name: row.name, media_type: row.media_type, release_year: toInteger(row.release_year), image_url: row.image_url})
  `;
var albumInfo = 'ALBUMS';

var genreQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///genres_exp.csv" AS row
    CREATE (:Genres {id: toInteger(row.id), type: row.type})
  `;
var genreInfo = 'GENRES';

var playlistQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///playlists_exp.csv" AS row
    CREATE (:Playlists {id: toInteger(row.id), name: row.name, likes: toInteger(row.likes), reposts: toInteger(row.reposts), image_url: row.image_url})
  `;
var playlistInfo = 'PLAYLISTS';

var trackQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///tracks_exp.csv" AS row
    CREATE (:Tracks {id: toInteger(row.id), title: row.title, comments: toInteger(row.comments), plays: toInteger(row.plays), image_url: row.image_url})
  `;
var trackInfo = 'TRACKS';

var userQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///users_exp.csv" AS row
    CREATE (:Users {id: toInteger(row.id), name: row.name, followers: toInteger(row.followers), image_url: row.image_url})
  `;
var userInfo = 'USERS';

// INDEXES

var artistIndex = `CREATE CONSTRAINT ON (artist:Artists) ASSERT artist.id IS UNIQUE`;
var albumIndex = `CREATE CONSTRAINT ON (album:Albums) ASSERT album.id IS UNIQUE`;
var genreIndex = `CREATE CONSTRAINT ON (genre:Genres) ASSERT genre.id IS UNIQUE`;
var playlistIndex = `CREATE CONSTRAINT ON (playlist:Playlists) ASSERT playlist.id IS UNIQUE`;
var trackIndex = `CREATE CONSTRAINT ON (track:Tracks) ASSERT track.id IS UNIQUE`;
var userIndex = `CREATE CONSTRAINT ON (user:Users) ASSERT user.id IS UNIQUE`;

// RELATIONSHIPS

var playlist_foreignQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///playlists_foreign_exp.csv" AS row
    MATCH (u:Users {id: toInteger(row.user_id)})
    MATCH (p:Playlists {id: toInteger(row.id)})
    CREATE (u)-[:CREATED]->(p)
  `;
var playlist_foreignInfo = 'USER CREATED PLAYLIST';

var track_albumsQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_albums_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (a:Albums {id: toInteger(row.album_id)})
    CREATE (t)-[:IS_ON]->(a)
  `;
var track_albumsInfo = 'TRACK IS ON ALBUM';

var track_artistsQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_artists_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (a:Artists {id: toInteger(row.artist_id)})
    CREATE (a)-[:SINGS]->(t)
  `;
var track_artistsInfo = 'ARTIST SINGS TRACK';

var track_genresQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_genres_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (g:Genres {id: toInteger(row.genre_id)})
    CREATE (t)-[:IS_GENRE]->(g)
  `;
var track_genresInfo = 'TRACK IS_GENRE GENRE';

var track_likesQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_likes_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (u:Users {id: toInteger(row.user_id)})
    CREATE (u)-[:LIKED {timestamp: row.timestamp}]->(t)
  `;
var track_likesInfo = 'USER LIKES TRACK';

var track_playlistsQuery =
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_playlists_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (p:Playlists {id: toInteger(row.playlist_id)})
    CREATE (p)-[:INCLUDES]->(t)
  `;
var track_playlistsInfo = 'PLAYLIST INCLUDES TRACK';

var track_repostsQuery = 
  `
    USING PERIODIC COMMIT 500
    LOAD CSV WITH HEADERS FROM "file:///track_reposts_exp.csv" AS row
    MATCH (t:Tracks {id: toInteger(row.track_id)})
    MATCH (u:Users {id: toInteger(row.user_id)})
    CREATE (u)-[:REPOSTED {timestamp: row.timestamp}]->(t)
  `;
var track_repostsInfo = 'USER REPOSTED TRACK COMPLETED';

// LOAD NODES

// queryNeo4j(artistQuery,artistInfo);
// queryNeo4j(albumQuery,albumInfo);
// queryNeo4j(genreQuery,genreInfo);
// queryNeo4j(playlistQuery,playlistInfo);
// queryNeo4j(trackQuery,trackInfo);
// queryNeo4j(userQuery,userInfo);

// MAKE UNIQUE/INDEXES

// queryNeo4j(artistIndex, artistInfo);
// queryNeo4j(albumIndex, albumInfo);
// queryNeo4j(genreIndex, genreInfo);
// queryNeo4j(playlistIndex, playlistInfo);
// queryNeo4j(trackIndex, trackInfo);
// queryNeo4j(userIndex, userInfo);

// LOAD RELATIONSHIPS

// queryNeo4j(playlist_foreignQuery, playlist_foreignInfo);
// queryNeo4j(track_albumsQuery, track_albumsInfo);
// queryNeo4j(track_artistsQuery, track_artistsInfo);
// queryNeo4j(track_genresQuery, track_genresInfo);
// queryNeo4j(track_likesQuery, track_likesInfo);
// queryNeo4j(track_playlistsQuery, track_playlistsInfo);
// queryNeo4j(track_repostsQuery, track_repostsInfo);


// ADMIN IMPORT
// --id-type=STRING \
// --nodes:Customer=customers.csv --nodes=products.csv  \
// --nodes="orders_header.csv,orders1.csv,orders2.csv" \
// --relationships:CONTAINS=order_details.csv \
// --relationships:ORDERED="customer_orders_header.csv,orders1.csv,orders2.csv"
