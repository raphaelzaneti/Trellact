import './App.css';
import {Board, NewListBtn, Lists, Store, StoreCard} from './components/';

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
