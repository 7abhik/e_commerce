const { Product, Op } = require('../models/product.model')

class ProductService {
    constructor() { }

    async saveProduct(product) {
        return await Product.create({ ProductSKU: product.skuid, ProductName: product.name, ProductPrice: product.price, ProductWeight: product.weight, ProductShortDesc: product.sdesc, ProductLongDesc: product.lgdesc, ProductThumb: product.productImage, ProductImage: product.productImage, ProductCategoryID: product.category, ProductSubCategoryID: product.subcategory, ProductStock: product.stock, ProductColorOptions: product.color, ProductMeasurmentUnit: product.munit, ProductLive: 1 })
    };

    async getProductList(categoryIDs) {
        if (Object.keys(categoryIDs).length === 0)
            var query = { raw: true }
        else
            var query = { where: { ProductCategoryID: { [Op.or]: [categoryIDs.ca] } }, raw: true }
        return await Product.findAll(query)
    };

    async updateProduct(product,productID) {
        return await Product.update({ ProductSKU: product.skuid, ProductName: product.name, ProductPrice: product.price, ProductWeight: product.weight, ProductShortDesc: product.sdesc, ProductLongDesc: product.lgdesc, ProductThumb: product.productImage, ProductImage: product.productImage, ProductCategoryID: product.category, ProductSubCategoryID: product.subcategory, ProductStock: product.stock, ProductColorOptions: product.color, ProductMeasurmentUnit: product.munit, ProductLive: 1 }, { where: { ProductID: productID } })
    }
    async editProduct(productID) {
        return await Product.findOne({where:{ ProductID: productID }}, { raw: true })
    }
}

exports.ProductService = ProductService;