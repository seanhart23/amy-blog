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

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
}, 7000);

$("#slideshow1 > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow1 > div:first')
    .delay(1000)
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow1');
}, 7000);

$("#slideshow2 > div:gt(0)").hide();

setInterval(function() {
  $('#slideshow2 > div:first')
    .delay(2000)
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow2');
}, 7000);