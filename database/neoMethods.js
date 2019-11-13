const driver = require('./neoIndex.js');
var neo4j = require('neo4j-driver').v1;


const getTrackInfo = (trackid, callback) => {
  // console.log('trackid', trackid);

  var query =
    `
      MATCH (t:Tracks {id: toInteger($trackid)})<-[likes:LIKED]-(user:Users)
      RETURN COUNT(likes) AS likes
    `;
  var queryParams = {trackid: trackid};
  // session
  //   .run(query, queryParams)
  //   .then(result => {
  //     // console.log('RESULT', result);
  //     // console.log('RECORDS', result.records);
  //     // result.records.forEach(record => {
  //       // console.log(record.get('name'))
  //     // })
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
      // this will have to be modified to return many results
      // var singleRecord = result.records[0];
      // console.log('RESULT RECORDS', singleRecord);
      // console.log('singlerecord',singleRecord.get('likes'));
      // var x = neo4j.integer.toNumber(singleRecord.get('likes'));
      // console.log('x',arguments);
      callback(null, neo4j.integer.toNumber(result.records[0].get('likes')));
    })
    .catch(error => {
      console.log('ERROR: ', error)
      // callback(error);
    })
    // .then(() => session.read.close())
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