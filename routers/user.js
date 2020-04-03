const express =require('express')
const CategoryCollection=require('../models/category')
const OrderSCollection = require('../models/order')
const ProductsCollection = require('../models/product')
const router = express.Router()
require('dotenv').config()
const apiAuth =require('../auth/auth')


//Insert bulk category
router.post('/api/category/insert',apiAuth,async(req,res)=>
{
    try{
        const data = await req.body
        console.log(data)
        const post = await CategoryCollection.insertMany(data)
        res.status(200).json({
            message:"successful insert category!!!!!",
            post
        })
    }
    catch(e)
    {
        res.send(e)
    }
    
})
//Insert Bulk Product
router.post('/api/product/insert',apiAuth,async(req,res)=>
{
    try{
        const data = await req.body
        console.log(data)
        const post = await ProductsCollection.insertMany(data)
        res.status(200).json({
            message:"successful insert!!!!!",
            post
        })
    }
    catch(e)
    {
        res.send(e)
    }
    
})

  //User can filter by a Category
  router.get('/api/categoryfind/:name',apiAuth,async(req,res)=>
{
    
    try{
        const data = req.params.name
        console.log(data)
        const user =await CategoryCollection.find({
           name:req.params.name
        })
        //res.send(user)
            .populate('products')
            .exec(function(err,user)
        {
            if(err){
                console.log(err)
            }
            else{
                console.log("hii")
                console.log(user)
                res.send(user)
            }
        })
        }catch{
            res.status(500).send("not found")
        }

    
})

///find the product by a range
router.get('/api/product/range',apiAuth,async(req,res)=>
{
    const a = parseInt(req.query.h)
    console.log(a)
    const b = parseInt(req.query.l)
    console.log(b)
    try{
        const data1 = await ProductsCollection.find({"price":{$gte:b,$lte:a}})
        .populate('categoryId')
        .exec(function(err,user)
        {
            if(err){
                console.log(err)
            }
            else{
                console.log(user)
                res.send(user)
            }
        })
        if(data1 == '')
        {
            res.status(404).send("not find the record")
        }
        
    }catch{
        res.send.json({
            message:"errore"
        })
    }
     })

     //Api for last 7 days
     router.get('/api/last7days',async(req,res)=>
{
    
    try{
        const a =new Date((new Date().getTime()-(7 * 24 * 60 * 60 * 1000)))
        console.log(a)
        const post = await  OrderSCollection.find({
            "createdAt":{
                $gte:new Date((new Date().getTime()-(7 * 24 * 60 * 60 * 1000)))
            }
        }).sort({"createdAt":-1})
        res.send(post)
        res.status(200).send()
    }catch{
        res.status(404).json({
            
   
            message:"not find the record"
        })
    }
})