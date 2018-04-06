const Lifestyle = require('./Lifestyle')
const lifestyleController = {}

    lifestyleController.post = (req,res)=>{
        console.log(req.file)
        const lifestyle = new Lifestyle({
            model_name:req.body.model_name,
            imageUrl:req.file.filename
        })
        lifestyle.save().then((newLifestyle)=>{
            req.flash('success', 'Added Successfully')
            res.redirect('/lifestyle/1')
        }).catch((e)=>{
            req.flash('error','An Error Has Occured')
            res.render('lifestyle/index')
        })
    }
    lifestyleController.index = (req,res) =>{
        const page = req.params.page || 1
        const perPage = 10
        Lifestyle.find({}).skip((perPage * page)-perPage).limit(perPage).then((lifestyles)=>{
            Lifestyle.count().then((count)=>{
                res.render('lifestyle',{
                    lifestyles:lifestyles,
                    current:page,
                    pages: Math.ceil( count / perPage)
                })
            })
        }).catch((err)=>{
            res.status(500).json({
                message:err
            })
        })
    }
    lifestyleController.delete = (req,res) => {
        Lifestyle.findByIdAndRemove({_id:req.params.id}).then((life)=>{
            req.flash('success','Deleted Successfully')
            res.redirect('/lifestyle')
        }).catch((e)=>{
            req.flash('error','An Error Has Occured')
            res.redirect('/lifestyle/1')
        })
    }

    module.exports = lifestyleController;
