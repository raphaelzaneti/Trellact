const dotenv = require('dotenv')
const res = require('express/lib/response')
const mysql = require('mysql')
dotenv.config({ path: '../.env' })

const dbPassword = process.env.DB_PASSWORD

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'trellact'
})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'trellact'
})

function runQuery(query, description) {
    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(description)
        }
    })
}


function connectDB() { }
module.exports = { conn, runQuery, connectDB }