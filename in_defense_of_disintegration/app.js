// Audio & state
let isPlaying = false;

// 1. Navigation state
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const currentSlideText = document.getElementById('current-slide');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Initialize slideshow state
function initSlides() {
  document.getElementById('total-slides').innerText = totalSlides;
  
  // Set initial slide from URL hash if present
  const hash = window.location.hash;
  if (hash) {
    const targetSlide = document.querySelector(hash);
    if (targetSlide) {
      const index = Array.from(slides).indexOf(targetSlide);
      if (index !== -1) {
        slides[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
      }
    }
  }
  
  currentSlideText.innerText = currentSlide + 1;
  updateControls();
}

function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  
  currentSlideText.innerText = currentSlide + 1;
  updateControls();
  
  // Update URL hash to reflect state without page jump
  const activeSlideId = slides[currentSlide].id;
  history.replaceState(null, null, `#${activeSlideId}`);
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
}

// Listen to browser forward/back hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash;
  if (hash) {
    const targetSlide = document.querySelector(hash);
    if (targetSlide) {
      const index = Array.from(slides).indexOf(targetSlide);
      if (index !== -1 && index !== currentSlide) {
        goToSlide(index);
      }
    }
  }
});


function updateControls() {
  btnPrev.disabled = (currentSlide === 0);
  btnNext.disabled = (currentSlide === totalSlides - 1);
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error enabling fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// 3. Audio via HTML5 Audio Element
const audio = document.getElementById('bg-audio');
audio.volume = 0.4;

audio.addEventListener('play', () => {
  isPlaying = true;
  targetAmplitude = 1.0;
  document.getElementById('btn-play-pause').disabled = false;
  showPauseIcon();
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  targetAmplitude = 0.0;
  showPlayIcon();
});

audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play();
});

function toggleAudio() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function showPauseIcon() {
  document.getElementById('icon-play').style.display = 'none';
  document.getElementById('icon-pause').style.display = 'block';
}

function showPlayIcon() {
  document.getElementById('icon-play').style.display = 'block';
  document.getElementById('icon-pause').style.display = 'none';
}

function playFromSlide() {
  audio.play();
}

// 5. Listeners & Setup
document.addEventListener('DOMContentLoaded', () => {
  initSlides();

  // Navigation triggers
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  document.getElementById('btn-first').addEventListener('click', () => goToSlide(0));
  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
  
  // Slide play button
  document.getElementById('btn-play-loops').addEventListener('click', playFromSlide);

  // Audio UI triggers
  document.getElementById('btn-play-pause').addEventListener('click', toggleAudio);
  
  const volumeSlider = document.getElementById('slider-volume');
  volumeSlider.addEventListener('input', (e) => {
    const vol = e.target.value;
    audio.volume = vol / 100;
    audio.muted = false;
  });
  
  document.getElementById('btn-volume').addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      volumeSlider.value = audio.volume * 100;
    } else {
      audio.muted = true;
      volumeSlider.value = 0;
    }
  });
  
  // Keyboard navigation shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
      case 'ArrowRight':
      case ' ': // Spacebar
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });

  // Touch Swipe navigation
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide();
    }
  }
});
