const db = require('../models')
const path =require('path')
const multer =require('multer')
const creativeArtController = {}



creativeArtController.get = (req,res)=>{
    res.render('creativeArt/create')
}
creativeArtController.post = (req,res)=>{
    const creativeArt = new db.CreativeArt({
        model_name:req.body.model_name,
        imageUrl:req.file.path
    })
    creativeArt.save().then((newCreativeArt)=>{
        return res.status(200).json({
            success:true,
            data:newCreativeArt
        })
    }).catch((e)=>{
        return res.status(500).json({
            message:e
        })
    })
}
    creativeArtController.index = (req,res) =>{
        db.CreativeArt.find({}).then((creativeArt)=>{
            res.render('creativeArt/index',{creativeArt})
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    creativeArtController.getOne = (req,res) => {
        db.CreativeArt.findById({_id:req.params.id}).then((art)=>{
            return res.status(200).json({
                success:true,
                data:art
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    creativeArtController.delete = (req,res) => {
        db.CreativeArt.findByIdAndRemove({_id:req.params.id}).then((art)=>{
            return res.status(200).json({
                success:true,
                data:art
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = creativeArtController;
