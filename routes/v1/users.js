var express = require('express');
var router = express.Router();

const localStorage = require('../../localStorage');


/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Get all users 
 * /v1/users:
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

/**
 * @openapi
 * /v1/users/{username}:
 *   get:
 *     summary: Get a user by username
 *     description: Retrieve a user from the database by ID
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: search user by username
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               user: { "username": "testnaja", "age": 15 , "email" : "email@gmail.com" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'User not found'
 */
router.get('/:username', (req, res) => {
  const user = localStorage.read(req.params.username);
  console.log(user);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
  
});

/**
 * @openapi
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja
 *               age:
 *                 type: string
 *                 description: The user's name.
 *                 example: 15
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja@gmail.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User created successfully'
 *       400:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'username is null'
 */
router.post('/', (req, res) => {
  const { username, age, email } = req.body;

  if(username == null){
    res.status(400).json({ message: 'username is null' });
  } else {
    const user = { username, age, email };
    localStorage.create(username, user);
    res.status(201).json({ message: 'User created successfully' });
  }
});

/**
 * @openapi
 * /v1/users/{username}:
 *   put:
 *     summary: Update user details
 *     description: Update user details in the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: string
 *                 description: The user's name.
 *                 example: 15
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: testnaja@gmail.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User created successfully'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'username is null'
 */
router.put('/:username', (req, res) => {
  const { age, email } = req.body;
  console.log(req.params.username);
  console.log(req.body);
  const updatedUser = { username: req.params.username, age, email };
  const success = localStorage.update(req.params.username, updatedUser);
  if (success) {
    res.json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



/**
 * @openapi
 * /v1/users/{username}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user from the database
 *     security:
 *      - apiKey: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'User deleted successfully'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'username is found'
 */
router.delete('/:username', (req, res) => {
  const success = localStorage.remove(req.params.username);
  if (success) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



module.exports = router;
