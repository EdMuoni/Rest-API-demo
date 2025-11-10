const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); //cross origin resource error avoid
app.use(express.json());

const thingamabobs = [
    {id: 1, name: "plumbus", price: 34.59},
    {id: 2, name: "van furby", price: 666},
    {id: 3, name: "sapakas", price: 2000}
];

//Get all thingamabobs
app.get('/thingamabobs', (req, res) => {res.send(thingamabobs)})

//Get thingamabobs by id
app.get('/thingamabobs/:id', (req, res) => 
{
    if (typeof thingamabobs[req.params.id - 1] === 'undefined') 
    {
        return res.status(404).send({error:"Object not found. Check your thingamabob id."});
    }
    
})

//Delete thingamabobs by id
app.delete('/thingamabobs/:id', (req, res) => 
{
    if (typeof thingamabobs[req.params.id - 1] === 'undefined') 
    {
        return res.status(404).send({error:"Object not found. Check your thingamabob id."});  
    }
    // Actually delete the item
    thingamabobs.splice(req.params.id - 1, 1);
    res.status(204).send(); 
})

//Post new thingamabobs
app.post('/thingamabobs', (req, res) => {
    if (!req.body.name || !req.body.price) 
    {
        return res.status(400).send({error:"One or multiple parameters are missing"});  
    }
    let newThingy = {
        id: thingamabobs.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    thingamabobs.push(newThingy);
    res.status(201).location('localhost:8080/thingamabobs/' + (thingamabobs.length - 1)).send(newThingy);
})

//Clients

app.get('/clients', (req, res) => {
    res.send(clients);
});

const clients = [
    {id: 1, name: "Toomas", email: "Toomas@Toomas.com"},
    {id: 2, name: "Ruby", email: "Ruby@Ruby.com"},
    {id: 3, name: "Moos", email: "Moos@Moos.com"}
];

app.get('/clients', (req, res) => {res.send(clients)})

//getting the clients by id
app.get('/clients/:id', (req, res) => 
{
    if (typeof clients[req.params.id - 1] === 'undefined') 
    {
        return res.status(404).send({error:"Object not found. Check your thingamabob id."});
    }
    return res.send(clients[req.params.id - 1]);
})

app.delete('/clients/:id', (req, res) => 
{
    if (typeof clients[req.params.id - 1] === 'undefined') 
    {
        return res.status(404).send({error:"Object not found. Check your thingamabob id."});  
    }
    // Actually delete the item
    clients.splice(req.params.id - 1, 1);
    res.status(204).send(); 
})

//post new clients
app.post('/clients', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({error: "One or multiple parameters are missing (name, email)"});
    }
    let newClient = {
        id: clients.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    clients.push(newClient);
    res.status(201).location('localhost:8080/clients/' + newClient.id).send(newClient);
});

app.patch('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Object not found. Check your thingamabob id."});
    }
    if (req.body.name) {
        clients[req.params.id - 1].name = req.body.name;
    }
    if (req.body.email) {
        clients[req.params.id - 1].email = req.body.email;
    }
    res.status(200).send(clients[req.params.id - 1]);
});

app.put('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Object not found. Check your clients id."});
    }
    if (!req.body.name || !req.body.email) {
        return res.status(400).send({error: "One or multiple parameters are missing (name, email)"});
    }
    clients[req.params.id - 1].name = req.body.name;
    clients[req.params.id - 1].email = req.body.email;
    res.status(200).send(clients[req.params.id - 1]);
})

app.listen(8080, () => {console.log(`API running at http://localhost:8080`)})