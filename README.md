# uptain-league

## Pre-reqs
* Docker

## Installing
* Clone this repository or download the master branch

 `cd uptain-league`
 
 `docker-compose up`

## Environment Variables that need to be set
These variables must be set in a frontend.env and backend.env file in the respective directories. The pattern to list the variables is: VAR=VAL one per line
### For the Backend
* PORT - The Port the server will listen at
* LOG_LEVEL - The kind of logs you want to get out of the backend (logs will be saved to backend/src/events.log)
* AUTH_TOKEN - The auth_token property for requests to the dashboard
* MONGO - The MongoDB connection string

### For the Frontend
* USERNAME - The username that is used to authenticate with the dashboard
* PASSWORD - The password for the dashboard
