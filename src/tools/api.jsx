const weatherApi = {
    method: 'GET',
    url:'http://api.openweathermap.org/data/2.5/weather',
    params:{
        appid: '150d940d7c12e9b22ecd56efe1891ff9',
        q: '',
        units: 'metric',
    },
}

export default weatherApi;
