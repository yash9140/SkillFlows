# SkillFlow Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up MongoDB (default: mongodb://localhost:27017/skillflow). You can change this in `.env`.
3. Start the server:
   ```bash
   node index.js
   ```

## API Endpoints
- `GET /courses` - List all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create a new course (admin)
- `DELETE /courses/:id` - Delete a course (admin) 