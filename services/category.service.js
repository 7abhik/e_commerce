const { Category, SubCategory, sequelize } = require('../models/category.model')
class CategoryService {

    constructor() { }
    async saveCategory() {

    };

    async getCategoryList() {
        let categoryArray = []
        categoryArray.push(await Category.findAll({ raw: true }))
        categoryArray.push(await sequelize.query('CALL get_subCategories();'))
        // return cat
        return categoryArray
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
