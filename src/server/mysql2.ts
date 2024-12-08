import mysql from 'mysql2'
 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'micro'
})

db.connect((err) => { 
    if (err) { 
        console.error('Error connecting: ' + err.stack); 
        return; 
    } 
    console.log('Connected as id ' + db.threadId)
});

export { db }