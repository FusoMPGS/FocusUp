// Main App JavaScript

// Track if app is already initialized
let appInitialized = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    if (!appInitialized) {
        initializeApp();
        appInitialized = true;
    }
});

// Initialize the application (runs only once)
function initializeApp() {
    setupNavigation();
    setupThemeToggle();
    loadUserPreferences();
    displayTipOfDay();
    displayQuoteOfDay();
    initializeGoalTracking();
    initializeStatsTracking();
    initializeStreakTracking();
    setupBreakActivities();
}

// Navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.section');
    
    // Prevent duplicate listeners by removing old ones
    navLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });
    
    // Re-query after cloning
    const freshNavLinks = document.querySelectorAll('[data-section]');

    freshNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            
            if (!targetSection) return;
            
            // Remove active class from all sections and links
            sections.forEach(section => section.classList.remove('active'));
            freshNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to selected section and link
            targetSection.classList.add('active');
            link.classList.add('active');
            
            // Close navbar menu on mobile after navigation
            const navbarToggle = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
        });
    });

    // Set initial active section
    const homeSection = document.getElementById('home');
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeSection) homeSection.classList.add('active');
    if (homeLink) homeLink.classList.add('active');
}

// Theme toggle (Dark mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const savedTheme = localStorage.getItem('focusup-theme') || 'light';

    // Set initial theme
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Remove old listeners by cloning
    const newThemeToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
    
    const freshThemeToggle = document.getElementById('themeToggle');
    if (freshThemeToggle) {
        freshThemeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('focusup-theme', isDarkMode ? 'dark' : 'light');
            
            // Update icon
            freshThemeToggle.innerHTML = isDarkMode 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        });
    }
}

// Load user preferences
function loadUserPreferences() {
    const preferences = {
        focusTime: parseInt(localStorage.getItem('focusup-focusTime')) || 25,
        breakTime: parseInt(localStorage.getItem('focusup-breakTime')) || 5,
        volume: parseInt(localStorage.getItem('focusup-volume')) || 70,
    };

    return preferences;
}

// Save user preferences
function saveUserPreferences(preferences) {
    Object.keys(preferences).forEach(key => {
        localStorage.setItem(`focusup-${key}`, preferences[key]);
    });
}

// Display tip of the day
function displayTipOfDay() {
    const tips = [
        "Start your study session by clearing your desk of distractions.",
        "Take a 5-minute break every 25 minutes to maintain focus.",
        "Drink water throughout your study session to stay hydrated.",
        "Use background music to mask distracting noise.",
        "Set specific, achievable goals before each study session.",
        "Practice the Pomodoro Technique for better time management.",
        "Turn off phone notifications during study sessions.",
        "Study the most difficult material when you're fresh.",
        "Use different colors when taking notes to improve retention.",
        "Take care of your posture to avoid fatigue.",
        "Combine study sessions with short exercise breaks.",
        "Create a dedicated study space away from distractions.",
        "Group related topics together when studying.",
        "Review material regularly to improve long-term retention.",
        "Stay positive and celebrate small study victories.",
        "Every 20 minutes, look 20 feet away for 20 seconds (20-20-20 rule).",
        "Use website blockers to eliminate social media during focus sessions.",
        "Prepare your study materials the night before.",
        "Join a study group for accountability and motivation.",
        "Teach someone else what you've learned - it strengthens memory.",
        "Use the Feynman Technique to understand complex topics.",
        "Take care of your sleep schedule - it's your brain's reset button.",
        "Avoid multitasking - your brain works best with single focus.",
        "Use the Pomodoro timer during your most productive hours.",
        "Plan your week on Sunday to set clear study goals.",
        "Active recall beats passive re-reading by a huge margin.",
        "Use spaced repetition for long-term memory retention.",
        "Create mind maps to visualize connections between concepts.",
        "Practice problems in random order (interleaving) for better learning.",
        "Study 2026 tech skills: AI literacy, cybersecurity, digital citizenship."
    ];

    const today = new Date().getDate();
    const tip = tips[today % tips.length];
    document.getElementById('tipText').textContent = tip;
}

