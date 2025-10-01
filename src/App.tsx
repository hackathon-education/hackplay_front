import { BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Router from './router/router';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
