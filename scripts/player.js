const player = {
    controls : {
        play : (video) => {
            if (video == undefined) {
                document.getElementById(view.current_video).play();
            } else {
                document.getElementById(video).play();
                if (video == "v_intro") {
                    $(".controls").css({"opacity": 0, "pointer-events" : "none"});
                    $(".blackout").css("opacity", 0);
                }
            }

            view.change_styles(0);
        },
    
        pause : (video) => {
            if (video == undefined) {
                document.getElementById(view.current_video).pause();
            } else {
                document.getElementById(video).pause();
            }

            view.change_styles(1);
        },
    
        rewind_video : (time) => {
            let currentVideo = document.getElementById(view.current_video);

            if (currentVideo.currentTime == currentVideo.duration && time < 0)
            {
                player.controls.play();
            }

            currentVideo.currentTime += time;
        },

        goToStart   : (video) => {
            if (video == undefined) {
                document.getElementById(view.current_video).currentTime = 0;
            } else {
                document.getElementById(video).currentTime = 0;
            }
        }
    }
}
