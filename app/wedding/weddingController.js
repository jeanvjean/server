const Wedding = require('./Wedding')
const Category = require('../category/Category')
const weddingController = {}
const perPage = 20



    weddingController.post = async(req,res)=>{
        const page = req.params.page || 1
        const newWedding = new Wedding({
            event_name:req.body.event_name,
            category: req.body.category,
            file: req.file.filename
        })
        const category = await Category.findById(newWedding.category)
        newWedding.category = category

        await newWedding.save()

        category.objects.push(newWedding)

        await category.save()

        req.flash('success', 'image saved Successfully')
        res.redirect('/wedding/1')
        // const categoryId = req.body.category
    }
    weddingController.index = (req,res) =>{
        const page = req.params.page || 1
        Wedding.find({}).skip((perPage * page) - perPage).limit(perPage).exec((e,weddings)=>{
                Category.find({}).then((category)=>{
                    Wedding.count().exec((e,count)=>{
                        if (e) {
                            return e
                        }
                        res.render('weddings/index',{
                            weddings:weddings,
                            current:page,
                            category:category,
                            pages: Math.ceil(count / perPage)
                        })
                    })
                })
            })
        }
    weddingController.delete = (req,res) => {
        Wedding.findByIdAndRemove({_id:req.params.id}).then((wed)=>{
            req.flash('success','Deleted Successfully')
            res.redirect('/wedding/1')
        }).catch((e)=>{
            req.flash('error','An error Has Occured')
            res.redirect('/wedding/1')
        })
    }

    module.exports = weddingController;
