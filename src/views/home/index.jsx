import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { width } from '@material-ui/system';
import React from 'react'

const useStyles = makeStyles({
    background:{
        backgroundImage: 'url(pattern-bg.png)',
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 90,
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
        backgroundColor: 'white',
        width: 400,
        borderRadius: '15px 0px 0px 15px',
    },

    infosContainer:{
        backgroundColor:'white',
        width: 900,
        height: 120,
        position: 'absolute',
        borderRadius: '15px',
        top: 190,
        color: 'black',
        left: '50%',
        marginLeft: -450,
    }

})

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.background}>
                <img className={classes.image} src="logo.png" alt="Geo Music" />
                <TextField className={classes.textField} label="Digite seu endereço" variant="filled" />
                <Button 
                    variant='contained' 
                    style={{
                        backgroundColor: 'black',
                        height: 56,
                        borderRadius: '0px 15px 15px 0px'
                    }}
                >
                        <img src="icon-arrow.svg" alt="pesquisar"/> 
                </Button>
                <div className={classes.infosContainer}>
                    <Grid container className={classes.infos}>
                        <Grid item xs={3}>HELLO</Grid>
                        <Grid item xs={3}>HELLO</Grid>
                        <Grid item xs={3}>HELLO</Grid>
                        <Grid item xs={3}>HELLO</Grid>
                    </Grid>
                </div>
                
            </div>
        </div>
        
    )
}

export default Home;
