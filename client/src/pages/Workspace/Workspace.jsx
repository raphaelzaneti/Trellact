import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import { useBoards } from "../../hooks/useBoards/useBoards";
import WorkspaceNavbar from "../../components/WorkspaceNavBar/WorkspaceNavbar";
import WorkspaceBoards from "../../components/WorkspaceBoards/WorkspaceBoards";

export default function Workspace(props) {

    return (
        <main className="workspace__container">
            <WorkspaceNavbar />
            <WorkspaceBoards />
        </main>
    )
}