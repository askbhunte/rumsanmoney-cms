const router = require('express').Router();

const authApi = require('../modules/user/auth.routes');
const bankApi = require('../modules/bank/bank.routes.api');
const blogApi = require('../modules/blog/blog.routes.api');
const categoryApi = require('../modules/category/category.routes.api');
const insuranceApi = require('../modules/insurance/insurance.routes.api');
const insuranceCompanyApi = require('../modules/insurance_company/company.routes.api');
const productApi = require('../modules/product/product.routes.api');
const requestApi = require('../modules/request/request.routes.api');
const rolesApi = require('../modules/roles/roles.routes.api');
const tagsApi = require('../modules/tags/tags.routes.api');
const userApi = require('../modules/user/user.routes.api');

router.use('/auth', authApi);
router.use('/banks', bankApi);
router.use('/blogs', blogApi);
router.use('/categories', categoryApi);
router.use('/companies', insuranceCompanyApi);
router.use('/insurances', insuranceApi);
router.use('/products', productApi);
router.use('/requests', requestApi);
router.use('/roles', rolesApi);
router.use('/tags', tagsApi);
router.use('/users', userApi);

module.exports = router;
