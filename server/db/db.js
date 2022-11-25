const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

let db;

const initDb = async () => {
    // open the database
    if (!db) {
        db = await open({
            filename: 'database.db', // имя и путь к БД
            driver: sqlite3.Database
        })
    }

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users
        (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            login    TEXT NOT NULL,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS tokens
        (
            id     INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            token  TEXT    NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS topics
        (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            theme     TEXT    NOT NULL,
            authorId  INTEGER NOT NULL,
            createdAt INTEGER NOT NULL,
            FOREIGN KEY (authorId) REFERENCES users (id)
        );

        CREATE TABLE IF NOT EXISTS messages
        (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            body      TEXT    NOT NULL,
            topicId   INTEGER NOT NULL,
            authorId  INTEGER NOT NULL,
            createdAt INTEGER NOT NULL,
            FOREIGN KEY (authorId) REFERENCES users (id),
            FOREIGN KEY (topicId) REFERENCES topics (id)
        );
    `);
};

const getDb = () => db;

module.exports = {
    initDb,
    getDb
}