import './App.css';
import { Board, NewListBtn, Lists, Store, StoreCard } from './components/';
import { Providers } from './hooks/Providers';
import ListPositionProvider from './hooks/useListPosition/useListPosition';

function App() {
  return (
    <Store>
      <StoreCard>
        <Providers>
          <Board>
            <ListPositionProvider>
              <NewListBtn />
            </ListPositionProvider>
          </Board>
        </Providers>
      </StoreCard>
    </Store>
  );
}

export default App;
