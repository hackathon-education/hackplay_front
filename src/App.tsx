import { BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Router from './router/router';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
