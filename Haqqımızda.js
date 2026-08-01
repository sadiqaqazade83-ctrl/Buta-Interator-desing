const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        requestAnimationFrame(() => {
            lightbox.classList.add("show");
        });
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("show");

    setTimeout(() => {
        lightbox.style.display = "none";
    }, 300);
});