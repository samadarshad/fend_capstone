# Evaluate NLP Project

## Overview
A web app which uses a Natural Language Processing API to display sentiment information for input text.

The project is hosted at https://evaluate-nlp-abdus-samad.herokuapp.com/

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