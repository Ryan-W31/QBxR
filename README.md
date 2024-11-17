# QBxR: NFL Quarterback Rating System

To run this app locally, follow these steps:

1. Install Docker

- [Here is a link to the download page.](https://docs.docker.com/engine/install/)

2. Clone this repository using the command (must have git installed): `git clone https://github.com/Ryan-W31/QBxR.git`
3. Go to the root directory of the project and use this command: `docker compose -f docker-compose.dev.yml up --build`

- This will build the docker containers and launch the app instance.

4. Access the development site at `https://test.localhost`

- Because the Caddy Web Server allows HTTPS in you local environment, you need to add the Caddy certificate to your computer's certificate manager.
- Go into the caddy-1 Docker container (through Docker desktop or cmd line) and go to this directory: `/data/caddy/pki/authorities/local`
- Download `root.crt` and add it to your computer's certificate manager.

## API Endpoints

All endpoints are accessed using the subdomain `https://api.test.localhost` in development, and `https://api.qbxr.com` in production.

### Authentication

1. POST - `/auth/login`

- Logs in a user, sets authentication cookies, and returns the userId, user, and scores.
- Request Body: `{ email: string, password: string, userAgent?: string }`
- Response: `{ userId: string, user: User, scores: Score }`

---

2. GET - `/auth/logout`

- Logs out a user, clears authentication cookies, and returns a message.
- Response: `{ message: string }`

---

3. POST - `/auth/signup`

- Creates a new user, logs them in, sets authentication cookies, and returns the userId, user, and scores.
- Request Body: `{ email: string, password: string, role: string, firstname: string, lastname: string, school_organization: string, userAgent?: string }`
- Response: `{ userId: string, user: User, scores: null }`

---

4. GET - `/auth/refresh`

- Refreshes the user's authentication cookies.
- Response: `{ message: string }`

---

5. POST - `/auth/verify`

- Sends a verification email to the user.
- Request Body: `{ email: string }`
- Response: `{ success: boolean, message: string }`

---

6. GET - `/auth/verify/{token}`

- Verifies the user's email.
- Response: `{ user: User }`

---

7. POST - `/auth/password/forgot`

- Sends a password reset email to the user.
- Request Body: `{ email: string }`
- Response: `{ url: string, emailId: string, message: string }`

---

8. POST - `/auth/password/reset`

- Resets the user's password.
- Request Body: `{ verificationCode: string, password: string }`
- Response: `{ message: string }`

### Users

1. GET - `/users`

- Gets current user.
- Response: `{ user: User, scores: Score }`

---

2. GET - `/users/id/{userId}`

- Gets user by userId.
- Response: `{ user: User }`

---

3. GET - `/users/leaderboard`

- Gets top 50 users and their scores.
- Response: `{ data: Object }`

---

4. GET - `/users/search/{search}`

- Searches for users by name and/or school. Includes filters.
- Response: `{ searchedUsers: Object }`

---

5. GET - `/users/favorites/{userId}`

- Gets user's favorite players.
- Response: `{ favorites: Object }`

---

6. PATCH - `/users/update/info`

- Updates user's info.
- Request Body: `{ userId: string, email: string, firstname: string, lastname: string, school_organization: string, bio: string, birthday: date, phone_number: string, status: boolean, favorite?: string }`
- Response: `{ message: string, user: User }`

---

7. PATCH - `/users/update/password`

- Updates user's password.
- Request Body: `{ userId: string, newPassword: string }`
- Response: `{ message: string }`

---

8. DELETE - `/{userId}`

- Deletes user.
- Response: `{ message: string }`

### Scores

1. PATCH - `/scores/set/vr`

- Sets the user's VR score.
- Request Body: `{ userId: string, difficulty1Score: number, difficulty2Score: number, difficulty3Score: number }`
- Response: `{ message: string, scores: Score }`

---

2. PATCH - `/scores/set/web`

- Sets the user's Web score.
- Request Body: `{ userId: string, webScore1: number, webScore2: number, webScore3: number }`
- Response: `{ message: string, scores: Score }`

---

3. GET - `/scores/get/vr/{userId}`

- Gets the user's VR scores.
- Response: `{ scores: Score }`

---

4. GET - `/scores/get/web/{userId}`

- Gets the user's Web scores.
- Response: `{ scores: Score }`

---

5. GET - `/scores/get/qbxr/{userId}`

- Gets the user's QBxR scores.
- Response: `{ scores: Score }`

---

6. GET - `/scores/get/all/{userId}`

- Gets all of the user's scores.
- Response: `{ scores: Score }`
