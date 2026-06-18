// Quiz - Revision Questions for Different Topics

const quizQuestions = {
    science: [
        {
            question: "What is the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
            correct: 1,
            explanation: "The mitochondria is responsible for producing energy (ATP) for the cell."
        },
        {
            question: "What is the chemical formula for photosynthesis?",
            options: ["6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O", "H₂O + CO₂ → O₂", "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"],
            correct: 0,
            explanation: "Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy."
        },
        {
            question: "What is the speed of light?",
            options: ["300,000 m/s", "3,000 m/s", "3,000,000 m/s", "30,000 m/s"],
            correct: 0,
            explanation: "Light travels at approximately 300,000 kilometers per second (or 300,000,000 meters per second in a vacuum)."
        },
        {
            question: "What type of blood cells fight infections?",
            options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
            correct: 1,
            explanation: "White blood cells (leukocytes) are part of the immune system and defend against pathogens."
        },
        {
            question: "What is the process of water changing from liquid to gas called?",
            options: ["Condensation", "Evaporation", "Sublimation", "Freezing"],
            correct: 1,
            explanation: "Evaporation is the phase transition where liquid water turns into water vapor due to heating."
        }
    ],
    math: [
        {
            question: "What is the area of a circle with radius 5?",
            options: ["15.7", "31.4", "78.5", "50"],
            correct: 2,
            explanation: "Area = πr² = π(5)² ≈ 78.5 square units"
        },
        {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x³", "2"],
            correct: 1,
            explanation: "Using the power rule: d/dx(x²) = 2x"
        },
        {
            question: "What is 15% of 80?",
            options: ["10", "12", "15", "20"],
            correct: 1,
            explanation: "15% of 80 = 0.15 × 80 = 12"
        },
        {
            question: "What is the solution to 2x + 5 = 15?",
            options: ["x = 5", "x = 10", "x = 2.5", "x = 20"],
            correct: 0,
            explanation: "2x + 5 = 15 → 2x = 10 → x = 5"
        },
        {
            question: "What is the value of sin(90°)?",
            options: ["0", "0.5", "1", "∞"],
            correct: 2,
            explanation: "sin(90°) = 1 is a fundamental trigonometric value."
        }
    ],
    history: [
        {
            question: "In what year did the Titanic sink?",
            options: ["1912", "1915", "1920", "1905"],
            correct: 0,
            explanation: "The RMS Titanic sank on April 15, 1912, after hitting an iceberg."
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "George Washington", "John Adams", "James Madison"],
            correct: 1,
            explanation: "George Washington served as the first U.S. President from 1789-1797."
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2,
            explanation: "World War II ended in 1945 with Germany's surrender in May and Japan's in September."
        },
        {
            question: "What ancient wonder was located in Egypt?",
            options: ["Colossus of Rhodes", "Great Pyramid of Giza", "Hanging Gardens", "Statue of Zeus"],
            correct: 1,
            explanation: "The Great Pyramid of Giza (Pyramid of Khufu) is the only surviving ancient wonder."
        },
        {
            question: "Who invented the printing press?",
            options: ["Leonardo da Vinci", "Johannes Gutenberg", "Benjamin Franklin", "Galileo Galilei"],
            correct: 1,
            explanation: "Johannes Gutenberg invented the movable type printing press around 1440."
        }
    ],
    english: [
        {
            question: "What is the plural of 'child'?",
            options: ["childs", "childes", "children", "childer"],
            correct: 2,
            explanation: "'Children' is the irregular plural form of 'child'."
        },
        {
            question: "Which of these is a metaphor?",
            options: ["The cat sat silently", "Time is money", "She ran like a cheetah", "The dog barked loudly"],
            correct: 1,
            explanation: "A metaphor directly compares two things without using 'like' or 'as'. 'Time is money' is a metaphor."
        },
        {
            question: "What is the main theme of Shakespeare's 'Romeo and Juliet'?",
            options: ["Revenge", "Forbidden love", "Family honor", "Political power"],
            correct: 1,
            explanation: "The play centers on the tragic love between members of two feuding families."
        },
        {
            question: "Identify the subject in: 'The cat sat on the mat'",
            options: ["sat", "cat", "mat", "on"],
            correct: 1,
            explanation: "The subject 'cat' is who or what the sentence is about."
        },
        {
            question: "What does 'verbose' mean?",
            options: ["Using very few words", "Using too many words", "Speaking clearly", "Talking quietly"],
            correct: 1,
            explanation: "'Verbose' means using more words than necessary to express something."
        }
    ],
    geography: [
        {
            question: "What is the capital of France?",
            options: ["Lyon", "Marseille", "Paris", "Nice"],
            correct: 2,
            explanation: "Paris is the capital and largest city of France."
        },
        {
            question: "Which is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3,
            explanation: "The Pacific Ocean is the largest and deepest ocean on Earth."
        },
        {
            question: "What is the capital of Japan?",
            options: ["Osaka", "Tokyo", "Kyoto", "Nagoya"],
            correct: 1,
            explanation: "Tokyo is the capital and largest city of Japan."
        },
        {
            question: "Which country is home to the Great Barrier Reef?",
            options: ["New Zealand", "Indonesia", "Australia", "Fiji"],
            correct: 2,
            explanation: "The Great Barrier Reef is located off the coast of Queensland, Australia."
        },
        {
            question: "What is the longest river in the world?",
            options: ["Amazon River", "Nile River", "Yangtze River", "Mississipi River"],
            correct: 1,
            explanation: "The Nile River in Africa is the longest river in the world at about 6,650 km."
        }
    ]
};

