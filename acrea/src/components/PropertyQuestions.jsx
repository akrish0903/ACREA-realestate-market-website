// PropertyQuestions.jsx
import React, { useState, useEffect } from 'react';
import useApi from '../utils/useApi';
import Styles from './css/PropertyQuestions.module.css';
import {Config} from '../config/Config';
import { useSelector } from 'react-redux';

const PropertyQuestions = ({ propertyData }) => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState({});
    const [error, setError] = useState('');
    const propertyId = propertyData?._id;
    const userAuthData = useSelector(data => data.AuthUserDetailsSlice);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await useApi({ 
                url: `/get-property-questions/${propertyId}`, 
                method: 'GET' 
            });
            console.log('API response:', response); // Debugging response structure
            if (response && response.success) {
                setQuestions(response.questions);
            } else {
                setError(response?.message || 'Failed to load questions');
            }
        };
        fetchQuestions();
    }, [propertyId]);

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        if (!userAuthData?.usrAccessToken) {
            setError('Please log in to ask a question');
            return;
        }
        
        // Validate question
        if (!newQuestion.trim()) {
            setError('Question cannot be empty');
            return;
        }
        
        // Validate property ID
        if (!propertyId) {
            setError('Property ID is missing');
            return;
        }
    
        try {
            const response = await useApi({
                url: '/post-question',
                method: 'POST',
                data: { 
                    propertyId, 
                    question: newQuestion.trim() 
                },
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
            });
    
            if (response && response.success) {
                setQuestions(prevQuestions => [...prevQuestions, response.newQuestion]);
                setNewQuestion('');
                setError('');
            } else {
                setError(response?.message || 'Failed to post question');
            }
        } catch (err) {
            console.error('Question submission error:', err);
            setError('Error submitting question. Please try again.');
        }
    };
    
    const handleAnswerSubmit = async (questionId) => {
        if (!userAuthData?.usrAccessToken) {
            setError('Please log in to answer questions');
            return;
        }
    
        try {
            const response = await useApi({
                url: `/post-answer/${questionId}`,
                method: 'POST',
                data: { answer: newAnswer[questionId] },
                authRequired: true,
                authToken: userAuthData.usrAccessToken,
            });
    
            if (response && response.success) {
                setQuestions(questions.map(q => 
                    q._id === questionId ? response.question : q
                ));
                setNewAnswer(prev => ({ ...prev, [questionId]: '' }));
                setError('');
            } else {
                setError(response?.message || 'Failed to post answer');
            }
        } catch (err) {
            console.error('Answer submission error:', err);
            setError('Error submitting answer. Please try again.');
        }
    };

    return (
        <div className={`screen ${Styles.propertyquestionsScreen}`}>
            <h3>Questions about this Property</h3>
            {userAuthData.usrType === 'buyer'  && (
                <div className={Styles.questionForm}>
                    {error && <p className={Styles.errorMessage}>{error}</p>}
                    
                    {userAuthData?.usrAccessToken ? (
                        <form onSubmit={handleQuestionSubmit}>
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Ask a question..."
                                required
                            />
                        
                                <button type="submit" style={{backgroundColor:Config.color.primaryColor800}}>Submit Question</button>
                        </form>
                    ) : (
                        <p>Please log in to ask questions</p>
                    )}
                </div>
            )}

            <div className={Styles.questionsList}>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div key={question._id} className={Styles.questionItem}>
                            <p><strong>Q:</strong> {question.questionText}</p>
                            {question.answer ? (
                                <p><strong>Answer:</strong> {question.answer}</p>
                            ) : (
                                (userAuthData?.usrType === 'agent' || userAuthData?.usrType === 'owner') && (
                                    <div className={Styles.answerInput}>
                                        <input
                                            type="text"
                                            value={newAnswer[question._id] || ''}
                                            onChange={(e) =>
                                                setNewAnswer((prev) => ({
                                                    ...prev,
                                                    [question._id]: e.target.value,
                                                }))
                                            }
                                            placeholder="Provide an answer..."
                                        />
                                        <button 
                                            onClick={() => handleAnswerSubmit(question._id)}
                                            disabled={!newAnswer[question._id]?.trim()}
                                        >
                                            Submit Answer
                                        </button>
                                    </div>
                                )
                            )}
                            <div className={Styles.questionMeta}>
                                <small>Asked by: {question.userId?.usrFullName}</small>
                                {question.answeredBy && (
                                    <small>Answered by: {question.answeredBy?.usrFullName}</small>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No questions available. Please ask a question above.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyQuestions;
