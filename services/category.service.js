const { Category } = require('../models/category.model')
class CategoryService {

    constructor() { }
    async saveCategory() {

    };

    async getCategoryList() {
        return await Category.findAll()
    };

    async updateCategory(categoryID) {
        return await Category.update(
            {
                isBlocked: 1
            },
            {
                where: { CategoryID: categoryID }
            })
    }
}
exports.CategoryService = CategoryService;
