
# Restaurant Application

## Overview

The Restaurant Application is a web-based platform designed to help users discover restaurants within a city based on their location and preferences. The application provides a seamless experience for users looking to explore and find nearby dining options.

## Features

- **Restaurant Search**: Users can search for restaurants based on the city, their current location, and desired distance.

- **Detailed Restaurant Information**: The application displays detailed information about each restaurant, including its name, address, latitude, and longitude.

- **Filtering Options**: Users can filter restaurants by cuisine type, price range, ratings, and other criteria.

- **Rate Limiting**: Implemented rate limiting to prevent abuse of the API and ensure fair usage.

## API Endpoints

### `GET /v1/restaurants`

Get a list of restaurants based on location and preferences.

**Parameters:**
- `city`: The name of the city where the user wants to find restaurants.
- `latitude` and `longitude`: The user's current location coordinates (latitude and longitude).
- `distance`: The maximum distance in meters from the user's location to the restaurant.

**Example Request:**
```http
GET /v1/restaurants?city=New%20York&latitude=40.7128&longitude=-74.0060&distance=1000
```

**Example Response:**
```json
{
  "restaurants": [
    {
      "name": "Cafe Delight",
      "address": "123 Main St, New York, NY",
      "latitude": 40.7112,
      "longitude": -74.0055
    },
    {
      "name": "Pasta Paradise",
      "address": "456 Elm St, New York, NY",
      "latitude": 40.7145,
      "longitude": -74.0082
    }
  ]
}
```

### `GET /v1/restaurants/:identifier`

Get details of a specific restaurant.

The Identifier can be a city, name or Id

**Example Request:**
```http
GET /v1/restaurants/1
```

**Example Response:**
```json
{
  "name": "Cafe Delight",
  "address": "123 Main St, New York, NY",
  "latitude": 40.7112,
  "longitude": -74.0055
}
```

### `POST /v1/restaurants`

Add a new restaurant.

**Example Request:**
```http
POST /v1/restaurants
Content-Type: application/json

{
  "name": "New Restaurant",
  "address": "789 Oak St, New York, NY",
  "latitude": 40.7189,
  "longitude": -74.0032
}
```

**Example Response:**
```json
{
  "name": "New Restaurant",
  "address": "789 Oak St, New York, NY",
  "latitude": 40.7189,
  "longitude": -74.0032
}
```

### `PUT /v1/restaurants/:id`

Update an existing restaurant.

**Example Request:**
```http
PUT /v1/restaurants/1
Content-Type: application/json

{
  "name": "Updated Restaurant",
  "address": "789 Oak St, New York, NY",
  "latitude": 40.7189,
  "longitude": -74.0032
}
```

**Example Response:**
```json
{
  "name": "Updated Restaurant",
  "address": "789 Oak St, New York, NY",
  "latitude": 40.7189,
  "longitude": -74.0032
}
```

### `DELETE /v1/restaurants/:id`

Delete an existing restaurant.

**Example Request:**
```http
DELETE /v1/restaurants/1
```

**Example Response:**
```json
{
  "response": "Restaurant deleted"
}
```

## Installation

To run the Restaurant Application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/restaurant-application.git
   ```

2. Install dependencies:

   ```bash
   cd restaurant-application
   npm install
   ```

3. Configure environment variables (if applicable).

4. Run the application:

   ```bash
   npm start
   ```

Visit `http://localhost:3015` in your browser to access the application.

## Technologies Used

- Node.js
- NestJS 
- PostgreSQL 
- Prisma ORM
- Docker

## Contributors

- [Ikeoluwa Oloruntoba](https://github.com/Ikeoluwa-Oloruntoba)

## License

This project is licensed under the [MIT License](LICENSE).
```
