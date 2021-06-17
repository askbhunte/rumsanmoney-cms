const router = require('express').Router();

const authApi = require('../modules/user/auth.routes');
const bankApi = require('../modules/bank/bank.routes.api');
const blogApi = require('../modules/blog/blog.routes.api');
const categoryApi = require('../modules/category/category.routes.api');
const featuredApi = require('../modules/featured/featured.routes.api');
const imagesApi = require('../modules/images/images.routes.api');
const insuranceApi = require('../modules/insurance/insurance.routes.api');
const insuranceCompanyApi = require('../modules/insurance_company/company.routes.api');
const productApi = require('../modules/product/product.routes.api');
const requestApi = require('../modules/request/request.routes.api');
const rolesApi = require('../modules/roles/roles.routes.api');
const tagsApi = require('../modules/tags/tags.routes.api');
const userApi = require('../modules/user/user.routes.api');
const pageApi = require('../modules/pages/pages.routes.api');
const cookieApi = require('../modules/cookie/cookie.routes.api');
const historyApi = require('../modules/history/history.routes.api');

router.use('/auth', authApi);
router.use('/banks', bankApi);
router.use('/blogs', blogApi);
router.use('/categories', categoryApi);
router.use('/featured', featuredApi);
router.use('/companies', insuranceCompanyApi);
router.use('/images', imagesApi);
router.use('/insurances', insuranceApi);
router.use('/products', productApi);
router.use('/requests', requestApi);
router.use('/roles', rolesApi);
router.use('/tags', tagsApi);
router.use('/users', userApi);
router.use('/pages', pageApi);
router.use('/cookies', cookieApi);
router.use('/histories', historyApi);

module.exports = router;
