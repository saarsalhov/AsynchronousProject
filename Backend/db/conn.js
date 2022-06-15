const { MongoClient } = require("mongodb");
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

const connectionString = process.env.ATLAS_URI;



module.exports = {
  connectToServer:async function () {
    const client = new MongoClient(connectionString);
    client.connect(function(err){
      if(err) throw err
    })
    return client;
  },
};







// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// async function main(){
//   /**
//    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//    */

//   const client = new MongoClient(connectionString);

//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // Make the appropriate DB calls
//       await listDatabases(client);

//   } catch (e) {
//       console.error(e);
//   } finally {
//       await client.close();
//   }
// }

// main().catch(console.error);