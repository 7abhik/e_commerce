const { Category, SubCategory, sequelize } = require('../models/category.model')
class CategoryService {
    constructor() { }
    async saveCategory(categoryName) {
        return await Category.create({ CategoryName: categoryName },{raw:true})
    };
    async saveSubCategory(categoryID, subcategoryName) {
        return await SubCategory.create({ CategoryID: categoryID, SubCategoryName: subcategoryName })
    };

    async getCategoryList() {
        let categoryArray = []
        categoryArray.push(await Category.findAll({ raw: true }))
        categoryArray.push(await sequelize.query('CALL get_subCategories();'))
        return categoryArray
    };

    async updateCategory(categoryName,categoryID) {

        return await Category.update(
            {
                CategoryName: categoryName
            },
            {
                where: { CategoryID: categoryID }
            })
    }
    async updateSubCategory(subCategoryName,categoryID,subCategoryID) {
        return await SubCategory.update(
            {
                SubCategoryName:subCategoryName,
                CategoryID:categoryID
            },
            {
                where: { SubCategoryID: subCategoryID }
            })
    }
}
exports.CategoryService = CategoryService;
