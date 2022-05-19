import './App.css';
import {Board, NewListBtn, Lists, Store, StoreCard} from './components/';
import { Providers } from './hooks/Providers';

function App() {
  return (
    <Store>
      <StoreCard>
        <Providers>
          <Board>
            <NewListBtn />
          </Board>
        </Providers>
      </StoreCard>
    </Store>
  );
}

export default App;
