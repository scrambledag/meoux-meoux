# Meoux Meoux - Interactive Virtual Pet

An interactive HTML5 web application featuring a charming cat named Meoux Meoux living in a cozy room. The app provides a dynamic, time-synchronized experience with engaging animations and interactive elements.

## Features

### Dynamic Time-Based System
- **5 Time Slots**: The app operates on Indian Standard Time (IST) with 5 distinct time periods
  - Slot 1 (06:00-10:00): Morning
  - Slot 2 (10:00-16:00): Midday
  - Slot 3 (16:00-19:00): Evening
  - Slot 4 (19:00-22:00): Night
  - Slot 5 (22:00-06:00): Late Night
- **Scenery Changes**: Room lighting, window views, and lamp states adapt to the time of day
  - Sunny skies with clouds during the day
  - Orange sunset with moving sun in the evening
  - Starry night sky with moon at night

### Cat Modes & Behaviors
- **Active Mode**: Cat sways gently, follows user clicks, and displays "Play with me!" messages
- **Rest Mode**: Cat stays on the couch with gentle swaying
- **Sleep Mode**: Cat sleeps peacefully with eyes closed
- **Surprise Mode**: Cat spins around with sound effects for 6 seconds
- **Hangry Mode**: Cat gets angry (with angry eyebrows) and jumps when unfed for too long

### Probabilistic AI
- Mode selection based on time slot probabilities
- 90% chance of dialogue on click, 10% chance of surprise mode
- Realistic behavior patterns throughout the day

### Interactive Elements
- **Cat Interactions**:
  - Click to trigger personalized dialogues
  - Cat follows clicks and walks to location in active mode
  - Click and hold cat to make it spin
  - Dynamic speech bubbles that follow cat's position

- **Food Bowl**:
  - Click to fill the bowl
  - Bowl empties over time (full → half → empty)
  - Cat gets hangry if bowl stays empty too long

- **Broom**:
  - Click to clean paw prints and spilled food from the floor
  - Animated sweeping motion

### Cat Design
- White fur with adorable cross-eyes
- Blue eyes looking in opposite directions
- Tongue sticking out slightly
- Red collar
- Animated tail with constant swaying
- Frequent blinking animation

### Visual Features
- Light pink walls
- Brown couch with arms
- Standing lamp that turns on/off
- Window with panes showing time-appropriate views
- Beige floor with dynamic paw prints and food mess
- Framed portrait above the couch
- Food bowl with capacity states

### Audio Features
- "Meow" sound effects
- "Oiia-oiia" sound for surprise moments
- Context-appropriate sounds for different time slots

### Responsive Design
- Fully mobile-responsive with breakpoints at 768px and 480px
- Touch-friendly interactions for mobile devices
- Proportionally scaled elements for all screen sizes

### Dialogue System
- 15 unique dialogues (3 per time slot)
- Personalized messages appropriate to time of day
- Comic Sans font for playful appearance
- Emoji support in messages

## Technology Stack
- **HTML5**: Structure and semantic markup
- **CSS3**: Animations, responsive design, and styling
- **JavaScript**: Dynamic behavior, state management, and interactivity

## How It Works
1. The app detects the current time in IST and determines the appropriate time slot
2. Room scenery and cat behavior adapt to the time slot
3. Cat mode is selected probabilistically based on slot-specific probabilities
4. User interactions trigger animations, sounds, and dialogue
5. Food bowl and floor state persist and change based on triggers
6. All elements update dynamically every minute to check for time slot changes

## State Management
The app tracks:
- Current food bowl state (full/half/empty)
- Floor cleanliness
- Cat mode and previous mode (for surprise transitions)
- Empty slot count (for hangry mode)
- Cat position for movement and dialogue positioning

## Version History
- **v3.2**: Bug fixes, font change to Comic Sans, dynamic dialogue positioning, walking animation
- **v3.1**: Probabilistic modes, hangry/surprise modes, state-based triggers, interactive cat movement
- **v2.2**: Mobile responsive design
- **v2.1**: Interactive broom and food bowl
- **v1.x**: Core features, time slots, cat animations, scenery changes

---

**Built with love for Meoux Meoux** ❤️
