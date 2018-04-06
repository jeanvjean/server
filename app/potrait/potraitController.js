const Potrait = require('./Potrait')
const potraitController = {}


potraitController.post = (req,res)=>{
    const potrait = new Potrait({
        model_name:req.body.model_name,
        imageUrl:req.file.filename
    })
    potrait.save().then((newPotrait)=>{
        req.flash('success', 'Added Successfully')
        res.redirect('/potrait/1')
    }).catch((e)=>{
        return res.status(500).json({
            message:e
        })
    })
}
    potraitController.index = (req,res) =>{
        const page = req.params.page || 1
        const perPage = 10
        Potrait.find({}).skip((perPage * page)-perPage).limit(perPage).then((potraits)=>{
            Potrait.count().then(count=>{
                console.log(potraits)
                res.render('potraits/index',{
                    potraits:potraits,
                    current:page,
                    pages: Math.ceil(count / perPage)
                })
            }).catch(e=>{
                console.log(e)
            })
        }).catch((err)=>{
            req.flash('error','An Error has Occured')
            res.render('potraits/index')
        })
    }
    potraitController.delete = (req,res) => {
        Potrait.findByIdAndRemove({_id:req.params.id}).then((pot)=>{
            req.flash('success', 'Deleted Successfully')
            res.redirect('/potrait/1')
        }).catch((e)=>{
            req.flash('error','An Error has Occured')
            res.render('potraits/index')
        })
    }

    module.exports = potraitController;
