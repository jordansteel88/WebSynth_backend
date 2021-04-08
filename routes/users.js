"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, email }
 *
 */

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
