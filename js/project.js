function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

$(document).ready(function(){
    if(!isMobile()) {
        $('.about-project').sticky();
    }
});

