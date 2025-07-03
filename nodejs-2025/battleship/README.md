# Websocket battleship server
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 3000 port.

## Installation

Clone the repository

```bash
git@github.com:yauheni-shcharbakou/battleship.git // via SSH
https://github.com/yauheni-shcharbakou/battleship.git // or via HTTP
```

Go to the project folder

```bash
cd battleship
```

Switch to the development branch

```bash
git checkout develop
```

And install dependencies

```bash
npm i
```

## Application modes

Run in normal mode

```bash
npm run start
```

Run in development mode (with watcher)

```bash
npm run start:dev
```

Application is accessible at `http://localhost:8181` by default

## Environment variables

By default, application uses `3000` port for sockets and `8181` port for http server, for change it 
you can add `.env` file with such content: 

```dotenv
PORT={{your http port}}
WEBSOCKET_PORT={{your websocket port here}}
```

# Task details

# [Course program module (for RS School students)](https://github.com/rolling-scopes-school/tasks/blob/master/node/modules/websocket/README.md)

# Assignment: Websocket battleship server

## Description

Your task is to implement battleship game backend using websocket.

Player interface for your battleship backend is [here](https://github.com/rolling-scopes-school/websockets-ui). You should clone or copy this repository and write the code there.

The backend should be able to do the following:
- Start websocket server
- Handle websocket connection
- Handle player requests
- Handle room requests
- Handle ships requests
- Handle game requests
- Create single play bot (optional)

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Use 22.x.x version (22.14.0 or upper) of Node.js
- Only [ws](https://www.npmjs.com/package/ws), `cross-env`, `typescript`, `tsx`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
- The program is started by npm script `start` in following way:
- All requests and responses must be sent as JSON string

```bash
npm run start
```

- After starting the program displays websocket parameters
- After program work finished the program should end websocket work correctly
- After each received command program should display the command and result

## The backend should have 3 types of response:
1. personal response
    - reg - player registration/login
2. response for the game room
    - create_game - game id and player id (unique id for user in this game)
    - start_game - informationa about game and player's ships positions
    - turn - who is shooting now
    - attack - coordinates of shot and status
    - finish - id of the winner
3. response for all
    - update_room - list of rooms and players in rooms
    - update_winners - send score table to players

## Game description
1. We should have inmemory DB with player data (login and password) storage
2. Player can create game room or connect to the game room after login
3. Player room data (players, game board, ships positions) storages in the server
3. Game starts after 2 players are connected to the room and sent ships positions to the server
4. Server sends move order
5. Players should shoot in their's turn
6. Server send back shot result
7. If player hits or kills the ship, player should make one more shoot
8. Player wins if he have killed all enemies ships

## List of websocket commands (requests/responses) and their syntax (<- - cmd from frontend, -> - answer):
###  - data value should be a **json string**
###  - id should be always 0
- Player
    - Login or create player\
      ```<-```
        ```ts
        {
            type: "reg",
            data:
                {
                    name: <string>,
                    password: <string>,
                },
            id: 0,
        }
        ```
      ```->```
        ```ts
        {
            type: "reg",
            data:
                {
                    name: <string>,
                    index: <number | string>,
                    error: <bool>,
                    errorText: <string>,
                },
            id: 0,
        }
        ```
    - Update winners (for all after every winners table update)\
      ```->```
        ```ts
        {
            type: "update_winners",
            data:
                [
                    {
                        name: <string>,
                        wins: <number>,
                    }
                ],
            id: 0,
        }
        ```
- Room
    - Create new room (create game room and add yourself there)\
      ```<-```
        ```ts
        {
            type: "create_room",
            data: "",
            id: 0,
        }
        ```
    - Add user to room (add youself to somebodys room, then remove the room from available rooms list)\
      ```<-```
        ```ts
        {
            type: "add_user_to_room",
            data:
                {
                    indexRoom: <number | string>,
                },
            id: 0,
        }
        ```
      ```->```
        ```ts
        {
            type: "create_game", //send for both players in the room, after they are connected to the room
            data:
                {
                    idGame: <number | string>,  
                    idPlayer: <number | string>, /* generated by server id for player in the game session, not enemy (unique id for every player) */
                },
            id: 0,
        }
        ```
    - Update room state (send rooms list, where only one player inside)\
      ```->```
        ```ts
        {
            type: "update_room",
            data:
                [
                    {
                        roomId: <number | string>,
                        roomUsers:
                            [
                                {
                                    name: <string>,
                                    index: <number | string>,
                                }
                            ],
                    },
                ],
            id: 0,
        }
        ```
- Ships
    - Add ships to the game board\
      ```<-```
        ```ts
        {
            type: "add_ships",
            data:
                {
                    gameId: <number | string>,
                    ships:
                        [
                            {
                                position: {
                                    x: <number>,
                                    y: <number>,
                                },
                                direction: <boolean>,
                                length: <number>,
                                type: "small"|"medium"|"large"|"huge",
                            }
                        ],
                    indexPlayer: <number | string>, /* id of the player in the current game session */
                },
            id: 0,
        }
        ```        
    - Start game (only after server receives both player's ships positions)\        
      ```->```
        ```ts
        {
            type: "start_game",
            data:
                {
                    ships: /* player's ships, not enemy's */
                        [
                            {
                                position: {
                                    x: <number>,
                                    y: <number>,
                                },
                                direction: <boolean>,
                                length: <number>,
                                type: "small"|"medium"|"large"|"huge",
                            }
                        ],
                    currentPlayerIndex: <number | string>, /* id of the player in the current game session, who have sent his ships */
                },
            id: 0,
        }
        ```  
- Game
    - Attack\
      ```<-```
        ```ts
        {
            type: "attack",
            data:
                {
                    gameId: <number | string>,
                    x: <number>,
                    y: <number>,
                    indexPlayer: <number | string>, /* id of the player in the current game session */
                },
            id: 0,
        }
        ```
    - Attack feedback (should be sent after every shot, miss and after kill sent miss for all cells around ship too)\    
      ```->```
        ```ts
        {
            type: "attack",
            data:
                {
                    position:
                    {
                        x: <number>,
                        y: <number>,
                    },
                    currentPlayer: <number | string>, /* id of the player in the current game session */
                    status: "miss"|"killed"|"shot",
                },
            id: 0,
        }
        ```
    - Random attack\
      ```<-```
        ```ts
        {
            type: "randomAttack",
            data:
                {
                    gameId: <number | string>,
                    indexPlayer: <number | string>, /* id of the player in the current game session */
                },
            id: 0,
        }
        ```
    - Info about player's turn (send after game start and every attack, miss or kill result)\
      ```->```
        ```ts
        {
            type: "turn",
            data:
                {
                    currentPlayer: <number | string>, /* id of the player in the current game session */
                },
            id: 0,
        }
        ```
    - Finish game\
      ```->```
        ```ts
        {
            type: "finish",
            data:
                {
                    winPlayer: <number | string>, /* id of the player in the current game session */
                },
            id: 0,
        }
        ```

## Websocket commands sequence
```
  Player1               Server                  Player2             
    reg         -->                    
                <--        reg     
                <--    update_room    
                <--   update_winners  
 create_room    -->
                <--    update_room    
                                      <--         reg
                           reg        -->
                <--    update_room    -->
                <--   update_winners  -->                       
                                      <--    add_user_to_room
                <--    update_room    -->
                <--    create_game    -->
   add_ships    -->
                                      <--       add_ships
                <--     start_game    -->  
                <--        turn       -->  
 attack (miss)  -->
                <--       attack      -->  
                <--        turn       -->
                                      <--     randomAttack (shoot)
                <--       attack      -->  
                <--        turn       -->
                                      <--     randomAttack (kill) - send state for all cells around killed ship
                <--       attack      -->  
                <--        turn       -->
                <--       attack      -->  
                <--        turn       -->                
                <--       attack      -->  
                <--        turn       -->
                <--       attack      -->  
                <--        turn       -->
                           ...          
                                      <--     randomAttack (miss)
                <--       attack      -->  
                <--        turn       -->    
 attack (miss)  -->
                <--       attack      -->  
                <--        turn       -->
                           ...                            
                <--      finish       -->
                <--   update_winners  -->
```

> - [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/battleship/assignment.md)
> - Screenshot: ![image](https://github.com/user-attachments/assets/b5365f17-9577-4c2a-9675-3f0c4c2a499a)
> - Deployment:
> - Done 2025-05-20 / deadline 2025-05-20
> - Score: 158 / 188
>
> ## Basic Scope
>
> - Websocket
>     - [x] **+6** Implemented workable websocket server
>     - [x] **+6** Handle websocket clients connection/disconnection properly
>     - [x] **+10** Websocket server message handler implemented properly
>     - [x] **+10** Websocket server message sender implemented properly
> - User
>     - [x] **+5** Create user with password in temprorary database
>     - [x] **+5** User validation
> - Room
>     - [x] **+6** Create game room
>     - [x] **+6** Add user to game room
>     - [x] **+6** Start game
>     - [x] **+6** Finish game
>     - [x] **+8** Update room's game state
>     - [x] **+4** Update player's turn
>     - [x] **+8** Update players winner table
> - Ships
>     - [x] **+10** Locate ship to the game board
> - Game
>     - [x] **+8** Attack
>     - [x] **+4** Random attack
>
> ## Advanced Scope
> 
> - [x] **+30** Task implemented on Typescript
> - [x] **+20** Codebase is separated (at least 4 modules)
> - [ ] **+30** Make bot for single play (optionally)
>
> ## Forfeits
>
> - [ ] **-95% of total task score** any external tools except `ws`, `cross-env`, `dotenv`, `tsx`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer)
> - [ ] **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
> - [ ] **-10** Missing PR or its description is incorrect
> - [ ] **-10** No separate development branch
> - [ ] **-10** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
