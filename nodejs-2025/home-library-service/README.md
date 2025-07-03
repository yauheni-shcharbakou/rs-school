# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone git@github.com:yauheni-shcharbakou/nodejs2025Q2-service.git // for SSH
git clone https://github.com/yauheni-shcharbakou/nodejs2025Q2-service.git // for HTTPS
```

## Change git branch

```bash
git checkout home-library-service-part-2
```

## Installing NPM modules

```bash
npm install
```

## Audit

### Audit npm vulnerabilities:

```bash
npm run audit:npm
```

This command is also used in backend dockerfile

### Docker images audit:

```bash
npm run audit:docker
```

## Environment variables

Copy `.env.example` content to `.env` file (and change) for setup environment variables. It's required, because docker 
compose also uses `.env` file for load variables.

- `PORT` backend port value

- `LOG_LEVEL` log level (one of `fatal` | `error` | `warn` | `log` | `debug` | `verbose`)
- `LOG_MAX_SIZE_KB` max log file size in KB 
    > It is also important to consider that in MacOS since version 10.6 the finder uses the decimal system, so the file 
    > size will be displayed there 2.4% larger. For greater accuracy, you should pay attention to the file size in bytes 
    > (for 100 KB it will be 102400) 
- `LOG_DIRECTORY` relative path to repository root for store logs

- `CRYPT_SALT` salt value used for hashing
- `JWT_SECRET_KEY` secret key used for access token
- `JWT_SECRET_REFRESH_KEY` secret key used for refresh token
- `TOKEN_EXPIRE_TIME` access token expire time parameter
- `TOKEN_REFRESH_EXPIRE_TIME` refresh token expire time parameter

- `POSTGRES_PORT` postgres port value
- `POSTGRES_USER` postgres user name
- `POSTGRES_PASSWORD` postgres user password
- `DATABASE_URL` postgres connection url, `postgresql://{{POSTGRES_USER}}:{{POSTGRES_PASSWORD}}@localhost:{{POSTGRES_PORT}}/home-library-service`

## Logging

By default, logs saved at directory `logs` (it can be changed by using `LOG_DIRECTORY` env variable) and separated by
day timestamp:

```
/logs
  /2025-06-14
    2025-06-14.0.log // ordinary log (warn | log | debug | verbose)
    2025-06-14.0.error.log // error log file, here are fatal and error levels
    2025-06-14.1.log
    2025-06-14.1.error.log
  /2025-06-15
    2025-06-14.0.log
    ...
```

- `unhandledRejection` and `uncaughtException` implemented as `fatal` level logs
- errors use `error` level
- request and response data logged as `debug` level

Here is the priority of levels:
- `fatal`
- `error`
- `warn`
- `log`
- `debug`
- `verbose`

So, for see `debug` logs you need set `debug` or `verbose` level, for see `error` - `error` or anything below in the 
list, etc. By default, `log` level is set (can be changed via `LOG_LEVEL` env variable)

## Running application 

### For run without docker in development mode:

```bash
npm run prisma:generate // for generate prisma client
npm run prisma:migrate // apply migrations and seed db
npm run start // or npm run start:dev
```

### For build and run in production mode:

```bash
npm run prisma:generate // for generate prisma client
npm run build
npm run prisma:migrate // apply migrations and seed db
npm run start:prod
```

### For run with docker using local dockerfiles:

```bash
npm run docker-compose:local
npm run docker-compose:local:build // with --build glag
```

### For run with docker using deployed docker images:

```bash
npm run docker-compose:hub
npm run docker-compose:hub:build // with --build glag
```

