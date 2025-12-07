// Time slot configuration (IST)
const TIME_SLOTS = [
    { start: 6, end: 10 },   // Slot 1: 06:00-10:00
    { start: 10, end: 16 },  // Slot 2: 10:00-16:00
    { start: 16, end: 19 },  // Slot 3: 16:00-19:00
    { start: 19, end: 22 },  // Slot 4: 19:00-22:00
    { start: 22, end: 6 }    // Slot 5: 22:00-06:00 (wraps around)
];

// Dialogue options for each slot
const DIALOGUES = {
    1: [
        "Good morning pookie, have a nice day. I love you ❤️",
        "Good morning hunny, take a kissy to start yo day, I love you 💋",
        "Good morning qt, hope you ept well. I love you ❤️"
    ],
    2: [
        "Hope you had a good poop today qt",
        "I can hear the mimir rising in you, time for a nap",
        "Looking mighty cute today 💋"
    ],
    3: [
        "Sup pookie? Momo misses you",
        "Drink some water qt, mah hydrated moisturized unbothered girl boss",
        "Smile please silly goofy 😊"
    ],
    4: [
        "Hope you had a nice day hunny, goodnight, I love you ❤️",
        "Goodnight hunny, I love you, take kith muah 💋",
        "You did good today, I'm proud of you qt! Goodnight, I love you ❤️"
    ],
    5: [
        "Let me sleep ho",
        "Dreamin about you right now",
        "Eepy teepy silly billy"
    ]
};

// Get current time slot based on IST
function getCurrentTimeSlot() {
    const now = new Date();
    // Convert to IST (UTC+5:30)
    // Get UTC time and add IST offset
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const istTime = new Date(utcTime + (5.5 * 60 * 60 * 1000));
    const hours = istTime.getHours();
    
    for (let i = 0; i < TIME_SLOTS.length; i++) {
        const slot = TIME_SLOTS[i];
        if (slot.start < slot.end) {
            // Normal slot (doesn't wrap around)
            if (hours >= slot.start && hours < slot.end) {
                return i + 1;
            }
        } else {
            // Wraps around midnight (Slot 5: 22:00-06:00)
            if (hours >= slot.start || hours < slot.end) {
                return i + 1;
            }
        }
    }
    return 1; // Default to slot 1
}

// Get cat mode based on time slot
function getCatMode(slot) {
    if (slot === 1 || slot === 2) return 'active';
    if (slot === 3 || slot === 4) return 'rest';
    return 'sleep';
}

// Generate paw prints on floor
function generatePawPrints() {
    const pawMarks = document.getElementById('pawMarks');
    pawMarks.innerHTML = '';

    // Create 5-6 paw prints
    const numPrints = 5 + Math.floor(Math.random() * 2);
    const positions = [
        { left: '15%', top: '20%', rotate: 20 },
        { left: '25%', top: '50%', rotate: -15 },
        { left: '40%', top: '30%', rotate: 45 },
        { left: '55%', top: '60%', rotate: 10 },
        { left: '70%', top: '40%', rotate: -30 },
        { left: '80%', top: '70%', rotate: 25 }
    ];

    for (let i = 0; i < numPrints; i++) {
        const pawPrint = document.createElement('div');
        pawPrint.className = 'paw-print';
        pawPrint.style.left = positions[i].left;
        pawPrint.style.top = positions[i].top;
        pawPrint.style.transform = `rotate(${positions[i].rotate}deg)`;

        // Create main pad
        const pad = document.createElement('div');
        pad.className = 'paw-pad';
        pawPrint.appendChild(pad);

        // Create 3 toes
        for (let j = 0; j < 3; j++) {
            const toe = document.createElement('div');
            toe.className = 'paw-toe';
            pawPrint.appendChild(toe);
        }

        pawMarks.appendChild(pawPrint);
    }
}

// Generate spilled food on floor
function generateSpilledFood() {
    const spilledFood = document.getElementById('spilledFood');
    spilledFood.innerHTML = '';

    // Create 10-15 food bits
    const numBits = 10 + Math.floor(Math.random() * 6);

    for (let i = 0; i < numBits; i++) {
        const foodBit = document.createElement('div');
        foodBit.className = 'food-bit';

        // Random positions
        foodBit.style.left = `${15 + Math.random() * 70}%`;
        foodBit.style.top = `${20 + Math.random() * 60}%`;

        spilledFood.appendChild(foodBit);
    }
}

