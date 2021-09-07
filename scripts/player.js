const player = {
    controls : {
        play : (video) => {
            if (video == undefined) {
                document.getElementById(view.current_video).play();
            } else {
                document.getElementById(video).play();
            }
        },
    
        pause : (video) => {
            if (video == undefined) {
                document.getElementById(view.current_video).pause();
            } else {
                document.getElementById(video).pause();
            }
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
