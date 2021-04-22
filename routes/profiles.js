"use strict";

/** Routes for profiles. */

const express = require("express");
const { ensureLoggedIn  } = require("../middleware/auth");
// const { BadRequestError } = require("../expressError");
const Profile = require("../models/profile");

const router = express.Router();


/** POST / { profile }  => { profile }
 *
 * Saves current profile settings to database and returns
 * saved profile { name, {effects} } 
 * 
 **/

// router.post("/", ensureLoggedIn, async function (req, res, next) {
router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    const profile = await Profile.save(req.body);
    return res.status(201).json({ profile });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { profiles: [ {name, {effects}}, ... ] }
 *
 * Returns list of all profiles of a given user.
 *
 **/

// router.get("/:username", ensureLoggedIn, async function (req, res, next) {
router.get("/:username", async function (req, res, next) {
  try {
    const profiles = await Profile.findUsersProfiles(req.params.username);
    return res.json({ profiles });
  } catch (err) {
    return next(err);
  }
});


/** GET /[profile_id] => { profile }
 *
 * Returns { name, {effects} } from given profile_id.
 *
 **/

// router.get("/:profileName", ensureLoggedIn, async function (req, res, next) {
router.get("/:username/:profile_id", async function (req, res, next) {
  try {
    // console.log("from profiles routes:" + req.params.username, req.params.profile_id);
    const profile = await Profile.getProfileData(req.params.profile_id);
    console.log("from profiles route: " + profile);
    return res.json({ profile });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;