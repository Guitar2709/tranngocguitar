## API Endpoints

### Create Resource
- **URL**: `/api/resource`
- **Method**: `POST`
- **Description**: Create a new resource
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }

### Get all resources
- **URL**: `/api/resource`
- **Method**: `GET`
- **Description**: Get all resources

### Create Resource
- **URL**: `/api/resource`
- **Method**: `POST`
- **Description**: Create a new resource
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }

### Get Resource by ID
- **URL**: `/api/resource/:id`
- **Method**: `GET`
- **Description**: Get Resource by ID

### Update Resource
- **URL**: `/api/resource/:id`
- **Method**: `Put`
- **Description**: Update a resource by id
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }

### Delete Resource by id
- **URL**: `/api/resource/:id`
- **Method**: `DELETE`
- **Description**: Delete a new resource by id
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
