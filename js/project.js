function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded",function(){
    $('.project-image a').fluidbox({});
    if(!isMobile()) {
        $('.about-project').sticky();
    }
});
