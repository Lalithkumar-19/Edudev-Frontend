import axios from "axios";
import store from "./Store";


export async function GetUser_details() {
    try {
      const res = await axios.get("https://edudev-server-1.onrender.com/get_user_cart_wishlist?token=" + localStorage.getItem("token"));
      if (res.status === 200) {
        store.dispatch({ type: "User_cart_wishlist", payload: res.data });
        store.dispatch({ type: "Update_cart_length", payload: Array.isArray(res.data)?res.data.length:0});
        const totalBookPrice = res.data.cart.reduce((accumulator, item) => {
          const bookPrice = parseFloat(item.product_details?.book_price); // Convert to float for numeric addition
          return accumulator + bookPrice;
        }, 0);
        console.log(totalBookPrice, "price");
        store.dispatch({ type: 'Total_price', payload: totalBookPrice });
        console.log(res.data);
      }
      else {
        console.log("error occured while reaching or fetching api ")
      }
    } catch (error) {
      console.log(error);
    }
  }




  