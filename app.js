// Time slot configuration (IST)
const TIME_SLOTS = [
    { start: 6, end: 10 },   // Slot 1: 06:00-10:00
    { start: 10, end: 17 },  // Slot 2: 10:00-16:00
    { start: 17, end: 19 },  // Slot 3: 16:00-19:00
    { start: 19, end: 22 },  // Slot 4: 19:00-22:00
    { start: 22, end: 6 }    // Slot 5: 22:00-06:00 (wraps around)
];

// Application state tracking
const appState = {
    foodBowlState: 'full', // 'full', 'half', 'empty'
    emptySlotCount: 0, // How many consecutive slots bowl has been empty
    isFloorClean: true,
    lastSlot: 0,
    currentMode: 'active',
    previousMode: 'active', // Track mode before surprise
    surpriseModeTimeout: null,
    isSpinning: false,
    catX: 50, // Cat position percentage
    catY: 50
};

// Dialogue options for each slot
const DIALOGUES = {
    1: [
        "Good morning pookie, have a nice day. I love you ❤️",
        "Good morning hunny, take a kissy to start yo day, I love you 💋",
        "Good morning qt, hope you ept well. I love you ❤️"
    ],
    2: [
        // "Hope you had a good poop today qt",
        // "I can hear the mimir rising in you, time for a nap",
        // "Looking mighty cute today 💋"
        "All da besticle for da nexsales testicle qt"
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

// Get cat mode based on time slot and probabilities
function getCatMode(slot) {
    // Check for hangry mode first (overrides everything)
    if (appState.emptySlotCount >= 2) {
        return 'hangry';
    }

    // Mode probabilities for each slot
    const probabilities = {
        1: { active: 0.3, rest: 0.6, surprise: 0.1, sleep: 0 },
        2: { active: 0.3, rest: 0.5, surprise: 0.2, sleep: 0 },
        3: { active: 0.3, rest: 0.5, surprise: 0.2, sleep: 0 },
        4: { active: 0.3, rest: 0.4, surprise: 0.2, sleep: 0.1 },
        5: { active: 0, rest: 0, surprise: 0, sleep: 1 }
    };

    const slotProbs = probabilities[slot];
    const rand = Math.random();

    let cumulative = 0;
    for (const [mode, prob] of Object.entries(slotProbs)) {
        cumulative += prob;
        if (rand <= cumulative) {
            return mode;
        }
    }

    return 'rest'; // Fallback
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

// Update food bowl state on slot change
function updateFoodBowlState() {
    if (appState.foodBowlState === 'full') {
        appState.foodBowlState = 'half';
        appState.emptySlotCount = 0;
    } else if (appState.foodBowlState === 'half') {
        appState.foodBowlState = 'empty';
        appState.emptySlotCount = 1;
    } else if (appState.foodBowlState === 'empty') {
        appState.emptySlotCount++;
    }
}

// Check if paw prints and spilt food should be generated
function shouldGenerateMessOnFloor() {
    // Don't generate if cat is in sleep mode
    if (appState.currentMode === 'sleep') {
        return false;
    }

    // Don't generate if floor is clean and bowl is empty
    if (appState.isFloorClean && appState.foodBowlState === 'empty') {
        return false;
    }

    // Generate if floor is not clean (mess from eating remains visible)
    return !appState.isFloorClean;
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

    // Set food bowl based on state (not slot)
    foodContent.classList.add(appState.foodBowlState);

    // Set paw marks and spilled food visibility based on trigger logic
    if (shouldGenerateMessOnFloor()) {
        pawMarks.classList.add('visible');
        spilledFood.classList.add('visible');
        pawMarks.style.opacity = '1';
        spilledFood.style.opacity = '1';
    }

    if (slot === 1 || slot === 2) {
        // Slots 1,2: Bright, lamp off, sunny
        room.classList.add('bright');
        windowView.classList.add('sunny');
        lampShade.classList.add('day');
        // Show clouds for sunny view
        if (cloud1) cloud1.style.display = 'block';
        if (cloud2) cloud2.style.display = 'block';
    } else if (slot === 3 || slot === 4) {
        // Slots 3,4: Dimmer, lamp on, sunset or early evening
        room.classList.add('dim');
        windowView.classList.add(slot === 3 ? 'sunset' : 'night');
        lampShade.classList.add('on');

        if (slot === 3) {
            // Show sun and clouds for sunset view
            if (sunsetSun) sunsetSun.style.display = 'block';
            if (cloud1) cloud1.style.display = 'block';
            if (cloud2) cloud2.style.display = 'block';
        } else {
            // Show stars for night view
            if (stars) stars.style.display = 'block';
        }
    } else {
        // Slot 5: Very dim, lamp off (but visible with dull grey), night
        room.classList.add('dark');
        windowView.classList.add('night');
        lampShade.classList.add('night');
        // Show stars for night view
        if (stars) stars.style.display = 'block';
    }
}

// Update cat mode and animations
function updateCatMode(slot) {
    const cat = document.getElementById('cat');
    const mode = getCatMode(slot);

    // Save previous mode before switching (but not if current is already surprise)
    if (appState.currentMode !== 'surprise') {
        appState.previousMode = appState.currentMode;
    }

    appState.currentMode = mode;

    // Remove all mode classes
    cat.classList.remove('active', 'rest', 'sleep', 'interacting', 'hangry', 'surprise', 'spinning');

    // Add appropriate mode class
    cat.classList.add(mode);

    // Handle surprise mode timeout
    if (mode === 'surprise') {
        // Play oiia-oiia sound
        const audio = new Audio('oiia-oiia-sound.mp3');
        audio.play().catch(error => console.log('Audio playback failed:', error));

        // Switch back to previous mode after 6 seconds
        if (appState.surpriseModeTimeout) {
            clearTimeout(appState.surpriseModeTimeout);
        }
        appState.surpriseModeTimeout = setTimeout(() => {
            appState.currentMode = appState.previousMode;
            cat.classList.remove('surprise');
            cat.classList.add(appState.previousMode);
        }, 6000);
    }

    // Show "Play with me!" message in active mode
    if (mode === 'active') {
        setTimeout(() => {
            const speechBubble = document.getElementById('speechBubble');
            const speechText = document.getElementById('speechText');
            speechText.textContent = "Play with me!";
            speechBubble.classList.add('visible');

            const audio = new Audio('meow_sound.mp3');
            audio.play().catch(error => console.log('Audio playback failed:', error));

            setTimeout(() => {
                speechBubble.classList.remove('visible');
            }, 3000);
        }, 1000);
    }
}

// Play sound based on time slot
function playSound(slot) {
    let audio;

    if (slot === 1 || slot === 2) {
        // Slots 1,2: Play oiia-oiia sound
        audio = new Audio('meow_sound.mp3');
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
    const cat = document.getElementById('cat');

    // Get cat's current position
    const catRect = cat.getBoundingClientRect();
    const room = document.querySelector('.room');
    const roomRect = room.getBoundingClientRect();

    // Position bubble above the cat
    const bubbleLeft = ((catRect.left + catRect.width / 2 - roomRect.left) / roomRect.width) * 100;
    const bubbleBottom = ((roomRect.bottom - catRect.top + 20) / roomRect.height) * 100; // 20px above cat

    speechBubble.style.left = bubbleLeft + '%';
    speechBubble.style.bottom = bubbleBottom + '%';
    speechBubble.style.transform = 'translateX(-50%)';

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

    // Update state
    appState.isFloorClean = true;

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
    const cat = document.getElementById('cat');

    // Update state
    appState.foodBowlState = 'full';
    appState.emptySlotCount = 0;
    appState.isFloorClean = false; // Bowl is full, cat will make mess again

    if (foodContent) {
        foodContent.className = 'food-content';
        foodContent.classList.add('full');
    }

    // If cat was hangry, switch to active mode
    if (appState.currentMode === 'hangry') {
        appState.currentMode = 'active';
        cat.classList.remove('hangry');
        cat.classList.add('active');
    }
}

// Move cat towards click position
function moveCatToClick(event) {
    const cat = document.getElementById('cat');
    const room = document.querySelector('.room');
    const rect = room.getBoundingClientRect();

    // Calculate click position as percentage
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;

    // Calculate bottom position (invert Y because CSS bottom is measured from bottom)
    const bottomPos = 100 - clickY;

    // Update cat position (constrain within reasonable bounds)
    appState.catX = Math.max(10, Math.min(90, clickX));
    appState.catY = Math.max(10, Math.min(90, bottomPos));

    // Add walking animation while moving
    cat.classList.remove('active');
    cat.classList.add('walking');

    cat.style.left = appState.catX + '%';
    cat.style.bottom = appState.catY + '%';

    // Remove walking animation and restore active after movement completes (2 seconds)
    setTimeout(() => {
        cat.classList.remove('walking');
        cat.classList.add('active');
    }, 2000);
}

// Check if click is on the cat
function isClickOnCat(event) {
    const cat = document.getElementById('cat');
    const rect = cat.getBoundingClientRect();

    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}

// Handle user click interaction
function handleClick(event) {
    const slot = getCurrentTimeSlot();
    const cat = document.getElementById('cat');

    // Hangry mode overrides everything
    if (appState.currentMode === 'hangry') {
        const speechBubble = document.getElementById('speechBubble');
        const speechText = document.getElementById('speechText');
        speechText.textContent = "FEED ME BISH";
        speechBubble.classList.add('visible');

        const audio = new Audio('meow_sound.mp3');
        audio.play().catch(error => console.log('Audio playback failed:', error));

        setTimeout(() => {
            speechBubble.classList.remove('visible');
        }, 5000);
        return;
    }

    // Determine if this triggers dialogue or surprise mode (0.9 vs 0.1)
    const rand = Math.random();

    if (rand > 0.1) {
        // 90% chance: Show dialogue
        playSound(slot);
        showDialogue(slot);

        // If in active mode, move cat to click position
        if (appState.currentMode === 'active') {
            moveCatToClick(event);
        }

        // Come front and center for other modes
        if (appState.currentMode === 'rest') {
            cat.classList.add('interacting');
            setTimeout(() => {
                cat.classList.remove('interacting');
            }, 5000);
        }
    
    } else {
        // 10% chance: Trigger surprise mode
        // Save current mode before switching to surprise
        appState.previousMode = appState.currentMode;

        cat.classList.remove('active', 'rest', 'sleep', 'hangry');
        cat.classList.add('surprise');
        appState.currentMode = 'surprise';

        const audio = new Audio('oiia-oiia-sound.mp3');
        audio.play().catch(error => console.log('Audio playback failed:', error));

        // Switch back to previous mode after 6 seconds
        if (appState.surpriseModeTimeout) {
            clearTimeout(appState.surpriseModeTimeout);
        }
        appState.surpriseModeTimeout = setTimeout(() => {
            appState.currentMode = appState.previousMode;
            cat.classList.remove('surprise');
            cat.classList.add(appState.previousMode);
        }, 6000);
    }
}

// Handle mouse down on cat (start spinning)
function handleCatMouseDown(event) {
    event.stopPropagation();

    if (appState.currentMode === 'active') {
        const cat = document.getElementById('cat');
        cat.classList.add('spinning');
        appState.isSpinning = true;
    }
}

// Handle mouse up anywhere (stop spinning)
function handleMouseUp(event) {
    if (appState.isSpinning) {
        const cat = document.getElementById('cat');
        cat.classList.remove('spinning');
        appState.isSpinning = false;
    }
}

// Initialize the app
function init() {
    const slot = getCurrentTimeSlot();
    appState.lastSlot = slot;

    // Generate floor elements
    generatePawPrints();
    generateSpilledFood();

    // Update scenery
    updateScenery(slot);

    // Update cat mode
    updateCatMode(slot);

    // Add click event listener
    document.addEventListener('click', handleClick);

    // Add mouse up event listener for spinning
    document.addEventListener('mouseup', handleMouseUp);

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

    // Add cat mouse down event listener
    const cat = document.getElementById('cat');
    if (cat) {
        cat.addEventListener('mousedown', handleCatMouseDown);
    }

    // Update every minute to check for time slot changes
    setInterval(() => {
        const newSlot = getCurrentTimeSlot();

        if (newSlot !== appState.lastSlot) {
            // Slot changed, update food bowl state
            updateFoodBowlState();

            // Update scenery and cat mode
            updateScenery(newSlot);
            updateCatMode(newSlot);

            appState.lastSlot = newSlot;
        }
    }, 60000);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
