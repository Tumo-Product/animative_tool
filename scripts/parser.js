const parser = {
    dataFetch: async () => {
        return vids;
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");
        
        return axios.get(config.query_url + _uid);
    }
}

const vids = {
    segments: [
        {
            id      : "0",
            loopSrc : "vids/RM_INTRO_IDLE.mp4",
            choices : [
                {
                    ref  : "00",
                    hoverSrc: "vids/RM_INTRO_SNEAKER.mp4",
                    pos  : {
                        x: 100, y: 250
                    }
                },
                {
                    ref  : "01",
                    hoverSrc: "vids/RM_INTRO_TSHIRT.mp4",
                    pos  : {
                        x: 261, y: 171
                    }
                },
                {
                    ref  : "02",
                    hoverSrc: "vids/RM_INTRO_BAG.mp4",
                    pos  : {
                        x: 494, y: 187
                    }
                },
                {
                    ref  : "03",
                    hoverSrc: "vids/RM_INTRO_BOTTLE.mp4",
                    pos  : {
                        x: 655, y: 264
                    }
                },
            ]
        },
        {
            id      : "00",
            src     : "vids/RM_ANIM_SNEAKER.mp4",
            ref     : "0"
        },
        {
            id      : "01",
            src     : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            ref     : "0"
        },
        {
            id      : "02",
            src     : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            ref     : "0"
        },
        {
            id      : "03",
            src     : "https://cdn.videvo.net/videvo_files/video/premium/getty_56/small_watermarked/istock-1003710026_preview.webm",
            ref     : "0"
        }
    ]
}