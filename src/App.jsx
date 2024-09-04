import './App.css';
import { useEffect } from 'react';
import Home from './Components/home';
import Footer from './Components/footer';
import Header from './Components/header';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route exact path="/" render={() => { return (<Home />) }}></Route>
      </Switch>
      <Footer />
    </Router >
  );
}

export default App;
