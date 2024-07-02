const express = require('express'); 
const mongoose = require('mongoose');
const Product = require('./models/productModel.js');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// fetch products
app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// fetch a product by ID
app.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// post a product
app.post('/product', async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// update a product
app.put('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we can't find any product in Database.
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete a product
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // we can't find any product in Database.
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});

    }
})

app.listen(3000, ()=>{
    console.log(`Node API app is running on port 3000`);
})

mongoose.connect('mongodb+srv://tejasasawale2607:tejas@cluster0.vugxmfz.mongodb.net/')
.then(() =>{
    console.log('connected to MongoDB...')
}).catch((error)=>{
    console.log(error)
})