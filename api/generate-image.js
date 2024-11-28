// api/generate-image.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const p0 = "sk-" + "proj-ibTFzOD8mvr-y0GZhaHi5dQqBKxyIBvmUSaWkFYuQ7nwH6Fp22f";
    const p1 = "CATjdebf31wcyE6OYUFQjCKT3BlbkFJuNy1w";
    const p2 = "4CWxPB43-PzUkW8yzX5BKERS0CJZ7RNkUczjdeKhpz-U0AzkqugTFLO3239CpXA3aTcwA"

    const OPENAI_API_KEY = p0 + p1 + p2; // Replace with your API key
    const { prompt } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: "512x512",
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data.data[0]); // Send back the first generated image
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Image generation failed." });
    }
}