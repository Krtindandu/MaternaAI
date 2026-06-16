import { useState } from "react";

function VoiceInput({
  language,
  currentQuestion,
  onVoiceAnswer,
}) {
  const [transcript, setTranscript] =
    useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    if (language === "Hindi") {
      recognition.lang = "hi-IN";
    } else if (language === "Telugu") {
      recognition.lang = "te-IN";
    } else {
      recognition.lang = "en-IN";
    }

    recognition.start();

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript.toLowerCase();

      setTranscript(text);

      // ALWAYS

      if (
  text.includes("always") ||
  text.includes("yes") ||
  text.includes("haan") ||
  text.includes("हाँ") ||
  text.includes("avunu") ||
  text.includes("అవును")
) {
  onVoiceAnswer(30);
}

else if (
  text.includes("often") ||
  text.includes("frequently") ||
  text.includes("aksar") ||
  text.includes("अक्सर") ||
  text.includes("tarachuga") ||
  text.includes("తరచుగా")
) {
  onVoiceAnswer(20);
}

else if (
  text.includes("sometimes") ||
  text.includes("kabhi") ||
  text.includes("कभी") ||
  text.includes("konnisarlu") ||
  text.includes("కొన్నిసార్లు")
) {
  onVoiceAnswer(10);
}

else if (
  text.includes("never") ||
  text.includes("no") ||
  text.includes("nahi") ||
  text.includes("नहीं") ||
  text.includes("ledu") ||
  text.includes("లేదు")
) {
  onVoiceAnswer(0);
}
    };
  };

  return (
    <div className="mt-3">
      <button
        onClick={startListening}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        🎤 Speak Answer
      </button>

      {transcript && (
        <p className="mt-2 text-sm text-gray-600">
          Heard: {transcript}
        </p>
      )}
    </div>
  );
}

export default VoiceInput;