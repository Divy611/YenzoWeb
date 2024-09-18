import './App.css';
import { useEffect } from 'react';
import Team from './Components/team';
import Home from './Components/home';
import About from './Components/about';
import Footer from './Components/footer';
import Pricing from './Components/pricing';
import Contact from './Components/contact';
import Login, { Signup } from './Components/auth';
import AssistantPage from './Components/assistantPage';
import Header, { AltHeader, AuthHeader } from './Components/header';
import { BrowserRouter as Router, Switch, useLocation, Route } from 'react-router-dom/cjs/react-router-dom.min';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

function App() {
  return (<Router><AppContent /></Router>);
}

function AppContent() {
  const location = useLocation();
  //const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_DETERMINED);
  const hideHeaderPaths = ['/chat', '/login', '/login-admin', '/signup', '/404'];

  const shouldShowAuthHeader = () => {
    if (location.pathname === '/login' || location.pathname === '/signup') { return <AuthHeader />; }
    if (location.pathname === '/chat') { return false; }
    return hideHeaderPaths.includes(location.pathname);
  };
  return (
    <Router>
      <ScrollToTop />
      {shouldShowAuthHeader() ? (shouldShowAuthHeader()) : location.pathname === '/chat' ? (<AltHeader />) : (<Header />)}
      <Switch>
        <Route exact path="/" render={() => { return (<Home />) }}></Route>
        <Route exact path="/team" render={() => { return (<Team />) }}></Route>
        <Route exact path="/login" render={() => { return (<Login />) }}></Route>
        <Route exact path="/about" render={() => { return (<About />) }}></Route>
        <Route exact path="/signup" render={() => { return (<Signup />) }}></Route>
        <Route exact path="/contact" render={() => { return (<Contact />) }}></Route>
        <Route exact path="/pricing" render={() => { return (<Pricing />) }}></Route>
        <Route exact path="/chat" render={() => { return (<AssistantPage />) }}></Route>
      </Switch>
      {shouldShowAuthHeader() ? <></> : location.pathname === '/chat' || location.pathname === '/login' ? <></> : <Footer />}
    </Router >
  );
}

export default App;
