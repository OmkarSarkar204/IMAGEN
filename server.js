// server.js - A simple Express server that can proxy requests to FAL API
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve your static files from 'public' folder

// API endpoint to generate images
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    // Call the FAL API
    const response = await axios.post('https://api.fal.ai/text-to-image', {
      prompt: prompt,
      negative_prompt: "blurry, ugly, duplicate, low quality, low resolution",
      width: 512,
      height: 512,
      model_name: "stabilityai/stable-diffusion-xl-base-1.0",
      num_inference_steps: 30
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FAL_API_KEY}`
      }
    });
    
    // Return the response from FAL API
    res.json(response.data);
  } catch (error) {
    console.error('Error calling FAL API:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.response?.data || error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});