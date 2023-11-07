const experss = require('express');
const router = experss.Router();
const auth = require('../controllers/authController');

router.get('/', auth.userLogin
  // (req, res) => auth.userLogin(req,res)
);
router.post('/api/userRegister', auth.userRegister);
//router.post('/api/userUpdate', auth.userUpdate);
module.exports = router;