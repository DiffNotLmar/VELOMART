// Global Music Player for VeloMart

document.addEventListener('DOMContentLoaded', function() {
    createMusicPlayer();
});

function createMusicPlayer() {
    // Check if player already exists
    if (document.getElementById('globalMusicPlayer')) return;

    // Determine audio path based on current location
    const isInPagesDir = window.location.pathname.includes('/pages/');
    const audioPath = isInPagesDir 
        ? '../Al James, Muric - Mood (Official Lyric Video) (1).mp3'
        : 'Al James, Muric - Mood (Official Lyric Video) (1).mp3';

    const playerHTML = `
        <div id="globalMusicPlayer" class="music-player">
            <button class="music-toggle" id="musicToggle">
                <i class="fas fa-music"></i>
            </button>
            
            <div class="music-controls" id="musicControls">
                <div class="music-info">
                    <div class="music-title">Al James, Muric - Mood</div>
                    <div class="music-artist">Background Music</div>
                </div>
                
                <div class="player-buttons">
                    <button class="player-btn" id="playPauseBtn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
                
                <div class="volume-control">
                    <button class="volume-btn" id="volumeBtn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <input type="range" id="volumeSlider" class="volume-slider" min="0" max="100" value="50">
                    <span class="volume-value" id="volumeValue">50%</span>
                </div>
                
                <button class="close-player" id="closePlayer">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <audio id="backgroundMusic" loop>
                <source src="${audioPath}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playerHTML);

    // Initialize player
    initializeMusicPlayer();
}

function initializeMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const volumeBtn = document.getElementById('volumeBtn');
    const musicToggle = document.getElementById('musicToggle');
    const musicControls = document.getElementById('musicControls');
    const closePlayer = document.getElementById('closePlayer');

    // Load saved settings from localStorage
    const savedVolume = localStorage.getItem('velomart_music_volume');
    const wasMusicPlaying = localStorage.getItem('velomart_music_playing');
    const savedTime = localStorage.getItem('velomart_music_time');
    
    // Set initial volume (from saved or default 50%)
    const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.5;
    audio.volume = initialVolume;
    volumeSlider.value = initialVolume * 100;
    volumeValue.textContent = Math.round(initialVolume * 100) + '%';
    updateVolumeIcon(initialVolume);

    // Restore playback position
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Autoplay when page loads (if music was playing before or first visit)
    const shouldAutoplay = wasMusicPlaying === null || wasMusicPlaying === 'true';
    
    if (shouldAutoplay) {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicToggle.classList.add('playing');
                localStorage.setItem('velomart_music_playing', 'true');
            }).catch(error => {
                // Autoplay was prevented (browser policy)
                console.log('Autoplay prevented. Click anywhere to start music.');
                
                // Add a one-time click listener to start music on first interaction
                const startOnClick = function() {
                    audio.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicToggle.classList.add('playing');
                    localStorage.setItem('velomart_music_playing', 'true');
                };
                document.addEventListener('click', startOnClick, { once: true });
            });
        }
    }

    // Save playback position every second while playing
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('velomart_music_time', audio.currentTime);
        }
    }, 1000);

    // Save position before page unload
    window.addEventListener('beforeunload', () => {
        if (!audio.paused) {
            localStorage.setItem('velomart_music_time', audio.currentTime);
            localStorage.setItem('velomart_music_playing', 'true');
        }
    });

    // Toggle controls visibility
    musicToggle.addEventListener('click', function() {
        const isOpen = musicControls.classList.contains('show');
        if (isOpen) {
            musicControls.classList.remove('show');
        } else {
            musicControls.classList.add('show');
        }
    });

    // Close player
    closePlayer.addEventListener('click', function() {
        musicControls.classList.remove('show');
    });

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
            localStorage.setItem('velomart_music_playing', 'true');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicToggle.classList.remove('playing');
            localStorage.setItem('velomart_music_playing', 'false');
            localStorage.setItem('velomart_music_time', audio.currentTime);
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        audio.volume = volume;
        volumeValue.textContent = this.value + '%';
        updateVolumeIcon(volume);
        localStorage.setItem('velomart_music_volume', volume);
    });

    // Volume button - mute/unmute
    volumeBtn.addEventListener('click', function() {
        if (audio.volume > 0) {
            audio.dataset.previousVolume = audio.volume;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeValue.textContent = '0%';
            updateVolumeIcon(0);
            localStorage.setItem('velomart_music_volume', '0');
        } else {
            const previousVolume = parseFloat(audio.dataset.previousVolume) || 0.5;
            audio.volume = previousVolume;
            volumeSlider.value = previousVolume * 100;
            volumeValue.textContent = Math.round(previousVolume * 100) + '%';
            updateVolumeIcon(previousVolume);
            localStorage.setItem('velomart_music_volume', previousVolume);
        }
    });

    function updateVolumeIcon(volume) {
        const icon = volumeBtn.querySelector('i');
        icon.className = '';
        if (volume === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    // Close controls when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.music-player')) {
            musicControls.classList.remove('show');
        }
    });

    // Prevent closing when clicking inside controls
    musicControls.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}
