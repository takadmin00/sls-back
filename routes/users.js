var express = require("express");
var router = express.Router();
const User = require("../models/users");

const { check, validationResult } = require("express-validator");

// GET all users

router.get("/all", async (req, res) => {
  const allUsersData = await User.find({});
  res.json({ result: true, allUsers: allUsersData });
});

// Delete all users

router.delete("/reset", async (req, res) => {
  const deleteReportData = await User.deleteMany({});
  res.json({ result: true, deleteReport: deleteReportData });
});

// POST Inscription

router.post(
  "/register",
  [
    check("phone")
      .isLength({ min: 9, max: 11 })
      .withMessage("Phone number must be between 8 and 13 digits long"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 7 })
      .matches(/\d/)
      .matches(/[A-Z]/)
      .withMessage(
        "Password must be at least 7 characters long, contain a digit and an uppercase letter"
      ),
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
