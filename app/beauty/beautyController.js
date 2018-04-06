const Beauty = require('./Beauty')
const beautyController = {}


beautyController.post = (req,res)=>{
    const beauty = new Beauty({
        model_name:req.body.model_name,
        imageUrl:req.file.filename
    })
    beauty.save().then((beauty)=>{
     req.flash('success', 'Added Successfully')
     res.redirect('/beauty/1')
    }).catch((e)=>{
        req.flash('success', 'Saved Successfully')
        res.redirect('/beauty')
    })
}
    beautyController.index = (req,res) =>{
        const page = req.params.page || 1
        const perPage = 10
        Beauty.find({}).skip((perPage * page) - perPage).limit(perPage).then((beauty)=>{
            Beauty.count().then((count)=>{
                res.render('beauty/index',{
                    beauty:beauty,
                    current:page,
                    pages: Math.ceil(count / perPage)
                })
            }).catch((e)=>{
                console.log(e)
            })
        }).catch((err)=>{
            req.flash('error', 'an error occured while trying to fetch data')
            res.render('/beauty/index')
        })
    }
    beautyController.delete = (req,res) => {
        Beauty.findByIdAndRemove({_id:req.params.id}).then((beauty)=>{
            req.flash('success', 'Deleted')
            res.redirect('/beauty/1')
        }).catch((e)=>{
            req.flash('error','Could Not Delete')
            return res.render('/beauty/index',)
        })
    }


    module.exports = beautyController;
