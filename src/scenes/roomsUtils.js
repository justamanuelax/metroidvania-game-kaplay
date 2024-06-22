// Function to set the background color of the game scene
export function setBackgroundColor(k, hexColorCode) {
    k.add([
        // Create a rectangle that covers the entire game width and height
        k.rect(k.width(), k.height()),
        // Set the color of the rectangle using the provided hex color code
        k.color(k.Color.fromHex(hexColorCode)),
        // Fix the rectangle's position so it doesn't move with the camera
        k.fixed()
    ]);
}

// Function to set colliders for the game map
export function setMapColliders(k, colliders) {
    // Iterate over each collider in the provided colliders array
    for (const collider of colliders) {
        if(collider.polygons) {
            
            const coordinates = [];
            for(const point of collider.polygon){
                coordinates.push(k.vec2(point.x,point.y));
            }
                map.add([ 
                    k.pos(collider.x, collider.y), 
                    k.area({ 
                        shape: new k.Polygon(coordinates),
                        collisionIgnore: ["collider"], 
                    }),
                    "collider", 
                    collider.type
                ]);
                continue;
            }

            if(collider.name === "boss-barrier"){
                // TODO 
                continue;

            }

            map.add([ 
                k.pos(collider.x, collider.y),
                k.area({ 
                    shape: new k.Rect(k.vec2(0), collider.width , collider.height),
                    collisionIgnore: ["collider"]
                }),
                k.body({isStatic : true}),
                "collider", 
                collider.type 
            ]); 

    }
}
