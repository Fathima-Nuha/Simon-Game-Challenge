buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

level=0;

start=false;

$(document).keypress(function(){
  if(!start){
    $("body").removeClass("game-over");
    nextSequence();
    start=true;
  }
});

function reset(){
  level=0;
  gamePattern = [];
  start=false;
  setTimeout(function(){
    $("#level-title").text("Press Any Key To Restart");
  },3000)

}

function nextSequence() {

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut().fadeIn();

playSound(randomChosenColour);

level+=1;
$("#level-title").text("Level "+level);
if(level>2){
  $(".rule").fadeOut("slow");
}

userClickedPattern = [];
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  $("#" + userChosenColour).fadeOut().fadeIn();

  playSound(userChosenColour);

  animatePress(userChosenColour);

  check(userClickedPattern.length);

});

function playSound(x) {
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
}

function animatePress(currentColor){

      $("#"+currentColor).addClass("pressed");
      setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
      },100)

  }

function check(currentLevel){
if(gamePattern[currentLevel-1]==userClickedPattern[currentLevel-1]){
  if(gamePattern.length==userClickedPattern.length){
    setTimeout(function(){
    nextSequence();
  },1000);
  }
}

else{
  $("#level-title").text("Game Over!!");
      $("body").addClass("game-over");

  var audio=new Audio("sounds/wrong.mp3");
  audio.play();

  reset();

}
}
