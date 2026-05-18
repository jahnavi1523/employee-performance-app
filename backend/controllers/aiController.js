const axios = require('axios');

const getRecommendation = async (req, res) => {
  try {
    const { employee } = req.body;

    const prompt = `
      You are an HR analyst. Based on the following employee data, provide:
      1. Promotion recommendation (yes/no and why)
      2. Training suggestions
      3. Overall feedback
      4. Ranking out of 10

      Employee Details:
      - Name: ${employee.name}
      - Department: ${employee.department}
      - Skills: ${employee.skills.join(', ')}
      - Performance Score: ${employee.performanceScore}/100
      - Years of Experience: ${employee.experience}

      Give a clear, structured response.
    `;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
     model: 'liquid/lfm-2.5-1.2b-instruct:free',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const recommendation = response.data.choices[0].message.content;
    res.status(200).json({ recommendation });

 } catch (err) {
    console.log('AI Error:', err.response?.data);
    res.status(500).json({ message: err.message, details: err.response?.data });
  }
};

module.exports = { getRecommendation };