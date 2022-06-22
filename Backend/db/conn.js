const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const connectionString = process.env.ATLAS_URI;


module.exports = {
    connectToServer: async function () {
        const client = new MongoClient(connectionString);
        client.connect(function (err) {
            if (err) throw err;
        })
        return client;
    },
};