//alert("working");

//CHECK WHICH BUTTON IS PRESSED
//STEP 3
var userClickedPattern = [];

//CREATING NEW PATTERN
//STEP 5 was to create this array
var gamePattern = [];

//STEP 3 was to create array for the colors
var buttonColours = ["red", "blue", "green", "yellow"];

var max = 3;
var min = 0;

var level = 0;

//START THE GAME
var toggle = false;
$(document).keypress(function (event) {
    console.log(event.key);
    if (!toggle) {
        $("#level-title").text("Level " + level);
        nextSequence();
        toggle = true;
    }
});



//CHECK WHICH BUTTON IS PRESSED

//STEP 1 CREATE HANDLER FUNCTION
$(".btn").click(function () {

    //STEP 2
    var userChosenColour = $(this).attr("id");
    console.log("Last selected color is " + userChosenColour);

    //STEP 4 add userChosenColours to the array
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    //Play the sound
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)

});

//CHECKING ANSWER
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();

            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong" + ".mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        toggle = false;
        level = 0;
        gamePattern=[];
        userClickedPattern=[];
    }

}

//STEP 1 and 2 was to create this function which would calculate random number between 0 and 3 and keep it in a variable
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    //randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //or
    var randomNumber = Math.floor(Math.random() * 4);

    //STEP 4 was selecting random color from the colors array with the help of random number from 0 to 3
    var randomChosenColour = buttonColours[randomNumber];

    //STEP 6 was to push the random color to that array
    gamePattern.push(randomChosenColour);

    //Chose random div according to color
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    $("h3.pattern").text(gamePattern).css("color", "white");
}






//SHOW SEQUENCE

//testing
//$("div#" + randomChosenColour).css("background-color", "white");
//console.log($("div#" + randomChosenColour));

$("h1.color").text(randomChosenColour);



//ADD SOUNDS TO BUTTON CLICKS
function playSound(name) {
    var soundForColor = new Audio("sounds/" + name + ".mp3");
    soundForColor.play();
}

//ADD ANIMATIONS TO USER CLICKS
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}