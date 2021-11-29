import { Button, TextField, Grid, Typography, CircularProgress } from '@material-ui/core';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import api from '../../tools/api';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useStyles = makeStyles({
    background:{
        backgroundImage: 'url(pattern-bg.png)',
        textAlign: 'center',
        paddingTop: 30,
        height: 218,
        color: 'white',
    },

    image:{
        display:'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40
    },

    paper:{
        width: 150,
    },

    textField:{
        padding: 0,
        height: 55,
        borderRadius: '15px 0px 0px 15px',
        backgroundColor: 'white',
        width: 400,
        "@media (max-width: 600px)":{
            width: 200,
        }
    },

    infosContainer:{
        backgroundColor:'white',
        width: 900,
        height: 120,
        position: 'absolute',
        zIndex: 2,
        borderRadius: '15px',
        top: 190,
        color: 'black',
        left: '50%',
        marginLeft: -450,
        "@media (max-width: 900px)":{
            width: 300,
            left: '50%',
            height: 320,
            marginLeft: -150,
            paddingTop: 20,
        }
    },

    infoGrid:{
        paddingBottom: 20,
        "@media (min-width: 900px)":{
            paddingTop: 30,
        }
    },

    subtitle:{
        display: 'block',
        fontSize: 13,
        color:'#474747',
        paddingBottom: 5,
    },

    map:{
        height: 600,
        zIndex: 1,
        top: 90,
        "@media (max-width: 1380px)":{
            height: 400,
        },
        "@media (max-width: 900px)":{
            height: 800,
        }
    },

    listContainer:{
        background: 'white',
        clear: 'both',
        color: 'black',
        position:'absolute',
        zIndex:3,
        top: 886,
        '@media(max-width: 1380px)':{
            top: 680,
        },
        "@media (max-width: 900px)":{
            top: 1080,
        },
    },
});

const Home = () => {
    const classes = useStyles();
    const [cityName, setCityName] = useState('--');
    const [infoBoardCityName, setInfoBoardCityName] = useState('--');
    const [lat, setlat] = useState('--');
    const [lon, setLon] = useState ('--');
    const [cityTemp, setCityTemp] = useState('--');
    const [musicType, setMusicType] = useState('--');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.weatherApi.params.q = cityName;
    }, [cityName])

    const getTemp = () =>{
        setLoading(true)
        axios.request(api.weatherApi).then(function (response) {
            console.log(response.data)
            setInfoBoardCityName(response.data['name'] + ', ' + response.data['sys']['country'])
            setLon(response.data['coord']['lon'])
            setlat(response.data['coord']['lat']) 
            cityTemp === response.data['main']['temp'] ? (setLoading(false)):(setCityTemp(response.data['main']['temp']))
        }).catch(function (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Erro na Pesquisa',
                text: 'Verifique o nome da cidade digitada',
                showConfirmButton: false,
            })
        });
    }

    useEffect(() => {
        if(cityTemp !== '--'){
            if(cityTemp > 32){
                setMusicType('funk')
            }else if(cityTemp > 24){
                setMusicType('pagode')
            }else if(cityTemp > 16){
                setMusicType('bossa nova')
            }else{
                setMusicType('lofi')
            }
        }
        setLoading(false)
    }, [cityTemp])

    return (
        <div>
            <div className={classes.background}>
                <img className={classes.image} src="logo.png" alt="Geo Music" />
                <TextField
                    className={classes.textField} 
                    label="Digite o nome da cidade" 
                    variant="filled" 
                    onChange={(e) =>{setCityName(e.target.value)}}
                    onKeyDown={(e) => {e.key === 'Enter' ? (getTemp()):(console.log('.'))} }
                />
                <Button 
                    variant='contained' 
                    style={{
                        backgroundColor: 'black',
                        height: 56,
                        borderRadius: '0px 15px 15px 0px'
                    }}
                    disabled={loading}
                    onClick={ () => {getTemp()}}
                >
                        {loading === true ? (<CircularProgress />):(<img src="icon-arrow.svg" alt="pesquisar"/> )}
                </Button>
                <div className={classes.infosContainer}>
                    <Grid container className={classes.infos}>
                        <Grid item md={3} xs={12} className={classes.infoGrid}>
                            <Typography variant='p' className={classes.subtitle}>City Name</Typography>
                            <Typography variant='h5' className={classes.infoContent}>{infoBoardCityName}</Typography>
                        </Grid>

                        <Grid item md={3} xs={12} className={classes.infoGrid}>
                            <Typography variant='p' className={classes.subtitle}>Coords</Typography>
                            <Typography variant='h5' className={classes.infoContent}>{lat + ', ' + lon}</Typography>
                        </Grid>

                        <Grid item md={3} xs={12} className={classes.infoGrid}>
                            <Typography variant='p' className={classes.subtitle}>Temp</Typography>
                            <Typography variant='h5' className={classes.infoContent}>{cityTemp}</Typography>
                        </Grid>

                        <Grid item md={3} xs={12} className={classes.infoGrid}>
                            <Typography variant='p' className={classes.subtitle}>Music Type</Typography>
                            <Typography variant='h5' className={classes.infoContent}>{musicType}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.map} id='map'>
                    <MapContainer key={lat} center={lat === '--' || lon === '--' ? ([-20.4164,-42.9086]):([lat, lon])} zoom={13} scrollWheelZoom={true} className={classes.map}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={lat === '--' ? ([-20.4164, -42.9086]):([lat, lon])} />
                    </MapContainer>
                </div>
                <div className={classes.listContainer}>
                </div>
            </div>
        </div>
        
    )
}

export default Home;
