import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_KEY });

app.post('/generate-captions', async (req, res) => {
  const { image } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI that creates funny captions for Mars Rover photos. The captions should be 10 words long. Add emoji',
        },
        {
          role: 'user',
          content: `Here is a photo of Mars: ${image}`,
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const caption = response.choices[0].message.content;
    res.send({ caption });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
