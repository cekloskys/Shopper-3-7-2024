// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the lists and items tables
const listsTableName = 'lists';
const itemsTableName = 'items';

module.exports = {
    // declare function that will create lists table
    createListsTable: async function () {
        // declare transaction that will execute SQL
        (await shopperDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${listsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    store TEXT,
                    date TEXT,
                    priority TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Lists table created successfully.');
                },
                error => {
                    console.log('Error creating lists table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the lists table
    addList: async function (name, store, date, priority) {
        // declare transaction that will execute the SQL
        (await shopperDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${listsTableName} (name, store, date, priority) VALUES ("${name}", "${store}", "${date}", "${priority}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(name + " added successfully.");
                },
                error => {
                    console.log('Error adding list ' + error.message);
                },
            );
        });
    },

    // declare function that will create items table
    createItemsTable: async function () {
        // declare transaction that will execute SQL
        (await shopperDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${itemsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT(100),
                    price REAL,
                    quantity INTEGER
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Items table created successfully.');
                },
                error => {
                    console.log('Error creating items table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the items table
    addItem: async function (name, price, quantity) {
        // declare transaction that will execute the SQL
        (await shopperDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${itemsTableName} (name, price, quantity) VALUES ("${name}", ${price}, ${quantity})`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(name + " added successfully.");
                },
                error => {
                    console.log('Error adding item ' + error.message);
                },
            );
        });
    },
};