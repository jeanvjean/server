const db = require('../models')
const path =require('path')
const multer =require('multer')
const weddingController = {}



    weddingController.getCreate = (req,res)=>{
        res.render('weddings/create')
    }
    weddingController.post = (req,res)=>{
        console.log(req.file)
        const lifestyle = new db.Wedding({
            event_name:req.body.event_name,
            imageUrl:req.file.path
        })
        lifestyle.save().then((newWedding)=>{
            return res.status(200).json({
                success:true,
                data:newWedding
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    weddingController.index = (req,res) =>{
        db.Wedding.find({}).then((weddings)=>{
            res.render('weddings/index',{weddings})
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    weddingController.getOne = (req,res) => {
        db.Wedding.findById({_id:req.params.id}).then((wed)=>{
            return res.status(200).json({
                success:true,
                data:wed
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    weddingController.delete = (req,res) => {
        db.Wedding.findByIdAndRemove({_id:req.params.id}).then((wed)=>{
            return res.status(200).json({
                success:true,
                data:wed
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = weddingController;
