import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TableBody, TableContainer, Table, TableHead, TableRow, TableCell, Typography, Grid } from '@material-ui/core';
import Footer from '../../components/Footer';
import { textAlign } from '@material-ui/system';

const useStyles = makeStyles({
    container:{
        backgroundImage: 'url(pattern-bg.png)',
        height: 100,
        textAlign:'center',
        paddingTop: 40,
        marginBottom: 20,
    },

    empty:{
        height: 800,
    },

    emptyScreenContent:{
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
    },

    notFound:{
        paddingTop: '10%'
    },
})

const getList = () =>{
    let x = [];
    for(let i = 0; i < localStorage.length; i++){
        x[i] = eval(localStorage.getItem(i))
    }
    console.log(x)
    return(x)
}

const MusicList = () => {
    const classes = useStyles();
    const lists = getList();
        
    return (
        <div>
            {lists.length === 0 ? (
                <div className={classes.empty}>
                    <div className={classes.emptyScreenContent}>
                        <img src='flat.png' width='400px' />
                        <Typography variant='h5'>Não achamos Nada que faz sentido aqui !</Typography>
                        <Typography variant='h5'>Tente Salvar uma lista antes</Typography>
                    </div>
                </div>
            ):(
                <>
                    <div className={classes.container}>
                        <img className={classes.image} src="logo.png" alt="Geo Music" />
                    </div>
                    <TableContainer className={classes.list}>
                        <Table size="small" aria-label="a dense table">
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
                            {lists.map((objects) => (
                                objects.map((videos) =>{
                                    return(
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">{videos.cityName}</TableCell>
                                                <TableCell align="right">{videos.cityTemp}</TableCell>
                                                <TableCell align="right">
                                                    {<iframe width="150" height="100" src={"https://www.youtube.com/embed/"+videos.videoId} title="YouTube video player" frameborder="0" ></iframe>}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) 
                                })
                            ))}
                        </Table>
                    </TableContainer> 
                </>
            )}
            <Footer />
        </div>
    )
}

export default MusicList;
