const { Product, Op } = require('../models/product.model')

class ProductService {
    constructor() { }

    async createProduct(product) {
        return await Product.create({ ProductSKU: product.skuid, ProductName: product.name, ProductPrice: product.price, ProductWeight: product.weight, ProductShortDesc: product.sdesc, ProductLongDesc: product.lgdesc, ProductThumb: req.file.path, ProductImage: req.file.path, ProductCategoryID: product.category, ProductSubCategoryID: product.subcategory, ProductStock: product.stock, ProductColorOptions: product.color, ProductMeasurmentUnit: product.munit, ProductLive: 1 })
    };

    async getProductList(categoryIDs) {
        if (Object.keys(categoryIDs).length === 0)
            var query = { raw: true }
        else
            var query = { where: { ProductCategoryID: { [Op.or]: [categoryIDs.ca] } }, raw: true }
        return await Product.findAll(query)
    };

    async updateProduct(userID) {
        return await Product.update(
            {
                isBlocked: 1
            }, {
            where: { userID: userID }
        })
    }
    async editProduct(productID) {
        return await Product.findOne({ ProductID: productID }, { raw: true })
    }
}

exports.ProductService = ProductService;