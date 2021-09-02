const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/vastu-tool-api', {
    useNewUrlParser: true,
   
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});