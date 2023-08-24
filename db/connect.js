import mongoose from "mongoose";

const url = "mongodb://localhost:27017";
const options = {
	family: 4,
	dbName: "authenticationDB",
};

async function connectDB() {
	try {
		await mongoose.connect(url, options);
		console.log("Connected to database");
	} catch (err) {
		console.log(err);
	}
}

export { connectDB };
