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
      date: -1
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
router.put("/:id", auth, async (req, res) => {
  const { title, login, password } = req.body;

  const accountFields = {};
  if (title) accountFields.title = title;
  if (login) accountFields.login = login;
  if (password) accountFields.password = password;

  try {
    let account = await Account.findById(req.params.id);

    if (!account) return res.status(404).json({ msg: "Account not found" });

    // Make sure user owns account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: accountFields },
      { new: true }
    );

    res.json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/accounts/:id
// @desc Delete account
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let account = await Account.findById(req.params.id);

    if (!account) return res.status(404).json({ msg: "Account not found" });

    // Make sure user owns account
    if (account.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Account.findByIdAndRemove(req.params.id);

    res.json({ msg: "Account removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
