const router = require('express').Router();

const bankApi = require('../modules/bank/bank.routes.api');
const authApi = require('../modules/user/auth.routes');
const categoryApi = require('../modules/category/category.routes.api');
const productApi = require('../modules/product/product.routes.api');
const tagsApi = require('../modules/tags/tags.routes.api');
const blogApi = require('../modules/blog/blog.routes.api');
const userApi = require('../modules/user/user.routes.api');
const rolesApi = require('../modules/roles/roles.routes.api');
const requestApi = require('../modules/request/request.routes.api');

router.use('/banks', bankApi);
router.use('/auth', authApi);
router.use('/categories', categoryApi);
router.use('/products', productApi);
router.use('/tags', tagsApi);
router.use('/blogs', blogApi);
router.use('/users', userApi);
router.use('/roles', rolesApi);
router.use('/requests', requestApi);

module.exports = router;
