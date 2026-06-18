// Breathing Exercises - Guided Relaxation

let breathingRunning = false;
let breathingPhase = 'inhale'; // 'inhale', 'hold', 'exhale'
let breathingRounds = 0;
let breathingCycle = 0;

// Initialize breathing exercises
document.addEventListener('DOMContentLoaded', () => {
    setupBreathingControls();
    loadBreathingStats();
});

// Setup breathing controls
function setupBreathingControls() {
    const startBtn = document.getElementById('startBreathingBtn');
    const stopBtn = document.getElementById('stopBreathingBtn');

    startBtn.addEventListener('click', startBreathingExercise);
    stopBtn.addEventListener('click', stopBreathingExercise);
}

// Start breathing exercise
function startBreathingExercise() {
    if (breathingRunning) return;

    breathingRunning = true;
    breathingCycle = 0;
    breathingPhase = 'inhale';

    // Update button states
    document.getElementById('startBreathingBtn').disabled = true;
    document.getElementById('stopBreathingBtn').disabled = false;

    // Show notification
    focusUpApp.showNotification('🌬️ Breathing exercise started. Follow the circle and breathe deeply.', 'success');

    // Start the breathing cycle (4-7-8 technique)
    performBreathingCycle();
}

// Perform breathing cycle (4-7-8 breathing technique)
function performBreathingCycle() {
    if (!breathingRunning) return;

    const circle = document.getElementById('breathingCircle');
    const breathText = document.getElementById('breathText');

    // Timings for 4-7-8 breathing technique
    const timings = {
        inhale: 4000,    // Breathe in for 4 seconds
        hold: 7000,      // Hold for 7 seconds
        exhale: 8000     // Breathe out for 8 seconds
    };

    const totalCycleTime = timings.inhale + timings.hold + timings.exhale; // 19 seconds per cycle
    const maxRounds = 4; // 4 cycles for full exercise

    // Perform one breathing cycle
    performPhase('inhale', timings.inhale, breathText, circle);

    setTimeout(() => {
        if (!breathingRunning) return;
        performPhase('hold', timings.hold, breathText, circle);

        setTimeout(() => {
            if (!breathingRunning) return;
            performPhase('exhale', timings.exhale, breathText, circle);

            setTimeout(() => {
                if (!breathingRunning) return;

                breathingCycle++;

                if (breathingCycle < maxRounds) {
                    // Continue with next cycle
                    performBreathingCycle();
                } else {
                    // Breathing exercise complete
                    completeBreathingExercise();
                }
            }, timings.exhale);
        }, timings.hold);
    }, timings.inhale);
}

