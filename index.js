const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ada80.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const serviceCollection = client.db('bd_tools').collection('tools');
      const orderCollection = client.db('bd_tools').collection('orders');
        
      app.get('/service', async (req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });
      app.get('/booking', async (req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });
    
      app.get('/orders', async (req, res) => {
        const query = {};
        const cursor = orderCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });
      app.get('/contact', async (req, res) => {
        const query = {};
        const cursor = orderCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });

      app.get('/service/:purchaseId', async(req, res) =>{
        const id = req.params.purchaseId;
        const query = {_id: ObjectId(id)};
        const detailService = await serviceCollection.findOne(query);
        res.send(detailService);
      })

      app.post('/orders', async (req, res) => {
        const itemBooking = req.body;
        const query = { name: itemBooking.name, qty: itemBooking.qty, price: itemBooking.price, user: user.email}
        const exists = await orderCollection.findOne(query);
        if (exists) {
          return res.send({ success: false, itemBooking: exists })
        }
        const result = await orderCollection.insertOne(itemBooking);
        sendAppointmentEmail(itemBooking);
        return res.send({ success: true, result });
      });
    }
    finally {
  
    }
  }
  
  run().catch(console.dir);
  
  
  app.get('/', (req, res) => {
    res.send('My database server is running')
  })
  
  app.listen(port, () => {
    console.log(`BD Tools is listening as:  ${port}`)
  })