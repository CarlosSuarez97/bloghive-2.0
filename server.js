import bodyParser from "body-parser"; //to parse incoming request bodies
import express from "express"; //to make the server
import pg from "pg"; //connection to the database
import cors from "cors"; // to allow requests from the React frontend
import dotenv from "dotenv"; // for the database credentials
import bcrypt from "bcrypt"; //for encrypting and hashing passwords entered by the user on the client side
import jwt from "jsonwebtoken"; //importing this dependency to issue a token to manage sessions


dotenv.config(); // loading environment variables

const app = express();
const port = process.env.PORT || 3000; //port where the server will be running
const db = new pg.Client({
    database: process.env.DB_NAME, //Database name
    password: process.env.DB_PASSWORD, //Database password
    user: process.env.DB_USER, //Database username
    host: process.env.DB_HOST, //Database host
    port: process.env.DB_PORT //Database port
});
const saltRounds = 10;

//custom middleware to protect routes
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.json({
            message: "No token provided"
        }).status(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.json({
                message: "Invalid token"
            }).status(403);
        };
        req.user = decoded;
        next();
    })
}


db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//Creating new users
app.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const checkResult = await db.query(
            "SELECT * FROM user_info WHERE user_email = $1",
            [email]
        );

        if (checkResult.rows.length > 0) {
            return res.status(401).json({
                success: false,
                message: "This email is in use already. Please, try another one"
            });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log("Hashing error: ", err);
                    return res.status(500).json({
                        success: false,
                        message: "Server error while creating account"
                    });
                }

                try {
                    await db.query(
                        "INSERT INTO user_info (user_email, user_password, user_first_name, user_last_name) VALUES ($1, $2, $3, $4)",
                        [email, hash, firstName, lastName]
                    );

                    return res.status(200).json({
                        success: true,
                        message: "Account created successfully"
                    });
                } catch (dbError) {
                    console.log("Database insertion error: ", dbError);
                    return res.status(500).json({
                        success: false,
                        message: "Database error during signup"
                    });
                }
            });
        }
    } catch (error) {
        console.log("Query error: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signup"
        });
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

        if (checkForUser.rows.length == 0) {

            console.log("This user does not exist");
            return res.json({
                success: false,
                message: "This user does not exist"
            })

        } else if (checkForUser.rows.length > 0) {

            const user = checkForUser.rows[0];
            const postCountResult = await db.query("SELECT COUNT(*) FROM post_info WHERE post_user_id = $1", [user.user_id]);
            const postCount = parseInt(postCountResult.rows[0].count, 10);
            const hashedPassword = checkForUser.rows[0].user_password;

            console.log("There's an user using that email address");
            console.log("We'll try logging you in");
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if(err) {
                    console.error("Something's gone wrong: ", err);
                    return res.json({
                        success: false,
                        message: "Server error"
                    }).status(500);
                } else if (result) {
                    const token = jwt.sign(
                        {
                            id: user.user_id,
                            email: user.user_email,
                            firstName: user.user_first_name,
                            lastName: user.user_last_name,
                            posts: postCount
                        },
                        process.env.JWT_SECRET,
                        {expiresIn: "1h"}
                    );
                    console.log(token);
                    return res.json({
                        success: true,
                        message: "Login successful!",
                        token
                    }).status(202);
                } else if (!result) {
                    return res.json({
                        success: false,
                        message: "The password you have entered is invalid. Please, try again"
                    }).status(404);
                }
            });
        }

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

//Loading the user's profile after having logged in
app.get("/home", verifyToken, async (req, res) => {
    const user = req.user;

    try {
        const result = await db.query("SELECT user_email, user_first_name, user_last_name FROM user_info WHERE user_id = $1", [user.id]);
        const postCount = await db.query("SELECT COUNT(*) FROM post_info WHERE post_user_id = $1", [user.id]);

        if (result.rows.length > 0) {
            return res.json({
                success: true,
                user: result.rows[0],
                postCount: parseInt(postCount.rows[0].count)
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//creating a new post
app.post("/newPost", verifyToken, async (req, res) => {

    const user = req.user;
    const postDate = new Date().toLocaleDateString();
    const {
        postTitle,
        postContent
    } = req.body;
    console.log(user.id)
    console.log(postTitle, postContent, postDate);

    try {
        await db.query("INSERT INTO post_info (post_title, post_content, post_date, post_user_id) VALUES ($1, $2, $3, $4)", [postTitle, postContent, postDate, user.id]);
        return res.status(202).json({
            success: true,
            message: "Post created!"
        });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

//Posts rendering
app.get("/getPost", verifyToken, async (req, res) => {
    const user = req.user;

    try {
        const result = await db.query("SELECT post_id, post_title, post_content, post_date FROM post_info WHERE post_user_id = $1 ORDER BY post_id DESC", [user.id]);

        return res.status(200).json({
            success: true,
            posts: result.rows
        })

    } catch (err) {
        console.error("Error: ", err);
    }
})

//Delete post
app.delete("/deletePost/:id", verifyToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const result = await db.query(
            "DELETE FROM post_info WHERE post_id = $1 AND post_user_id = $2",
            [postId, userId]
        );

        if (result.rowCount > 0) {
            return res.status(200).json({ success: true, message: "Post deleted." });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized or post not found." });
        }
    } catch (err) {
        console.error("Error deleting post:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//Edit post
app.patch("/editPost/:id", verifyToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const { editedTitle, editedContent } = req.body;

    // Input validation
    if (!editedTitle?.trim() || !editedContent?.trim()) {
        return res.status(400).json({ success: false, message: "Title and content cannot be empty." });
    }

    try {
        const result = await db.query(
            "UPDATE post_info SET post_title = $1, post_content = $2 WHERE post_id = $3 AND post_user_id = $4",
            [editedTitle.trim(), editedContent.trim(), postId, userId]
        );

        if (result.rowCount > 0) {
            return res.status(200).json({ success: true, message: "Post edited successfully." });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized action." });
        }
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});


//Server running
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});