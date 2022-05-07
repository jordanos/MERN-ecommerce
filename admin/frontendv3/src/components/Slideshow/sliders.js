var sliders = document.querySelectorAll('.slide');
var btn = document.querySelectorAll('./btn')
let currentslide = 1;


var manualNav = function(manual) {
    sliders.forEach((slide) => {
        slide.classList.remove('active')
    })

    sliders[manual].classList.add('active');
    btn[manual].classList.add('active');
}

btn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        manualNav(i);
        currentslide = i;
    })
})