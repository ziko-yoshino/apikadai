const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.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, // Securely load your OpenAI API Key from an environment variable
});
const openai = new OpenAIApi(configuration);

app.post('/api/gpt', async (req, res) => {
  try {
    const message = req.body.message;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
    });
    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send('Error processing the request');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
