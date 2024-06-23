import { state } from "../state/globalStateManager.js";
// Function to set the background color of the game scene
// Function to set the background color of the game scene
export function setBackgroundColor(k, hexColorCode) {
  // Create a rectangle that covers the entire game width and height
  // Set the color of the rectangle using the provided hex color code
  // Fix the rectangle's position so it doesn't move with the camera
  k.add([
    k.rect(k.width(), k.height()),
    k.color(k.Color.fromHex(hexColorCode)),
    k.fixed(),
  ]);
}


export function setCameraControls(k, player, map , roomData){
    k.onUpdate(() => {
        if(state.current().playerInBossFight) return; 

        if(map.pos.x + 160 > player.pos.x){
            k.pos( 
                map.pos.x + roomData.width * roomData.tilewidth - 160, 
                k.camPos().y
            );
            return; 

        }
        k.camPos(player.pos.x, k.camPos().y);
    })
}

// Function to set colliders for the game map
export function setMapColliders(k, map, colliders) {
  // Iterate over each collider in the provided colliders array
  for (const collider of colliders) {
    // Check if the collider has polygons
    if (collider.polygons) {
      // Create an array of coordinates for the polygon
      const coordinates = [];
      for (const point of collider.polygon) {
        coordinates.push(k.vec2(point.x, point.y));
      }
      // Add the polygon collider to the map
      map.add([
        k.pos(collider.x, collider.y),
        k.area({
          shape: new k.Polygon(coordinates),
          collisionIgnore: ["collider"],
        }),
        "collider",
        collider.type,
      ]);
      continue;
    }

    // Check if the collider is a boss barrier (not implemented yet)
    if (collider.name === "boss-barrier") {
      // TODO
      continue;
    }

    // Add a rectangular collider to the map
    map.add([
      k.pos(collider.x, collider.y),
      k.area({
        shape: new k.Rect(k.vec2(0), collider.width, collider.height),
        collisionIgnore: ["collider"],
      }),
      k.body({ isStatic: true }),
      "collider",
      collider.type,
    ]);
  }
}



export function setCameraZones(k, map, cameras){
    for(const camera of cameras){
        const cameraZone = map.add([
            k.area({
                shape: new k.Rect(k.vec2(0), 
            camera.width, camera.height),
            collisionIgnore: ["collider"]
    }), 
    k.pos(camera.x, camera.y) 
]);

cameraZone.onCollide("player", () => {
    if(k.camPos().x !== camera.properties[0].value){
        k.tween( 
            k.camPos().y, 
            camera.properties[0].value, 
            0.8, 
            (val) => k.camPos(k.camPos().x, val), 
            k.easings.linear 
        )
    }
})
}
}