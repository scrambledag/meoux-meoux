This file contains the list of instructions to create an interactive HTML5 based web app which features a cat named Meoux Meoux in a room. The file has 4 different sections excluding the ReadMe, and the function of each section is mentioned below. Use these sections together to create the web app.

The 'Schedule' section has a list of time slots numbered from 1 to 5 and each slot has a corresponding start time and an end time, with all times being in Indian Standard Time.

The 'Cat' section has design instructions for the cat, also to be synced to the corresponding time slots. It also has time synced responses for user interactions.

The 'Scenery' section has a list of all the design elements of the app. The elements should be synced to their corresponding time slots.

The 'Dialogue Options' section has the list of dialogues which are to be played by the app during the respective time slot. Each slot has three options, pick any one at random and play it. The dialogue should appear as a speech bubble from the cat along with a "meow" sound.

Schedule -

Time Zone	Indian Standard Time
Slot	Start time	End time
1	    06:00	    10:00
2	    10:00   	16:00
3	    16:00	    19:00
4	    19:00   	22:00
5	    22:00	    06:00

Cat -	

The cat has white fur and big blue eyes which point in opposite directions and are funny looking, the tip of her tongue sticks out of her mouth a little bit. She blinks frequently and wears a red collar.

Active mode - The cat spins about her vertical axis at 1 rps and moves all over the room. 
Rest mode -	The cat is awake but does not spin around. She just sways a little bit on the couch.
Sleep mode - The cat is asleep on the couch with eyes closed.

The modes should be set automatically and not user controlled. Here is the scheduling for the modes -

Slots 1,2 - Active mode. 
Slots 3,4 - Rest mode
Slot 5 - Sleep mode

When user clicks on screen, cat will	

In slots 1,2 - Stop spinning around, come front and center, meow and trigger appropriate dialogue	
In slots 3,4 - Come front and center, meow and trigger appropriate dialogue	
Slot 5 - Not move, meow and trigger appropriate dialogue

Scenery -

The setting should be a simple room with the following elements - light pink wall, big brown sofa, standing lamp, beige floor, bowl of cat food, big window on the wall.

The scenery should be synced to the time slot as follows -

Slots 1,2 - The room is brightly lit, the lamp is off, the bowl of cat food is full, floor is clean, the view from the window is sunny with blue skies.
Slots 3,4 - The room is a little dimmer, the lamp is on, the bowl of cat food is half empty, the floor has paw marks and cat food spilt on it, the view from the window is orange with a setting sun.
Slot 5 - The room is very dim, the lamp is off, the bowl of cat food is empty, the floor is messy, the view from the window has the moon and stars.

Dialogue options -

Slot 1 - 

Option 1 - Good morning pookie, have a nice day. I love you (heart)	
Option 2 - Good morning hunny, take a kissy to start yo day, I love you (kiss emoji)	
Option 3 - Good morning qt, hope you ept well. I love you (heart)

Sot 2 -
Option 1 - Hope you had a good poop today qt	
Option 2 - I can hear the mimir rising in you, time for a nap	
Option 3 - Looking mighty cute today (kiss emoji)

Slot 3 -
Option 1 - Sup pookie? Momo misses you	
Option 2 - Drink some water qt, mah hydrated moisturized unbothered girl boss	
Option 3 - Smile please silly goofy (smile emoji)

Slot 4 -
Option 1 - Hope you had a nice day hunny, goodnight, I love you (heart)	
Option 2 - Goodnight hunny, I love you, take kith muah (kiss emoji)	
Option 3 - You did good today, I'm proud of you qt! Goodnight, I love you (heart)

Slot 5 -
Option 1 - Let me sleep ho 
Option 2 - Dreamin about you right now	
Option 3 - Eepy teepy silly billy

====================================== Version 1.1 ==================================================

Cat -

1. Connect the tail to the rest of the body
2. Define the mouth more clearly to highlight the tongue sticking out
3. Add a meow sound when dialogue is triggered, it is missing currently
4. On user click, make the cat move further towards the screen so that it is close the user. 

Floor -

1. Reduce the amount of cat food and paw prints. 10-15 bits of cat food (brown colour) and 5-6 paw prints
2. Define the paw prints clearly to be those of a cat. Make them 3x bigger than the cat food. Style them as a big ellipse with 3 small spheres on its edge to give it a paw shape.

Room -

1. Decrease the brightness of the room in slots 3,4 to give the effect of evening time.

Couch -

1. Increase the size of the couch, move it a little left and align the base of the couch with the base of the lamp.

Window -

1. Give panes to the window

Outdoor scene -

1. Remove the static picture of the setting sun and instead create a new sun style which is half a circle with rays emanating from it. Add some moving clouds too.

====================================== Version 1.2 ==================================================

Sun -

1. Show the top half of the circle instead of the bottom half.

Window -

1. Remove the grey handle from the window frame

====================================== Version 1.3 ==================================================

Star -

1. Remove the big star and add a 4-5 small twinkling white stars

Lamp -

1. The lamp top is missing in slot 5. Add it back but give it a dull grey color

Food bowl -

1. Bring the food bowl to the front

Meow sound -

1. Use the meow_sound .mp3 file to play the meow sound when user clicks in slots 3 and 4
2. Use the oiia-oiia-sound.mp3 file to play sound when user clicks in slots 1 and 2

Portrait -

1. Add a portrait style which consists of a framed photograph. Use the mogo.jpeg file as the photograph. Position the portrait to be directly above the couch.

====================================== Version 2.1 ==================================================

1. Make the cat's tail sway a little and connect it to the cat's body.

2. Add 2 interactive features -
    i. Clean room - Add a broom in the corner. When user clicks the broom, the broom moves back and forth across the floor and the paw prints and spilt food disappear. 
    ii. Fill food bowl - When user clicks the food bowl, it fills up with food.