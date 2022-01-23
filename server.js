const express = require("express");
const app = express();
const port = 8000;
const faker = require("@faker-js/faker");
const res = require("express/lib/response");

app.use ( express.json() );
app.use ( express.urlencoded({ extended: true }) );


// note for instructor: demo code below from your lecture, assignment-specific code begins on line 59

let shoppingList = [
  {itemName: "Rice Cooker", shop: "Amazon", price: 120},
  {itemName: "Rice ", shop: "rice store", price: 2}
]

// get all items
app.get("/api/items",(req,res)=> {
  res.json(shoppingList)
})

// get one item

app.get("/api/items/:id",(req,res)=> {
  const id = req.params.id
  res.json(shoppingList[id])
})

// post 

app.post("/api/items",(req,res)=> {
  shoppingList.push(req.body)
  res.json({status: "create ok"})
})

// update one item... like combining get one and post

app.put("/api/items/:id",(req,res)=> {
  const id = req.params.id
  shoppingList[id] = req.body
  res.json({status: "update ok"})
})

// delete

app.delete("/api/items/:id", (req,res) => {
  const id = req.params.id
  shoppingList.splice(id, 1)
  res.json({status: "delete ok" })
})

// test faker request

app.get("/api/faker/randomName", (req,res)=>{
  let randomName = faker.name.firstName()
  res.json({randomName: randomName})
})

class User {
  constructor() {
    this.__id = faker.datatype.number();
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.phoneNumber = faker.phone.phoneNumber();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }
}

class Company {
  constructor() {
    this.__id = faker.datatype.number();
    this.name = faker.company.companyName();
    this.address = {}
    this.address.street = faker.address.streetAddress();
    this.address.city = faker.address.city();
    this.address.state = faker.address.state();
    this.address.zip = faker.address.zipCode();
    this.address.country = faker.address.country();
  }
}

app.get("/api/users/new",(req,res)=>{
  let randomUser = new User()
  res.json(randomUser)
})

app.get("/api/companies/new",(req,res)=>{
  let randomCompany = new Company()
  res.json(randomCompany)
})

app.get("/api/user/company",(req,res)=>{
  let newCompany = new Company()
  let newUser = new User()
  res.json({newCompany, newUser})
})

const server = app.listen(8000, () =>
  console.log(`Server loaded on port ${server.address().port}!`)
);
