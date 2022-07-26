const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const { getUser } = require('../controllers/queryHelpers')

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  const username = req.body.username
  try {
    const [data] = await getUser(username);
    if (data.length > 0) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    } else {
      res.status(404).send({
        success: false,
        error: `No employee found with id ${username}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + username
    });
  }
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    /*    if (user) {
         res.status(400).send({
           message: "Failed! Username is already in use!"
         });
         return;
       } */

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
