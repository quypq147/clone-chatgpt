const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAIApi  = require("openai"); 
require("dotenv").config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI setup

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});

// Chat API
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });
        const assistantMessage = response.data.choices[0].message.content;
        res.send(assistantMessage);
    } catch (error) {
        console.error("Error communicating with OpenAI:", error.message);
        res.status(500).send("Error communicating with OpenAI");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