Deployed DockerHub images:
- [database image](https://hub.docker.com/repository/docker/evgeniishcherbakov/postgresql/general)
- [backend image](https://hub.docker.com/repository/docker/evgeniishcherbakov/home-library-service/general)

### For reset database:

```bash
npm run prisma:reset
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Deploying docker images

Login into DockerHub:

```bash
docker login
```

### Build and deploy database image:

```bash
npm run docker:build:db
npm run docker:push:db
```

### Build and deploy backend image:

```bash
npm run docker:build:backend
npm run docker:push:backend
```

## Testing

After application running open new terminal and enter:

### To run only tests for Home Library Service part 3:

```bash
npm run test:auth
npm run test:refresh
```

### To run all tests without authorization

```bash
npm run test
```

### To run only one of all test suites

```bash
npm run test -- <path to suite>
```

### To run all test with authorization

```bash
npm run test:auth
```

### To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

## Part 1

> - [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)
> - Screenshot: ![image](https://github.com/user-attachments/assets/1f31280f-4b03-4dce-80d8-70e19ee02434)
> - Deployment:
> - Done 2025-06-03 / deadline 2025-06-03
> - Score: 760 / 760
>
> ## Basic Scope
>
> - [x] **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
> - [x] **+10** The application code that worked with `Users` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
> - [x] **+10** The application code that worked with `Tracks` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
> - [x] **+10** The application code that worked with `Albums` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
> - [x] **+10** The application code that worked with `Artists` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
> - [x] **+10** The application code that worked with `Favorites` instance divided into modules according to to its purpose and Nest.js architecture conventions (work with request and response in controller, business logic in service, etc.)
> - [x] **+10** For each successfully passed test (670)
>
> ## Advanced Scope
> - [x] **+10** PORT value is stored into `.env` file
> - [x] **+20** OpenAPI spec in `doc` folder corresponds with assignment
>
> ## Forfeits
> - [ ] **-670** Changes in tests
> - [ ] **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
> - [ ] **-20** No separate development branch
> - [ ] **-20** No Pull Request
> - [ ] **-10** Pull Request description is incorrect
> - [ ] **-10** Every lint error after npm run lint using local config (errors, not warnings)
> - [ ] **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)

## Part 2

> - [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)
> - Screenshot:
> - Deployment:
> - Done 2025-06-09 / deadline 2025-06-10
> - Score: 360 / 360
>
> ## Basic Scope
>
> # 1) Containerization, Docker
>
> - [x] **+20** `Readme.md` has instruction how to run application
> - [x] **+30** `user-defined bridge` is created and configured
> - [x] **+30** container auto restart after crash
> - [x] **+20** application is restarting upon changes implemented into `src` folder
> - [x] **+30** database files and logs to be stored in volumes instead of container
>
> # 2) Database (PostgreSQL) & ORM
>
> - [x] **+20** `Users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
> - [x] **+20** `Artists` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
> - [x] **+20** `Albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
> - [x] **+20** `Tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
> - [x] **+20** `Favorites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
>
>
> ## Advanced Scope
>
> # 1) Containerization, Docker
>
> - [x] **+20** Final size of the Docker image with application is less than 500 MB
> - [x] **+10** Implemented npm script for vulnerabilities scanning (free solution)
> - [x] **+20** Your built image is pushed to DockerHub
>
> # 2) Database & ORM
>
> - [x] **+30** Migrations are used to create database entities
> - [x] **+10** Variables used for connection to database to be stored in `.env`
> - [x] **+10** `typeorm` [decorators](https://typeorm.io/#/relations) or `prisma` relations create relations between entities
> - [x] **+30** Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)
>
> ## Forfeits
>
> - [ ] **-20** In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
> - [ ] **-20** Postgres container is not configured as dependency for application container
> - [ ] **-10** for each failing test with `npm run test`
> - [ ] **-20** `docker-compose.yml` contains hardcoded variables
> - [ ] **-30% of total task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
> - [ ] **-40** No Pull Request created
> - [ ] **-20** PR description is incorrect
> - [ ] **-40** No separate development branch
> - [ ] **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
> - [ ] **-10 points** for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).

## Part 3

> - [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-authentication-authorization/assignment.md)
> - Screenshot:
> - Deployment:
> - Done 2025-06-15 / deadline 2025-06-17
> - Score: 340 / 340
>
> > Solution is in `home-library-service-part-3` git branch
>
> ## Basic Scope
>
> # 1) Logging & Error Handling:
>
> - [x] **+20** Custom `LoggingService` is implemented and used for logging
> - [x] **+20** Custom `Exception Filter` is implemented and used for handling exceptions during request processing
> - [x] **+20** Logging for request (of at least `url`, `query parameters`, `body`) and response with `status code` is implemented.
> - [x] **+20** Error handling is implemented including sending response with an appropriate `http status code` and errors logging.
> - [x] **+10** Error handling and logging is implemented for `uncaughtException` event.
> - [x] **+10** Error handling and logging is implemented for `unhandledRejection` event.
>
>
> # 2) Authentication and Authorization:
>
> - [x] **+30** Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service
> - [x] **+30** Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service
> - [x] **+10** `User` `password` saved into database as hash
> - [x] **+20** Access Token is implemented,`JWT` payload contains `userId` and `login`, secret key is saved in `.env`.
> - [x] **+40** Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, `/doc` and `/`.
> - [x] **+10** Separate module is implemented **within application scope** to check that all requests to all routes except mentioned above contain required JWT token
>
> ## Advanced Scope
>
> # 1) Logging & Error Handling:
>
> - [x] **+20** Logs are written to a file.
> - [x] **+10** Logs files are rotated with size.
> - [x] **+10** Add environment variable to specify max file size.
> - [x] **+10** Error logs are written to a separate file (either only to a separate file or in addition to logging into a common file).
> - [x] **+20** Add environment variable to specify logging level and corresponding functionality.
>
> Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels.
> 
>
> # 2) Authentication and Authorization:
> - [x] **+30** Route `/auth/refresh` implemented correctly, related logic is divided between controller and corresponding service
>
>
> ## Forfeits
>
> - [ ] **-10** for each failing test (for authentication and authorization  module tests to be run with `npm run test:auth`)
> - [ ] **-30% of max task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
> - [ ] **-10 points** for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
> - [ ] **-20** No separate development branch
> - [ ] **-20** No Pull Request
> - [ ] **-10** Pull Request description is incorrect
> - [ ] **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
