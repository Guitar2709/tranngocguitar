## API Endpoints

### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Create a new user
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }

### Update score
- **URL**: `/api/scores/update`
- **Method**: `POST`
- **Description**: add more score to user by username
- **Request Headers:**:
Authorization: Bearer token
- **Request Body**:
  ```json
  {
    "username": "string",
    "score": "number"
  }

### Get top 10 score
- **URL**: `/api/resource`
- **Method**: `GET`
- **Description**: Get top 10 score

### Login user
- **URL**: `/api/resource/:id`
- **Method**: `Put`
- **Description**: login user return auth token
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }