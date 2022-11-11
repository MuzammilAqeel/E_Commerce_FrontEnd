import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import LandingNavbar from './components/LandingNavbar/LandingNavbar';
import MainRoutes from './pages/Routes/Routes';
import { store, persistor } from "./redux/store";

function App() {

  console.log = () => {};
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <MainRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
