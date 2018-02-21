const db = require('../models')
const path =require('path')
const multer =require('multer')
const potraitController = {}


potraitController.getCreate = (req,res)=>{
    res.render('potraits/create')
}
potraitController.post = (req,res)=>{
    const potrait = new db.Potrait({
        model_name:req.body.model_name,
        imageUrl:req.file.path
    })
    potrait.save().then((newPotrait)=>{
        return res.status(200).json({
            success:true,
            data:newPotrait
        })
    }).catch((e)=>{
        return res.status(500).json({
            message:e
        })
    })
}
    potraitController.index = (req,res) =>{
        db.Potrait.find({}).then((potraits)=>{
            res.render('potraits/index',{potraits})
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    potraitController.getOne = (req,res) => {
        db.Potrait.findById({_id:req.params.id}).then((pot)=>{
            return res.status(200).json({
                success:true,
                data:pot
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    potraitController.delete = (req,res) => {
        db.Potrait.findByIdAndRemove({_id:req.params.id}).then((pot)=>{
            return res.status(200).json({
                success:true,
                data:pot
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = potraitController;
