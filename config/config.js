const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    username:process.env.DB_USERNAME,
    password:process.env.DB_PWD
}