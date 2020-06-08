const { ErrorHandler } = require('../helpers/error');
const express = require("express");
const { CategoryService } = require('../services/category.service')
const categoryService = new CategoryService();
const date = require('date-and-time');

class CategoryController {
    constructor() {
        this.path = '/category';
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.saveCategory);
        this.router.get('/list', this.getCategoryList);
        this.router.patch('/update/:id', this.updateCategory);
    }
    async saveCategory(req, res, next) {
        console.log('in category');
        res.render('category/category', { data: 'data' })
        // next(new ErrorHandler(400, 'Page under construction'));
    };

    async getCategoryList(req, res, next) {
        console.log('in category');
        try {
            let categories = await categoryService.getCategoryList();
            cl(categories)
            res.status(200).render('category/category',{categories:categories,date:date});
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    };

    async updateCategory(req, res, next) {
        try {
            let categoryID = await categoryService.updateCategory(categoryID)
            res.status(200).send('Updtaed:' + req.query.id)
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    }
}
exports.CategoryController = CategoryController;
