import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";
import { JobAdResponse } from "@/data/job-ad-data";

// Check if the cookie exists
const wishlistData = getLocalStorage("wishlist_items");
let initialWishlistState: {
  wishlist: any;
} = {
  wishlist: [],
};

// If the wishlist exists, parse its value and set it as the initial state
if (wishlistData) {
  try {
    initialWishlistState = {
      wishlist: wishlistData,
    };
  } catch (error) {
    console.error("Error parsing wishlist data:", error);
  }
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {
    add_to_wishlist: (state, { payload }: { payload: JobAdResponse }) => {
      const isExist = state.wishlist.some(
        (item: JobAdResponse) => item.id === payload.id
      );
      if (!isExist) {
        state.wishlist.push(payload);
        notifySuccess(`${payload.title} added to wishlist`);
      } else {
        state.wishlist = state.wishlist.filter(
          (item: JobAdResponse) => item.id !== payload.id
        );
        notifyError(`${payload.title} removed from wishlist`);
      }
      setLocalStorage("wishlist_items", state.wishlist);
    },
    remove_wishlist_product: (
      state,
      { payload }: { payload: JobAdResponse }
    ) => {
      state.wishlist = state.wishlist.filter(
        (item: JobAdResponse) => item.id !== payload.id
      );
      notifyError(`${payload.title} removed from wishlist`);
      setLocalStorage("wishlist_items", state.wishlist);
      notifyError(`${payload.title} removed from wishlist`);
    },
  },
});

export const { add_to_wishlist, remove_wishlist_product } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
