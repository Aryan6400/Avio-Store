import { Paper } from "@mui/material";
import "./SavedItem.scss";


const SavedItemWrapper = (props) => {
    const classes = "saved-item-wrapper " + props.className;
    return (
        <Paper className={classes} elevation={1}>
            {props.children}
        </Paper>
    )
}

export default SavedItemWrapper;