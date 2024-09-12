const Product = require('../models/Product');
const path = require('path');

const createProduct = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ status: "failure", error: "Title is missing" });
  }
  if (!req.body.description) {
    return res.status(400).json({ status: "failure", error: "Description is missing" });
  }
  try {
    const product = await Product.create({
      ...req.body,
      thumbnail: req.file ? req.file.filename : undefined, 
    });
    
    const productWithImageUrl = {
      ...product.toObject(),
      thumbnail: `https://0f4b9b60-3d04-421d-9fcb-ade65fca405d-00-1tjtnbqfb0b80.picard.replit.dev/uploads/${product.thumbnail}`
    };
    res.status(201).json({ status: "success", data: productWithImageUrl });
  } catch (err) {
    res.status(500).json({ status: "failure", error: err.message });
  }
};



const getAllProducts=async (req,res)=>{
  try{
  const products=await Product.find()
  
  res.json({status:"success",data:products,count:products.length})
  }
  catch(err){
    res.status(500).json({status:"failure",error: err.message})

  }
}

const getProduct=async (req,res)=>{
  try{
  const product=await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ status: "failure", error: "Product not found" });
    }
  res.json({status:"success",data:product})
  }
  catch(err){
    if (err.name === 'CastError') {
      return res.status(400).json({ status: "failure", error: "Invalid product ID" });
    }
    res.status(500).json({status:"failure",error: err.message})
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = { ...req.body };

  
    if (req.file) {
      updateData.thumbnail = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ status: "failure", error: "Product not found" });
    }

   
    const productWithImageUrl = {
      ...updatedProduct.toObject(),
      thumbnail: `https://0f4b9b60-3d04-421d-9fcb-ade65fca405d-00-1tjtnbqfb0b80.picard.replit.dev/uploads/${updatedProduct.thumbnail}`
    };

    res.json({ status: "success", data: productWithImageUrl });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ status: "failure", error: "Invalid product ID" });
    }
    res.status(500).json({ status: "failure", error: err.message });
  }
};

const deleteProduct=async (req,res)=>{
  try{
  const product=await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ status: "failure", error: "Product not found" });
    }
  res.json({status:"success",data:product})
  }
  catch(err){
    if (err.name === 'CastError') {
      return res.status(400).json({ status: "failure", error: "Invalid product ID" });
    }
    res.status(500).json({status:"failure",error: err.message})
  }
}


module.exports={createProduct,getAllProducts,getProduct,updateProduct,deleteProduct}