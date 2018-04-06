const CreativeArt = require('./CreativeArt')
const creativeArtController = {}



creativeArtController.post = (req,res)=>{
    const creativeArt = new CreativeArt({
        model_name:req.body.model_name,
        imageUrl:req.file.filename
    })
    creativeArt.save().then((newCreativeArt)=>{
        req.flash('success','Saved Successfully')
        res.redirect('/creativeArt/1')
    }).catch((e)=>{
        req.flash('error', 'An Error Occured')
        res.render('creativeArt/index')
    })
}
    creativeArtController.index = (req,res) =>{
        const page = req.params.page || 1
        const perPage = 10
        CreativeArt.find({}).skip((perPage * page) - perPage).limit(perPage).then((creativeArt)=>{
            CreativeArt.count().then(count=>{
                res.render('creativeArt/index',{
                    creativeArt:creativeArt,
                    current: page,
                    pages: Math.ceil( count / perPage)
                })
            }).catch(e=>{
                console.log(e)
            })
        }).catch((err)=>{
            req.flash('error','An Error Has Ocured')
            res.render('creativeArt/index')
        })
    }
    creativeArtController.delete = (req,res) => {
        CreativeArt.findByIdAndRemove({_id:req.params.id}).then((art)=>{
            req.flash('success','Deleted Successfully')
            res.redirect('/creativeArt/1')
        }).catch((e)=>{
            return res.status(500).json({
                message:e
            })
        })
    }

    module.exports = creativeArtController;
