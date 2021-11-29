const api = {
    weatherApi: {
        method: 'GET',
        url:'http://api.openweathermap.org/data/2.5/weather',
        params:{
            appid: '150d940d7c12e9b22ecd56efe1891ff9',
            q: '',
            units: 'metric',
        },
    },

    youtubeApi: {
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        params:{
            part: 'snippet',
            q: '',
        },
    }
}





export default api;
