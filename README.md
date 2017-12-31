# uptain-league

## Pre-reqs
* A running instance of MongoDB
* Node

## Installing
* Clone this repository or download the master branch

 `cd backend`
 
 `npm install`
 
 `npm run build`
 
 `cd ../frontend`

  Alter the homepage property to reflect the path where the website will be served.
 
 `npm install`
 
 `npm run build`
* The dist folder in the backend folder is where all the javascript from the compiled TypeScript files will be.
Deploy those to your server.
* In the build folder in the frontend folder you will find the compiled React files. Deploy those to your webserver.

## Environment Variables that need to be set
### For the Backend
* PORT - The Port the server will listen at
* LOG_LEVEL - The kind of logs you want to get out of the backend (logs will be saved to backend/src/events.log)
