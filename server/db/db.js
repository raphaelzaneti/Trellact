const dotenv = require('dotenv')
const mysql = require('mysql')
dotenv.config({path: '../.env'})

const dbPassword = process.env.DB_PASSWORD

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'trellact'
})


function connectDB(){}
module.exports = {conn, connectDB}