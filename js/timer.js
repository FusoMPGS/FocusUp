// Timer - Pomodoro Focus Timer

let timerInterval = null;
let timerRunning = false;
let timerPaused = false;
let currentMode = 'focus'; // 'focus' or 'break'
let sessionCount = 0;
let focusTimeRemaining = 25 * 60; // 25 minutes in seconds
let breakTimeRemaining = 5 * 60;  // 5 minutes in seconds
let focusTimeDuration = 25 * 60;
let breakTimeDuration = 5 * 60;

// Initialize timer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupTimerControls();
    updateTimerDisplay();
});

// Setup timer controls
function setupTimerControls() {
    const startBtn = document.getElementById('startTimerBtn');
    const pauseBtn = document.getElementById('pauseTimerBtn');
    const resetBtn = document.getElementById('resetTimerBtn');
    const focusInput = document.getElementById('focusTime');
    const breakInput = document.getElementById('breakTime');
    
    if (!startBtn || !pauseBtn || !resetBtn || !focusInput || !breakInput) return;

    // Load saved preferences
    const prefs = focusUpApp.loadUserPreferences();
    focusInput.value = prefs.focusTime || 25;
    breakInput.value = prefs.breakTime || 5;
    focusTimeDuration = focusInput.value * 60;
    breakTimeDuration = breakInput.value * 60;
    focusTimeRemaining = focusTimeDuration;
    
    // Initialize button states
    pauseBtn.disabled = true;
    resetBtn.disabled = false;

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Update duration when inputs change (only when timer is not running)
    focusInput.addEventListener('change', () => {
        if (!timerRunning) {
            focusTimeDuration = parseInt(focusInput.value) * 60;
            focusTimeRemaining = focusTimeDuration;
            updateTimerDisplay();
            saveTimerSettings();
        }
    });

    breakInput.addEventListener('change', () => {
        if (!timerRunning) {
            breakTimeDuration = parseInt(breakInput.value) * 60;
            if (currentMode === 'break') {
                breakTimeRemaining = breakTimeDuration;
                updateTimerDisplay();
            }
            saveTimerSettings();
        }
    });
}

// Start timer
function startTimer() {
    if (timerRunning && !timerPaused) return;

    timerRunning = true;
    timerPaused = false;

    // Disable inputs while running
    document.getElementById('focusTime').disabled = true;
    document.getElementById('breakTime').disabled = true;

    // Update button states
    document.getElementById('startTimerBtn').disabled = true;
    document.getElementById('pauseTimerBtn').disabled = false;

    // Show notification
    focusUpApp.showNotification(`🎯 Focus session started! Stay focused for ${currentMode === 'focus' ? document.getElementById('focusTime').value : document.getElementById('breakTime').value} minutes.`, 'success');

    timerInterval = setInterval(updateTimer, 1000);
}

// Pause timer
function pauseTimer() {
    if (!timerRunning || timerPaused) return;

    timerPaused = true;
    clearInterval(timerInterval);

    // Update button states
    document.getElementById('startTimerBtn').disabled = false;
    document.getElementById('pauseTimerBtn').disabled = true;
    document.getElementById('startTimerBtn').innerHTML = '<i class="fas fa-play"></i> Resume';

    focusUpApp.showNotification('⏸️ Timer paused', 'warning');
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPaused = false;
    currentMode = 'focus';
    focusTimeRemaining = focusTimeDuration;
    breakTimeRemaining = breakTimeDuration;

    // Re-enable inputs
    document.getElementById('focusTime').disabled = false;
    document.getElementById('breakTime').disabled = false;

    // Reset button states
    document.getElementById('startTimerBtn').disabled = false;
    document.getElementById('pauseTimerBtn').disabled = true;
    document.getElementById('startTimerBtn').innerHTML = '<i class="fas fa-play"></i> Start';

    updateTimerDisplay();
    focusUpApp.showNotification('🔄 Timer reset', 'info');
}