let currentTopic = 'science';
let currentQuestion = 0;
let score = 0;
let totalQuestions = 5;
let quizStarted = false;
let selectedAnswer = null;
let quizStats = {
    attempts: 0,
    scores: [],
    topicStats: {}
};

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    setupQuiz();
    loadQuizStats();
});

// Setup quiz
function setupQuiz() {
    const topicButtons = document.querySelectorAll('.topic-btn');
    const restartBtn = document.getElementById('restartQuizBtn');
    
    if (topicButtons.length === 0) return;

    topicButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectTopic(btn.dataset.topic);
        });
    });

    if (restartBtn) {
        restartBtn.addEventListener('click', restartQuiz);
    }

    // Display initial quiz
    displayQuestion();
}

// Select topic
function selectTopic(topic) {
    currentTopic = topic;
    currentQuestion = 0;
    score = 0;
    quizStarted = false;
    selectedAnswer = null;

    // Update active button
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-topic="${topic}"]`).classList.add('active');

    // Hide results and show quiz
    document.getElementById('quizResults').classList.remove('show');
    document.getElementById('quizStats').style.display = 'grid';

    displayQuestion();
    focusUpApp.showNotification(`📚 Topic changed to ${topic.toUpperCase()}. Start answering questions!`, 'info');
}

// Display question
function displayQuestion() {
    const questions = quizQuestions[currentTopic];
    const question = questions[currentQuestion];

    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <div class="question-number">${currentQuestion + 1}</div>
                <span>${questions[currentQuestion].question}</span>
            </div>

            <div class="question-text">${question.question}</div>

            <div class="answer-options" id="answerOptions">
                ${question.options.map((option, index) => `
                    <button class="answer-btn" data-index="${index}">
                        <span class="answer-letter">${String.fromCharCode(65 + index)}.</span>
                        ${option}
                    </button>
                `).join('')}
            </div>

            <div class="feedback" id="feedback"></div>
        </div>
    `;

    // Setup answer buttons
    const answerBtns = document.querySelectorAll('.answer-btn');
    answerBtns.forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
    });

    // Update progress
    updateProgress();
}

// Select answer
function selectAnswer(index) {
    const questions = quizQuestions[currentTopic];
    const question = questions[currentQuestion];
    const answerBtns = document.querySelectorAll('.answer-btn');
    const feedback = document.getElementById('feedback');

    // Disable all buttons after selection
    answerBtns.forEach(btn => btn.disabled = true);

    // Mark selected answer
    answerBtns[index].classList.add('selected');

    // Check if correct
    const isCorrect = index === question.correct;

    if (isCorrect) {
        score++;
        answerBtns[index].classList.add('correct');
        feedback.className = 'feedback correct';
        feedback.innerHTML = `<strong>✅ Correct!</strong> ${question.explanation}`;
        focusUpApp.playSound('success');
    } else {
        answerBtns[index].classList.add('incorrect');
        answerBtns[question.correct].classList.add('correct');
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = `<strong>❌ Incorrect!</strong> The correct answer is <strong>${question.options[question.correct]}</strong>. ${question.explanation}`;
        focusUpApp.playSound('notification');
    }

    // Show next question button after delay
    setTimeout(() => {
        showNextButton();
    }, 2000);
}

