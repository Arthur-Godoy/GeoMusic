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
        url: 'https://youtube-search-results.p.rapidapi.com/youtube-search/',
        params: {
            q: ''},
        headers: {
            'x-rapidapi-host': 'youtube-search-results.p.rapidapi.com',
            'x-rapidapi-key': 'ad7135c3e5msh51b4246a4f6fdf8p1f6fc1jsn3dec25d9dcea'
        }
    }
}





export default api;
