// pages/questions.js
"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Question from "../components/Question";
import Modal from "../components/Modal";
import EditModal from "./EditModal";

const QuestionsPage = () => {
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState({});
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const removeOption = (indexToRemove) => {
    const updatedOptions = currentQuestion.options.filter(
      (_, index) => index !== indexToRemove
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...currentQuestion.options, ""];
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const response = await axios.post("https://qt.organogram.app/token", {
        email: "email@email.com",
      });
      setToken(response.data.token);
    } catch (error) {
      console.error("Error fetching token:", error);
      setError("Failed to fetch token. Please try again later.");
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://qt.organogram.app/questions", {
        headers: {
          Token: token,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const createQuestion = async () => {
    if (!newQuestion || newOptions.some((option) => option.trim() === "")) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "https://qt.organogram.app/questions",
        {
          question: newQuestion,
          options: newOptions.filter((option) => option.trim() !== ""),
        },
        { headers: { Token: token } }
      );
      setNewQuestion("");
      setNewOptions(["", "", ""]);
      fetchQuestions();
      setError(null);
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Failed to create question. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId) => {
    setShowModal(true);
    setSelectedQuestionId(questionId);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://qt.organogram.app/questions/${selectedQuestionId}`,
        {
          headers: { Token: token },
        }
      );
      fetchQuestions();
      setError(null);
    } catch (error) {
      console.error("Error deleting question:", error);
      setError("Failed to delete question. Please try again later.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const editQuestion = (questionId) => {
    const questionToEdit = questions[questionId];
    setCurrentQuestion(questionToEdit);
    setEditMode(true);
  };

  const saveEditedQuestion = async () => {
    fetchQuestions();
    setEditMode(false);
    setCurrentQuestion(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Question App</h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading && <div className="text-green-600 mb-4 text-center">Loading...</div>}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Enter new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
        />
        {newOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const updatedOptions = [...newOptions];
              updatedOptions[index] = e.target.value;
              setNewOptions(updatedOptions);
            }}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full focus:outline-none focus:border-blue-500"
          />
        ))}
        <button
          onClick={createQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
        >
          Create Question
        </button>
      </div>
      <div>
        {Object.entries(questions).map(([questionId, questionData]) => (
          <Question
            key={questionId}
            questionId={questionId}
            questionData={questionData}
            onDelete={deleteQuestion}
            onEdit={editQuestion}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this question?"
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
      {showEditModal && currentQuestion && (
        <Modal title="Edit Question" onClose={closeModal}>
          <EditModal
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            saveEditedQuestion={saveEditedQuestion}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default QuestionsPage;
