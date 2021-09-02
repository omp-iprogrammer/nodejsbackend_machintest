const express = require('express')
require('./config/database.config');
const vasturouter = require('./router/vastu')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(vasturouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



