# Web Test Tutorial

This repository provides a simple backend & frontend web blog with unit test and end-to-end (e2e) test implementation

![overview](./docs/overview.png)

## Requirements

- node.js >= 14.x

## Backend

The backend uses [koa](https://koajs.com) framework.
It does not have database, but store all items in memory.
Thus, if you restart the backend, all data will be deleted.

### APIs

The backend implementation provides three `GET` APIs and a `POST` API.

- `/list` (GET): Provides list of the stored items. If no items are stored, it returns a HTTP 400 error
- `/item` (GET): Provide a specific item. You need to provide `id` value (e.g., `/item?id=1`)
- `/flush` (GET): Delete all stored items. It makes easy to run tests.
- `/addItem` (POST): Store an item. You need to provide an item in the below format:

```
{
  "title": "Title of the item",
  "content": "Content of the item"
}
```

### How to build & test

- Move to the backend directory: `cd backend`
- Install dependencies and build: `npm ci`
- Run test: `npm test`

### How to run

- Run server: `npm run start`
  - By default, it runs on the port 3001.
  - You can change the port by using `PORT` environment variable to change the port (e.g., `PORT=8080 npm run start`)

## Frontend

The frontend uses [React](https://reactjs.org).
The basic UI components are from [React Bootstrap](https://react-bootstrap.github.io).
The React Bootstrap components are already tested, so you don't need to write tests for the components.
You can check the tests on their [GitHub repo](https://github.com/react-bootstrap/react-bootstrap/tree/master/test).
For ease of testing, it uses [testing-library](https://testing-library.com).

### Views

- `/`: The main page of the blog. It shows the list of articles and a `write` button
- `/write`: User can write a blog article.
- `/item/:ID`: It takes an item id via url and renders the title and content of the blog item of the corresponding id

### How to build & test

- Move to the backend directory: `cd frontend`
- Install dependencies and build: `npm ci`
- Run test: `npm test`

### How to run

- You should run backend in a terminal session before running the frontend.
- Run server: `npm run start`
  - By default, it runs on the port 3000 (i.e., `http://localhost:3000`) and looking for the backend APIs at `http://localhost:3001`.

## End-to-end (E2E) Test

The e2e test is implemented by using [cypress](https://www.cypress.io).

### How to build

- Move to the backend directory: `cd e2e_test`
- Install dependencies and build: `npm ci`

### How to run

Before running the e2e test, you should run both backend and frontend in seaparate terminal sessions.

(Tip. you may want to use [tmux](https://github.com/tmux/tmux/wiki) or [screen](https://linuxize.com/post/how-to-use-linux-screen/) to run multiple terminal sessions)

- Open Cypress Launchpad: `npm run cypress:open`
  - The script opens Cypress Launchpad. You can interactively run e2e test.
- Run e2e test in headless mode: `npm run cypress:run`
  - It runs e2e test without openning browers.
