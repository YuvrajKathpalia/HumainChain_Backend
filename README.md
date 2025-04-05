# AI Safety Incident Log API

A RESTful API service for logging and managing hypothetical AI safety incidents.

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Installation and Setup

1. Clone the repository or unzip the project files

2. Navigate to the project directory
```bash
cd HUMAINCHAIN_BACKEND
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file in the root directory with the following content:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

**Database Setup Options:**
- **Option 1 (Local MongoDB)**: If you have MongoDB installed locally, use:
  ```
  MONGODB_URI=mongodb://localhost:27017/ai-safety-incidents
  ```

- **Option 2 (MongoDB Atlas)**: 
  - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create a new cluster
  - Click "Connect" and select "Connect your application"
  - Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your information
  - Example: `mongodb+srv://username:password@cluster0.example.mongodb.net/ai-safety-incidents`

5. Seed the database with sample incidents (recommended)
```bash
node seed.js
```
This will pre-populate your database with 3 sample AI safety incidents for testing purposes.

## Running the Application

Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The server will start on port 4000 (or the port specified in your `.env` file).

## Project Structure

```
/human-chain-assignment
  ├── /config
  │    └── database.js              # Database connection setup
  ├── /models
  │    └── incident.js        # Incident data model
  ├── /routes
  │    └── incidents.js       # API endpoints implementation
  ├── .env                    # Environment variables (you need to create this , I have added mine .env in .gitignore for security purposes)
  ├── package.json            # Project dependencies and scripts
  ├── README.md               # Project documentation
  ├── seed.js                 # Database seeding script
  └── server.js               # Main application entry point
```

## API Endpoints

### 1. Get All Incidents
- **URL**: `/incidents`
- **Method**: `GET`
- **Response**: Array of all incidents
- **Example**:
```bash
curl -X GET http://localhost:4000/incidents
```
- **Expected Response**:
```json
[
    {
        "_id": "67f08be89143fdb36672e0ff",
        "title": "AI Output Manipulation",
        "description": "Users discovered a way to manipulate the AI system to generate harmful content by using specific prompt patterns.",
        "severity": "Medium",
        "reported_at": "2025-04-05T01:48:24.281Z",
        "__v": 0
    }
]
```

### 2. Create a New Incident
- **URL**: `/incidents`
- **Method**: `POST`
- **Body**:
```json
{
  "title": "New Incident Title",
  "description": "Detailed description here.",
  "severity": "Medium"
}
```
- **Response**: The created incident object
- **Example**:
```bash
curl -X POST http://localhost:4000/incidents \
  -H "Content-Type: application/json" \
  -d '{"title": "New Incident Title", "description": "Detailed description here.", "severity": "Medium"}'
```
- **Expected Response**:
```json
{
  "_id": "60d21b4667d0d8992e610c87",
  "title": "New Incident Title",
  "description": "Detailed description here.",
  "severity": "Medium",
  "reported_at": "2025-04-05T15:32:45.123Z"
}
```

### 3. Get a Specific Incident
- **URL**: `/incidents/{id}`
- **Method**: `GET`
- **Response**: Single incident object
- **Example**:
```bash
curl -X GET http://localhost:4000/incidents/67f122dc53666d233b181697
```
- **Expected Response**:
```json
{
    "_id": "67f122dc53666d233b181697",
    "title": "Test titile",
    "description": "Test description",
    "severity": "Low",
    "reported_at": "2025-04-05T12:32:28.255Z",
    "__v": 0
}
```
Note: You can Replace the ID with an actual incident ID from your database.

### 4. Delete an Incident
- **URL**: `/incidents/{id}`
- **Method**: `DELETE`
- **Response**: Confirmation message
- **Example**:
```bash
curl -X DELETE http://localhost:4000/incidents/67f122dc53666d233b181697
```
- **Expected Response**:
```json
{
  "message": "Incident deleted successfully"
}
```
Note: Replace the ID with an actual incident ID from your database.

## Testing with Postman

You can test all endpoints easily using Postman:

1. **Setup Postman**:
   - Make sure your server is running with `npm run dev`
   - Open Postman and create a new collection called "AI Safety Incidents API"

2. **Test GET /incidents**:
   - Create a new request with method GET
   - URL: `http://localhost:4000/incidents`
   - Click "Send"
   - You should see an array of incidents (make sure you ran `node seed.js` first for pre-populating the database)

3. **Test POST /incidents**:
   - Create a new request with method POST
   - URL: `http://localhost:4000/incidents`
   - Go to "Body" tab, select "raw" and "JSON"
   - Enter a valid JSON body:
     ```json
     {
       "title": "AI Output Manipulation",
       "description": "Users discovered a way to manipulate the AI system to generate harmful content.",
       "severity": "Medium"
     }
     ```
   - Click "Send"
   - You should receive a 201 Created response with the new incident

4. **Test GET /incidents/{id}**:
   - Copy an ID from the previous GET all response
   - Create a new request with method GET
   - URL: `http://localhost:4000/incidents/{id}` (replace {id} with actual ID)
   - Click "Send"
   - You should receive the specific incident

5. **Test DELETE /incidents/{id}**:
   - Create a new request with method DELETE
   - URL: `http://localhost:4000/incidents/{id}` (replace {id} with actual ID)
   - Click "Send"
   - You should receive a confirmation message

6. **Test Validation**:
   - Try creating an incident with invalid data (missing fields or invalid severity)
   - You should receive a 400 Bad Request response with an error message

## Data Structure

Each incident has the following structure in the database:

- **id**: Automatically generated MongoDB ObjectId
- **title**: A short summary of the incident (string)
- **description**: Detailed description of the incident (string/text)
- **severity**: The assessed severity level (`Low`, `Medium`, or `High`) (string)
- **reported_at**: Timestamp when the incident was logged (automatically set on creation)

## Design Decisions

1. **MongoDB & Mongoose**: Chosen for ease of development and schema flexibility
2. **Validation**: Basic validation is implemented in the POST route to ensure all required fields are provided and severity is one of the allowed values
3. **Error Handling**: Custom error responses for different scenarios including validation errors, not found errors, and server errors
4. **Date Default**: The `reported_at` field is automatically set to the current date/time when a new incident is created
5. **Sample Data**: The seed.js script provides realistic sample data to help with testing

