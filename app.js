const fs = require('fs');
const mysql = require('mysql2');
const prompt = require('prompt-sync')();

// Sends a prompt to comand line asking for the dataset file. The file must be located in the same folder as app.js.
const fileName = prompt('Name of the file (including the extension): ');

// Database connection and creation
const databaseName = "precipitationData"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});
  
db.connect(function(err) {
    if (err) throw err;
});

db.query(`DROP DATABASE IF EXISTS ${databaseName}`, function (err) {
    if (err) throw err;
});

db.query(`CREATE DATABASE ${databaseName}`, function (err) {
    if (err) throw err;
    console.log("Database created"); 
});

db.query(`USE ${databaseName}`, function (err) {
    if (err) throw err;
});

db.query("CREATE TABLE Precipitation (Xref int, Yref int, Date Varchar(20), Value int);", function (err) {
    if (err) throw err;
    console.log("Table created");
    console.log("Data processing, this may take some time (aprox 5 mins)...")
});


// Main variables used in script.
const allFileContents = fs.readFileSync(fileName, 'utf-8');
const yearStart = parseInt(allFileContents.split(/\r?\n/)[4].substring(24, 28));
let Xref;
let Yref;
let currentYear;
let date;
let value;

// Loops through each line and inserts data to database.
allFileContents.split(/\r?\n/).forEach((line, index) =>  {
    if (index > 4) {
        if (line.includes("Grid-ref=")) {
            Xref = parseInt(line.substring(10, 13));
            Yref = parseInt(line.substring(15, 18));
            currentYear = yearStart;
        }

        if (!line.includes("Grid-ref=")) {
            let count = 1;
            for (let i = 0; i <  12; i++) {
                date = `${i + 1}-01-${currentYear}`;
                value = parseInt(line.substring(count, count + 4));

                db.query(`INSERT INTO Precipitation VALUES (${Xref}, ${Yref}, "${date}", ${value});`, function (err) {
                    if (err) throw err;
                });

                count += 5;
            }
            currentYear += 1;
        }
        
    }
});

// checks how much memory the script uses.
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

// Select queries
db.query(`SELECT * FROM Precipitation WHERE Xref = 1 AND Yref = 148;`, async function (err, result) {
    if (err) throw err;
    console.log(`SELECT * FROM Precipitation WHERE Xref = 1 AND Yref = 148;`);
    console.log(result);

    // New select queries can be added using prompts in the command prompt.
    let query = prompt('new query (type "none" once finished): ');

    while (query !== "none") {

        let queryResults = await  db.promise().query(`${query}`, []);
        console.log(queryResults[0]);
        query = prompt('new query (type "none" once finished): ');
    }
    db.end();
});
