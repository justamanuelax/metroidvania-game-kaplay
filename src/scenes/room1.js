// Import the setBackgroundColor function from roomsUtils.js
import { makePlayer } from "../entities/player.js";
import { setBackgroundColor, setMapColliders } from "./roomsUtils.js";
import { state } from "../state/globalStateManager.js";
import { k } from "../kaplayLoader.js";
import { setCameraZones } from "./roomsUtils.js";





// Export the room1 function which initializes the room
export function room1(k, roomData) {
    // Set the background color of the room using the setBackgroundColor function
    setBackgroundColor(k, "#FFEECC");
  // Set the camera scale to 4x
  k.camScale(4);
  // Set the camera position to (170, 100)
  k.camPos(170, 100);
  // Set the gravity to 1000 units
  k.setGravity(1000);

    // Extract the layers from the roomData
    const roomLayers = roomData.layers;

    // Add a sprite to represent the room's map at position (0, 0)
    const map = k.add([k.pos(0, 0), k.sprite("room1")]);

    // Initialize an empty array to store collider objects
    const colliders = [];

    const positions = [];

    const cameras = [];

    // Iterate through each layer in the roomLayers
    for (const layer of roomLayers) {
        // Check if the current layer is named "colliders"
        if(layer.name === "positions"){
            positions.push(...layer.objects);
            continue;
        }

        if(layer.name === "cameras"){
            cameras.push(...layer.objects);
        }

        if (layer.name === "colliders") {
            // If it is, add all objects from this layer to the colliders array
            colliders.push(...layer.objects);
            // Break the loop as we found the colliders layer
            
        }


    }
    setMapColliders(k, map, colliders);

    // Log the colliders array to the console for debugging purposes

    setCameraZones(k, map, cameras);
 
    console.log(colliders);

    const player = k.add(makePlayer(k));

  // Loop through each position object in the positions array
  for (const position of positions) {
    // Check if the current position object has a name property equal to "player"
    if (position.name === "player") {
      // Set the player's position using the x and y properties of the position object
      player.setPosition(position.x, position.y);
      // Set the player's controls
      player.setControls();
 
        player.setEvents(); 

        player.enablePassthrough();


    }
  }
}