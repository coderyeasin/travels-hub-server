const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('start journey with us')
})

app.listen(port, () => {
    console.log(`guys listening port is: ${port}`);
})