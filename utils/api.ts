export async function fetchTranscriptionData(audioUrl: string) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/transcribe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: audioUrl }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to fetch transcription data")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error fetching transcription data:", error)
      return null
    }
  }
  
  