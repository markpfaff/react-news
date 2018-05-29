import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/styles/typography';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Search from "./Search";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class AppBarMenu extends Component {
        constructor(props) {
            super(props);

        }
    render() {
        return (
        <div className="AppBar" style={styles.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    </IconButton>
                    <Typography variant="title" color="inherit" style={styles.flex}>
                        Title
                    </Typography>
                    <FlatButton color="inherit">Login</FlatButton>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}


export default AppBarMenu;