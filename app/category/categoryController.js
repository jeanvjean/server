const Category = require('./Category')

module.exports = {
    post: async(req,res)=>{
        const { name } = Category.create(req.body)
        res.status(200).json({success:'category Saved'})
    },
    index: async(req,res)=>{
        const { categoryId } = req.params
        const category = await Category.findById(categoryId).populate('objects')

        const data = category.objects

        // console.log(data)

        res.render('weddings/category',{data})
    }
}
