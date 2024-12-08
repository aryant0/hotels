const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Hotels'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));
const db = mongoose.connection;
module.exports=db;