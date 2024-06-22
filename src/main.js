import { k } from "./kaplayLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";


async function  main(){

    // Fetch the room1.json file asynchronously using the fetch API
  const room1Data = await (await fetch("../maps/room1.json")).json();

  // Create a new scene called "room1" and load the room1 function with the fetched data
  k.scene("room1", () => {
      room1(k, room1Data);
      // The room1 function is likely defined elsewhere and takes the kaboom instance (k) and the room data as arguments
    });
    
  // Create another scene called "room2" (currently empty)
  k.scene("room2", () => {});

  // The async function is used to fetch the room1.json file asynchronously
  // This allows the game to continue running while the file is being fetched
  // The await keyword is used to wait for the fetch promise to resolve before continuing execution
  // This ensures that the room1Data is available before the scene is loaded
}

main(); 

k.scene("intro", () => {
    k.onKeyPress("enter", () =>{
        k.go("room1");
    })
});

k.go("intro");


