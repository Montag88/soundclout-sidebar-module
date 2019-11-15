const driver = require('./neoIndex.js');
var neo4j = require('neo4j-driver').v1;


const getTrackInfo = (trackid, callback) => {
  // console.log('trackid', trackid);

  // var query =
  //   `
  //     MATCH (t:Tracks {id: $trackid})<-[likes:LIKED]-(user:Users)
  //     RETURN COUNT(likes) AS likes
  //   `;
  // var query = 
  //   `
  //     MATCH (t:Tracks {id: $trackid})
  //     RETURN t, SIZE((:Users)-[:LIKED]->(t)) AS likes, SIZE((:Users)-[:REPOSTED]->(t)) AS reposts
  //   `;

  var query = 
    `
      MATCH (t:Tracks {id: $trackid})<-[:SINGS]-(a:Artists), (t)-[:IS_GENRE]->(g:Genres)
      RETURN a AS artist, COLLECT(g.type) AS genre 
    `;
  var queryParams = {trackid: trackid};
  // session
  //   .run(query, queryParams)
  //   .then(result => {
  //     callback(null, neo4j.integer.toNumber(result.records[0].get('likes')));
  //   })
  //   .catch(error => {console.log(error)})
  //   .then(() => session.close())

  readNeo4j(query, queryParams, callback);
};


function readNeo4j(query, queryParams, callback) {
  const session = driver.session(neo4j.READ);

  var readTxPromise = session.readTransaction(
    (tx) => {return tx.run(query, queryParams)}
  )
  readTxPromise
    .then(result => {
      // console.log('RESULT RECORDS FROM PROM: ', result.records[0].get('artist').properties);
      // var artist = neo4j.integer.toNumber(result.records[0].get('artist'));

      var artists = [];
      var records = result.records;
      records.map((r) => {
        var currentArtist = r.get('artist').properties;
        var name = currentArtist.name;
        var location = currentArtist.location;
        var id = neo4j.integer.toNumber(currentArtist.id);
        var followers = neo4j.integer.toNumber(currentArtist.followers);
        var image_url = currentArtist.image_url;
        artists.push({name, location, id, followers, image_url})
      })

      var genres = records[0].get('genre');

      callback(null, {artists, genres});
    })
    .catch(error => {
      console.log('ERROR: ', error)
      // callback(error);
    })
    .then(() => session.close())
};

function writeNeo4j(query, queryParams, callback) {
  var writeTxPromise = session.writeTransaction(
    (tx) => {tx.run(query, queryParams)}
  )
  writeTxPromise
    .then(result => {
      // session.write.close();
      if (result) {
        // console.log(result);
        callback(null, result);
      }
    })
    .catch(error => callback(error))
};

module.exports = {getTrackInfo};