
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import CardProvider from "./store/shopping-cart-context.jsx"

function App() {


  return (
    <CardProvider>
      <Header/>
      
      <Shop />
    </CardProvider>
  );
}

export default App;
