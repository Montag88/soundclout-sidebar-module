const faker = require('faker');
const fs = require('fs');
// const zlib = require('zlib');
// const gzip = zlib.createGzip();
// const gunzip = zlib.createGunzip();

var numTracks = 10000000;
var numUsers = 14000000;

/////////////////// TRACK BASED //////////////////
// generateTracksCSV(numTracks);
// generateArtistsCSV(.039 * numTracks); // update number of artists based on trackartists csv
// generateGenreCSV(14); // Fixed amount for number of genres

// generateTrackGenresCSV(numTracks); // ends up with ~1.6x datapoints
// generateTrackArtistsAlbumsCSV(.039 * numTracks); // ends up with 378565 Albums

// generateAlbumsCSV(378565); // use 378565

/////////////////// USER BASED //////////////////
// generateUsersCSV(numUsers);

// generateTrackLikesCSV(numUsers); // use numUsers
// generateTrackRepostsCSV(numUsers); // use numUsers

////////////// NEED TO GENERATE //////////////////
// generatePlaylistsCSV(.5 * numUsers); // use .5 * numUsers
// generateTrackPlaylistsCSV(.5 * numUsers); // use .5 * numUsers

function writeMany(i, dataType, writer, encoding, callback) {
  i++;
  function write() {
    let isBufferAvailable = true;
    do {
      i -= 1; // counts down input number
      switch(dataType) {
        case 'users':
          var data = userSeedData();
          break;
        case 'tracks':
          var data = trackSeedData();
          break;
        case 'genres':
          var data = genreSeedData(i);
          break;
        case 'track_genres':
          var total;
          if (!total) {
            total = i;
          }
          var data = trackGenreSeedData(total, i);
          break;
        case 'artists':
          var data = artistSeedData();
          break;
        case 'albums':
          var data = albumSeedData();
          break;
        case 'track_likes':
          var data = trackLikeSeedData(i);
          break;
        case 'track_reposts':
          var data = trackRepostSeedData(i);
          break;
        case 'playlists':
          var data = playlistSeedData();
          break;
        case 'track_playlists':
          var data = trackPlaylistSeedData(i);
          break;
      }
      if (i === 1) {
        writer.write(data, encoding, callback); // STANDARD FORMAT FOR WRITER.WRITE
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        isBufferAvailable = writer.write(data, encoding);
      }
    } while (i > 1 && isBufferAvailable);
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

////////////// MULTIPLE STREAMS ///////////////
function writeManyMulti(i, trackArtistWriter, trackAlbumWriter, encoding, cb1, cb2) {
  let currentTrack = 1;
  let currentAlbum = 1;
  i++;
  function write() {
    let trackArtistBuffer = true;
    let trackAlbumBuffer = true;
    do {
      i -= 1; // counts down input number
      var data = trackArtistSeedData(i, currentTrack, currentAlbum);
      var trackArtistData = data.associatedTracks;
      var trackAlbumData = data.associatedAlbums;
      currentTrack = data.currentTrack;
      currentAlbum = data.currentAlbum;
      if (i === 1) {
        console.log('last piece of data: ', data);
        trackAlbumWriter.write(trackAlbumData, encoding, cb2);
        trackArtistWriter.write(trackArtistData, encoding, cb1); // STANDARD FORMAT FOR WRITER.WRITE
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        trackAlbumBuffer = trackAlbumWriter.write(trackAlbumData, encoding);
        trackArtistBuffer = trackArtistWriter.write(trackArtistData, encoding);
      }
    } while (i > 1 && (trackArtistBuffer || trackAlbumBuffer));
    if (i > 1) {
      // had to stop early!
      // write some more once it drains
      trackArtistWriter.once('drain', write);
    }
  }
  write();
}
/////////////////// PLAYLISTS SEEDING //////////////////////////////
function generatePlaylistsCSV(dataPoints) {
  const writePlaylists = fs.createWriteStream('playlists.csv');
  var start = new Date();
  var dataType = 'playlists';
  writeMany(dataPoints, dataType, writePlaylists, 'utf-8', () => {
    writePlaylists.end();
    var end = new Date();
    console.log('time to complete playlists: ', end - start);
  });
};
function playlistSeedData() {
  var userID = Math.floor(Math.random() * numUsers + 1);
  var name = faker.name.title();
  var image_url = 'http://lorempixel.com/640/480/sports';
  var likes = Math.floor(Math.random() * numUsers * .1);
  var reposts = Math.floor(Math.random() * numUsers * .1);

  return `${userID},${name},${image_url},${likes},${reposts}\n`;
};
/////////////////// TRACK PLAYLISTS SEEDING //////////////////////
function generateTrackPlaylistsCSV(dataPoints) {
  const writeTrackPlaylists = fs.createWriteStream('track_playlists.csv');
  var start = new Date();
  var dataType = 'track_playlists';
  writeMany(dataPoints, dataType, writeTrackPlaylists, 'utf-8', () => {
    writeTrackPlaylists.end();
    var end = new Date();
    console.log('time to complete track_playlists: ', end - start);
  });
};
function trackPlaylistSeedData(i) {
  var playlist = '';
  var tracks = Math.floor(Math.random() * 30);
  var storage = [];
  while (tracks > 0) {
    var trackID = Math.floor(Math.random() * numTracks) + 1;
    if (storage.indexOf(trackID) === -1) {
      storage.push(trackID);
      tracks--;
    }
  }
  while (storage.length > 0) {
    var currentTrack = storage.pop();
    // requires song_id, playlist_id
    playlist += `${currentTrack},${i}\n`;
  }
  return playlist;
};
/////////////////// TRACK LIKES SEEDING //////////////////////
function generateTrackLikesCSV(dataPoints) {
  const writeTrackLikes = fs.createWriteStream('track_likes.csv');
  var start = new Date();
  var dataType = 'track_likes';
  writeMany(dataPoints, dataType, writeTrackLikes, 'utf-8', () => {
    writeTrackLikes.end();
    var end = new Date();
    console.log('time to complete track_likes: ', end - start);
  });
};
function trackLikeSeedData(i) {
  var likes = '';
  var userLikes = Math.floor(Math.random() * 20);
  var storage = [];
  while (userLikes > 0) {
    var trackID = Math.floor(Math.random() * numTracks) + 1;
    if (storage.indexOf(trackID) === -1) {
      storage.push(trackID);
      userLikes--;
    }
  }
  while (storage.length > 0) {
    var currentTrack = storage.pop();
    var currentTimestamp = new Date(faker.date.past(5)).toJSON();
    likes += `${i},${currentTrack},${currentTimestamp}\n`;
  }
  return likes;
};
/////////////////// TRACK REPOSTS SEEDING //////////////////////
function generateTrackRepostsCSV(dataPoints) {
  const writeTrackReposts = fs.createWriteStream('track_reposts.csv');
  var start = new Date();
  var dataType = 'track_reposts';
  writeMany(dataPoints, dataType, writeTrackReposts, 'utf-8', () => {
    writeTrackReposts.end();
    var end = new Date();
    console.log('time to complete track_reposts: ', end - start);
  });
};
function trackRepostSeedData(i) {
  var reposts = '';
  var userReposts = Math.floor(Math.random() * 20);
  var storage = [];
  while (userReposts > 0) {
    var trackID = Math.floor(Math.random() * numTracks) + 1;
    if (storage.indexOf(trackID) === -1) {
      storage.push(trackID);
      userReposts--;
    }
  }
  while (storage.length > 0) {
    var currentTrack = storage.pop();
    var currentTimestamp = new Date(faker.date.past(5)).toJSON();
    reposts += `${i},${currentTrack},${currentTimestamp}\n`;
  }
  return reposts;
};
/////////////////// TRACK ARTISTS ALBUMS SEEDING //////////////////////
function generateTrackArtistsAlbumsCSV(dataPoints) {
  const writeTrackArtists = fs.createWriteStream('track_artists.csv');
  const writeTrackAlbums = fs.createWriteStream('track_albums.csv');

  var start = new Date();
  var artistsCB = () => {
    writeTrackArtists.end();
    var end = new Date();
    console.log('time to complete artists: ', end - start);
  };
  var albumsCB = () => {
    writeTrackAlbums.end();
    var end = new Date();
    console.log('time to complete albums: ', end - start);
  };
  writeManyMulti(dataPoints, writeTrackArtists, writeTrackAlbums, 'utf-8', artistsCB, albumsCB);
};
function trackArtistSeedData(artistID, currentTrack = 1, currentAlbum = 1) {
  // i is artist id
  // every track has at least one artist
  if (currentTrack > numTracks - 1) {
    var seedType = 99;
  } else {
    var seedType = Math.floor(Math.random() * 10);
  }
  // 10% of artists have 100 - 150 tracks, seed 0
  // 20% of artists have 20 - 100 tracks, seed 1-2
  // 70% of artists have 1 - 20 tracks, seed 3-9
  // weighted avg is 36.5 songs per artist
  switch(seedType) {
    case 0:
      var artistTracks = Math.floor(Math.random() * 50 + 100);
      var artistAlbums = 6;
      // generate 6 albums with 13 tracks each
      break;
    case 1:
      var artistTracks = Math.floor(Math.random() * 40 + 50);
      var artistAlbums = 3;
      // generate 3 albums with 13 tracks each
      break;
    case 2:
      var artistTracks = Math.floor(Math.random() * 30 + 20);
      var artistAlbums = 1;
      // generate 1 album with 13 tracks
      break;
    case 99:
      var artistTracks = Math.floor(Math.random() * 10 + 1);
      break;
    default:
      var artistTracks = Math.floor(Math.random() * 19 + 1);
      break;
  }
  // popular artists have more crossover tracks
  var tracksInGenre = Math.floor(.9 * artistTracks);
  var tracksInOtherGenre = Math.ceil(.1 * artistTracks);
  var associatedTracks = '';
  var startTrack = currentTrack;
  var associatedAlbums = '';
  var albumTrackCounter = 0;
  // need to select range of songs, split into 25% chunks to match genre
  if (startTrack <= Math.floor(numTracks * .25)) {
    // associate tracks in current genre with artist
    for (let i = 0; i < tracksInGenre; i++) {
      // CONDITION FOR NO TRACKS LEFT IN SECTION
      if (startTrack + i > Math.floor(numTracks * .25)) {
        tracksInOtherGenre++;
      } else {
        associatedTracks += `${startTrack + i},${artistID}\n`; // TRACK_ID, ARTIST_ID
        if (artistAlbums > 0) {
          associatedAlbums += `${startTrack + i},${currentAlbum}\n`; // TRACK_ID, ALBUM_ID
          albumTrackCounter++;
          if (albumTrackCounter > 13) {
            artistAlbums--;
            currentAlbum++;
            albumTrackCounter = 0;
          }
        }
        currentTrack++;
      }
    };
    // associate tracks in other genres with artist
    // other can be random song in current genre or pop
    for (let i = 0; i < tracksInOtherGenre; i++) {
      var songID = Math.floor(Math.random() * numTracks + 1);
      // isInCorrectGenre will change based on genre
      var isInCorrectGenre = (songID <= Math.floor(numTracks * .25) || songID > Math.floor(numTracks * .75));
      var isNotAlreadyAssociated = (songID < startTrack && songID > currentTrack);
      while (isInCorrectGenre && isNotAlreadyAssociated) {
        songID = Math.floor(Math.random() * numTracks + 1);
      }
      associatedTracks += `${songID},${artistID}\n`;
    };
  } else if ((startTrack > Math.floor(numTracks * .25) && startTrack <= Math.floor(numTracks * .5))) {
    for (let i = 0; i < tracksInGenre; i++) {
      if (startTrack + i > Math.floor(numTracks * .5)) {
        tracksInOtherGenre++;
      } else {
        associatedTracks += `${startTrack + i},${artistID}\n`; // TRACK_ID, ARTIST_ID
        if (artistAlbums > 0) {
          associatedAlbums += `${startTrack + i},${currentAlbum}\n`; // TRACK_ID, ALBUM_ID
          albumTrackCounter++;
          if (albumTrackCounter > 13) {
            artistAlbums--;
            currentAlbum++;
            albumTrackCounter = 0;
          }
        }
        currentTrack++;
      }
    };
    for (let i = 0; i < tracksInOtherGenre; i++) {
      var songID = Math.floor(Math.random() * numTracks + 1);
      // isInCorrectGenre will change based on genre
      var isInCorrectGenre = (
        (songID > Math.floor(numTracks * .25) && songID <= Math.floor(numTracks * .5)) 
        || songID > Math.floor(numTracks * .75)
      );
      var isNotAlreadyAssociated = (songID < startTrack && songID > currentTrack);
      while (isInCorrectGenre && isNotAlreadyAssociated) {
        songID = Math.floor(Math.random() * numTracks + 1);
      }
      associatedTracks += `${songID},${artistID}\n`;
    };
  } else if ((startTrack > Math.floor(numTracks * .5) && startTrack <= Math.floor(numTracks * .75))) {
    for (let i = 0; i < tracksInGenre; i++) {
      if (startTrack + i > Math.floor(numTracks * .75)) {
        tracksInOtherGenre++;
      } else {
        associatedTracks += `${startTrack + i},${artistID}\n`; // TRACK_ID, ARTIST_ID
        if (artistAlbums > 0) {
          associatedAlbums += `${startTrack + i},${currentAlbum}\n`; // TRACK_ID, ALBUM_ID
          albumTrackCounter++;
          if (albumTrackCounter > 13) {
            artistAlbums--;
            currentAlbum++;
            albumTrackCounter = 0;
          }
        }
        currentTrack++;
      }
    };
    for (let i = 0; i < tracksInOtherGenre; i++) {
      var songID = Math.floor(Math.random() * numTracks + 1);
      // isInCorrectGenre will change based on genre
      var isInCorrectGenre = (
        (songID > Math.floor(numTracks * .5) && songID <= Math.floor(numTracks * .75)) 
        || songID > Math.floor(numTracks * .75)
      );
      var isNotAlreadyAssociated = (songID < startTrack && songID > currentTrack);
      while (isInCorrectGenre && isNotAlreadyAssociated) {
        songID = Math.floor(Math.random() * numTracks + 1);
      }
      associatedTracks += `${songID},${artistID}\n`;
    };
  } else {
    for (let i = 0; i < tracksInGenre; i++) {
      if (startTrack + i >= numTracks) {
        tracksInOtherGenre++;
      } else {
        associatedTracks += `${startTrack + i},${artistID}\n`; // TRACK_ID, ARTIST_ID
        if (artistAlbums > 0) {
          associatedAlbums += `${startTrack + i},${currentAlbum}\n`; // TRACK_ID, ALBUM_ID
          albumTrackCounter++;
          if (albumTrackCounter > 13) {
            artistAlbums--;
            currentAlbum++;
            albumTrackCounter = 0;
          }
        }
        currentTrack++;
      }
    };
    for (let i = 0; i < tracksInOtherGenre; i++) {
      var songID = Math.floor(Math.random() * numTracks + 1);
      var isNotAlreadyAssociated = (songID < startTrack && songID > currentTrack);
      while (isNotAlreadyAssociated) {
        songID = Math.floor(Math.random() * numTracks + 1);
      }
      associatedTracks += `${songID},${artistID}\n`;
    };  
  }
  return {associatedTracks, currentTrack, associatedAlbums, currentAlbum};
};
/////////////////// ARTISTS SEEDING //////////////////////
function generateArtistsCSV(dataPoints) {
  const writeArtists = fs.createWriteStream('artists.csv');
  var start = new Date();
  var dataType = 'artists';
  writeMany(dataPoints, dataType, writeArtists, 'utf-8', () => {
    writeArtists.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
};
function artistSeedData() {
  var name = faker.company.catchPhrase();
  var location = `${faker.address.city()} ${faker.address.stateAbbr()}`; 
  var followers = Math.floor(Math.random() * 5000000);
  var image_url = faker.image.avatar();
  var pro_status = Math.floor(Math.random() * 2);
  return `${name},${location},${followers},${image_url},${pro_status}\n`;
}
/////////////////// ALBUMS SEEDING //////////////////////
function generateAlbumsCSV(dataPoints) {
  const writeAlbums = fs.createWriteStream('albums.csv');
  var start = new Date();
  var dataType = 'albums';
  writeMany(dataPoints, dataType, writeAlbums, 'utf-8', () => {
    writeAlbums.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
}
function albumSeedData() {
  // requires name, image, release year, media type
  var name = faker.company.bs();
  var image_url = 'http://lorempixel.com/640/480/food';
  var release_year = Math.floor(Math.random() * 50 + 1970);
  var media_type = 'Album';
  return `${name},${image_url},${release_year},${media_type}\n`;
}
/////////////////// TRACK GENRES SEEDING //////////////////////
function generateTrackGenresCSV(dataPoints) {
  const writeTrackGenres = fs.createWriteStream('track_genres.csv');
  var start = new Date();
  var dataType = 'track_genres';
  writeMany(dataPoints, dataType, writeTrackGenres, 'utf-8', () => {
    writeTrackGenres.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
}

function trackGenreSeedData(total, i) {
  // i is song id here
  // split i into percentages, 25% devoted to each main category
  // generate primary seedType
  // generate secondary seedType
  if (i > Math.floor(.75 * total)) {
    // POP
    var primarySeed = 1;
    var relatedGenreIDs = [0, 0, 0, 0, 0, 2, 3, 6, 7, 8, 9, 12];
    var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
    if (relatedGenreIDs[secondarySeed] === 0) {
      return `${i},${primarySeed}\n`
    } else {
      return `${i},${primarySeed}\n${i},${relatedGenreIDs[secondarySeed]}\n`
    }
  } else if (i > Math.floor(.5 * total) && i <= Math.floor(.75 * total)) {
    // ROCK/COUNTRY
    var primarySeed = Math.floor(Math.random() * 5); // random number between 0 - 4
    var primaryIDs = [2, 3, 4, 5, 6];
    var primaryID = primaryIDs[primarySeed];
    switch(primaryID) {
      // if 2 (rock), can be 1, 3, 4, 5, 6
      case 2:
        var relatedGenreIDs = [0, 0, 0, 1, 3, 4, 5, 6];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 3 (alt), can be 1, 2, 4, 5, 6
      case 3:
        var relatedGenreIDs = [0, 0, 0, 1, 2, 4, 5, 6];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 4 (heavy metal), can be 2, 3, 5
      case 4:
        var relatedGenreIDs = [0, 0, 2, 3, 5];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 5 (punk), can be 2, 3, 4
      case 5:
        var relatedGenreIDs = [0, 0, 2, 3, 4];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 6 (country), can be 1, 2, 3
      case 6:
        var relatedGenreIDs = [0, 0, 1, 2, 3];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
    }
    if (secondaryID === 0) {
      return `${i},${primaryID}\n`
    } else {
      return `${i},${primaryID}\n${i},${secondaryID}\n`
    }
  } else if (i > Math.floor(.25 * total) && Math.floor(i <= .5 * total)) {
    // R&B/RAP
    var primarySeed = Math.floor(Math.random() * 5); // random number between 0 - 4
    var primaryIDs = [7, 8, 9, 10, 11];
    var primaryID = primaryIDs[primarySeed];
    switch(primaryID) {
      // if 7 (r&b), can be 1, 8, 9, 10, 11
      case 7:
        var relatedGenreIDs = [0, 0, 0, 1, 8, 9, 10, 11];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 8 (hip hop), can be 1, 7, 9, 10, 11
      case 8:
        var relatedGenreIDs = [0, 0, 0, 1, 7, 9, 10, 11];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 9 (rap), can be 1, 7, 8, 10, 11
      case 9:
        var relatedGenreIDs = [0, 0, 0, 1, 7, 8, 10, 11];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 10 (jazz), can be 7, 8, 9, 11
      case 10:
        var relatedGenreIDs = [0, 0, 7, 8, 9, 11];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 11 (reggae), can be 7, 8, 9, 10
      case 11:
        var relatedGenreIDs = [0, 0, 7, 8, 9, 10];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
    }
    if (secondaryID === 0) {
      return `${i},${primaryID}\n`
    } else {
      return `${i},${primaryID}\n${i},${secondaryID}\n`
    }
  } else {
    // EDM
    var primarySeed = Math.floor(Math.random() * 3); // random number between 0 - 2
    var primaryIDs = [12, 13, 14];
    var primaryID = primaryIDs[primarySeed];
    switch(primaryID) {
      // if 12 (techno), can be 1, 13, 14
      case 12:
        var relatedGenreIDs = [0, 0, 1, 13, 14];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 13 (house), can be 12, 14
      case 13:
        var relatedGenreIDs = [0, 12, 14];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
      // if 14 (ambient), can be 12, 13
      case 14:
        var relatedGenreIDs = [0, 12, 13];
        var secondarySeed = Math.floor(Math.random() * relatedGenreIDs.length);
        var secondaryID = relatedGenreIDs[secondarySeed];
        break;
    }
    if (secondaryID === 0) {
      return `${i},${primaryID}\n`
    } else {
      return `${i},${primaryID}\n${i},${secondaryID}\n`
    }
  }
}

/////////////////// GENRE SEEDING //////////////////////
function generateGenreCSV(dataPoints) {
  const writeGenres = fs.createWriteStream('genres.csv');
  var start = new Date();
  var dataType = 'genres';
  writeMany(dataPoints, dataType, writeGenres, 'utf-8', () => {
    writeGenres.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
};

function genreSeedData(i) {
  var genres = ['ambient', 'house', 'techno', 'reggae', 'jazz', 'rap', 'hip hop', 'r&b', 'country', 'punk rock', 'heavy metal', 'alternative rock', 'rock', 'pop'];
  return `${genres[i - 1]}\n`;
};
/////////////////// TRACK SEEDING //////////////////////
function generateTracksCSV(dataPoints) {
  const writeTracks = fs.createWriteStream('tracks.csv');
  var start = new Date();
  var dataType = 'tracks';
  writeMany(dataPoints, dataType, writeTracks, 'utf-8', () => {
    writeTracks.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
};

function trackSeedData() {
  var title = faker.commerce.productName(); // 3 word title
  var image_url = 'http://lorempixel.com/640/480/cats'; // don't need to random generate
  // var seedType = Math.floor(Math.random() * 10);
  var seedType = 'default';
  switch(seedType) {
    // LOW POPULARITY
    case (seedType < 4):                  
      var comments = Math.floor(Math.random() * 10000); // 0 - 10K comments
      var plays = Math.floor(Math.random() * 5000000); // 0 - 5M plays
    // MED POPULARITY
    case (seedType >= 4 && seedType < 8): 
      var comments = Math.floor(Math.random() * 10000 + 10000); // 10 - 20K comments
      var plays = Math.floor(Math.random() * 95000000 + 5000000); // 5 - 100M plays
    // HIGH POPULARITY
    case (seedType >= 8):                 
      var comments = Math.floor(Math.random() * 30000 + 20000); // 20 - 50K comments
      var plays = Math.floor(Math.random() * 400000000 + 100000000); // 100 - 500M plays
    // RANDOM
    default:                              
      var comments = Math.floor(Math.random() * 50000); // 0 - 50K comments
      var plays = Math.floor(Math.random() * 500000000); // 0 - 500M plays
  }
  return `${title},${comments},${plays},${image_url}\n`;
};
////////////// USER SEEDING /////////////////
function generateUsersCSV(dataPoints) {
  const writeUsers = fs.createWriteStream('users.csv');
  var start = new Date();
  var dataType = 'users';
  writeMany(dataPoints, dataType, writeUsers, 'utf-8', () => {
    writeUsers.end();
    var end = new Date();
    console.log('time to complete: ', end - start);
  });
};

function userSeedData() {
  var name = faker.name.findName();
  var image_url = faker.image.avatar();
  // var seedType = Math.floor(Math.random() * 15);
  var seedType = 'default';
  switch(seedType) {
    // LOW POPULARITY
    case (seedType < 8):                   
      var followers = Math.floor(Math.random() * 5000); // 0 - 5K followers
    // MED POPULARITY
    case (seedType >= 8 && seedType < 13): 
      var followers = Math.floor(Math.random() * 5000 + 5000); // 5 - 10K followers
    // HIGH POPULARITY
    case (seedType >= 13):                 
      var followers = Math.floor(Math.random() * 40000 + 10000); // 10 - 50K followers
    // RANDOM
    default:
      var followers = Math.floor(Math.random() * 50000); // 0 - 50K followers
  }
  return `${name},${followers},${image_url}\n`;
};

/////////////////////// ENCRYPTION ///////////////////////////

// const gzipRead = fs.createReadStream('tracks.csv');
// const gzipWrite = fs.createWriteStream('tracks.csv.gz');

// gzipRead.pipe(gzip).pipe(gzipWrite);

// const gzipRead = fs.createReadStream('tracks.csv.gz');
// const gzipWrite = fs.createWriteStream('tracks10.csv');

// gzipRead.pipe(gunzip).pipe(gzipWrite);