// Update timer every second
function updateTimer() {
    if (currentMode === 'focus') {
        focusTimeRemaining--;

        if (focusTimeRemaining <= 0) {
            completeSession();
        }
    } else {
        breakTimeRemaining--;

        if (breakTimeRemaining <= 0) {
            completeBreak();
        }
    }

    updateTimerDisplay();

    // Low time warning (last 5 seconds)
    if ((currentMode === 'focus' && focusTimeRemaining <= 5 && focusTimeRemaining > 0) ||
        (currentMode === 'break' && breakTimeRemaining <= 5 && breakTimeRemaining > 0)) {
        if (focusTimeRemaining % 1 === 0 || breakTimeRemaining % 1 === 0) {
            focusUpApp.playSound('notification');
        }
    }
}

// Complete focus session
function completeSession() {
    clearInterval(timerInterval);
    timerRunning = false;
    sessionCount++;
    currentMode = 'break';
    breakTimeRemaining = breakTimeDuration;

    // Play success sound
    focusUpApp.playSound('success');

    // Record stats for 2026 features
    if (typeof recordSessionCompletion === 'function') {
        recordSessionCompletion();
        recordFocusTime(parseInt(document.getElementById('focusTime').value));
        studyToday();
    }

    // Show notification
    focusUpApp.showNotification(`✅ Focus session complete! You've completed ${sessionCount} session(s). Time for a break!`, 'success');

    // Update session count display
    document.getElementById('sessionsCount').textContent = sessionCount;

    // Save to localStorage
    localStorage.setItem('focusup-sessions', sessionCount);

    // Auto-start break
    setTimeout(() => {
        focusUpApp.showNotification('🎉 Break time! Take a moment to relax.', 'info');
        startTimer();
    }, 2000);

    updateTimerDisplay();
}

// Complete break
function completeBreak() {
    clearInterval(timerInterval);
    timerRunning = false;
    currentMode = 'focus';
    focusTimeRemaining = focusTimeDuration;

    // Play success sound
    focusUpApp.playSound('success');

    // Show notification
    focusUpApp.showNotification('⏰ Break over! Ready for another focus session?', 'success');

    updateTimerDisplay();

    // Disable pause button
    document.getElementById('pauseTimerBtn').disabled = true;
}

// Update timer display
function updateTimerDisplay() {
    const mins = Math.floor(focusTimeRemaining / 60);
    const secs = focusTimeRemaining % 60;

    if (currentMode === 'break') {
        const breakMins = Math.floor(breakTimeRemaining / 60);
        const breakSecs = breakTimeRemaining % 60;
        document.getElementById('timerMinutes').textContent = breakMins.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = breakSecs.toString().padStart(2, '0');
    } else {
        document.getElementById('timerMinutes').textContent = mins.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = secs.toString().padStart(2, '0');
    }

    // Update page title to show remaining time
    if (timerRunning) {
        const remaining = currentMode === 'focus' ? focusTimeRemaining : breakTimeRemaining;
        const mode = currentMode === 'focus' ? '🎯' : '☕';
        document.title = `${mode} ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} - FocusUp`;
    } else {
        document.title = 'FocusUp - Focus & Productivity for Students';
    }
}

// Save timer settings
function saveTimerSettings() {
    const prefs = {
        focusTime: parseInt(document.getElementById('focusTime').value),
        breakTime: parseInt(document.getElementById('breakTime').value),
        volume: parseInt(document.getElementById('volumeSlider')?.value || 70)
    };
    focusUpApp.saveUserPreferences(prefs);
}

// Load session count from localStorage on startup
document.addEventListener('DOMContentLoaded', () => {
    sessionCount = parseInt(localStorage.getItem('focusup-sessions')) || 0;
    document.getElementById('sessionsCount').textContent = sessionCount;
});

// Export timer functions
window.timerFunctions = {
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimerDisplay
};
