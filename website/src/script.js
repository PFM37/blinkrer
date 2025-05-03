document.addEventListener("DOMContentLoaded", () => {

    const dBtn = document.getElementById("download-btn");

    dBtn.addEventListener("click", () => {
        window.location.href = "download";
    });
});