// components/Question.js
"use client"
const Question = ({ questionId, questionData, onDelete, onEdit }) => {
  // Ensure questionData exists and has the expected structure
  if (!questionData || typeof questionData !== 'object' || !('question' in questionData) || !('options' in questionData)) {
    // If you're confident that invalid data won't be passed, you can remove this check
    return null; // or any other handling appropriate for your application
  }

  const { question, options } = questionData;

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{question}</h3>
        <div className="whitespace-nowrap">
          <button onClick={() => onEdit(questionId)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Edit</button>
          <button onClick={() => onDelete(questionId)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
      </div>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-1">{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
