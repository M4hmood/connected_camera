const mongoose = require('mongoose');

const connect = (uri) => {
    mongoose.connect(uri)   
        .then(res => console.log(`Connection to mongoDB successful`))
        .catch(err => console.log(`Error in DB connection`));
}

module.exports = () => connect(process.env.MONGO_URI);
