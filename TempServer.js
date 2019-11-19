const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();
const token =
    "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());

let profile = {
    id: 1,
    username: "TestUser1",
    password: "password",
    email: "test1@gmail.com",
    photo: "https://i.imgur.com/b0PRcsj.jpg",
    age: 22,
    location: "New York, USA",
    posts: [
        {
            id: Date.now(),
            date: "January 17, 2019",
            title: "Mona Lisa",
            img: "https://i.imgur.com/emqPiNO.png",
            description: "Portrait of a woman by Leonardo da Vinci"
        },
        {
            id: Date.now(),
            date: "Februrary 22, 2019",
            title: "The Starry Night",
            img: "https://i.imgur.com/0kYlQt7.png",
            description: "Landscape by Vincent van Gogh"
        },
    ],
};

function authenticator(req, res, next) {
    const { authorization } = req.headers;
    if (authorization === token) {
        next();
    } else {
        res.status(403).json({ error: "User must be logged in to do that." });
    }
}

app.get("/profile", authenticator, (req, res) => {
    res.send(profile);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "username" && password === "password") {
        req.loggedIn = true;
        setTimeout(() => {
        res.status(200).json({
            payload: token
        });
        }, 1000);
    } else {
        res
        .status(403)
        .json({ error: "Username or Password incorrect. Please see Readme" });
    }
});

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});
