import './App.css';
import Lists from './components/Lists/Lists';
import Board from './components/Board/Board';
import NewListBtn from './components/Buttons/NewListBtn';
import Store from './components/Lists/Store'
import StoreCard from './components/Card/StoreCard';

function App() {
  return (
    <Store>
      <StoreCard>
        <Board>
          <NewListBtn />
        </Board>
      </StoreCard>
    </Store>
  );
}

export default App;