// Display quote of the day
function displayQuoteOfDay() {
    const quotes = [
        { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "Your education is a dress rehearsal for a life that is yours to lead.", author: "Nora Ephron" },
        { text: "Excellence is not a destination; it is a continuous journey.", author: "Brian Tracy" },
        { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
        { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Great things never came from comfort zones.", author: "Unknown" },
        { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
        { text: "Success is not about being the best. It's about being better than you were yesterday.", author: "Unknown" },
        { text: "The mind is everything. What you think, you become.", author: "Buddha" },
        { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun" },
        { text: "In 2026, digital literacy is as important as traditional literacy.", author: "Unknown" },
        { text: "Your focus determines your reality.", author: "George Lucas" },
        { text: "Perfection is not just about control. It's also about letting go.", author: "Unknown" },
        { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
        { text: "Start where you are, use what you have, do what you can.", author: "Arthur Ashe" },
        { text: "Don't aim for success if you want it; just do what you love and believe in.", author: "David Frost" }
    ];

    const today = new Date().getDate();
    const quote = quotes[today % quotes.length];
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
}

// Utility: Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Utility: Show notification
function showNotification(message, type = 'info') {
    // Create a simple toast notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '80px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Utility: Play sound
function playSound(type = 'notification') {
    // Create audio context if not exists
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = window.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'notification') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    } else if (type === 'success') {
        oscillator.frequency.value = 1000;
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
    }
}

// Add some visual polish - Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .feature-card, .tip-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ============= ANIMATION UTILITIES =============

// Apply animation to element
function applyAnimation(element, animationName, duration = 0.5) {
    element.classList.add(animationName);
    setTimeout(() => {
        element.classList.remove(animationName);
    }, duration * 1000);
}

// Apply animation to multiple elements with staggered timing
function applyStaggeredAnimation(selector, animationName, delayMs = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add(animationName);
        }, index * delayMs);
    });
}

// Add pulse effect to element
function pulseElement(element) {
    element.classList.add('pulse');
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 2000);
}

// Add bounce effect to element
function bounceElement(element) {
    element.classList.add('bounce');
    setTimeout(() => {
        element.classList.remove('bounce');
    }, 1000);
}

// Add shake animation to element (for errors)
function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Add scale pop animation
function scalePopElement(element) {
    element.classList.add('scale-pop');
    setTimeout(() => {
        element.classList.remove('scale-pop');
    }, 400);
}

// Add wiggle animation to element
function wiggleElement(element) {
    element.classList.add('wiggle');
    setTimeout(() => {
        element.classList.remove('wiggle');
    }, 500);
}

// Add rotate animation to element
function rotateElement(element) {
    element.classList.add('rotate');
    setTimeout(() => {
        element.classList.remove('rotate');
    }, 2000);
}

// Add heartbeat animation to element
function heartbeatElement(element) {
    element.classList.add('heartbeat');
    setTimeout(() => {
        element.classList.remove('heartbeat');
    }, 1300);
}

// Animate counter from 0 to target value
function animateCounter(element, targetValue, duration = 1000) {
    const startValue = parseInt(element.textContent) || 0;
    const increment = (targetValue - startValue) / (duration / 16);
    let currentValue = startValue;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Add glow effect to element
function glowElement(element) {
    element.classList.add('glow');
    setTimeout(() => {
        element.classList.remove('glow');
    }, 2000);
}

// Add rainbow text animation
function rainbowText(element) {
    element.classList.add('rainbow-text');
}

// Remove rainbow text animation
function removeRainbowText(element) {
    element.classList.remove('rainbow-text');
}

// Highlight element with flash
function flashElement(element, times = 3) {
    let count = 0;
    const interval = setInterval(() => {
        element.style.opacity = element.style.opacity === '0.5' ? '1' : '0.5';
        count++;
        if (count >= times * 2) {
            clearInterval(interval);
            element.style.opacity = '1';
        }
    }, 200);
}

// Export functions for use in other scripts
window.focusUpApp = {
    formatTime,
    showNotification,
    playSound,
    loadUserPreferences,
    saveUserPreferences,
    applyAnimation,
    applyStaggeredAnimation,
    pulseElement,
    bounceElement,
    shakeElement,
    scalePopElement,
    wiggleElement,
    rotateElement,
    heartbeatElement,
    animateCounter,
    glowElement,
    rainbowText,
    removeRainbowText,
    flashElement
};

// ============= 2026 FEATURES: GOAL TRACKING =============

function initializeGoalTracking() {
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalInput = document.getElementById('goalInput');
    
    if (!addGoalBtn || !goalInput) return;

    // Load existing goals
    loadGoals();

    addGoalBtn.addEventListener('click', addGoal);
    goalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addGoal();
    });
}

function addGoal() {
    const goalInput = document.getElementById('goalInput');
    const goalText = goalInput.value.trim();
    
    if (!goalText) {
        showNotification('Please enter a goal', 'warning');
        return;
    }

    // Get existing goals
    let goals = JSON.parse(localStorage.getItem('focusup-goals') || '[]');
    
    const newGoal = {
        id: Date.now(),
        text: goalText,
        completed: false,
        createdDate: new Date().toLocaleDateString()
    };

    goals.push(newGoal);
    localStorage.setItem('focusup-goals', JSON.stringify(goals));
    
    goalInput.value = '';
    loadGoals();
    showNotification('Goal added! 🎯', 'success');
    playSound('success');
}

