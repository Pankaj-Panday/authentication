import { User } from "../models/userModel.js";
import { nanoid } from "nanoid";
const sessions = new Map();

function validSessionID(sessionID) {
	if (sessionID) {
		return sessions.has(sessionID);
	}
}

const userController = {
	getSignup: (req, res) => {
		res.render("signup");
	},
	postSignup: async (req, res) => {
		const name = req.body.username;
		const email = req.body.email;
		const password = req.body.password;

		const user = new User({
			name: name,
			email: email,
			password: password,
		});
		try {
			await user.save();
			res.redirect("/");
		} catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong. Try again!");
		}
	},
	getLogin: (req, res) => {
		res.render("login");
	},
	postLogin: async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		try {
			const user = await User.findOne({ email: email });
			if (user && user.password === password) {
				const sessionID = nanoid(5);
				sessions.set(sessionID, user.email);
				res.cookie("sessionID", sessionID);
				res.redirect("/user/profile");
			} else {
				res.send("Invalid username or password");
			}
		} catch (err) {
			res.status(500).send("Something went wrong");
		}
	},
	getUserProfile: async (req, res) => {
		const sessionID = req.cookies.sessionID;
		if (validSessionID(sessionID)) {
			const email = sessions.get(sessionID);
			const user = await User.findOne({ email: email });
			res.render("userProfile.ejs", {
				name: user.name,
				email: user.email,
			});
		} else {
			res.redirect("/user/login");
		}
	},
	logout: (req, res) => {
		const sessionID = req.cookies.sessionID;
		if (validSessionID) {
			sessions.delete(sessionID);
			res.redirect("/");
		} else {
			res.send("You need to login first");
		}
	},
};

export { userController };
