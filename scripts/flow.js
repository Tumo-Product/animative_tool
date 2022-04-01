let videos;
let tree            = [];
let tree_keys       = [];
let hoverVids       = {};
let current_video   = '0';
let audio = new Audio("audio/Mouseover 2.wav");
let timer = 0;
let music;

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const onPageLoad = async () => {
    videos = await parser.dataFetch();
    videos = videos.data.data;
    music = new Audio(videos.music);
    music.loop = true;
    audio.volume = 0.1;

    let segments = videos.segments;
    for (let i = 0; i < segments.length; i++) {
        tree[segments[i].id] = { id: segments[i].id, src : segments[i].src, choices : segments[i].choices, loopSrc: segments[i].loopSrc, ref: segments[i].ref, volume: segments[i].volume };
        tree_keys[i] = segments[i].id;
    }

    await addVideos();
    if ($(`#${current_video}`).length > 0) {
        view.current_video = `v_${current_video}`;
    } else if ($(`#l_${current_video}`).length > 0) {
        view.current_video = `v_l_${current_video}`;
    }
    
    $(`#${view.current_video}`).parent().css("z-index", 1);

    if (videos.segments[0].intro !== undefined) {
        console.log(videos.segments[0]);
        view.addVideo("intro", videos.segments[0].intro, videos.segments[0].volume);
    }

    $(".control").mouseenter(function() {
        $(".controls").css("opacity", 1);
        view.hovering = true;
    }).mouseleave(function() {
        view.hovering = false;
    });

    $('body').mousemove(function() {
        if ($(".controls").css("pointer-events") === "all") {
            if (!view.hovering) {
                $(".controls").css("opacity", 1);
                clearTimeout(timer);

                timer = setTimeout(function() {
                    $(".controls").css("opacity", 0);
                }, 2000);
            } else {
                clearTimeout(timer);
            }
        }
    });

    $('body').mouseleave(function() {
        $(".controls").css("opacity", 0);
    });
    
    loadVideos();
    await timeout(1000);
}

const loadVideos = () => {
    let videoElements = $("video");
    let videosLoaded = 0;
    
    videoElements.each(function(i) {
        let video = $(this).get(0);
        video.load();
        
        video.addEventListener('loadeddata', (e) => {
            if(video.readyState >= 3) {
                video.removeEventListener("loadeddata", (e) => {}, true);
                videosLoaded++;
                console.log("loaded");
                if (videosLoaded == videoElements.length) {
                    view.toggleLoader();
                }
            }
         });
    });
}

const onPlay = async () => {
    $(".controls").css({"opacity": 0, "pointer-events" : "none"});
    $(".blackout").css("opacity", 0);
    if (music.src !== "" && music.paused) music.play();

    player.controls.play();

    $("#play").attr("onclick", "player.controls.play()");
    view.controlsVisible = false;

    $(".control").mouseenter(function() {
        $(".controls").css("opacity", 1);
        view.hovering = true;
    }).mouseleave(function() {
        view.hovering = false;
    });
}

const addChoices = async () => {
    let choices = tree[current_video].choices;

    if (choices != undefined) {
        for (let i = 0; i < choices.length; i++) {
            view.addChoice(i, choices[i].pos, choices[i].style, choices[i].styles);
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
    view.controlsVisible = false;
    $(".controls").css({"opacity": 0, "pointer-events" : "none"});
    $(".blackout").css({"opacity": 0, "pointer-events" : "none"});

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
    view.controlsVisible = true;

    $(".controls").css({"opacity": 1, "pointer-events" : "all"});
    $(".blackout").css("opacity", 1);

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