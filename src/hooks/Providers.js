import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import CardCounterProvider from "./CardCounter/useCardCounter";
import CardNameProvider from './CardName/CardName'
import FavoriteBoardProvider from "./FavoriteBoard/useFavoriteBoard";
import ListCounterProvider from './ListCounter/useListCounter'

export const Providers = props => (
    <FavoriteBoardProvider>
        <ListCounterProvider>
            <CardCounterProvider>
            <CardNameProvider>
                <ActiveCardInputProvider>
                    {props.children}
                </ActiveCardInputProvider>
                </CardNameProvider>
            </CardCounterProvider>
        </ListCounterProvider>
    </FavoriteBoardProvider>
)