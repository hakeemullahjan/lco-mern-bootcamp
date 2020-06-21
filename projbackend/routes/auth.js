const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signout, signin, isSignedIn } = require("../controllers/auth");

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

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
