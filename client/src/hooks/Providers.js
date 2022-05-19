import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import CardCounterProvider from "./CardCounter/useCardCounter";
import CardNameProvider from './CardName/CardName'
import FavoriteBoardProvider from "./FavoriteBoard/useFavoriteBoard";
import ListCounterProvider from './ListCounter/useListCounter'
import UserProvider from "./User/useUser";

export const Providers = props => (
    <FavoriteBoardProvider>
        <ListCounterProvider>
            <CardCounterProvider>
                <CardNameProvider>
                    <UserProvider>
                        <ActiveCardInputProvider>
                            {props.children}
                        </ActiveCardInputProvider>
                    </UserProvider>
                </CardNameProvider>
            </CardCounterProvider>
        </ListCounterProvider>
    </FavoriteBoardProvider>
)