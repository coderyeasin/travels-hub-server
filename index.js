const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//root server
app.get('/', (req, res) => {
    res.send('start journey with us')
})

//db connected
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tie3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

async function server() {
    try {
        await client.connect();

        const database = client.db('travels_info')
        const tourplanCollection = database.collection('tourism')

        console.log('database is connected');

        //GET API
        app.get('/tourism', async (req, res) => {
            console.log('dekho body te', req.body);
            // const tourInfo = req.body;
            const result = await tourplanCollection.find({}).toArray()
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
}
server().catch(console.dir)




app.listen(port, () => {
    console.log(`guys listening port is: ${port}`);
})


