// Music Player - Focus Music Playlists

let currentPlaylist = 'lofi';
let isPlaying = false;
let audioContext = null;
let oscillators = [];

// Playlist data
const playlists = {
    lofi: {
        name: 'Lo-Fi Beats',
        description: 'Perfect for focused work and studying',
        tracks: [
            'Study Track 1 - 3:45',
            'Ambient Focus - 4:12',
            'Beats For Concentration - 3:58',
            'Lo-Fi Hip Hop - 4:05',
            'Chill Beats - 3:52'
        ]
    },
    ambient: {
        name: 'Ambient Sounds',
        description: 'Calming background ambience',
        tracks: [
            'Peaceful Ambience - 5:20',
            'Soft Pad Waves - 4:45',
            'Serene Atmosphere - 5:10',
            'Zen Garden - 4:30',
            'Gentle Flow - 5:00'
        ]
    },
    nature: {
        name: 'Nature Sounds',
        description: 'Natural sounds for relaxation',
        tracks: [
            'Forest Rain - 6:00',
            'Ocean Waves - 5:45',
            'Bird Song Morning - 4:20',
            'Thunder Storm - 5:30',
            'Flowing Stream - 5:15'
        ]
    },
    classical: {
        name: 'Classical Study',
        description: 'Classical music for concentration',
        tracks: [
            'Piano Sonata - 5:30',
            'String Quartet - 6:15',
            'Violin Concerto - 7:00',
            'Chamber Music - 6:45',
            'Baroque Suite - 5:45'
        ]
    },
    jazz: {
        name: 'Jazz Focus',
        description: 'Smooth jazz for productive studying',
        tracks: [
            'Smooth Jazz Night - 5:20',
            'Cool Standards - 6:00',
            'Jazz Piano - 5:45',
            'Blue Notes - 6:15',
            'Bebop Dreams - 5:30'
        ]
    }
};

// Initialize music player
document.addEventListener('DOMContentLoaded', () => {
    setupMusicPlayer();
    loadAudioContext();
});

// Setup music player controls
function setupMusicPlayer() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const playlistItems = document.querySelectorAll('.playlist-item');

    // Player button events
    playBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', pauseMusic);
    stopBtn.addEventListener('click', stopMusic);

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        localStorage.setItem('focusup-volume', volume);
        updateVolume(volume);
    });

    // Playlist selection
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            selectPlaylist(item.dataset.playlist);
        });
    });

    // Load saved volume
    const savedVolume = localStorage.getItem('focusup-volume') || 70;
    volumeSlider.value = savedVolume;
}

// Load audio context
function loadAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Select playlist
function selectPlaylist(playlistKey) {
    currentPlaylist = playlistKey;
    const playlist = playlists[playlistKey];

    // Update active playlist in UI
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.playlist === playlistKey) {
            item.classList.add('active');
            item.innerHTML = '<i class="fas fa-play-circle"></i> ' + playlist.name;
        } else {
            item.innerHTML = '<i class="fas fa-circle"></i> ' + playlists[item.dataset.playlist].name;
        }
    });

    // Update player display
    document.getElementById('currentPlaylistName').textContent = playlist.name;

    // Show notification
    focusUpApp.showNotification(`🎵 Switched to ${playlist.name}`, 'info');

    // Optionally auto-play
    // playMusic();
}

