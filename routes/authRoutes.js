const experss = require('express');
const router = experss.Router();
const auth = require('../controllers/authController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required()
})


router.get('/', auth.userLogin
  //(req, res) => auth.userLogin(req, res)
);

router.post('/api/userLogin', validator.body(loginSchema), auth.userLogin);
router.post('/api/userRegister', auth.userRegister);
//router.post('/api/userUpdate', auth.userUpdate);
module.exports = router;