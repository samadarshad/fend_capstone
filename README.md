# Evaluate NLP Project

## Overview
A web app which uses multiple travel APIs to display travel information for input destination, source, and dates.

The project is hosted at ...

## Prerequisite
This project was tested on:

```
npm version 6.14.0
node version 14.15.1
```

## Installation
Run `sudo npm ci` to install the dependencies. Do `sudo npm install` if it doesnt work.

## Build & run for production (client and server)
Run `sudo npm autostart` to build and run for production.

Go to `http://localhost:3000`

## Build & run for development (client only)
Run `sudo npm autodev` to build and run for development. 

Go to `http://localhost:8080`

Note that this will automatically re-compile and reload the page on any changes to /src/client or /src/shared folders, but will not re-compile for changes to /src/server. You will need to close the program and re-run it for any changes on /src/server.

## Running the tests
First run
`sudo npm run autobuild`

Then run
`sudo npm run tests`

Note the tests rely on https://beeceptor.com/console/abdus-samad-weather-journal-test being live. 

## Errors
Errors are handled by logging to the server console, and sending to the client in the form `Error: <status_code>`.

## Things to improve
- The Pixabay API cannot distinguish between say, London UK and London Canada, because only the city name is used
- The Weatherbit API also returns a city-name, this city-name may be different to the city-name given by Geonames API, so which one is the source of truth?
- The Openweathermap API requires payment, so I cannot put climate data into my app.
- The free Skyscanner API has a 50/minute limit, which means 3/minute when doing 14-requests per user interaction.
- Several variables are hard-coded into the server, which should be parameters from the client call i.e. number of pictures, flight dates 
- The offline mode of the website (using service workers) doesn't respond to user events i.e. clicking on "Show saved trips" shouldn't require the server, so should still work offline, but it doesnt