const mongoose = require('mongoose');
async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mern_auth');
        console.log('Connect database success');    
    }   catch (error) {
        console.log('connect database fail', error);
    }
}

module.exports = connectDatabase;