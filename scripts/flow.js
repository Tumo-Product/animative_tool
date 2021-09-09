let videos;
let tree            = [];
let tree_keys       = [];
let hoverVids       = {};
let current_video   = '0';

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();
    // videos = videos.data.data;

    for (let i = 0; i < videos.segments.length; i++) {
        tree[videos.segments[i].id] = { id: videos.segments[i].id, src : videos.segments[i].src, choices : videos.segments[i].choices, loopSrc: videos.segments[i].loopSrc, ref: videos.segments[i].ref };
        tree_keys[i] = videos.segments[i].id;
    }

    await addVideos();
    view.current_video = `v_${$(".video_block").eq($(".video_block").length - 1).attr("id")}`;
    $(`#${view.current_video}`).parent().css("z-index", 1);

    view.toggleLoader();
}

const onPlay = async () => {
    $(".controls").css({"opacity": 0, "pointer-events" : "none"});
    $(".blackout").css({"opacity": 0, "pointer-events" : "none"});

    view.change_styles(0);
    player.controls.play();

    $("#play").attr("onclick", "player.controls.play()");

    let timer;
    $('body').mousemove(function() {
        if (!view.hovering) {
            $(".controls").css("opacity", 1);
            clearTimeout(timer);

            timer = setTimeout(function(){
                $(".controls").css("opacity", 0);
            }, 2000);
        } else {
            clearTimeout(timer);
        }
    });
}

const addChoices = async () => {
    let choices = tree[current_video].choices;

    if (choices != undefined) {
        for (let i = 0; i < choices.length; i++) {
            view.addChoice(i, choices[i].pos);
        }
    }
}

const addVideos = async () => {
    for (branch in tree) {
        if (tree[branch].src != undefined) {
            view.addVideo(tree[branch].id, tree[branch].src);
        }
        if (tree[branch].loopSrc != undefined) {
            view.addVideo(`l_${tree[branch].id}`, tree[branch].loopSrc);
        }
        
        hoverVids[branch] = [];
        if (tree[branch].choices != undefined) {
            for (let i = 0; i < tree[branch].choices.length; i++) {
                let choice = tree[branch].choices[i];

                view.addVideo(`l_h_${choice.ref}`, choice.hoverSrc);
                hoverVids[branch].push(`l_h_${choice.ref}`);
            }
        }
    }

    addChoices();
}

const hoverSwitch = async (i, type) => {
    let currentVid  = $(`#${view.current_video}`).parent();
    let hoverVid    = $(`#${hoverVids[current_video][i]}`);

    if (hoverVids[current_video][i] == undefined) return;

    if (type == "entering") {
        player.controls.pause();
        view.switchVideos(currentVid, hoverVid);

        player.controls.goToStart();
        player.controls.play(`v_${hoverVids[current_video][i]}`);
    } else {
        player.controls.pause(`v_${hoverVids[current_video][i]}`);
        player.controls.goToStart(`v_${hoverVids[current_video][i]}`);
        view.switchVideos(hoverVid, currentVid);

        player.controls.play();
    }
}

const handleVideo = async () => {
    view.change_styles(0);
    if (tree[current_video].choices == undefined) {
        let oldVideo    = view.current_video;
        current_video   = tree[current_video].ref;

        view.current_video = `v_${current_video}`;
        if ($(`#${view.current_video}`).length == 0) {
            view.current_video = `v_l_${current_video}`;
        }
        view.switchVideos($(`#${oldVideo}`).parent(), $(`#${current_video}`));
        
        player.controls.play();
        view.show_question();
    }
}

const next_video = async (i) => {
    $(".controls").css({"opacity": 1, "pointer-events" : "all"});
    $(".blackout").css({"opacity": 1, "pointer-events" : "all"});

    player.controls.pause();
    player.controls.goToStart();
    view.change_styles(0);

    hoverSwitch(i, "leaving");
    view.hide_question();
    let oldVideo    = view.current_video;
    current_video   = tree[current_video].choices[i].ref;

    view.current_video = `v_${current_video}`;
    view.switchVideos($(`#${oldVideo}`).parent(), $(`#${current_video}`));
    
    player.controls.play();
}

$(onPageLoad)