const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name must be at least 5 chars long").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password must be at least 4 chars long").isLength({
      min: 4,
    }),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
