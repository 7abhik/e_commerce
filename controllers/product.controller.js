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
        this.router.post('/create', upload.single('imagename'), this.createProduct);
        this.router.get('/list', this.getProductList);
        this.router.patch('/update/:id', this.updateProduct);
        this.router.get('/edit/:id', this.editProduct);
    }

    async createProduct(req, res, next) {
        cl(req.body);
        cl(req.file);
        try {
            let product = await productService.createProduct(req.body)
            res.status(200).json({ data: 'data saved' })
        } catch (error) {
            console.log(error);
            next(new ErrorHandler(400, 'Page under construction', error));
        }
    };

    async getProductList(req, res, next) {
        try {
            let products = await productService.getProductList(req.query)
            cl(products)
            res.status(200).render('product/product', { products: products, date: date });
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    };

    async updateProduct(req, res, next) {
        try {
            let userID = await productService.updateProduct(req.params.id)
            cl(userID);
            res.status(200).send('Updtaed:' + userID)
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    }
    async editProduct(req, res, next) {
        try {
            let product = await productService.updateProduct(req.params.id)
            res.status(200).json(product);
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error))
        }
    }
}
exports.ProductController = ProductController;
