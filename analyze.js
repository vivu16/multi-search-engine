exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  const { campaign } = body;
  if (!campaign || campaign.trim().length < 10) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please provide a campaign description.' }) };
  }

  const prompt = `You are a ProductClank Campaign Analyst. ProductClank is a community-led growth platform where builders launch campaigns and creators earn rewards by contributing meaningfully.

A user has shared a ProductClank campaign. Your job is to analyze it deeply and help the user contribute HIGH VALUE — not spam.

Campaign input:
"""
${campaign}
"""

Respond ONLY with valid JSON, no markdown, no preamble, exactly this structure:
{
  "product": "Product name (extract from campaign)",
  "what_builder_wants": "2-3 sentences. What is the builder's core goal? What does success look like for them?",
  "target_audience": "Who is the ideal user/audience for this product?",
  "key_message": "The ONE core message creators should convey about this product",
  "actions": [
    {
      "type": "Action type (e.g. Twitter Thread, Farcaster Cast, Reddit Post, YouTube Short, Newsletter mention)",
      "effort": "Low / Medium / High",
      "impact": "Low / Medium / High",
      "description": "Exactly what to do and why it works for this campaign"
    },
    {
      "type": "Action type",
      "effort": "Low / Medium / High", 
      "impact": "Low / Medium / High",
      "description": "Exactly what to do and why it works for this campaign"
    },
    {
      "type": "Action type",
      "effort": "Low / Medium / High",
      "impact": "Low / Medium / High", 
      "description": "Exactly what to do and why it works for this campaign"
    }
  ],
  "sample_content": {
    "title": "Ready-to-use content piece title",
    "body": "A full ready-to-post piece of content (tweet thread, cast, or post) the user can personalize and publish. Make it genuine, not salesy. 100-150 words.",
    "platform": "Best platform for this content"
  },
  "avoid": "2-3 specific things contributors should NOT do that would be considered spam or low quality for this campaign",
  "reward_tip": "One smart tip on how to maximize earnings from this specific campaign"
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'AI error: ' + err }) };
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/```json|```/g, '').trim();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to parse AI response. Try again.' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result)
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
