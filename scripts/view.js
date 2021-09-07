const view = {
    current_video   : undefined,
    mouseMoving     : false,
    loaderOpen      : true,
    hovering        : false,

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

        if (id.charAt(0) != "l") {
            document.getElementById(`v_${id}`).addEventListener('timeupdate', view.update);
        } else {
            $(`#v_${id}`).prop("loop", true);
        }
    },
    update: () => {
        let element         = document.getElementById(view.current_video);
        let duration        = element.duration;
        let currentTime     = element.currentTime;

        if (currentTime >= duration) {
            handleVideo();
            
        }
    },
    switchVideos: async (from, to) => {
        from.css("z-index", 0);
        to.css("z-index", 1);
    },
    addChoice: (i, pos) => {
        let choice = `<div id="c_${i}" class="choices" onclick="next_video(${i})"></div>`;
        
        $("#choices").append(choice);
        if (pos !== undefined) {
            $(".choices").eq(i).css("left", pos.x);
            $(".choices").eq(i).css("top",  pos.y);
        }

        $(`#c_${i}`).mouseenter(function() {
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
	}
}
