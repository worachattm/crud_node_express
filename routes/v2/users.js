var express = require('express');
var router = express.Router();

const localStorage = require('../../localStorage');


/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Get all users 
 * /v2/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               users: [ { username: 'testnaja', age: 15 , email: 'toptestaja@gmail.com' }, { username: 'anya', age: 1 , email: 'anyaja@gmail.com' } ]
 *
 */
router.get('/', function(req, res, next) {
  const users = localStorage.getAll();
  res.json({ users });
});


module.exports = router;
