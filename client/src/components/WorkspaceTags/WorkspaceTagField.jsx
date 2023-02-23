import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { useBoards } from "../../hooks/useBoards/useBoards";
import WorkspaceBoardCard from "../WorkspaceBoards/WorkspaceBoardCard";

export default props => {

    const [activeTag, setActiveTag] = useState(false)
    const allBoards = props.tag_boards.map(e => e.board_id !== null ? e : null)

    const triangle = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>

    function toggleActiveTag(){
        setActiveTag(!activeTag)
    }

    return (
        <div className="workspace__tag-area">
            <div className="workspace__content-workspaces-workspace_details">
                <h3 className="workspace__content-workspaces-workspace_details-title">
                    #{props.tag_caption}<span className={`workspace__tag-triangle ${activeTag ? 'workspace__tag-triangle-active' : ''}`} onClick={toggleActiveTag}>{triangle}</span>
                </h3>
            </div>
            {activeTag 
            ?
            <div className="workspace__content-workspaces-area">
                {allBoards[0] !== null
                            ? allBoards.map(e => <WorkspaceBoardCard boardName={e.board_name} boardLink={`/board/${e.board_id}`} />)
                            : "No boards with this tag"
                }
            </div>
            : ""
            }
        </div>

    )
}