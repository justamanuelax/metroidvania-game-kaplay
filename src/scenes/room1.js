// Import the setBackgroundColor function from roomsUtils.js
import { setBackgroundColor, setMapColliders } from "./roomsUtils.js";

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

    // Iterate through each layer in the roomLayers
    for (const layer of roomLayers) {
        // Check if the current layer is named "colliders"
        if (layer.name === "colliders") {
            // If it is, add all objects from this layer to the colliders array
            colliders.push(...layer.objects);
            // Break the loop as we found the colliders layer
            break;
        }
    }
    setMapColliders(k, map, colliders);
    // Log the colliders array to the console for debugging purposes
    console.log(colliders);
}