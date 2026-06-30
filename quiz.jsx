import React, { useState } from "react";

const Quiz = ({ quizId, quizTitle, onComplete }) => {
  const quizDatabase = {
    physics: [
      { q: "What is the SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: "Newton" },
      { q: "Which scientist formulated the law of universal gravitation?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
      { q: "What is the speed of light in vacuum?", options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^5 m/s", "3 × 10^7 m/s"], answer: "3 × 10^8 m/s" },
      { q: "Define velocity:", options: ["Speed with direction", "Distance per time", "Acceleration rate", "Force per mass"], answer: "Speed with direction" },
      { q: "What is the SI unit of energy?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: "Joule" },
      { q: "Which motion has constant velocity?", options: ["Uniform motion", "Circular motion", "Oscillatory motion", "Rotational motion"], answer: "Uniform motion" },
      { q: "What does Hooke's Law describe?", options: ["Spring force and extension", "Momentum conservation", "Energy transformation", "Friction coefficient"], answer: "Spring force and extension" },
      { q: "What is the SI unit of pressure?", options: ["Pascal", "Newton", "Joule", "Watt"], answer: "Pascal" },
      { q: "Define acceleration:", options: ["Change in velocity per time", "Distance per time", "Force per area", "Energy per mass"], answer: "Change in velocity per time" },
      { q: "What is the principle of conservation of momentum?", options: ["Momentum remains constant in isolated systems", "Momentum increases over time", "Momentum equals mass times distance", "Momentum depends on pressure"], answer: "Momentum remains constant in isolated systems" },
      { q: "Which law states that force equals mass times acceleration?", options: ["Newton's Second Law", "Newton's First Law", "Newton's Third Law", "Kepler's Law"], answer: "Newton's Second Law" },
      { q: "What is the frequency of a wave with period T = 0.5s?", options: ["2 Hz", "0.5 Hz", "5 Hz", "10 Hz"], answer: "2 Hz" },
      { q: "Which type of energy does a moving object possess?", options: ["Kinetic energy", "Potential energy", "Thermal energy", "Chemical energy"], answer: "Kinetic energy" },
      { q: "What is the relationship between wavelength and frequency?", options: ["Inversely proportional", "Directly proportional", "Independent", "Exponential"], answer: "Inversely proportional" },
      { q: "Define torque:", options: ["Rotational force about an axis", "Linear force applied", "Pressure applied", "Energy transmitted"], answer: "Rotational force about an axis" },
    ],
    chemistry: [
      { q: "What is the atomic number of Carbon?", options: ["6", "8", "12", "4"], answer: "6" },
      { q: "Which gas is most abundant in the atmosphere?", options: ["Nitrogen", "Oxygen", "Argon", "CO2"], answer: "Nitrogen" },
      { q: "What is the pH of a neutral solution?", options: ["7", "0", "14", "1"], answer: "7" },
      { q: "Define oxidation:", options: ["Loss of electrons", "Gain of electrons", "Loss of protons", "Gain of neutrons"], answer: "Loss of electrons" },
      { q: "What is the molecular formula of water?", options: ["H2O", "HO2", "H3O", "H2O2"], answer: "H2O" },
      { q: "Which element has the symbol Au?", options: ["Gold", "Silver", "Aluminum", "Argon"], answer: "Gold" },
      { q: "What type of bond exists in NaCl?", options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"], answer: "Ionic bond" },
      { q: "What is a catalyst?", options: ["Substance that speeds up reaction without being consumed", "Substance that slows down reaction", "Product of reaction", "Reactant that increases"], answer: "Substance that speeds up reaction without being consumed" },
      { q: "What is the valency of Chlorine?", options: ["1", "2", "3", "4"], answer: "1" },
      { q: "Which gas is produced during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
      { q: "What is Avogadro's number?", options: ["6.022 × 10^23", "3.14 × 10^23", "1.66 × 10^23", "9.11 × 10^23"], answer: "6.022 × 10^23" },
      { q: "Define molarity:", options: ["Moles of solute per liter of solution", "Grams of solute per liter", "Moles per kilogram", "Percent by mass"], answer: "Moles of solute per liter of solution" },
      { q: "What is the electronic configuration of Oxygen?", options: ["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s¹ 2p⁵", "1s² 2s² 2p³"], answer: "1s² 2s² 2p⁴" },
      { q: "Which metal is the best conductor of electricity?", options: ["Silver", "Copper", "Gold", "Aluminum"], answer: "Silver" },
      { q: "What is the process of converting solid directly to gas?", options: ["Sublimation", "Evaporation", "Condensation", "Melting"], answer: "Sublimation" },
    ],
    biology: [
      { q: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], answer: "Mitochondria" },
      { q: "Which scientist discovered penicillin?", options: ["Alexander Fleming", "Marie Curie", "Linus Pauling", "Max Planck"], answer: "Alexander Fleming" },
      { q: "What is the basic unit of life?", options: ["Cell", "Atom", "Molecule", "Organism"], answer: "Cell" },
      { q: "How many chambers does a human heart have?", options: ["4", "3", "2", "5"], answer: "4" },
      { q: "What process do plants use to make food?", options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"], answer: "Photosynthesis" },
      { q: "Which blood cells fight infections?", options: ["White blood cells", "Red blood cells", "Platelets", "Plasma cells"], answer: "White blood cells" },
      { q: "What is the genetic material in cells?", options: ["DNA", "RNA", "Protein", "Lipid"], answer: "DNA" },
      { q: "How many human chromosomes are there?", options: ["46", "23", "48", "44"], answer: "46" },
      { q: "What is the process of cell division that produces gametes?", options: ["Meiosis", "Mitosis", "Cytokinesis", "Prophase"], answer: "Meiosis" },
      { q: "Which organelle is responsible for protein synthesis?", options: ["Ribosome", "Lysosome", "Golgi body", "Endoplasmic reticulum"], answer: "Ribosome" },
      { q: "What is the process of breaking down glucose for energy?", options: ["Cellular respiration", "Photosynthesis", "Fermentation", "Glycolysis only"], answer: "Cellular respiration" },
      { q: "How many bones are in the adult human skeleton?", options: ["206", "200", "216", "186"], answer: "206" },
      { q: "What is the main function of the kidneys?", options: ["Filtering waste from blood", "Pumping blood", "Producing hormones", "Storing oxygen"], answer: "Filtering waste from blood" },
      { q: "Which vitamin is produced by skin on exposure to sunlight?", options: ["Vitamin D", "Vitamin C", "Vitamin A", "Vitamin B12"], answer: "Vitamin D" },
      { q: "What is the largest organ in the human body?", options: ["Skin", "Heart", "Brain", "Liver"], answer: "Skin" },
    ],
  };

  const questions = quizDatabase[quizId] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(Math.round(percentage));
    setSubmitted(true);
  };

  const handleFinish = () => {
    const passed = score >= 80;
    if (onComplete) {
      onComplete({ quizId, passed, score, title: quizTitle });
    }
  };

  if (submitted) {
    const passed = score >= 80;
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">Quiz Results</h2>

        <div className={`p-8 rounded-xl mb-6 text-center ${passed ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
          <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {passed ? '🎉 PASSED!' : '❌ FAILED'}
          </h3>
          <p className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {score}%
          </p>
          <p className={`text-lg ${passed ? 'text-green-700' : 'text-red-700'}`}>
            {passed ? `Excellent! You scored ${score}% and earned a certificate! 🏆` : `You need 80% to pass. You scored ${score}%. Try again!`}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4 text-slate-700">Answer Review:</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {questions.map((q, idx) => (
              <div key={idx} className={`p-3 rounded-lg border-l-4 ${answers[idx] === q.answer ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <p className="font-semibold text-sm text-gray-700">Q{idx + 1}: {q.q}</p>
                <p className="text-sm mt-1">Your answer: <span className={answers[idx] === q.answer ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>{answers[idx] || 'Not answered'}</span></p>
                {answers[idx] !== q.answer && <p className="text-sm text-green-700 font-bold">Correct: {q.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleFinish}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
        >
          {passed ? 'Claim Certificate & Go to Dashboard' : 'Retake Quiz'}
        </button>
      </div>
    );
  }

  const current = questions[currentQuestion];
  const answered = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{quizTitle}</h2>
        <div className="mt-2 bg-blue-100 rounded-full h-2 w-full">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <h3 className="text-lg font-semibold mb-6 text-gray-800">{current?.q}</h3>

      <div className="space-y-3 mb-8">
        {current?.options.map((option, idx) => (
          <label key={idx} className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
            answers[currentQuestion] === option
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-blue-300'
          }`}>
            <input
              type="radio"
              name="option"
              value={option}
              checked={answers[currentQuestion] === option}
              onChange={() => handleAnswer(option)}
              className="mr-3"
            />
            <span className="font-medium">{option}</span>
          </label>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50 disabled:opacity-50"
        >
          ← Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!answered}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;