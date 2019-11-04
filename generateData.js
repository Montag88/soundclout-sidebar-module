const faker = require('faker');
const fs = require('fs');
// const zlib = require('zlib');
// const gzip = zlib.createGzip();
// const gunzip = zlib.createGunzip();

var numTracks = 1000000;
var numUsers = 1400000;
// generateUsersCSV(numUsers);
// generateTracksCSV(numTracks);
// generateTrackGenresCSV(numTracks); // ends up with ~1.6x datapoints
// generateGenreCSV(14); // Fixed amount for number of genres

// generateAlbumsCSV
// generateTrackAlbumsCSV

// generateArtistsCSV
// generateTrackArtistsCSV

// generatePlaylistsCSV
// generateTrackPlaylistsCSV

// generateTrackLikesCSV
// generateTrackRepostsCSV

function writeMany(i, dataType, writer, encoding, callback) {
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
        case 'albums':
          break;
        case 'track_albums':
          var total;
          if (!total) {
            total = i;
          }
          break;
      }
      if (i === 0) {
        writer.write(data, encoding, callback); // STANDARD FORMAT FOR WRITER.WRITE
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        isBufferAvailable = writer.write(data, encoding);
      }
    } while (i > 0 && isBufferAvailable);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

/////////////////// TRACK LIKES SEEDING //////////////////////



/////////////////// TRACK REPOSTS SEEDING //////////////////////


/////////////////// ARTISTS SEEDING //////////////////////


/////////////////// ALBUMS SEEDING //////////////////////
function generateAlbumsCSV(dataPoints) {
  const writeAlbums = fs.createWriteStream('albums.csv');
  var dataPoints = dataPoints;
  var dataType = 'albums';
  writeMany(dataPoints, dataType, writeAlbums, 'utf-8', () => {
    writeAlbums.end();
  });
}

function albumSeedData() {
  // generate seedType
}
/////////////////// SONG GENRES SEEDING //////////////////////
function generateTrackGenresCSV(dataPoints) {
  const writeTrackGenres = fs.createWriteStream('track_genres.csv');
  var dataPoints = dataPoints;
  var dataType = 'track_genres';
  writeMany(dataPoints, dataType, writeTrackGenres, 'utf-8', () => {
    writeTrackGenres.end();
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
  var dataPoints = dataPoints;
  var dataType = 'genres';
  writeMany(dataPoints, dataType, writeGenres, 'utf-8', () => {
    writeGenres.end();
  });
};

function genreSeedData(i) {
  var genres = ['ambient', 'house', 'techno', 'reggae', 'jazz', 'rap', 'hip hop', 'r&b', 'country', 'punk rock', 'heavy metal', 'alternative rock', 'rock', 'pop'];
  return `${genres[i]}\n`;
};
/////////////////// TRACK SEEDING //////////////////////
function generateTracksCSV(dataPoints) {
  const writeTracks = fs.createWriteStream('tracks.csv');
  var dataPoints = dataPoints;
  var dataType = 'tracks';
  writeMany(dataPoints, dataType, writeTracks, 'utf-8', () => {
    writeTracks.end();
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
  var dataPoints = dataPoints;
  var dataType = 'users';
  writeMany(dataPoints, dataType, writeUsers, 'utf-8', () => {
    writeUsers.end();
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