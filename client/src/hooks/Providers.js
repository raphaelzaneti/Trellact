import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import FavoriteBoardProvider from "./FavoriteBoard/useFavoriteBoard";
import UserProvider from "./User/useUser";

export const Providers = props => (
    <FavoriteBoardProvider>
        <UserProvider>
            <ActiveCardInputProvider>
                {props.children}
            </ActiveCardInputProvider>
        </UserProvider>
    </FavoriteBoardProvider>
)