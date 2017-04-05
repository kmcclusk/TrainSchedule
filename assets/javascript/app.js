
 var config = {
    apiKey: "AIzaSyAaxXLuqJlack0aQ-uuCmHdAD0LZJWHZws",
    authDomain: "trainschedule-69aee.firebaseapp.com",
    databaseURL: "https://trainschedule-69aee.firebaseio.com",
    projectId: "trainschedule-69aee",
    storageBucket: "trainschedule-69aee.appspot.com",
    messagingSenderId: "914830051633"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function(event) {

	event.preventDefault();

	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#trainDestination").val().trim();
	var firstTrain = $("#firstTrain").val().trim();
	var trainFrequency = $("#trainFrequency").val().trim();
	var trainFare = $("#trainFare").val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDestination,
		firstTrain: firstTrain,
		frequency: trainFrequency,
		trainFare: trainFare
	};

	database.ref().push(newTrain);

	$("#trainName").val("");
	$("#trainDestination").val("");
	$("#firstTrain").val("");
	$("#trainFrequency").val("");
	$("#trainFare").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildkey){

	var firstTrainTime = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
	var timeDifference = moment().diff(moment(firstTrainTime), "minutes");
	var timeRemainder = timeDifference % childSnapshot.val().frequency;
	var minutesUntillTrain = childSnapshot.val().frequency - timeRemainder;
	var nextTrain = moment().add(minutesUntillTrain, "minutes");
	var nextTrainFormatted = moment(nextTrain).format("hh:mm");

	$("#trainTable > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + 
	childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + 
	nextTrainFormatted + "</td><td>" + minutesUntillTrain + "</td><td>" + 
	("&#165;" + childSnapshot.val().trainFare) + "</td></tr>");
});