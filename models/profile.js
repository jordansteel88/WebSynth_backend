"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError
} = require("../expressError");


/** Related functions for users. */

class Profile {

  /** Save profile with form data.
   *
   * Returns { name, {effects} }
   *
   * Throws BadRequestError on duplicates.
   * 
   */

  static async save({ username, profile_name, effects }) {
    // const duplicateCheck = await db.query(
    //       `SELECT profile_name
    //        FROM profiles
    //        WHERE name = $1`,
    //     [profileName],
    // );

    // if (duplicateCheck.rows[0]) {
    //   throw new BadRequestError(`Duplicate profile name: ${name}`);
    // }

    const result = await db.query(
          `INSERT INTO profiles
           (username, profile_name, effects)
           VALUES ($1, $2, $3)
           RETURNING username, profile_name, effects`,
        [username, profile_name, effects],
    );

    const profile = result.rows[0];

    return profile;
  }

  /** Find all profiles for given user.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   * 
   **/

  static async findUsersProfiles(username) {
    const result = await db.query(
          `SELECT profile_name, id
           FROM profiles
           WHERE username = $1`,
        [username]
    );

    return result.rows;
  }

  /** Return profile data from given profile id.
   *
   * Returns { name, effects }
   *   where profile id is { id }
   *
   * Throws NotFoundError if user not found.
   * 
   **/

  static async getProfileData(profile_id) {
    const result = await db.query(
          `SELECT profile_name, effects
           FROM profiles
           WHERE id = $1`,
        [profile_id],
    );

    const profile = result.rows[0];
    console.log(profile);
    if (!profile) throw new NotFoundError(`No profile with ID ${profileID}`);
    return profile;
  }

  /** Delete given profile from database; returns undefined. */

  static async delete(profileID) {
    let result = await db.query(
          `DELETE
           FROM profiles
           WHERE id = $1
           RETURNING id`,
        [profileID],
    );
    const profile = result.rows[0];

    if (!profile) throw new NotFoundError(`No profile with ID ${profileID}`);
  }
}


module.exports = Profile;