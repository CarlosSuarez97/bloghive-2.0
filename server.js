//This is the Javascript file where the server for the application will be made
import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import pg from "pg"; //connection to the database
import cors from "cors"; // to allow requests from the React frontend
import dotenv from "dotenv"; // for the database credentials
import bcrypt from "bcrypt"; //for encrypting and hashing passwords entered by the user on the client side
import path from "path";
import { fileURLToPath } from "url";


dotenv.config(); // loading environment variables

const app = express();
const port = process.env.PORT || 3000;
const db = new pg.Client({
    database: process.env.DB_NAME, //Database name
    password: process.env.DB_PASSWORD, //Database password
    user: process.env.DB_USER, //Database username
    host: process.env.DB_HOST, //Database host
    port: process.env.DB_PORT //Database port
});
const saltRounds = 10;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

//Creating new users
app.post("/signup", async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;
    try {
        const checkResult = await db.query("SELECT * FROM user_info WHERE user_email = $1", [email]);
        if(checkResult.rows.length > 0) {
            console.log("There's an user registered with this email already.");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if(err) {
                    console.log("There's been an issue: ", err);
                } else {
                    const result = await db.query("INSERT INTO user_info (user_email, user_password, user_first_name, user_last_name) VALUES ($1, $2, $3, $4)", [email, hash, firstName, lastName]);
                    console.log(result);
                }
            });
        }
    } catch (error) {
        console.log("There's been an issue: ", error);
    }

    
});

//Authenticating users when logging in
app.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    
    try {
        const checkForUser = await db.query("SELECT * FROM user_info WHERE user_email = $1", [email]);
        const hashedPassword = checkForUser.rows[0].user_password;

        if(checkForUser.rows.length > 0) {

            console.log("There's an user using that email address");
            console.log("We'll try logging you in");
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) {
                    console.error("Something's gone wrong: ", err);
                    return res.status(500).json({
                        success: false,
                        message: "Server error"
                    });
                } else if (result) {
                    return res.json({success: true,
                        message: "Login successful"
                    });
                } else {
                    console.log("Wrong password, dummy. Try again later.");
                    return res.status(404).json({
                        success: false,
                        message: "Wrong credentials"
                    });
                }
            });
        } else {
            console.log("Nothing to do here");
        }

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); // server start

//Management for sessions begin here