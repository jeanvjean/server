const db = require('../models')
const path =require('path')
const multer =require('multer')
const lifestyleController = {}



lifestyleController.get = (req,res)=>{
    res.render('lifestyle/create')
}
lifestyleController.post = (req,res)=>{
    console.log(req.file)
    const lifestyle = new db.Lifestyle({
        model_name:req.body.model_name,
        imageUrl:req.file.filename
    })
    lifestyle.save().then((newLifestyle)=>{
        return res.redirect('/lifestyle')
    }).catch((e)=>{
        return res.status(500).json({
            message:e
        })
    })
}
    lifestyleController.index = (req,res) =>{
        db.Lifestyle.find({}).then((lifestyles)=>{
            console.log(lifestyles)
            res.render('lifestyle/index',{lifestyles:lifestyles,msg:'Upload successful'})
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
