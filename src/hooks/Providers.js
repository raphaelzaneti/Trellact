import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import CardNameProvider from './CardName/CardName'
import FavoriteBoardProvider from "./FavoriteBoard/useFavoriteBoard";

export const Providers = props => (
    <FavoriteBoardProvider>
        <ActiveCardInputProvider>
            {props.children}
        </ActiveCardInputProvider>
    </FavoriteBoardProvider>
)