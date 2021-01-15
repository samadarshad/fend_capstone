require('dotenv').config()

const hostname = process.env.HOST;
const port = process.env.PORT;
const createServer = require('./server.js');

const app = createServer()

// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}`);
// })

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})