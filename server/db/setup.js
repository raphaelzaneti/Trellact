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
        password VARCHAR(255) NOT NULL,

        UNIQUE(login)
    )`
    
    const queryTableBoards = `CREATE TABLE IF NOT EXISTS Boards(
        board_id INT AUTO_INCREMENT PRIMARY KEY,
        board_name VARCHAR(255) NOT NULL,
        created_by INT NOT NULL,
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
        card_position INT NOT NULL,

        FOREIGN KEY(list_id)
            REFERENCES Lists(list_id),
        FOREIGN KEY(created_by)
            REFERENCES Users(user_id)
    )`

    const queryCardsMembers = `CREATE TABLE IF NOT EXISTS Cards_members(
        member_card_id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        member_id INT NOT NULL,
        card_head SMALLINT NOT NULL,
        card_follower SMALLINT NOT NULL,

        FOREIGN KEY(card_id)
            REFERENCES Cards(card_id),
        FOREIGN KEY(member_id)
            REFERENCES Users(user_id)
    )`

    const queryCardsLabels = `CREATE TABLE IF NOT EXISTS Cards_labels(
        label_id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        label_caption VARCHAR(255) NOT NULL,
        label_color VARCHAR(255) NOT NULL,

        FOREIGN KEY(card_id)
            REFERENCES Cards(card_id)
    )`

    const queryBoardMembers = `CREATE TABLE IF NOT EXISTS Boards_members(
        member_board_id INT AUTO_INCREMENT PRIMARY KEY,
        board_id INT NOT NULL,
        member_id INT NOT NULL,
        
        FOREIGN KEY(board_id)
            REFERENCES Boards(board_id),
        FOREIGN KEY(member_id)
            REFERENCES Users(user_id)
    )`

    const createUserQuery = `INSERT IGNORE INTO Users(first_name, last_name, login, password) 
                            VALUES("Marshall", "Matters", "eminem_123", "loseyourself")`

    const createBoardQuery = `INSERT IGNORE INTO Boards(board_name, created_by, board_theme, board_favorite) 
                            VALUES("First board", 1, "red", 0)`
                            
    runQuery(queryTableUsers, 'users')
    runQuery(queryTableBoards, 'boards')
    runQuery(queryTableLists, 'lists')
    runQuery(queryTableCards, 'cards')
    runQuery(queryCardsMembers, 'card_members')
    runQuery(queryCardsLabels, 'card_labels')
    runQuery(queryBoardMembers, 'board_members')
    runQuery(createUserQuery, 'user created')
    runQuery(createBoardQuery, 'board created')
    
    return

}

function runQuery(query, description){
    conn.query(query, err =>{
        if(err){
            console.log(err)
        } else{
            console.log('setup of table '+description+' ok')
        }
    })

    return
}
