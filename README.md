## Express Crash Course with Typescript

A hands-on learning repository featuring personal solutions and experiments using Express.js and TypeScript, for personal educational purposes.

### Features

- TypeScript Express.js setup
- RESTful API endpoints
  - Index `/`
  - Cards `/api/cards`
- Custom middleware (logging, error handling)
- Static file serving
- Swagger (OpenAPI) documentation

### Getting Started

- Install dependencies: `npm install`
- Start the server: `npx ts-node src/server.ts` or `npm run dev` or `npm run start`
- Access the static index page [http://localhost:8000/](http://localhost:8000/)  
  Access the API at [http://localhost:8000/api/cards](http://localhost:8000/api/cards)  
  Access Swagger UI at [http://localhost:8000/api-docs/](http://localhost:8000/api-docs/)

### API Endpoints

| Method | Endpoint          | Description                                             |
| ------ | ----------------- | ------------------------------------------------------- |
| GET    | `/`               | Returns index page                                      |
| GET    | `/api/cards`      | Retrieves all cards (optionally limited by query param) |
| POST   | `/api/cards`      | Creates a new card                                      |
| GET    | `/api/cards/{id}` | Retrieves a card by Id                                  |
| PUT    | `/api/cards/{id}` | Updates a card by Id                                    |
| DELETE | `/api/cards/{id}` | Deletes a card by Id                                    |

For full details, see the [Swagger UI](http://localhost:8000/api-docs/).

### Testing

This project uses [Jest](https://jestjs.io/) for integration testing and code coverage.

- To run tests:
  `npm run test:integration`
- To run single test
  `npm run test:integration -- -t "name"`
- To view coverage:
  `npm run test:integration:coverage`

Test results and coverage reports will be shown in the terminal.

### License

This project is licensed under the MIT License.
