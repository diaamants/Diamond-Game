playing = false;
let score;
let lifes;
let diamonds = ['gold','pink','blue'];
let step;
let action;
 
$(function(){
    $("#startReset").click(function(){
    if (playing == true) {
        location.reload();
    } else {
        playing = true;
        $("#startReset").html("<div>Reset Game</div>");

        score = 0;
        $("#score-value").html(score);

        $("#lifes").show();
        lifes = 3; 
        addHearts();

        $("#gameOver").hide();

        startAction();
    }
    });

    $("#diamond1").mouseover(function(){
        score++;
        $("#score-value").html(score);
        
        clearInterval(action);
        
        $("#diamond1").hide("explode", 500);
        
        setTimeout(startAction, 800);
    });
    
function addHearts() {
    $("#lifes").empty();
    for(i = 0; i < lifes; i++){ 
        $("#lifes").append('<img src="img/heart.png" class="life">');
    }
}

function startAction() {
    $("#diamond1").show();
    chooseDiamond();
    
    $("#diamond1").css({'left': Math.round(Math.random()*550), 'top' : -60});

    step = 1 + Math.round(Math.random()*5);

        action = setInterval(function() {
        $("#diamond1").css('top', $("#diamond1").position().top + step);

        if($("#diamond1").position().top > $("#diamondContainer").height()){
        
            if(lifes > 1 ){
                $("#diamond1").show();
                chooseDiamond(); 
                $("#diamond1").css({'left' : Math.round(550*Math.random()), 'top' : -60}); 
                step = 1 + Math.round(5*Math.random()); 
                lifes --;
                addHearts();

            } else {
                playing = false; 
                $("#startReset").html("<div>Start Game</div>");
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#lifes").hide();
                stopAction();
            }
        }
        }, 10);
}

function chooseDiamond() {
    $("#diamond1").attr("src" , "img/" + diamonds[Math.round(Math.random()*2)] + ".png");
}

function stopAction(){
    clearInterval(action);
    $("#diamond1").hide();
}

});