// Show next question button
function showNextButton() {
    const feedback = document.getElementById('feedback');
    const isLastQuestion = currentQuestion === totalQuestions - 1;

    const button = document.createElement('button');
    button.className = 'btn btn-primary mt-3 w-100';
    button.innerHTML = isLastQuestion ? 
        '<i class="fas fa-check"></i> Finish Quiz' : 
        '<i class="fas fa-arrow-right"></i> Next Question';
    
    button.addEventListener('click', () => {
        if (isLastQuestion) {
            completeQuiz();
        } else {
            nextQuestion();
        }
    });

    feedback.appendChild(button);
}

// Next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        displayQuestion();
    }
}

// Complete quiz
function completeQuiz() {
    const percentage = Math.round((score / totalQuestions) * 100);

    // Update stats
    quizStats.attempts++;
    quizStats.scores.push(percentage);
    if (!quizStats.topicStats[currentTopic]) {
        quizStats.topicStats[currentTopic] = { attempts: 0, scores: [] };
    }
    quizStats.topicStats[currentTopic].attempts++;
    quizStats.topicStats[currentTopic].scores.push(percentage);

    // Save stats
    saveQuizStats();

    // Show results
    showResults(percentage);
}

// Show results
function showResults(percentage) {
    const resultsDiv = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const resultMessage = document.getElementById('resultMessage');
    const attemptedCount = document.getElementById('attemptedCount');
    const correctCount = document.getElementById('correctCount');
    const accuracyPercent = document.getElementById('accuracyPercent');

    finalScore.textContent = percentage + '%';
    attemptedCount.textContent = totalQuestions;
    correctCount.textContent = score;
    accuracyPercent.textContent = percentage + '%';

    // Set message based on score
    let message = 'Great effort!';
    let messageClass = 'pass';

    if (percentage >= 90) {
        message = '🌟 Excellent! You\'ve mastered this topic!';
        messageClass = 'excellent';
    } else if (percentage >= 75) {
        message = '✅ Good job! You\'re doing well!';
        messageClass = 'good';
    } else if (percentage >= 60) {
        message = '📚 Not bad! Keep practicing!';
        messageClass = 'pass';
    } else {
        message = '💪 Keep studying! You\'ll improve!';
        messageClass = 'fail';
    }

    resultMessage.textContent = message;
    resultMessage.className = `results-message ${messageClass}`;

    // Hide quiz and show results
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizStats').style.display = 'none';
    resultsDiv.classList.add('show');

    focusUpApp.showNotification(`Quiz completed! Score: ${percentage}%`, 'success');
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizStats').style.display = 'grid';
    document.getElementById('quizResults').classList.remove('show');

    displayQuestion();
}

// Update progress
function updateProgress() {
    const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';
    document.getElementById('questionInfo').textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    document.getElementById('scoreInfo').textContent = `Score: ${Math.round((score / (currentQuestion + 1)) * 100)}%`;
}

// Save quiz stats
function saveQuizStats() {
    localStorage.setItem('focusup-quiz-stats', JSON.stringify(quizStats));
}

// Load quiz stats
function loadQuizStats() {
    const saved = localStorage.getItem('focusup-quiz-stats');
    if (saved) {
        quizStats = JSON.parse(saved);
    }

    // Update display
    const bestScore = quizStats.scores.length > 0 ? Math.max(...quizStats.scores) : 0;
    const averageScore = quizStats.scores.length > 0 ? 
        Math.round(quizStats.scores.reduce((a, b) => a + b) / quizStats.scores.length) : 0;

    document.getElementById('totalAttempts').textContent = quizStats.attempts;
    document.getElementById('bestScore').textContent = bestScore + '%';
    document.getElementById('averageScore').textContent = averageScore + '%';
}

// Export functions
window.quizFunctions = {
    selectTopic,
    restartQuiz,
    loadQuizStats
};
