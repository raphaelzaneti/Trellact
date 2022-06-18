import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { Board, NewListBtn, Lists, Store, StoreCard } from './components/';
import BoardRouter from './components/Board/BoardRouter';
import ListsArea from './components/ListsArea/ListsArea';
import { Providers } from './hooks/Providers';
import { useBoards } from './hooks/useBoards/useBoards';
import ListPositionProvider from './hooks/useListPosition/useListPosition';
import ListsProvider from './hooks/useLists/useLists';
import Workspace from './pages/Workspace/Workspace';
import PageRouter from './router/PageRouter';

function App() {

  return (
    <Providers>
      <PageRouter />
    </Providers>

  );
}

export default App;
