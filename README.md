# How to Run the Fullstack Application with Docker

This project contains a React frontend and a Laravel backend, along with a MySQL database. Docker is used to containerize both the frontend and backend, and `docker-compose` is used to manage the services.

## Prerequisites

1. Install [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) on your machine.

## Steps to Run the Application

1. Clone the repository:
   ```
   git clone https://github.com/ibrahimyemi/innoscripta-test.git
   cd my-app
   ```

2. Build and start the containers using `docker-compose`:
   ```
   docker-compose up --build
   ```

   This command will:
   - Build the Docker images for the frontend, backend, and database.
   - Start the containers and link them together.

3. The frontend (React) will be available at: [http://localhost](http://localhost)
4. The backend (Laravel) will be available at: [http://localhost:8000](http://localhost:8000)
## Stopping the Application

To stop the application, use the following command:
```
docker-compose down
```

This will stop and remove the containers.

---

## Notes

- **Laravel Backend**: Make sure to configure your `.env` file in the backend and confirm the docker-compose for database connection:
  ```env
  DB_CONNECTION=mysql
  DB_HOST=db
  DB_PORT=3306
  DB_DATABASE=db_name
  DB_USERNAME=db_user
  DB_PASSWORD=db_password
  ```

- **React Frontend**: The frontend is already configured to fetch data from the backend at `http://localhost:8000`.
