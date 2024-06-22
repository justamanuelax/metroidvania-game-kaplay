
import { setBackgroundColor } from "./roomsUtils.js";

export function room1(k, roomData){
    setBackgroundColor(k, "#FFEECC");

    const roomLayers = roomData.layers;

    const map = k.add([k.pos(0, 0), k.sprite("room1")]);
    const colliders = [];
    for(const layer of roomLayers){
        if(layer.name === "colliders"){
            colliders.push(...layer.objects);
            break; 
        }
    }
    console.log(colliders);
 }