function loadGoals() {
    const goalsList = document.getElementById('goalsList');
    if (!goalsList) return;

    let goals = JSON.parse(localStorage.getItem('focusup-goals') || '[]');
    goalsList.innerHTML = '';

    goals.forEach(goal => {
        const goalItem = document.createElement('div');
        goalItem.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        goalItem.innerHTML = `
            <div>
                <strong>${goal.text}</strong>
                <br>
                <small class="text-muted">Added: ${goal.createdDate}</small>
            </div>
            <div>
                <button class="btn btn-sm btn-success me-2" onclick="completeGoal(${goal.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteGoal(${goal.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        goalsList.appendChild(goalItem);
    });
}

function completeGoal(goalId) {
    let goals = JSON.parse(localStorage.getItem('focusup-goals') || '[]');
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
        goal.completed = !goal.completed;
        localStorage.setItem('focusup-goals', JSON.stringify(goals));
        loadGoals();
        showNotification('Goal updated! ✅', 'success');
        playSound('success');
    }
}

function deleteGoal(goalId) {
    let goals = JSON.parse(localStorage.getItem('focusup-goals') || '[]');
    goals = goals.filter(g => g.id !== goalId);
    localStorage.setItem('focusup-goals', JSON.stringify(goals));
    loadGoals();
    showNotification('Goal removed', 'info');
}

// ============= 2026 FEATURES: STATS TRACKING =============

function initializeStatsTracking() {
    updateStatsDisplay();
    // Update stats every minute
    setInterval(updateStatsDisplay, 60000);
}

function recordSessionCompletion() {
    let stats = JSON.parse(localStorage.getItem('focusup-stats') || '{"totalSessions": 0, "totalFocusTime": 0, "breathingRounds": 0}');
    stats.totalSessions = (stats.totalSessions || 0) + 1;
    localStorage.setItem('focusup-stats', JSON.stringify(stats));
    updateStatsDisplay();
}

function recordBreathingSession() {
    let stats = JSON.parse(localStorage.getItem('focusup-stats') || '{"totalSessions": 0, "totalFocusTime": 0, "breathingRounds": 0}');
    stats.breathingRounds = (stats.breathingRounds || 0) + 1;
    localStorage.setItem('focusup-stats', JSON.stringify(stats));
    updateStatsDisplay();
}

function recordFocusTime(minutes) {
    let stats = JSON.parse(localStorage.getItem('focusup-stats') || '{"totalSessions": 0, "totalFocusTime": 0, "breathingRounds": 0}');
    stats.totalFocusTime = (stats.totalFocusTime || 0) + minutes;
    localStorage.setItem('focusup-stats', JSON.stringify(stats));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    let stats = JSON.parse(localStorage.getItem('focusup-stats') || '{"totalSessions": 0, "totalFocusTime": 0, "breathingRounds": 0}');
    
    // Update display elements
    const totalFocusTimeEl = document.getElementById('totalFocusTime');
    const completedSessionsEl = document.getElementById('completedSessions');
    const totalBreathingEl = document.getElementById('totalBreathing');
    
    if (totalFocusTimeEl) {
        const hours = Math.floor(stats.totalFocusTime / 60);
        totalFocusTimeEl.textContent = `${hours}h`;
    }
    
    if (completedSessionsEl) {
        completedSessionsEl.textContent = stats.totalSessions || 0;
    }
    
    if (totalBreathingEl) {
        totalBreathingEl.textContent = stats.breathingRounds || 0;
    }
}

// ============= 2026 FEATURES: STREAK TRACKING =============

function initializeStreakTracking() {
    updateStreakDisplay();
}

function updateStreakDisplay() {
    const lastStudyDate = localStorage.getItem('focusup-lastStudyDate');
    const today = new Date().toDateString();
    let streak = parseInt(localStorage.getItem('focusup-streak') || '0');

    if (lastStudyDate !== today) {
        const lastDate = new Date(lastStudyDate || today);
        const todayDate = new Date(today);
        const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            streak++;
        } else if (daysDiff > 1) {
            streak = 1;
        }

        localStorage.setItem('focusup-lastStudyDate', today);
        localStorage.setItem('focusup-streak', streak);
    }

    const streakEl = document.getElementById('streakCount');
    const currentStreakEl = document.getElementById('currentStreak');
    
    if (streakEl) streakEl.textContent = streak;
    if (currentStreakEl) currentStreakEl.textContent = streak;
}

function studyToday() {
    const today = new Date().toDateString();
    localStorage.setItem('focusup-lastStudyDate', today);
    updateStreakDisplay();
}

// ============= 2026 FEATURES: BREAK ACTIVITIES =============

function setupBreakActivities() {
    const breakButtons = document.querySelectorAll('.btn-activity');
    
    const activities = {
        'Stretch': 'Take a good stretch! Touch your toes, reach for the sky, and loosen those muscles.',
        'Dance': 'Put on your favorite song and dance for a couple of minutes. It energizes your body and mind!',
        'Walk': 'Take a short walk around your room or outside. Fresh air is amazing for focus.',
        'Hydrate': 'Drink a glass of water. Stay hydrated for optimal brain performance!',
        'Meditate': 'Close your eyes and take 5 deep breaths. Meditation reduces stress and improves focus.',
        'Snack': 'Grab a healthy snack like nuts, fruit, or yogurt. Fuel your brain!'
    };

    breakButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activityName = this.textContent.split('\n')[1].trim();
            const message = activities[activityName];
            showNotification(message, 'info');
            playSound('success');
        });
    });
}
