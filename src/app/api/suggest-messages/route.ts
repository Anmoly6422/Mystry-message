export async function POST() {
  try {
    const questionBank = [
      "What's a dream you've never told anyone about?",
      "What's your favorite childhood memory?",
      "If you could travel anywhere tomorrow, where would you go?",
      "What's a skill you'd love to learn?",
      "What motivates you the most?",
      "What's one thing you're proud of accomplishing recently?",
      "If you could relive one day of your life, which day would it be?",
      "What's the best advice you've ever received?",
      "What is something you've always been curious about?",
      "What's a challenge that taught you an important lesson?",
      "If you could instantly become an expert in something, what would it be?",
      "What's your favorite way to spend a free day?",
      "What's a goal you're currently working toward?",
      "What is one thing that always makes you smile?",
      "If you could meet any historical figure, who would it be?"
    ];

    const selectedQuestions = questionBank
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .join("||");

    return new Response(selectedQuestions, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error generating questions:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to generate questions",
      },
      {
        status: 500,
      }
    );
  }
}