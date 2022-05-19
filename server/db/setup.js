const mysql = require('mysql')

const {conn} = require('./db')

conn.connect(function(err){
    const createSchema = `CREATE DATABASE IF NOT EXISTS trellact`

    conn.query(createSchema, err =>{
        if(err){
            console.log(err)
        } else{
            console.log('schema ok')
        }
    })

    if(err){
        console.log(err)
    } else{
        console.log('connected to mysql')
    }
})

conn.changeUser({database : 'trellact'}, function(err) {
    
    if(err){
        console.log(err)
    }else{
        console.log('database switched to trellact')
        dbSetup()
    }
    
  });

function dbSetup(){

    const queryTableUsers = `CREATE TABLE IF NOT EXISTS Users(
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        login VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )`
    
    const queryTableBoards = `CREATE TABLE IF NOT EXISTS Boards(
        board_id INT AUTO_INCREMENT PRIMARY KEY,
        board_name VARCHAR(255) NOT NULL,
        created_by INT NOT NULL,
        board_members VARCHAR(255) NOT NULL,
        board_lists VARCHAR(255) NOT NULL,
        board_theme VARCHAR(255) NOT NULL,
        board_favorite SMALLINT NOT NULL,

        FOREIGN KEY(created_by)
            REFERENCES Users(user_id)
    )`

    const queryTableLists = `CREATE TABLE IF NOT EXISTS Lists(
        list_id INT AUTO_INCREMENT PRIMARY KEY,
        list_name VARCHAR(255) NOT NULL,
        board_id INT NOT NULL,
        position INT NOT NULL,

        FOREIGN KEY(board_id)
            REFERENCES Boards(board_id)
    )`

    const queryTableCards = `CREATE TABLE IF NOT EXISTS Cards(
        card_id INT AUTO_INCREMENT PRIMARY KEY,
        card_name VARCHAR(255) NOT NULL,
        list_id INT NOT NULL,
        card_members VARCHAR(255),
        card_labels VARCHAR(255),
        created_by INT NOT NULL,

        FOREIGN KEY(list_id)
            REFERENCES Lists(list_id),
        FOREIGN KEY(created_by)
            REFERENCES Users(user_id)
    )`

    runQuery(queryTableUsers, 'users')
    runQuery(queryTableBoards, 'boards')
    runQuery(queryTableLists, 'lists')
    runQuery(queryTableCards, 'cards')


}

function runQuery(query, description){
    conn.query(query, err =>{
        if(err){
            console.log(err)
        } else{
            console.log('setup of table '+description+' ok')
        }
    })
}