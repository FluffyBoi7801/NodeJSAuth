# NodeJSAuth
 NodeJS Backend Authorize Project

Project uses REST API model

DB is MongoDB because it pretty well for this project

Passwords enycrypted by bcrypt lib



# This project doesn't have any Swagger API docs it follows =>

Where * is server address and port

# */auth/reg -> Get POST request for registration users, body contains a JSON like
{ username: "exampleName",
  password: "examplePassword" }

# */auth/login -> Also get POST request for login user, body contains a JSON like
{ username: "exampleName",
  password: "examplePassword" }
As response it will return the auth token from JWT lib

# */auth/users -> Returns users list only for users with 'USER' role. Gets GET request with auth token in Headers.
