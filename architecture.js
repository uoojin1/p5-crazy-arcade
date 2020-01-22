// just some brainstorming to best architect this application

/**
 * How to track users' movements as efficiently as possible
 * 
 * "efficiency" refers to
 * - minimizing the frequency of information transfer between clients
 * - minimizing the size of information that needs to be transfered
 * 
 * ---
 * Most obvious way of sharing where everybody is (on the canvas)
 * ---
 * 
 * 1. on every frame, each user reports where they are on the canvas
 *    and the server broadcasts that information to all clients.
 *    - { id: senderId, x: positionX, y: positionY }
 * 2. each client then updates the position of that user
 * 
 * 
 * ---
 * More efficient way compared to the most obvious way
 * ---
 * 
 * 1. each user (on the client side) should have a map of which keys
 *    are currently being pressed.
 * 2. once that map changes, that means the user is traveling in a
 *    different direction (in the most general cases).
 * 3. on map change, the user should broadcast the new map of pressedKeys
 * 
 */


/**
 * some events we need
 */

'report: pressedKeys changed'
// should broadcast
'pressedKeys changed'
// with
const payload = {
  id: sender.id,
  pressedKeys: sender.pressedKeys,
  position: sender.position // position on that exact time to help location synchronization
}
