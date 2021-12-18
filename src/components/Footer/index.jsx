import {Grid, MenuItem, MenuList, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const useStyles = makeStyles({
    footer:{
        height: 150,
        backgroundColor: '#304274',
        width: '100%',
        color: 'white',
    },

    link:{
        textDecoration: 'none',
        color: 'white',
        fontSize: 15,
    },

    image:{
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        paddingLeft: 50,
    },

    menuLinks:{
        position: 'relative',
        top: '20%',
        transform: 'translateY(-20%)',
    },

    subtitles:{
        color: '#d7e3cf',
        paddingTop: 20,
        fontSize: 20,
    },

    logos:{
        paddingLeft: 10,
        width: 40,
    },
})

const Footer = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container className={classes.footer}>
                <Grid item md={7}>
                    <img className={classes.image} src="logo.png" alt="Geo Music" />
                </Grid>
                <Grid item md={3}>
                    <Typography className={classes.subtitles}>Links Úteis</Typography>
                    <MenuList className={classes.menuLinks}>
                        <Link to='/' className={classes.link}><MenuItem>Home</MenuItem></Link>
                        <Link to='/list' className={classes.link}><MenuItem>Minhas Listas</MenuItem></Link>
                    </MenuList>
                </Grid>
                <Grid item md={2}>
                    <Typography className={classes.subtitles}>Redes Sociais</Typography>
                    <MenuList className={classes.menuLinks}>
                        <a 
                            href='https://github.com/Arthur-Godoy' 
                            target='blank' 
                            className={classes.link}
                        >
                            <img src='github_logo.svg' alt="githublog" className={classes.logos} />
                        </a>
                        <a 
                            href='https://www.linkedin.com/in/arthur-godoy-gomides-94aaa7212/' 
                            target='blank' 
                            className={classes.link}
                        >
                            <img src='linkedin_log.svg' alt='linkedin logo' className={classes.logos}/>
                        </a>
                    </MenuList>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;
