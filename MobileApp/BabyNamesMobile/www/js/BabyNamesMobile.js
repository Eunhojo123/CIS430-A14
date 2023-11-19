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
        console.error(queryReturned.Error);
        // Handle the error, e.g., display an error message on the page
    } else {
        const data = queryReturned.Result;

        let names = [];
        let numbers = [];

        for (let i = 0; i < data.length; i++) {
            names.push(data[i].name);
            numbers.push(data[i].number);
        }

        console.log("Names:", names);
        console.log("Numbers:", numbers);

        // Pass the correct gender, state, and year values when calling updateChart
        updateChart(names, numbers, data[0].sex, data[0].state, data[0].year);
    }
}

function updateChart(names, numbers, gender, state, year) {
    // Use the names and numbers arrays to update your chart
    // For example, you can use Chart.js to create a bar chart

    // Assuming you have a canvas element with id "myChart"
    var ctx = document.getElementById('myChart').getContext('2d');

    var chartTitle = `Most Popular ${gender.charAt(0).toUpperCase() + gender.slice(1)} Names from ${state} in ${year}`;

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: chartTitle,
                data: numbers,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
