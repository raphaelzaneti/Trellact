import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardRouter from '../components/Board/BoardRouter';
import Header from '../components/Header/Header';
import { useBoards } from '../hooks/useBoards/useBoards';
import { useUser } from '../hooks/User/useUser';
import Workspace from '../pages/Workspace/Workspace';

function PageRouter() {

  const {boards, setBoards, boardId, setBoardId} = useBoards()
  const {user, setUser} = useUser()

  async function getAllBoards() {
    let generatedBoards = []

    await axios.get('http://localhost:3001/boards/all', { params: { user_id: 1 } })
        .then(res => {
            res.data.map(e => generatedBoards.push(e))
        })

    await setBoards(generatedBoards)
}

useEffect(getAllBoards, [])

  // Here is a mock user, but in future, it may include the axios call to set the active user, once the login is successful
  // Probably this call will be made in the login component

  useEffect(() => setUser({
    user_id: 1,
    first_name: 'Marshall',
    last_name: 'Matters',
    login: 'eminem_123'
  }), [])

  console.log('router', boards)

  return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Workspace />} />
          {
            boards.map(e => {
                return <Route path={`/board/${e.board_id}`} element={<BoardRouter board_id={e.board_id} board_name={e.board_name} />} />
            })
          }
          <Route path={`/boards/`} element={<BoardRouter />} />
        </Routes>
      </Router>

  );
}

export default PageRouter;
