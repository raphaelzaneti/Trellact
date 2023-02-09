import React from "react";
import Board from './index'
import ListsProvider from "../../hooks/useLists/useLists";
import ListPositionProvider from "../../hooks/useListPosition/useListPosition";
import ListsArea from "../ListsArea/ListsArea";
import BoardTagsProvider from "../../hooks/useBoardTags/useBoardTags";

export default function BoardRouter(props) {
  return (
    <BoardTagsProvider>
      <Board board_id={props.board_id} board_name={props.board_name}>
        <ListsProvider>
          <ListPositionProvider>
            <ListsArea board_id={props.board_id} board_name={props.board_name} />
          </ListPositionProvider>
        </ListsProvider>
      </Board>
    </BoardTagsProvider>
  )
}