// Perform a single breathing phase
function performPhase(phase, duration, textElement, circle) {
    const phaseTexts = {
        inhale: 'Breathe In',
        hold: 'Hold',
        exhale: 'Breathe Out'
    };

    textElement.textContent = phaseTexts[phase];

    if (phase === 'inhale') {
        circle.style.animation = 'none';
        setTimeout(() => {
            circle.style.animation = `breatheIn ${duration / 1000}s ease-in forwards`;
        }, 10);
    } else if (phase === 'hold') {
        circle.style.animation = 'none';
        circle.style.transform = 'scale(1.2)';
    } else if (phase === 'exhale') {
        circle.style.animation = `breatheOut ${duration / 1000}s ease-out forwards`;
    }

    // Add breathing phase animation
    if (!document.getElementById('breathingAnimations')) {
        const style = document.createElement('style');
        style.id = 'breathingAnimations';
        style.textContent = `
            @keyframes breatheIn {
                from { transform: scale(1); }
                to { transform: scale(1.2); }
            }
            @keyframes breatheOut {
                from { transform: scale(1.2); }
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Complete breathing exercise
function completeBreathingExercise() {
    breathingRunning = false;
    breathingRounds++;

    // Record breathing session for stats
    if (typeof recordBreathingSession === 'function') {
        recordBreathingSession();
    }

    // Update round count
    document.getElementById('breathingRounds').textContent = breathingRounds;
    localStorage.setItem('focusup-breathing-rounds', breathingRounds);

    // Update button states
    document.getElementById('startBreathingBtn').disabled = false;
    document.getElementById('stopBreathingBtn').disabled = true;

    // Reset circle
    const circle = document.getElementById('breathingCircle');
    const breathText = document.getElementById('breathText');
    circle.style.animation = 'none';
    circle.style.transform = 'scale(1)';
    breathText.textContent = 'Ready';

    // Play success sound
    focusUpApp.playSound('success');

    focusUpApp.showNotification('✅ Great job! You completed a breathing exercise. Well done on taking care of your mental health!', 'success');
}

// Stop breathing exercise
function stopBreathingExercise() {
    if (!breathingRunning) return;

    breathingRunning = false;

    // Update button states
    document.getElementById('startBreathingBtn').disabled = false;
    document.getElementById('stopBreathingBtn').disabled = true;

    // Reset circle
    const circle = document.getElementById('breathingCircle');
    const breathText = document.getElementById('breathText');
    circle.style.animation = 'none';
    circle.style.transform = 'scale(1)';
    breathText.textContent = 'Ready';

    focusUpApp.showNotification('🛑 Breathing exercise stopped', 'info');
}

// Load breathing statistics
function loadBreathingStats() {
    breathingRounds = parseInt(localStorage.getItem('focusup-breathing-rounds')) || 0;
    document.getElementById('breathingRounds').textContent = breathingRounds;
}

// Advanced: 10-minute extended breathing session
function startExtendedBreathingSession() {
    // This would be for an extended 10-minute session
    // Could be triggered from a button or settings menu
    const extendedDuration = 10 * 60 * 1000; // 10 minutes
    startBreathingExercise();
    
    setTimeout(() => {
        if (breathingRunning) {
            stopBreathingExercise();
            focusUpApp.showNotification('🎉 Extended breathing session completed!', 'success');
        }
    }, extendedDuration);
}

// Guided meditation helper
function startGuidedMeditation() {
    const meditationSteps = [
        { text: 'Close your eyes and sit comfortably', duration: 2000 },
        { text: 'Breathe in slowly through your nose', duration: 4000 },
        { text: 'Hold the breath', duration: 7000 },
        { text: 'Exhale slowly through your mouth', duration: 8000 },
        { text: 'Let your mind become peaceful', duration: 3000 },
        { text: 'Notice the sounds around you', duration: 3000 },
        { text: 'Acknowledge any thoughts without judgment', duration: 3000 },
        { text: 'Return focus to your breathing', duration: 3000 }
    ];

    let stepIndex = 0;
    const breathText = document.getElementById('breathText');

    function nextStep() {
        if (stepIndex < meditationSteps.length) {
            const step = meditationSteps[stepIndex];
            breathText.textContent = step.text;
            stepIndex++;

            setTimeout(nextStep, step.duration);
        } else {
            breathText.textContent = 'Session Complete';
            focusUpApp.showNotification('🧘 Meditation session completed. Feel refreshed!', 'success');
        }
    }

    nextStep();
}

// Breathing techniques reference
const breathingTechniques = {
    '4-7-8': {
        name: '4-7-8 Breathing',
        description: 'Inhale 4 counts, hold 7, exhale 8',
        inhale: 4,
        hold: 7,
        exhale: 8,
        rounds: 4
    },
    'boxBreathing': {
        name: 'Box Breathing',
        description: 'Inhale 4, hold 4, exhale 4, hold 4',
        inhale: 4,
        hold: 4,
        exhale: 4,
        rounds: 8
    },
    'alternateNostril': {
        name: 'Alternate Nostril Breathing',
        description: 'Breathe alternately through each nostril',
        inhale: 4,
        hold: 4,
        exhale: 4,
        rounds: 10
    },
    'diaphragmatic': {
        name: 'Diaphragmatic Breathing',
        description: 'Slow, deep breathing from the belly',
        inhale: 5,
        hold: 0,
        exhale: 6,
        rounds: 10
    }
};

// Export breathing functions
window.breathingFunctions = {
    startBreathingExercise,
    stopBreathingExercise,
    startExtendedBreathingSession,
    startGuidedMeditation,
    breathingTechniques
};