// Update scenery based on time slot
function updateScenery(slot) {
    const room = document.querySelector('.room');
    const windowView = document.getElementById('windowView');
    const lampShade = document.getElementById('lampShade');
    const foodContent = document.getElementById('foodContent');
    const pawMarks = document.getElementById('pawMarks');
    const spilledFood = document.getElementById('spilledFood');
    const sunsetSun = document.getElementById('sunsetSun');
    const cloud1 = document.getElementById('cloud1');
    const cloud2 = document.getElementById('cloud2');
    const stars = document.getElementById('stars');

    // Reset classes
    room.className = 'room';
    windowView.className = 'window-view';
    lampShade.className = 'lamp-shade';
    foodContent.className = 'food-content';
    pawMarks.className = 'paw-marks';
    spilledFood.className = 'spilled-food';

    // Hide sun, clouds, and stars by default
    if (sunsetSun) sunsetSun.style.display = 'none';
    if (cloud1) cloud1.style.display = 'none';
    if (cloud2) cloud2.style.display = 'none';
    if (stars) stars.style.display = 'none';

    if (slot === 1 || slot === 2) {
        // Slots 1,2: Bright, lamp off, full bowl, clean floor, sunny
        room.classList.add('bright');
        windowView.classList.add('sunny');
        foodContent.classList.add('full');
        // Show clouds for sunny view
        if (cloud1) cloud1.style.display = 'block';
        if (cloud2) cloud2.style.display = 'block';
    } else if (slot === 3 || slot === 4) {
        // Slots 3,4: Dimmer, lamp on, half bowl, paw marks and spilled food, sunset
        room.classList.add('dim');
        windowView.classList.add('sunset');
        lampShade.classList.add('on');
        foodContent.classList.add('half');
        pawMarks.classList.add('visible');
        spilledFood.classList.add('visible');
        // Show sun and clouds for sunset view
        if (sunsetSun) sunsetSun.style.display = 'block';
        if (cloud1) cloud1.style.display = 'block';
        if (cloud2) cloud2.style.display = 'block';
    } else {
        // Slot 5: Very dim, lamp off (but visible with dull grey), empty bowl, messy floor, night
        room.classList.add('dark');
        windowView.classList.add('night');
        lampShade.classList.add('night');
        foodContent.classList.add('empty');
        pawMarks.classList.add('visible');
        spilledFood.classList.add('visible');
        // Show stars for night view
        if (stars) stars.style.display = 'block';
    }
}

// Update cat mode and animations
function updateCatMode(slot) {
    const cat = document.getElementById('cat');
    const mode = getCatMode(slot);
    
    // Remove all mode classes
    cat.classList.remove('active', 'rest', 'sleep', 'interacting');
    
    // Add appropriate mode class
    cat.classList.add(mode);
}

// Play sound based on time slot
function playSound(slot) {
    let audio;

    if (slot === 1 || slot === 2) {
        // Slots 1,2: Play oiia-oiia sound
        audio = new Audio('oiia-oiia-sound.mp3');
    } else if (slot === 3 || slot === 4) {
        // Slots 3,4: Play meow sound
        audio = new Audio('meow_sound.mp3');
    } else {
        // Slot 5: Play meow sound
        audio = new Audio('meow_sound.mp3');
    }

    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

// Show dialogue in speech bubble
function showDialogue(slot) {
    const dialogues = DIALOGUES[slot];
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    const speechBubble = document.getElementById('speechBubble');
    const speechText = document.getElementById('speechText');
    
    speechText.textContent = randomDialogue;
    speechBubble.classList.add('visible');
    
    // Hide after 5 seconds
    setTimeout(() => {
        speechBubble.classList.remove('visible');
    }, 5000);
}

// Clean room function
function cleanRoom(event) {
    event.stopPropagation();
    const broom = document.getElementById('broom');
    const pawMarks = document.getElementById('pawMarks');
    const spilledFood = document.getElementById('spilledFood');

    // Add cleaning animation
    broom.classList.add('cleaning');

    // Fade out paw marks and spilled food
    setTimeout(() => {
        if (pawMarks) {
            pawMarks.style.transition = 'opacity 1s ease';
            pawMarks.style.opacity = '0';
        }
        if (spilledFood) {
            spilledFood.style.transition = 'opacity 1s ease';
            spilledFood.style.opacity = '0';
        }
    }, 500);

    // Remove cleaning class after animation
    setTimeout(() => {
        broom.classList.remove('cleaning');
    }, 2000);
}

// Fill food bowl function
function fillFoodBowl(event) {
    event.stopPropagation();
    const foodContent = document.getElementById('foodContent');

    if (foodContent) {
        foodContent.className = 'food-content';
        foodContent.classList.add('full');
    }
}

// Handle user click interaction
function handleClick(event) {
    const slot = getCurrentTimeSlot();
    const cat = document.getElementById('cat');
    const mode = getCatMode(slot);

    // Play sound based on slot
    playSound(slot);
    
    // Handle interaction based on slot
    if (slot === 1 || slot === 2) {
        // Stop spinning, come front and center
        cat.classList.remove('active');
        cat.classList.add('interacting');
        setTimeout(() => {
            cat.classList.remove('interacting');
            cat.classList.add('active');
        }, 2000);
    } else if (slot === 3 || slot === 4) {
        // Come front and center
        cat.classList.add('interacting');
        setTimeout(() => {
            cat.classList.remove('interacting');
        }, 2000);
    } else {
        // Slot 5: Don't move, just meow
        // Cat stays in sleep mode
    }
    
    // Show dialogue
    showDialogue(slot);
}

// Initialize the app
function init() {
    const slot = getCurrentTimeSlot();

    // Generate floor elements
    generatePawPrints();
    generateSpilledFood();

    // Update scenery
    updateScenery(slot);

    // Update cat mode
    updateCatMode(slot);

    // Add click event listener
    document.addEventListener('click', handleClick);

    // Add broom click event listener
    const broom = document.getElementById('broom');
    if (broom) {
        broom.addEventListener('click', cleanRoom);
    }

    // Add food bowl click event listener
    const foodBowl = document.getElementById('foodBowl');
    if (foodBowl) {
        foodBowl.addEventListener('click', fillFoodBowl);
    }

    // Update every minute to check for time slot changes
    setInterval(() => {
        const newSlot = getCurrentTimeSlot();
        const currentSlot = getCurrentTimeSlot();

        if (newSlot !== currentSlot) {
            updateScenery(newSlot);
            updateCatMode(newSlot);
        }
    }, 60000);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
