var neo4j = require('neo4j-driver').v1;
// Create a driver instance, for the user neo4j with password neo4j.
// It should be enough to have a single driver per database per application.
var driver = neo4j.driver(
  'bolt://localhost/',
  neo4j.auth.basic('neo4j','neo'),
  { 
    maxTransactionRetryTime: 30000,
    MaxConnectionPoolSize: 100,
    connectionTimeout: 20 * 1000
  }
);

console.log('session connected');
// const write = driver.session(neo4j.WRITE);
// const read = driver.session(neo4j.READ);

// var session = driver.session();



// Close the driver when application exits.
// This closes all used network connections.
// await driver.close();


// module.exports = {write, read};
module.exports = driver;