import axios from "axios";
import { GetUser_details } from "./Freq_funcs";
// Define initial state
const initialState = {
    cart: [],
    wishList: [],
    orders: [],
    My_learnings:[],
    cartsum: 0,
    userpresence: false,
};


const updateCart = async (cart, id) => {
    try {
        const isInCart = () => {
            return cart.some(item => item.product_details._id === id);
        };
        if (isInCart() === false) {
            const res = await axios.put("https://edudev-server-1.onrender.com/addtocart?token=" + localStorage.getItem("token"), { id: id, quantity: 0 });
            if (res.status === 200) {
                console.log("Add to cart data", res.data);
                GetUser_details();
                return true;
            } else {
                console.log("Internal server is error, try again");
                return false;
            }
        } else {
            console.log("No change in cart due to the same item being added again");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const addToWishList = async (list, id) => {
    try {
        const isInlist = () => {
            return list.some(item => item._id === id);
        };
        if (isInlist() === false) {
            const res = await axios.put("https://edudev-server-1.onrender.com/addtowishlist?token=" + localStorage.getItem("token"), { id: id, quantity: 0 });
            if (res.status === 200) {
                console.log("Add to wishlist ", res.data);
                GetUser_details();
            } else {
                console.log("Internal server is error, try again");
            }
        } else {
            console.log("No change in cart due to the same item being added again");
        }
    } catch (error) {
        console.log(error);
    }
};
//removeform cart
const Remove_From_Cart = async (cart, id) => {
    console.log("id is form cart", id);
    try {

        const isInCart = () => {
            return cart.some(item => item._id === id);
        };
        if (isInCart() === true) {
            const res = await axios.put("https://edudev-server-1.onrender.com/Remove_cart_item?token=" + localStorage.getItem("token"), { id: id, quantity: 0 });
            if (res.status === 200) {
                GetUser_details();
            } else {
                console.log("Internal server is error, try again");
            }
        } else {
            console.log("No change in cart due to no item there");
        }
    } catch (error) {
        console.log(error);
    }


}
// Reducer function


const Remove_From_WishList = async (list, id) => {
    try {
        console.log("id is", id);
        const isInlist = () => {
            return list.some(item => item._id === id);
        };
        if (isInlist() === true) {
            const res = await axios.put("https://edudev-server-1.onrender.com/Remove_widhlist_item?token=" + localStorage.getItem("token"), { id: id });
            if (res.status === 200) {
                console.log("deleted from list ");
                GetUser_details();
            } else {
                console.log("Internal server is error, try again");
            }
        } else {
            console.log("No change in list");
        }
    } catch (error) {
        console.log(error);
    }
};




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "User_cart_wishlist":
            return { ...state, cart: action.payload.cart, wishList: action.payload.Wishlist, orders: action.payload.orders,My_learnings:action.payload.learnings};
        case 'ADD_TO_CART':
            updateCart(state.cart, action.payload.id);
            return state;
            break;
        case 'remove_from_cart':
            Remove_From_Cart(state.cart, action.payload);
            return state;
            break;
        case 'add_to_wishlist':
            addToWishList(state.wishList, action.payload);
            return state;
            break;
        case 'remove_from_wishlist':
            Remove_From_WishList(state.wishList, action.payload);
            return state;
            break;
        case 'Userpresence':
            return { ...state, userpresence: true };
        case "Total_price":
            return { ...state, cartsum: action.payload };
        case "Update_cart_length":
            return { ...state, cart_length: action.payload };
        default:
            return state;
    }
};

export default reducer;
