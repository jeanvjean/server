const homeController = {}

    homeController.get = (req,res) => {
        res.render('home/index')
    }
    homeController.getContact = (req,res) => {
        res.render('home/contact')
    }
    homeController.getAbout = (req,res) => {
        res.render('home/about')
    }

    module.exports = homeController
