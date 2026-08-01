const photos = [
    "photo/post.png",
    "photo/post1.png",
    "photo/post2.png",
    "photo/post3.png"
];

let current = 0;

const image = document.getElementById("sliderImage");

const dots = document.querySelectorAll(".dot");

function updateSlider() {
    image.src = photos[current];

    dots.forEach(dot => dot.classList.remove("active"));
    dots[current].classList.add("active");

    if (current == 0) {
        prev.style.display = "none";
    } else {
        prev.style.display = "block";
    }

    if (current == photos.length - 1) {
        next.style.display = "none";
    } else {
        next.style.display = "block";
    }
}

document.getElementById("next").onclick = function () {
    current++;
    updateSlider();
};

document.getElementById("prev").onclick = function () {
    current--;
    updateSlider();
};

const videos=[
    "video/Informativ-matireallar/1.mp4",
    "video/Informativ-matireallar/2.mp4",
    "video/Informativ-matireallar/3.mp4",
    "video/Informativ-matireallar/4.mp4"
];


const video = document.getElementById("sliderVideo");

let i = 0;

function updateSlider2() {
    video.src = videos[i];

    if (i == 0) {
        videoprev.style.display = "none";
    } else {
        videoprev.style.display = "block";
    }

    if (i == photos.length - 1) {
        videonext.style.display = "none";
    } else {
        videonext.style.display = "block";
    }
}


document.getElementById("videonext").onclick = function () {
    i++;
    updateSlider2();
};

document.getElementById("videoprev").onclick = function () {
    i--;
    updateSlider2();
};