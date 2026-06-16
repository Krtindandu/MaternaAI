import { useContext, useState } from "react";
import { PatientContext } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import VoiceInput from "../components/VoiceInput";
import {
  translations,
  answerTranslations
} from "../data/translations";
function Questions() {
  const navigate = useNavigate();

  const { patientData, setPatientData } = useContext(PatientContext);

  const ppdQuestions = [
    "Do you feel sad most of the day?",
    "Do you cry often?",
    "Do you have trouble sleeping?",
    "Do you feel disconnected from your baby?",
    "Have you lost interest in daily activities?"
  ];

  const preeclampsiaQuestions = [
    "Do you have severe headaches?",
    "Do you have swelling in face, hands, or feet?",
    "Do you experience blurred vision?",
    "Do you feel pain in the upper abdomen?",
    "Have you recently measured high blood pressure?"
  ];

  const language =
  patientData.language || "English";
  const answerLabels =
  answerTranslations[language];

const questions =
  patientData.patientType === "pregnant"
    ? translations[language].preQuestions
    : translations[language].ppdQuestions;

  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: Number(value),
    });
  };

  const handleSubmit = () => {
    const allAnswered =
      Object.keys(answers).length === questions.length;

    if (!allAnswered) {
      alert("Please answer all questions");
      return;
    }

    setPatientData({
      ...patientData,
      answers,
    });

    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          {patientData.patientType === "pregnant"
            ? "AI Assisted Pre-eclampsia Screening"
            : "AI Assisted Postpartum Depression Screening"}
        </h1>

        <div className="space-y-6">

          {questions.map((question, index) => (
            <div key={index}>
              <p className="font-semibold mb-2">
                {index + 1}. {question}
              </p>

              <select
                className="w-full p-4 border rounded-xl"
                value={answers[index] ?? ""}
                onChange={(e) =>
                  handleAnswerChange(index, e.target.value)
                }
              >
                <option value="">
  {language === "Hindi"
    ? "उत्तर चुनें"
    : language === "Telugu"
    ? "సమాధానం ఎంచుకోండి"
    : "Select Answer"}
</option>

                <option value="0">
  {answerLabels[0]}
</option>

<option value="10">
  {answerLabels[1]}
</option>

<option value="20">
  {answerLabels[2]}
</option>

<option value="30">
  {answerLabels[3]}
</option>
              </select>
  <VoiceInput
  language={patientData.language}
  currentQuestion={question}
  onVoiceAnswer={(value) =>
    handleAnswerChange(index, Number(value))
  }
/>
            </div>
          ))}

        </div>

<button
  onClick={handleSubmit}
  className="w-full bg-blue-600 text-white p-4 rounded-xl mt-6"
>
  Analyze Risk →
</button>
      </div>
    </div>
  );
}

export default Questions;