const router = require('express').Router();

const bankApi = require('../modules/bank/bank.routes.api');
const categoryApi = require('../modules/category/category.routes.api');
const productApi = require('../modules/product/product.routes.api');
const tagsApi = require('../modules/tags/tags.routes.api');
const blogApi = require('../modules/blog/blog.routes.api');

router.use('/bank', bankApi);
router.use('/category', categoryApi);
router.use('/product', productApi);
router.use('/tags', tagsApi);
router.use('/blog', blogApi);

module.exports = router;
