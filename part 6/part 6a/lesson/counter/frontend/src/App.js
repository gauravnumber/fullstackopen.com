// import logo from './logo.svg';
// import './App.css';
import { createStore } from 'redux'

function App() {
  const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'ZERO':
        return 0
      default: // if none of the above matches, code comes here
      return state
    }
  }

  const store = createStore(counterReducer)
  store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })
  
  // console.log(store.getState())
  store.dispatch({type: 'INCREMENT'})
  store.dispatch({type: 'INCREMENT'})
  store.dispatch({type: 'INCREMENT'})
  // console.log(store.getState())
  store.dispatch({type: 'ZERO'})
  store.dispatch({type: 'DECREMENT'})
  // console.log(store.getState())
  
  return (
    <div>
      <h1>counter</h1>
    </div>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
