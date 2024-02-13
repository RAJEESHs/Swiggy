//Express is a dependency file whereas Nodemmon developer friendly file: npm install nodemon --save-de
const bodyparser =require('body-parser')
const express =require('express')
const mongoose =require('mongoose')

const {Restaurants,Users}=require('./schema.cjs')

const app =express()
app.use(bodyparser.json())
// app.listen(8000, function() {
//     console.log(Listening on port 8000)
// })

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://rajeeshkanagaraj99:0204@cluster0.d8kgd7t.mongodb.net/?retryWrites=true&w=majority')

        console.log('Connection Established ;)')
        const port = 8000
        app.listen(port, function() {
            console.log(Listening on port ${port}...)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t Establish connection :(')
    }
}

connectToDb()

// /add_restaurant : post
// /get-restaurant details :get
// /create-new-user :post
// /validate-user :post

app.post('/add-restaurant',async (request,response)=>{
    try{    await Restaurants.create({
            "name":request.body.name,
            "res_info":request.body.res_info,
            "cuisines":request.body.cuisines,
            "area":request.body.area
            })
            response.status(201).json({
                "status":"success",
                "message":"Restaurant added"
            })
       }
    catch(error)
    {   
        console.log(error)
        response.status(500).json({
            "status":"Error occoured",
            "message":error
            
        })
    }     
})

//get-restaurants :it is  a api for getting all the list of restaurant fata from the database
app.get('/get-restaurant-details',async function (request,response){
    try{
        const restaurantDetails =await Restaurants.find()
        response.json(restaurantDetails)
    }catch(error){ 

        response.status(500).json({
        "status":"Error occoured",
        "message":"could not fetch",
        "error":error
        })
    }
})

//Post details of Users
app.post('/add-Users',async (request,response)=>{
    try{    await Users.create({
            "name":request.body.name,
            "contact":request.body.contact,
            "email":request.body.email,
            "place":request.body.place
            })
            response.status(201).json({
                "status":"success",
                "message":"User created"
            })
       }
    catch(error)
    {   
        console.log(error)
        response.status(500).json({
            "status":"Error occoured",
            "message":error
            
        })
    }     
})