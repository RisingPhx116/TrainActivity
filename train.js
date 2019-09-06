var firebaseConfig = {
  apiKey: "AIzaSyDdP4Wgtr2YDBZw57C5LUMLm9CoIs4GPDs",
  authDomain: "trainsched-a7013.firebaseapp.com",
  databaseURL: "https://trainsched-a7013.firebaseio.com",
  projectId: "trainsched-a7013",
  storageBucket: "",
  messagingSenderId: "842313539802",
  appId: "1:842313539802:web:de0f22dbc694c65dfe85e3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var name = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var start = moment($("#start-input").val().trim(), "HH:mm - military time").format("X");
    var freq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: name,
      dest: dest,
      start: start,
      freq: freq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding  to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var start = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;
  
    //  Info
    console.log(name);
    console.log(dest);
    console.log(start);
    console.log(freq);
  

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % freq;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = freq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });