# JBA-Code-Challenge

## Overview
This is my attempt at a challenge set by JBA. The challenge was to read the data from a dataset, transform the data into a usefull format and insert the data into a database.
In my attempt I decided to use node.js and connect to a mySQL database.

## Instalation and usage
1. Firstly, clone the repository.
2. Navigate to the folder that the clone was stored using your terminal.
3. Run "npm install" in the terminal to install the dependencies.
4. To run the script on your local machine you will need to change the database details to match your own database settings.
5. To run the script enter "node app.js".
6. You will then be promted by the terminal to enter a desired file name. The file you choose must be stored in the same folder. The dataset for this challenge is "data.pre" which is already in the folder.
7. The script will then create the database, tables, process the data and insert the data to the database. This may take up to 5 minutes.
8. A demo Select query will run and log the results.
9. You will then be promted to run more queries to test the database further.
10. Enter "none" when you are finnished running queries to end the script.

## Example queries:
 - SELECT * FROM Precipitation WHERE Xref = 1 AND Yref = 148;
 
 This can be used to show the precipitation from 1991 - 2000 in a specific location based on Xref and Yref.
 <br><br>
 - SELECT * FROM Precipitation WHERE Value > 7000;
 
 This can be used to show the areas where the precipitation value is higher than 7000.
 <br><br>
 - SELECT * FROM Precipitation WHERE Value > 6000 AND SUBSTRING(date ,1,2) = 10;
 
 This can be used to show the areas where the precipitation value is higher than 6000 in October.
 <br><br>
 - SELECT * from Precipitation ORDER BY value DESC limit 10;
 
 This can be used to find the top 10 highest rainfall in a month from 1991 - 2000.
