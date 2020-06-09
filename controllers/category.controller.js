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
        this.router.post('/create/category', this.saveCategory);
        this.router.post('/create/subcategory', this.saveSubCategory);
        this.router.get('/list', this.getCategoryList);
        this.router.post('/update/category/:id', this.updateCategory);
        this.router.post('/update/subcategory/:id', this.updateSubCategory);
    }
    async saveCategory(req, res, next) {
        cl(req.body)
        try {
            let category = await categoryService.saveCategory(req.body.CategoryName)
            res.status(200).json({ status: 'success', CategoryID: category.CategoryID, CategoryName: category.CategoryName })
        } catch (error) {
            next(new ErrorHandler(400, 'Somthing went wrong', error));
        }
    };

    async saveSubCategory(req, res, next) {
        try {
            let subcategory = await categoryService.saveSubCategory(req.body.CategoryID, req.body.SubCategoryName)
            res.status(200).json({ status: 'success' })
        } catch (error) {
            next(new ErrorHandler(400, 'Somthing went wrong', error));
        }
    };

    async getCategoryList(req, res, next) {
        console.log('in category');
        try {
            let categories = await categoryService.getCategoryList();
            res.status(200).render('category/category', { categories: categories, date: date });
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    };

    async updateCategory(req, res, next) {
        cl(req.body)
        try {
            let Category = await categoryService.updateCategory(req.body.CategoryName,req.params.id)
            res.status(200).json({status:'success',data:Category})
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    }
    async updateSubCategory(req, res, next) {
        try {
            let subCategory = await categoryService.updateSubCategory(req.body.SubCategoryName,req.body.CategoryID,req.params.id)
            res.status(200).json({status:'success',data:subCategory})
        } catch (error) {
            next(new ErrorHandler(500, 'Internal Server Error', error));
        }
    }
}
exports.CategoryController = CategoryController;
