# Assignment: CRUD API

## Description

This task is to implement a simple CRUD API using an in-memory database underneath.

## Installation

Clone the repository

```bash
git@github.com:yauheni-shcharbakou/crud-api.git // via SSH
https://github.com/yauheni-shcharbakou/crud-api.git // or via HTTP
```

Go to the project folder

```bash
cd crud-api
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

Run in development mode without a cluster feature

```bash
npm run start:dev
```

Build and run in production mode

```bash
npm run start:prod
```

Run tests

```bash
npm run test
```

Run tests with logging

```bash
npm run test:verbose
```

Run in development mode with a cluster feature

```bash
npm run start:multi
```

## Environment variables

By default, application uses `4000` port, for change it you can add `.env` file with `PORT={{your port here}}` content

## Implementation details

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}`
        - Server should answer with `status code` **200** and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running should be stored in `.env` file
6. There should be 2 modes of running application (**development** and **production**):
    - The application is run in development mode using `nodemon` or `ts-node-dev` (there is a `npm` script `start:dev`)
    - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)
7. There could be some tests for API (not less than **3** scenarios). Example of test scenario:
    1. Get all records with a `GET` `api/users` request (an empty array is expected)
    2. A new object is created by a `POST` `api/users` request (a response containing newly created record is expected)
    3. With a `GET` `api/users/{userId}` request, we try to get the created  record by its `id` (the created record is expected)
    4. We try to update the created record with a `PUT` `api/users/{userId}`request (a response is expected containing an updated object with the same `id`)
    5. With a `DELETE` `api/users/{userId}` request, we delete the created object by `id` (confirmation of successful deletion is expected)
    6. With a `GET` `api/users/{userId}` request, we are trying to get a deleted object by `id` (expected answer is that there is no such object)
8. There could be implemented horizontal scaling for application, there should be `npm` script `start:multi` that starts multiple instances of your application using the Node.js `Cluster` API (equal to the number of available parallelism - 1 on the host machine, each listening on port PORT + n) with a **load balancer** that distributes requests across them (using Round-robin algorithm). For example: available parallelism is 4, `PORT` is 4000. On run `npm run start:multi` it works following way
- On `localhost:4000/api` load balancer is listening for requests
- On `localhost:4001/api`, `localhost:4002/api`, `localhost:4003/api` workers are listening for requests from load balancer
- When user sends request to `localhost:4000/api`, load balancer sends this request to `localhost:4001/api`, next user request is sent to `localhost:4002/api` and so on.
- After sending request to `localhost:4003/api` load balancer starts from the first worker again (sends request to `localhost:4001/api`)
- State of db should be consistent between different workers, for example:
    1. First `POST` request addressed to `localhost:4001/api` creates user
    2. Second `GET` request addressed to `localhost:4002/api` should return created user
    3. Third `DELETE` request addressed to `localhost:4003/api` deletes created user
    4. Fourth `GET` request addressed to `localhost:4001/api` should return **404** status code for created user

> - [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
> - Screenshot:
> - Deployment:
> - Done 2025-05-13 / deadline 2025-05-13
> - Score: 222 / 222
>
> ## Basic Scope
>
> - [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
> - [x] **+10** **GET** `api/users` implemented properly
> - [x] **+10** **GET** `api/users/{userId}` implemented properly
> - [x] **+10** **POST** `api/users` implemented properly
> - [x] **+10** **PUT** `api/users/{userId}` implemented properly
> - [x] **+10** **DELETE** `api/users/{userId}` implemented properly
> - [x] **+6** Users are stored in the form described in the technical requirements
> - [x] **+6** Value of `port` on which application is running is stored in `.env` file
>
> ## Advanced Scope
> - [x] **+30** Task implemented on Typescript
> - [x] **+10** Processing of requests to non-existing endpoints implemented properly
> - [x] **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
> - [x] **+10** Development mode: `npm` script `start:dev` implemented properly
> - [x] **+10** Production mode: `npm` script `start:prod` implemented properly
>
> ## Hacker Scope
> - [x] **+30** There are tests for API (not less than **3** scenarios)
> - [x] **+50** There is horizontal scaling for application with a **load balancer**
>
> ## Forfeits
>
> - [ ] **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack` and its plugins, `prettier` and it's plugins, `uuid`, `@types/*` as well as libraries used for testing
> - [ ] **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
> - [ ] **-20** Missing PR or its description is incorrect
> - [ ] **-20** No separate development branch
> - [ ] **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
