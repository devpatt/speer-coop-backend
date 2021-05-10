const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
	// Validate data before making the user
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	// Check if user is already in DB
	const userExists = await User.findOne({ username: req.body.username });
	if (userExists) {
		return res.status(400).send("User already exists");
	}

	// HASH the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create a new user
	const user = new User({
		username: req.body.username,
		password: hashedPassword,
	});
	try {
		const savedUser = await user.save();
		res.send({ user: savedUser._id });
	} catch (err) {
		res.status(400).send(err);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	// Validate data before making the user
	const { error } = loginValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	// Check if user exists
	const user = await User.findOne({ username: req.body.username });
	if (!user) {
		return res.status(400).send("User not found");
	}
	// Check is password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password); // compares the inputted password with hashed password
	if (!validPass) {
		return res.status(400).send("Password is incorrect");
	}

	// Create and assign a token
	const token = jwt.sign(
		{ _id: user._id, username: user.username },
		process.env.TOKEN_SECRET,
		{
			algorithm: "HS256",
			expiresIn: +process.env.TOKEN_LIFE,
		}
	);
	res.header("auth-token", token).send(token);
	// res.send("Logged in!");
});

module.exports = router;
