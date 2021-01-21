require('dotenv').config()

const port = process.env.PORT;
const createServer = require('./server.js');

const app = createServer()

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})