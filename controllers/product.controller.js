const { ErrorHandler } = require('../helpers/error');
const express = require("express");
const date = require('date-and-time');
const multer = require("multer");
const { ProductService } = require('../services/product.service');

const productService = new ProductService();
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads'); // set the destination
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});
const upload = multer({ storage: storage });
class ProductController {
    constructor() {
        this.path = '/product';
        this.router = express.Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/save', upload.single('imagename'), this.saveProduct);
        this.router.get('/create', this.createProduct);
        this.router.get('/list', this.getProductList);
        this.router.post('/update/:id', upload.single('imagename'), this.updateProduct);
        this.router.get('/edit/:id', this.editProduct);
        this.router.post('/image',  upload.single('imagename'),this.imageUploader);
    }

    async createProduct(req, res, next) {
        try {
            res.status(200).render('product/product_create',{product:{},action:'/product/save'})
        } catch (error) {
            console.log(error);
            next(new ErrorHandler(400, 'Page under construction', error));
        }
    };

    async saveProduct(req, res, next) {
        cl(req.body);
        cl(req.file);
        try {
            let product = await productService.saveProduct(req.body)
            res.status(200).json({ data: 'data saved' })
        } catch (error) {
            console.log(error);
            next(new ErrorHandler(400, 'Page under construction', error));
        }
    };

    async getProductList(req, res, next) {
        try {
            let products = await productService.getProductList(req.query)
            res.status(200).render('product/product', { products: products, date: date });
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    };

    async updateProduct(req, res, next) {
        cl('In update')
        cl(req.params.id)
        cl(req.body)
        cl(req.file)
        try {
            let productID = await productService.updateProduct(req.body,req.params.id)
            cl(productID);
            res.status(200).redirect('/product/list')
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    }
    async editProduct(req, res, next) {
        try {
            let product = await productService.editProduct(req.params.id)
            res.status(200).render('product/product_create',{product,action:'/product/update/'+req.params.id});
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error))
        }
    }
    async imageUploader(req, res, nexr) {
        cl(req.file)
        res.status(200).json({status:'success',imagePath:req.file.path})
    }
}
exports.ProductController = ProductController;
