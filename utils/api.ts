export async function fetchTranscriptionData(audioUrl: string) {
  try {
    // Ensure BACKEND_URL is defined
    const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000"; // Change this to actual backend URL

    console.log("Sending transcription request to:", `${backendUrl}/api/transcribe/`);
    console.log("Audio URL:", audioUrl);

    const response = await fetch(`${backendUrl}/api/transcribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: audioUrl }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transcription data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transcription data:", error);
    return null;
  }
}
