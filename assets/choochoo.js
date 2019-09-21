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
  var database=firebase.database();


$("#submit").on("click" ,function(event){
    event.preventDefault();
    console.log("clicked");
    var trainName=$("#t-name").val().trim();
    var destination=$("#destination").val().trim();
    var firstTrain=$("#origin-arrive").val().trim();
    var frequencyTrain=$("#frequency").val().trim();
    database.ref().push({
        name:trainName,
        destination: destination,
        start: firstTrain,
        frequency:frequencyTrain,

    })
    
})
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().name),

    $("table").append($("<tr>").append(
        $("<td>").text(childSnapshot.val().name),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().start),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text("next train"),
        $("<td>").text("mins away"),

    ))
})
