const db = require('../models')
const path =require('path')
const multer =require('multer')
const beautyController = {}

beautyController.get = (req,res)=>{
    res.render('beauty/create')
}
beautyController.post = (req,res)=>{
    const beauty = new db.Beauty({
        model_name:req.body.model_name,
        imageUrl:req.file.filename
    })
    beauty.save().then((beauty)=>{
     req.flash('success', 'Added Successfully')
     res.redirect('/beauty')
    }).catch((e)=>{
        return res.render('beauty/index')
    })
}
    beautyController.index = (req,res) =>{
        db.Beauty.find({}).then((beauty)=>{
            res.render('beauty/index',{beauty})
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    beautyController.getOne = (req,res) => {
        db.Beauty.findById({_id:req.params.id}).then((beauty)=>{
            return res.status(200).json({
                success:true,
                data:beauty
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }
    beautyController.delete = (req,res) => {
        db.Beauty.findByIdAndRemove({_id:req.params.id}).then((beauty)=>{
            return res.status(200).json({
                success:true,
                data:beauty
            })
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = beautyController;
