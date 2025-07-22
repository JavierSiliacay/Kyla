    // Audio player functionality
    class HeartAudioPlayer {
        constructor() {
            this.currentAudio = null;
            this.audioButtons = document.querySelectorAll('.audio-btn');
            this.nowPlayingText = document.getElementById('now-playing');
            this.init();
        }

        init() {
            // Add click event listeners to all audio buttons
            this.audioButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.playAudio(button);
                });
            });
        }

        playAudio(button) {
            const audioFile = button.getAttribute('data-audio');
            const buttonNumber = button.querySelector('.btn-number').textContent;
            
            // Stop current audio if playing
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }

            // Remove playing class from all buttons
            this.audioButtons.forEach(btn => btn.classList.remove('playing'));

            // Create new audio element
            this.currentAudio = new Audio(audioFile);
            
            // Add playing class to current button
            button.classList.add('playing');
            
            // Update now playing text
            this.nowPlayingText.textContent = `💖 Audio for the prettiest girl:  ${buttonNumber} 💖`;

            // Play the audio
            this.currentAudio.play().catch(error => {
                console.log('Audio play failed:', error);
                this.nowPlayingText.textContent = `❌ Please add ${audioFile} to play this love song`;
                button.classList.remove('playing');
            });

            // Handle audio end
            this.currentAudio.addEventListener('ended', () => {
                button.classList.remove('playing');
                this.nowPlayingText.textContent = 'Click a heart to play your love song 💝';
            });

            // Handle audio error
            this.currentAudio.addEventListener('error', () => {
                button.classList.remove('playing');
                this.nowPlayingText.textContent = `❌ Please add ${audioFile} to play this love song`;
            });
        }
    }

    // Initialize the audio player when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new HeartAudioPlayer();
        
        // Add some romantic sparkle effects
        createSparkles();
    });

    // Create floating sparkle effects
    function createSparkles() {
        const sparkleCount = 20;
        
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 200);
        }
        
        // Continue creating sparkles
        setInterval(() => {
            createSparkle();
        }, 3000);
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = window.innerHeight + 'px';
        sparkle.style.fontSize = (Math.random() * 20 + 10) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = `sparkle-float ${3 + Math.random() * 2}s linear forwards`;
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 5000);
    }

    // Add sparkle float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);