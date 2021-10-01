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
        // {
        //     intro: "vids/Q1.mp4",
        // },
        {
            id      : "0",
            loopSrc : "vids/RM_INTRO_IDLE.mp4",
            choices : [
                {
                    ref  : "00",
                    hoverSrc: "vids/RM_INTRO_SNEAKER.mp4",
                    pos  : {
                        x: 100, y: 200
                    }
                },
                {
                    ref  : "01",
                    hoverSrc: "vids/RM_INTRO_TSHIRT.mp4",
                    pos  : {
                        x: 261, y: 121
                    }
                },
                {
                    ref  : "02",
                    hoverSrc: "vids/RM_INTRO_BAG.mp4",
                    pos  : {
                        x: 494, y: 137
                    }
                },
                {
                    ref  : "03",
                    hoverSrc: "vids/RM_INTRO_BOTTLE.mp4",
                    pos  : {
                        x: 655, y: 214
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
            src     : "vids/RM_ANIM_TSHIRT.mp4",
            ref     : "0"
        },
        {
            id      : "02",
            src     : "vids/RM_ANIM_BAG.mp4",
            ref     : "0"
        },
        {
            id      : "03",
            src     : "vids/RM_ANIM_BOTTLE.mp4",
            ref     : "0"
        }
    ]
}