const UserController = require('../../modules/user/user.controller');
const { ERR } = require('../error');

const Secure = () =>
  function (req, res, next) {
    const token = req.body.access_token || req.query.access_token || req.headers.access_token;
    if (!token) throw ERR.TOKON_REQ;

    UserController.validateToken(token)
      .then(async t => {
        const user = await UserController.getById(t.data.user_id);
        req.curUser = user;
        req.tokenData = t.data;
        const user_perms = t.data.permissions || [];
        next();
      })
      .catch(next);
  };

const CheckPerms = (...perms) =>
  function (req, res, next) {
    if (perms.length > 0) {
      if (!checkPermissions(user_perms, perms)) throw ERR.UNAUTHORIZED;
    }
    next();
  };

// This processes token from header x-access-token
const SecureAPI = (...perms) =>
  function (req, res, next) {
    // TODO need to verify permissions
    const token = req.body.access_token || req.query.access_token || req.headers.access_token;
    if (!token) throw ERR.TOKON_REQ;

    UserController.validateToken(token)
      .then(async t => {
        const user = await UserController.getById(t.data.user_id);
        req.ruser = user;
        req.tokenData = t.data;
        const user_perms = t.data.permissions || [];
        if (perms.length > 0) {
          if (!checkPermissions(user_perms, perms)) throw ERR.UNAUTHORIZED;
        }
        next();
      })
      .catch(next);
  };

// This processes token from cookies
const SecureUI =
  (...perms) =>
  (req, res, next) => {
    if (req.originalUrl) res.cookie('redirect_url', req.originalUrl);

    const token =
      req.cookies.access_token ||
      req.query.access_token ||
      req.body.access_token ||
      req.headers.access_token;
    if (!token) {
      res.redirect('/login');
      return;
    }

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        const user_perms = t.data.permissions || [];
        if (perms.length > 0) {
          if (!checkPermissions(user_perms, perms)) {
            res.redirect('/unauthorized');
            return;
          }
        }
        res.clearCookie('redirect_url');
        next();
      })
      .catch(err => {
        res.redirect('/login');
      });
  };

const checkPermissions = (user_perm, access_perm) =>
  user_perm.some(v => access_perm.indexOf(v) !== -1);

module.exports = {
  Secure,
  CheckPerms,
  SecureAPI,
  SecureUI
};
