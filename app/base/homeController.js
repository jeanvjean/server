const homeController = {}
const nodemailer = require('nodemailer')

    homeController.get = (req,res) => {
        console.log(req.user)
        res.render('home/index')
    }
    homeController.getAbout = (req,res) => {
        res.render('home/about')
    }
    homeController.getContact = (req,res) => {
        res.render('home/contact')
    }
    homeController.postContact = (req,res) => {
        const mail = `
        <p>You have a new contact email</p>
        <h3>Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li></li>
        </ul>
        <p>Message: ${req.body.message}</p>
        `
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'brookmatrix@support.com', // generated ethereal user
            pass: '12345678'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: `brookmatrix@support.com`, // sender address
        to: 'fjohn087@gmail.com', // list of receivers
        subject: 'support', // Subject line
        text: 'Hello world?', // plain text body
        html: mail // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        res.render('home/contact',{msg:'Email sent'})
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
        console.log(req.body)
    }

    module.exports = homeController
