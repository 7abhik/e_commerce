const express = require("express");
const { ErrorHandler } = require('../helpers/error')
const { check, validationResult } = require('express-validator/check');
const { HomeService } = require('../services/home.service')
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads'); // set the destination
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});
var upload = multer({ storage: storage });
const homeService = new HomeService();
class HomeController {
    constructor() {
        this.path = '/';
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.indexPage);
        this.router.get('/getpost', this.getPost);
        this.router.post('/validation', [
            check('name').not().isEmpty().withMessage('Name must have more than 5 characters'),
            check('email').isEmail().withMessage('Email is not valid'),
            check('password', 'Your password must be at least 5 characters').not().isEmpty(),
        ], this.validation)
        this.router.post('/ajaxform', upload.single('imagename'), this.ajaxform)
    }
    async getPost(req, res, next) {
        let posts = [
            { title: "Hello", content: "yes one" },
            { title: "Hello one", content: "yes two" },
            { title: "Hello two", content: "yes three" }
        ]
        try {
            let note = await homeService.getPost()
            console.log(note.get({ plain: true }));
            res.status(200).render('home/ajaxform', { posts: posts });
        } catch (error) {
            next(new ErrorHandler(404, 'Somthing went wrong', error))
        }
    };
    validation(req, res) {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            res.send({});
        }
    }

    ajaxform(req, res, next) {
        var image = req.file.filename;
        cl(req.body)
        cl(req.file)
    }

    indexPage(req, res, next) {
        res.status(200).render('home/index', { title: 'WinkLix' })
    }
}
exports.HomeController = HomeController;
