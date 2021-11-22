import { makeStyles } from "@material-ui/styles";
import Home from "./views/home";

const useStyles = makeStyles({
  margin:{
    margin: 0,
    padding: 0
  }
})

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Home />
    </div>
  );
}

export default App;
