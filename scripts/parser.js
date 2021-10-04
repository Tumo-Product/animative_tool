const parser = {
    dataFetch: async () => {
        return vids;
        let  url	= new URL(document.location.href);
		let _uid    = url.searchParams.get("_uid");
        
        return axios.get(config.query_url + _uid);
    }
}

let vids = {
    "segments": [
        {
            "intro": "vids/FPM_OPEN_TOMATO.mp4"
        },
        {
            "id": "0",
            "loopSrc": "vids/FPM_OPEN_TOMATO_IDLE.mp4",
            "choices": [
                {
                    "ref": "00",
                    "hoverSrc": "vids/FPM_IDLE_TOMATO_1.mp4",
                    "pos": {
                        "x": 42,
                        "y": 266
                    },
                    "style": "transform: rotate(31deg); width: 312px; height: 230px;"
                },
                {
                    "ref": "01",
                    "hoverSrc": "vids/FPM_IDLE_TOMATO_2.mp4",
                    "pos": {
                        "x": 273,
                        "y": 222
                    },
                    "style": "transform: rotate(33deg); width: 211px; height: 130px;"
                }
            ]
        },
        {
            id: "00",
            src: "vids/FPM_VIDEO_TOMATO_1.MP4",
            ref: "0"
        },
        {
            id: "01",
            src: "vids/FPM_VIDEO_TOMATO_2.MP4",
            ref: "0"
        }
    ]
}