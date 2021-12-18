import { Button, TextField, Grid, Typography, CircularProgress, TableContainer, TableBody, TableCell, TableRow, Table, TableHead} from '@material-ui/core';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/styles';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import api from '../../tools/api';
import Footer from '../../components/Footer';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const useStyles = makeStyles({
    background:{
        backgroundImage: 'url(pattern-bg.png)',
    },

    loadingContainer:{
        position: 'absolute',
        textAlign: 'center',
        height: '100%',
        width:'100%'
    },

    loadingCircle:{
        position:'relative',
        top:'45%',
        transform: 'translateY(-50%)'
    },

    topContentContainer:{
        textAlign:'center',
        paddingTop: 30,
        height: 130,
        color: 'white',
    },

    image:{
        display:'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40
    },

    textField:{
        paddingLeft: 0,
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
        height: 625,
        zIndex: 1,
        top: 90,
        "@media (max-width: 1380px)":{
            height: 425,
        },
        "@media (max-width: 900px)":{
            height: 825,
        }
    },

    bottomContentContainer:{
        width: '100%',
        background: 'white',
        color: 'black',
        position:'absolute',
        zIndex:3,
        padding: 0,
        margin: 0,
        top: 886,
        '@media(max-width: 1380px)':{
            top: 680,
        },
        "@media (max-width: 900px)":{
            top: 1080,
        },
    },

    tableContainer:{
        marginBottom: 20,
    },

    list:{
        paddingBottom: 20,
    },

    saveButton:{
        position:'relative',
        left: window.screen.width - 120,
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
    const [musicList, setMusicList] = useState(['']);

    const getTemp = () =>{
        setLoading(true)
        api.weatherApi.params.q = cityName;
        axios.request(api.weatherApi).then(function (response) {
            setInfoBoardCityName(response.data['name'] + ', ' + response.data['sys']['country'])
            setLon(response.data['coord']['lon'])
            setlat(response.data['coord']['lat']) 
            cityTemp === response.data['main']['temp'] ? (setLoading(false)):(setCityTemp(response.data['main']['temp']))
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro na Pesquisa',
                text: 'Verifique o nome da cidade digitada',
                showConfirmButton: false,
            })
            setLoading(false)
        });
    }

    useEffect(() => {
        if(cityTemp !== '--'){
            if(cityTemp > 32){
                musicType === 'eletrônica' ? (setTimeout(setLoading(false),2000)):(setMusicType('eletrônica'))
            }else if(cityTemp > 24){
                musicType === 'pagode' ? (setTimeout(setLoading(false),2000)):(setMusicType('pagode'))
            }else if(cityTemp > 16){
                musicType === 'bossa nova' ? (setTimeout(setLoading(false),2000)):(setMusicType('bossa nova'))
            }else{
                musicType === 'Lofi' ? (setTimeout(setLoading(false),2000)):(setMusicType('Lofi'))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityTemp])

    useEffect(() => {       
        if(musicType !== '--'){
            api.youtubeApi.params.q = musicType
            axios.request(api.youtubeApi).then(function (response) {
                setMusicList(response.data['items'])
                setTimeout(setLoading(false),2000)
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao gerar lista do Youtube',
                    text: 'Estamos trabalhando para concerta-lo o mais rápido possivel',
                    showConfirmButton: false,
                })
                setLoading(false)
            }) 
        }
    },[musicType])

    const saveMusicList = () =>{
        try{
            let videosArray = []
            let i = 0
            // eslint-disable-next-line array-callback-return
            musicList.map((videos) => {
                let videoObject ={
                    cityName: cityName,
                    cityTemp: cityTemp,
                    videoId: videos['id']
                }
                videosArray[i] = videoObject
                i++;
            })
            localStorage.setItem(localStorage.length, JSON.stringify(videosArray))
            Swal.fire({
                icon: 'success',
                title: 'lista salva',
                showConfirmButton: false,
            })
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar a lista',
                text: 'Estamos trabalhando para concerta-lo o mais rápido possivel',
                showConfirmButton: false,
            })
        }
        
    };

    return (
        <div>
            {loading === true ? (
                <div className={classes.loadingContainer}>
                    <CircularProgress className={classes.loadingCircle}></CircularProgress>
                </div>
            ):(
                <div className={classes.background}>
                    <div className={classes.topContentContainer}>
                        <img className={classes.image} src="logo.png" alt="Geo Music" />
                        <TextField
                            className={classes.textField} 
                            label="Digite o nome da cidade" 
                            variant="filled" 
                            onChange={(e) =>{setCityName(e.target.value)}}
                            onKeyDown={(e) => {if(e.key === 'Enter'){getTemp()}}}
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
                    </div>
                    <div id='map'>
                        <MapContainer key={lat} center={lat === '--' || lon === '--' ? ([-20.4164,-42.9086]):([lat, lon])} zoom={13} scrollWheelZoom={true} className={classes.map}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={lat === '--' ? ([-20.4164, -42.9086]):([lat, lon])}/>
                        </MapContainer>
                    </div>
                    <div className={classes.bottomContentContainer}>
                        {cityTemp !== '--' && 
                            <div className={classes.tableContainer}>
                                <TableContainer className={classes.list}>
                                    <Table sx={{minWidth: (window.screen.width-500) }} size="medium" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant='h6'>City Name</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant='h6'>Temp</Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant='h6'>Musics</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    {musicList.map((videos) => (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">{cityName}</TableCell>
                                                <TableCell align="right">{cityTemp}</TableCell>
                                                <TableCell align="right">
                                                    {<iframe width="150" height="100" src={"https://www.youtube.com/embed/" + videos['id']} title="YouTube video player" frameborder="0" ></iframe>}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody> 
                                    ))}
                                    </Table>
                                </TableContainer>
                                <Button variant='contained' className={classes.saveButton} onClick={() =>{saveMusicList()}}>Salvar</Button>
                            </div>    
                        }
                        <Footer />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;
