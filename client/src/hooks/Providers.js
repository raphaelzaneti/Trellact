import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import FavoriteBoardProvider from "./FavoriteBoard/useFavoriteBoard";
import BoardsProvider from "./useBoards/useBoards";
import UserProvider from "./User/useUser";

export const Providers = props => (
    <BoardsProvider>
        <FavoriteBoardProvider>
            <UserProvider>
                <ActiveCardInputProvider>
                    {props.children}
                </ActiveCardInputProvider>
            </UserProvider>
        </FavoriteBoardProvider>
    </BoardsProvider>
)