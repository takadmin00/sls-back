var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

const { check, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  if (!checkBody(req.body, ["phone", "email", "password"])) {
    res.json({ result: false, error: " Missing or empty fields" });
  }

  User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } }).then(
    (emailData) => {
      if (emailData) {
        return res.json({ result: false, error: "Email already exists" });
      } else {
        const newUser = new User({
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
        });

        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      }
    }
  );
});

router.post(
  "/registerr",
  [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 7 })
      .matches(/\d/)
      .matches(/[A-Z]/)
      .withMessage(
        "Password must be at least 7 characters long, contain a digit and an uppercase letter"
      ),
    check("phone")
      .isLength({ min: 9, max: 13 })
      .withMessage("Phone number must be between 9 and 13 digits long"),
  ],
  async (req, res) => {
    //Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } }).then(
      (emailData) => {
        if (emailData) {
          return res.json({ result: false, error: "Email already exists" });
        } else {
          const newUser = new User({
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
          });

          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        }
      }
    );
  }
);

module.exports = router;
