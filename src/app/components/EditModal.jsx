import React, { useState, useEffect } from "react";

const EditModal = ({ initialQuestion, initialOptions, saveEditedQuestion, closeModal }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    setQuestion(initialQuestion);
    setOptions(initialOptions);
  }, [initialQuestion, initialOptions]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    // Call saveEditedQuestion function with updated question and options
    saveEditedQuestion(question, options);
  };

  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        className="text-black border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e)}
          className="text-black border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
        />
      ))}
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Save Changes
      </button>
      <button onClick={closeModal} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
        Cancel
      </button>
    </div>
  );
};

export default EditModal;
