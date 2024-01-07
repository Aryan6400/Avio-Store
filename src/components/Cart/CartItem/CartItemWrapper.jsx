import { Paper } from "@mui/material";
import "./CartItem.scss";


const CartItemWrapper = (props) => {
    const classes = "cart-item-wrapper " + props.className;
    return (
        <Paper className={classes} elevation={1}>
            {props.children}
        </Paper>
    )
}

export default CartItemWrapper;