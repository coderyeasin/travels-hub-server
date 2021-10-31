const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId


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
        const touristCollection = client.db('tourist').collection('users')

        // console.log('database is connected');
            //POST API -users
            app.post('/tourism', async (req, res) => {
                const newUser = req.body;
                const result = await tourplanCollection.insertOne(newUser)
                res.send(result)
            })
         //GET API
        app.get('/tourism', async (req, res) => {
            console.log('dekho body te', req.body);
            // const tourInfo = req.body;
            const result = await tourplanCollection.find({}).toArray()
            res.send(result)
        })

    
       //POST API -users
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await touristCollection.insertOne(newUser)
            res.send(result)
        })

        //GET API -users 
        app.get('/users', async (req, res) => {
            console.log('you can', req.body);
            // const tourInfo = req.body;
            const result = await touristCollection.find({}).toArray()
            res.send(result)
        })
        //myZone
        app.get('/myzones/:email', async (req, res) => {
            const result = await touristCollection.find({email: req.params.email}).toArray()
            res.send(result)
        })

        //delete
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await touristCollection.deleteOne(query)
            res.json(result)
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

