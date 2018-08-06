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

// var slideIndex = 0;
// showDivs(slideIndex);

// function plusDivs(n) {
//     showDivs(slideIndex += n);
//     showDivs1(slideIndex += n);
//     showDivs2(slideIndex += n);
// }

// function showDivs(n) {
//     var i;
//     var x = document.getElementsByClassName("mainImage");
//     var y = document.getElementsByClassName("mainImageCaption");    
//     if (n > x.length) {slideIndex = 1} 
//     if (n < 1) {slideIndex = x.length} ;
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none"; 
//         y[i].style.display = "none";         
//     }
//     x[slideIndex-1].style.display = "block"; 
//     y[slideIndex-1].style.display = "block";     
// }

// function showDivs1(n) {
//     var i;
//     var a = document.getElementsByClassName("mainImage1");
//     var b = document.getElementsByClassName("mainImageCaption1");    
//     if (n > a.length) {slideIndex = 2} 
//     if (n < 1) {slideIndex = a.length} ;
//     for (i = 0; i < a.length; i++) {
//         a[i].style.display = "none"; 
//         b[i].style.display = "none";         
//     }
//     a[slideIndex-1].style.display = "block"; 
//     b[slideIndex-1].style.display = "block";     
// }

// function showDivs2(n) {
//     var i;
//     var c = document.getElementsByClassName("mainImage2");
//     var d = document.getElementsByClassName("mainImageCaption2");    
//     if (n > c.length) {slideIndex = 3} 
//     if (n < 1) {slideIndex = c.length} ;
//     for (i = 0; i < c.length; i++) {
//         c[i].style.display = "none"; 
//         d[i].style.display = "none";         
//     }
//     c[slideIndex-1].style.display = "block"; 
//     d[slideIndex-1].style.display = "block";     
// }