const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userLogin = (req, res) => {
  console.log(req.body);
  return res.status(200).json("welcome to shop backs");
}


module.exports.userRegister = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      const isPass = bcrypt.compareSync(password, isExist.password);
      const token = jwt.sign({
        id: isExist._id,
        isAdmin: isExist.isAdmin,
      }, 'jsonToken');
      //return res.status(403).json({ message: 'user already exist' });

      if (isPass) return res.status(200).json({
        email,
        token,
        fullname: isExist.fullname,
        isAdmin: isExist.isAdmin,
        shippingAddress: isExist.shippingAddress
      });
      if (isPass) return res.status(200).json({ meaasge: 'login success' });
      return res.status(401).json({ message: 'invalid credentials' });
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        fullname,
        password: hash
      });
      return res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}




