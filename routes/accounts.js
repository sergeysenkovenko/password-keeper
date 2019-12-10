const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Account = require("../models/Account");

// @route GET api/accounts
// @desc Get all users accounts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id }).sort({
      title: -1
    });
    res.json(accounts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST api/accounts
// @desc Add new account
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Please enter a title")
        .not()
        .isEmpty(),
      check("login", "Please enter a login")
        .not()
        .isEmpty(),
      check("password", "Please enter a password")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, login, password } = req.body;

    try {
      const newAccount = new Account({
        title,
        login,
        password,
        user: req.user.id
      });

      const account = await newAccount.save();
      res.json(account);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/accounts/:id
// @desc Update account
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update account");
});

// @route DELETE api/accounts/:id
// @desc Delete account
// @access Private
router.delete("/:id", (req, res) => {
  res.send("Delete account");
});

module.exports = router;
