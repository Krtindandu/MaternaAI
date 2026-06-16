import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            MaternaAI
          </h1>

          <p className="text-2xl md:text-3xl font-light mb-6">
            AI-Powered Maternal Mental Health Screening
          </p>

          <p className="max-w-3xl mx-auto text-lg text-blue-100 mb-10">
            Empowering frontline healthcare workers to identify postpartum depression,
            emotional distress, and maternal health risks early through intelligent
            voice-based screening and emergency triage.
          </p>

          <Link to="/assessment">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition">
              Start Assessment
            </button>
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Voice Analysis
            </h3>

            <p>
              AI understands local-language responses and identifies psychological distress indicators.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Risk Prediction
            </h3>

            <p>
              Generates explainable maternal mental health risk scores for healthcare workers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Emergency Triage
            </h3>

            <p>
              Connects high-risk mothers to healthcare professionals faster.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Landing;