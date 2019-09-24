console.log("I work")
var firebaseConfig = {
    apiKey: "AIzaSyDRHwjxh4g0c2tdfOdkBqQ8I7J_KvShvNY",
    authDomain: "test-6a2dd.firebaseapp.com",
    databaseURL: "https://test-6a2dd.firebaseio.com",
    projectId: "test-6a2dd",
    storageBucket: "",
    messagingSenderId: "664076151830",
    appId: "1:664076151830:web:1cffef0fcf003deb2d9937"
};
firebase.initializeApp(firebaseConfig)
var database = firebase.database();

var now = moment().format("HH:mm");
console.log("now" + now);
var nextTrain;
var minsNextTrain;

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#t-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#origin-arrive").val().trim();

    var frequencyTrain = $("#frequency").val().trim();
    var firstTrainC = moment(firstTrain, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainC), "minutes")

    var tRemainder = diffTime % frequencyTrain;

    var minsNextTrain = frequencyTrain - tRemainder;

    var nextTrain = moment().add(minsNextTrain, "minutes").format("HH:mm")
 
    database.ref().push({
        name: trainName,
        destination: destination,
        start: firstTrain,
        frequency: frequencyTrain,
        minsNextTrain:minsNextTrain,
        nextTrain:nextTrain,


    })


})



    database.ref().on("child_added", function (childSnapshot) {
        
        
        $("table").append($("<tr>").append(
            $("<td>").text(childSnapshot.val().name),
            $("<td>").text(childSnapshot.val().destination),
            $("<td>").text(childSnapshot.val().start),
            $("<td>").text(childSnapshot.val().frequency),
            $("<td>").text(childSnapshot.val().minsNextTrain + " Minutes"),
        $("<td>").text(childSnapshot.val().nextTrain + " Next Train Arrives"),
        
        ))
    })
    
