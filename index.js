const express = require('express')
const app = express()
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware

app.use(cors());
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p0swuvy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const projectCollection = client.db("portfolio").collection("project");

        app.get('/project', async (req, res) => {
            const query ={};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })
    }
    finally { }
}


run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World! Im comming')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

