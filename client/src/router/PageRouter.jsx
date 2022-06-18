import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardRouter from '../components/Board/BoardRouter';
import { useBoards } from '../hooks/useBoards/useBoards';
import Workspace from '../pages/Workspace/Workspace';

function PageRouter() {

  const {boards, setBoards, boardId, setBoardId} = useBoards()

  return (
      <Router>
        <Routes>
          {
            boards.map(e => {
                console.log(`/board/${e.board_id}`  )
                return <Route path={`/board/${e.board_id}`} element={<BoardRouter board_id={e.board_id} board_name={e.board_name} />} />
            })
          }
          <Route path="/" element={<Workspace />} />
          <Route path={`/boards/`} element={<BoardRouter />} />
        </Routes>
      </Router>

  );
}

export default PageRouter;
