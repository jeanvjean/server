const db = require('../models')
const path =require('path')
const multer =require('multer')
const lifestyleController = {}



lifestyleController.get = (req,res)=>{
    res.render('lifestyle/create')
}
lifestyleController.post = (req,res)=>{
    const lifestyle = new db.Lifestyle({
        model_name:req.body.model_name,
        imageUrl:req.file.path
    })
    lifestyle.save().then((newLifestyle)=>{
        return res.status(200).json({
            success:true,
            data:newLifestyle
        })
    }).catch((e)=>{
        return res.status(500).json({
            message:e
        })
    })
}
    lifestyleController.index = (req,res) =>{
        db.Lifestyle.find({}).then((lifestyles)=>{
            res.render('lifestyle/index',{lifestyles})
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    lifestyleController.getOne = (req,res) => {
        db.Lifestyle.findById({_id:req.params.id}).then((life)=>{
            return res.status(200).json({
                success:true,
                data:life
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    lifestyleController.delete = (req,res) => {
        db.Lifestyle.findByIdAndRemove({_id:req.params.id}).then((life)=>{
            return res.status(200).json({
                success:true,
                data:life
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = lifestyleController;
