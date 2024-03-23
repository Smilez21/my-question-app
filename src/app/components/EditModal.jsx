// components/EditModal.js
import React from "react";

const EditModal = ({
  currentQuestion,
  setCurrentQuestion,
  saveEditedQuestion,
  closeModal,
}) => {
  return (
    <div className="bg-gray-100 p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Edit Question</h2>
      <input
        type="text"
        value={currentQuestion.question}
        onChange={(e) =>
          setCurrentQuestion({
            ...currentQuestion,
            question: e.target.value,
          })
        }
        className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
      />
      {currentQuestion.options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => {
            const updatedOptions = [...currentQuestion.options];
            updatedOptions[index] = e.target.value;
            setCurrentQuestion({
              ...currentQuestion,
              options: updatedOptions,
            });
          }}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
        />
      ))}
      <div className="flex justify-end">
        <button
          onClick={saveEditedQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Save Changes
        </button>
        <button
          onClick={closeModal}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
