const view = {
    current_video   : undefined,
    mouseMoving     : false,
    loaderOpen      : true,
    hovering        : false,
    controlsVisible : true,

    toggleLoader: () => {
        view.loaderOpen = !view.loaderOpen;

        if (view.loaderOpen)    $("#loadingScreen").show();
        else                    $("#loadingScreen").hide();
    },
    addVideo: (id, src) => {
        let videoBlock = `
        <div id="${id}" class="video_block">
            <video id="v_${id}" class="video">
                <source src="${src}" type="video/mp4">
            </video>
        </div>`;

        $("body").prepend(videoBlock);

        if (id === "intro") {
            $("#intro").css("z-index", 6);
            $("#play").attr("onclick", "player.controls.play('v_intro')");
        }

        if (id.charAt(0) != "l") {
            document.getElementById(`v_${id}`).addEventListener('timeupdate', function() {view.update(id)});
        } else {
            $(`#v_${id}`).prop("loop", true);
        }
    },
    update: (id) => {
        let element         = document.getElementById(view.current_video);
        if (id === "intro") element = document.getElementById("v_intro");
        if (element === null) return;
        let duration        = element.duration;
        let currentTime     = element.currentTime;

        if (currentTime >= duration) {
            if (id == "intro") {
                $("#intro").remove();
                player.controls.play();
                // return;
            }
            handleVideo();
        }

        if (currentTime > 5) {
            $("#back img").show();
        }
        else if (currentTime < 5) {
            $("#back img").hide();
        }
        if (currentTime < duration - 5) {
            $("#front img").show();
        }
        else if (currentTime > duration - 5) {
            $("#front img").hide();
        }
    },
    switchVideos: async (from, to) => {
        from.css("z-index", 0);
        to.css("z-index", 1);
    },
    addChoice: (i, pos, style) => {
        let choice = `<div id="c_${i}" class="choices" onclick="next_video(${i})"></div>`;
        
        $("#choices").append(choice);
        if (style !== undefined) {
            $(`#c_${i}`).attr("style", style);
        }
        if (pos !== undefined) {
            $(".choices").eq(i).css("left", pos.x);
            $(".choices").eq(i).css("top",  pos.y);
        }

        $(`#c_${i}`).mouseenter(function() {
            audio.currentTime = 0;
            audio.play();
            hoverSwitch(i, "entering");
        }).mouseleave(function() {
            hoverSwitch(i, "leaving");
        });
    },
    clear_choices: async () => {
        $(".choices").each (function() {
            $(this).remove();
        });
    }, 

    show_question : () => {
        $("#choices").removeClass("stickyHide");
        $("#choices").addClass("stickyShow");
    },
    hide_question: () => {
        $("#choices").removeClass("stickyShow");
        $("#choices").addClass("stickyHide");
    },
    fitText: (name) => {
		$(`.${name} p`).each(function (i) {
			let size;
			let desiredHeight = 50;

			while ($(this).prop("scrollHeight") > desiredHeight || $(this).width() > $(this).parent().width()) {
				size = parseInt($(this).css("font-size"), 10);
				$(this).css("font-size", size - 1);
			}
		});
	},
    change_styles : (event) => {
        if (event == 0){
            $(".blackout").css("opacity", "0");
            $("#play").hide();
            $("#pause").show();
        }
        else {
            $(".blackout").css("opacity", "0.42");
            $("#play").show();
            $("#pause").hide();
        }
    }
}
