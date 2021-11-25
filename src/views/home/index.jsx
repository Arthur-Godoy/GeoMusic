import { Button, TextField, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import weatherApi from '../../tools/api';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

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
        borderRadius: '15 0 0 15',
        backgroundColor: 'white',
        width: 400,
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
    },

    listContainer:{
        background: 'white',
        clear: 'both',
        color: 'black',
        position:'absolute',
        zIndex:3,
        top: 846,
    },

})

const Home = () => {
    const classes = useStyles();
    const [cityName, setCityName] = useState('--');
    const [lat, setlat] = useState('--');
    const [lon, setLon] = useState ('--');
    const [cityTemp, setCityTemp] = useState('--');
    const [musicType, setMusicType] = useState('--');

    useEffect(() => {
        weatherApi.params.q = cityName;
    }, [cityName])
      
    

    const getTemp = () =>{
        axios.request(weatherApi).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div>
            <div className={classes.background}>
                <img className={classes.image} src="logo.png" alt="Geo Music" />
                <TextField 
                    className={classes.textField} 
                    label="Digite o nome da cidade" 
                    variant="filled" 
                    onChange={(e) =>{setCityName(e.target.value)}}
                />
                <Button 
                    variant='contained' 
                    style={{
                        backgroundColor: 'black',
                        height: 56,
                        borderRadius: '0px 15px 15px 0px'
                    }}
                    onClick={ () => {getTemp()}}
                >
                        <img src="icon-arrow.svg" alt="pesquisar"/> 
                </Button>
                <div className={classes.infosContainer}>
                    <Grid container className={classes.infos}>
                        <Grid item md={3} xs={12} className={classes.infoGrid}>
                            <Typography variant='p' className={classes.subtitle}>City Name</Typography>
                            <Typography variant='h5' className={classes.infoContent}>{cityName}</Typography>
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
                    <MapContainer center={lat === '--' ? (['-20.4164','-42.9086']):([lat,lon])} zoom={lat === '--' ? (3):(13)} scrollWheelZoom={false} className={classes.map}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={lat === '--' ? (['-20.4164','-42.9086']):([lat,lon])} />
                    </MapContainer>
                </div>
                <div className={classes.listContainer}>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Home;
