"use strict";
        
// default query values
let state       = "AL"
let sex         = "girl"
let year        = "1960"
let queryString = ""

if (window.cordova) {
    /* will only be true of cordova.js is loaded, which means running on phone
    /* wait until cordova is loaded, it will call onDeviceReady*/
    document.addEventListener("deviceready", initialize, false);
} else {
    // running in a browser to test/develop
    initialize();
}

function initialize() {
    document.getElementById('stateId').addEventListener('change', function() {
        updateState(this.value);
        runQuery();
    });

    document.getElementById('sexId').addEventListener('change', function() {
        updateSex(this.value);
        runQuery();
    });

    document.getElementById('yearId').addEventListener('change', function() {
        updateYear(this.value);
        runQuery();
    });

    // Initial query
    runQuery();
}    

function updateState(value) { 
    state = value 
    updateQueryString()
}

function updateSex(value)   { 
    sex = value 
    updateQueryString()
}

function updateYear(value)  { 
    year = value 
    updateQueryString()
}

function updateQueryString() {
    queryString = 

      "SELECT name, number, state, sex, year \n" 
    + "FROM   NamesNumberByStateYear \n"
    + "WHERE\n "
    + " state = "    + "'" + state   + "'"
    + " AND sex = "  + "'" + sex     + "'"
    + " AND year = " + "'" + year    + "'\n"
    + "ORDER BY number DESC LIMIT 5;"
    document.getElementById('queryStingId').innerHTML = queryString;
}

function runQuery() {
    MySql.Execute(
        "sql.wpc-is.online",	// mySQL server
        "demo", 				// login name
        "demo12345", 			// login password
        "BabyNames", 			// database to use
                                // SQL query string:
        queryString,
        function (data) {
            processQueryResult(data);
        }
    );
}

function processQueryResult(queryReturned) {
    if (!queryReturned.Success) {
        alert(queryReturned.Error)
    } else {
        document.getElementById("output").innerHTML = 
            JSON.stringify(queryReturned.Result, null, 2);
    }
}