// Play music
function playMusic() {
    if (isPlaying) return;

    isPlaying = true;
    loadAudioContext();

    // Update button states
    document.getElementById('playBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;

    // Create continuous audio (simulated with Web Audio API)
    createAudioLoop();

    focusUpApp.showNotification(`▶️ Playing ${playlists[currentPlaylist].name}`, 'success');
}

// Pause music
function pauseMusic() {
    if (!isPlaying) return;

    isPlaying = false;
    stopAudioLoop();

    // Update button states
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;

    focusUpApp.showNotification('⏸️ Music paused', 'warning');
}

// Stop music
function stopMusic() {
    isPlaying = false;
    stopAudioLoop();

    // Update button states
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;

    // Reset display
    document.getElementById('durationText').textContent = 'Time Remaining: --:--';

    focusUpApp.showNotification('⏹️ Music stopped', 'info');
}

// Create audio loop
function createAudioLoop() {
    if (!audioContext) return;

    // Use Web Audio API to create a simple ambient tone
    const masterVolume = audioContext.createGain();
    masterVolume.connect(audioContext.destination);
    masterVolume.gain.value = parseFloat(document.getElementById('volumeSlider').value) / 100;

    // Create multiple oscillators for richer sound
    const frequencies = getPlaylistFrequencies();
    
    frequencies.forEach(freq => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Slowly modulate the frequency for a more natural sound
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        osc.frequency.linearRampToValueAtTime(freq * 0.98, audioContext.currentTime + 4);
        osc.frequency.linearRampToValueAtTime(freq, audioContext.currentTime + 8);
        
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        
        osc.connect(gain);
        gain.connect(masterVolume);
        
        osc.start(audioContext.currentTime);
        
        oscillators.push({ osc, gain });
    });

    // Update visualizer
    startVisualizer();

    // Simulate track duration display
    updateTrackDuration();
}

// Stop audio loop
function stopAudioLoop() {
    oscillators.forEach(({ osc }) => {
        try {
            osc.stop();
        } catch (e) {
            // Already stopped
        }
    });
    oscillators = [];
    
    stopVisualizer();
}

// Get playlist specific frequencies
function getPlaylistFrequencies() {
    const baseFrequencies = {
        lofi: [55, 110, 220, 330],        // A notes for lo-fi vibe
        ambient: [65.4, 130.8, 196, 261.6], // C notes for calm feel
        nature: [82.4, 164.8, 246.9, 329.6], // E notes
        classical: [87.3, 174.6, 261.6, 349.2], // F notes
        jazz: [73.4, 146.8, 220, 293.7]   // D notes for jazz feel
    };

    return baseFrequencies[currentPlaylist] || baseFrequencies.lofi;
}

// Update volume
function updateVolume(volume) {
    if (audioContext && oscillators.length > 0) {
        oscillators.forEach(({ gain }) => {
            gain.gain.setValueAtTime(
                (parseFloat(volume) / 100) * 0.15,
                audioContext.currentTime
            );
        });
    }
}

// Start visualizer animation
function startVisualizer() {
    const visualizer = document.querySelector('.visualizer');
    if (!visualizer) return;

    const spans = visualizer.querySelectorAll('span');
    const animationId = setInterval(() => {
        spans.forEach(span => {
            const randomHeight = Math.random() * 80 + 20;
            span.style.height = randomHeight + '%';
        });
    }, 100);

    // Store animation ID for cleanup
    window.visualizerAnimId = animationId;
}

// Stop visualizer animation
function stopVisualizer() {
    if (window.visualizerAnimId) {
        clearInterval(window.visualizerAnimId);
        window.visualizerAnimId = null;

        // Reset visualizer
        const spans = document.querySelectorAll('.visualizer span');
        spans.forEach((span, index) => {
            const heights = [30, 50, 70, 50, 30];
            span.style.height = heights[index] + '%';
        });
    }
}

// Update track duration
function updateTrackDuration() {
    const playlist = playlists[currentPlaylist];
    const currentTrackTime = Math.floor(Math.random() * 300) + 60; // Random time between 1-5 min
    const totalPlaylistTime = playlist.tracks.length * 300; // Avg 5 min per track

    let elapsedTime = 0;
    const updateInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(updateInterval);
            return;
        }

        elapsedTime += 1;
        const remaining = totalPlaylistTime - elapsedTime;

        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        const timeText = hours > 0 
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;

        document.getElementById('durationText').textContent = `Time Remaining: ${timeText}`;
    }, 1000);

    window.trackDurationInterval = updateInterval;
}

// Export music functions
window.musicFunctions = {
    playMusic,
    pauseMusic,
    stopMusic,
    selectPlaylist
};
