import './styles/App.css';
import React from 'react';
import Header from './Containers/Header'
import { Provider} from 'react-redux'
import store from './store'
import HomeScreen from './Containers/HomeScreen';
 
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header/>
      <HomeScreen/>
    </div>
    </Provider>
  );
}

export default App;
