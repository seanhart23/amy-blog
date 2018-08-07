var $;


//ACTIVE LINK CLASS CHANGE

$(function() {
    var nav = document.getElementById("nav"),
        anchor = nav.getElementsByTagName("a"),
        current = window.location;
    for (var i = 0; i < anchor.length; i++) {
    if(anchor[i].href == current) {
        anchor[i].className = "active item";
    }
    }
});

//IMAGE CAROUSEL

$("#slideshow > div:gt(0)").hide();

document.getElementById("rightArrow").addEventListener("click", test, false);
document.getElementById("rightArrow").addEventListener("click", test1, false);
document.getElementById("rightArrow").addEventListener("click", test2, false);
function test() {
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
}

$("#slideshow1 > div:gt(0)").hide();

function test1() {
  $('#slideshow1 > div:first')
    .delay(500)
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow1');
}

$("#slideshow2 > div:gt(0)").hide();

function test2() {
  $('#slideshow2 > div:first')
    .delay(1000)
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow2');
}

function addtxt(input) {
var obj=document.getElementById(input)
obj.value += document.getElementById("textAreaNew").innerHTML = '<table class="imageFrame imageCaption"><tr><td><img border="0" height=“auto” src=“PUTURLHERE”><br></td></tr></table>'
}

function addtxtedit(input) {
var obj=document.getElementById(input)
obj.value += document.getElementById("textAreaEdit").innerHTML = '<table class="imageFrame imageCaption"><tr><td><img border="0" height=“auto” src=“PUTURLHERE”><br></td></tr></table>'
}

function addsig(input) {
var obj=document.getElementById(input)
obj.value += document.getElementById("textAreaNew").innerHTML = '<table class="imageFrame imageCaption"><tr><td><img border="0" src="http://www.harttohearts.com/images/xo.png" class="pull-right"></td></tr></table>'
}

function addsigedit(input) {
var obj=document.getElementById(input)
obj.value += document.getElementById("textAreaEdit").innerHTML = '<table class="imageFrame imageCaption"><tr><td><img border="0" src="http://www.harttohearts.com/images/xo.png" class="pull-right"></td></tr></table>'
}

$(".add").mouseup(function(){
    $(this).blur();
})

$(".edit").mouseup(function(){
    $(this).blur();
})