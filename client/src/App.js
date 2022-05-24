import './App.css';
import { Board, NewListBtn, Lists, Store, StoreCard } from './components/';
import ListsArea from './components/ListsArea/ListsArea';
import { Providers } from './hooks/Providers';
import ListPositionProvider from './hooks/useListPosition/useListPosition';
import ListsProvider from './hooks/useLists/useLists';

function App() {
  return (
    <Store>
      <StoreCard>
        <Providers>
          <Board>
            <ListsProvider>
              <ListPositionProvider>
                <ListsArea />
              </ListPositionProvider>
            </ListsProvider>
          </Board>
        </Providers>
      </StoreCard>
    </Store>
  );
}

export default App;