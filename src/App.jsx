import './App.css'
import Team from './Components/team'
import Home from './Components/home'
import About from './Components/about'
import Footer from './Components/footer'
import Pricing from './Components/pricing'
import Contact from './Components/contact'
import PageNotFound from './Components/404'
import LoadingScreen from './Components/loading'
import Login, { Signup } from './Components/auth'
import React, { useEffect, useState } from 'react'
import AssistantPage from './Components/assistantPage'
import Header, { AuthHeader } from './Components/header'
import { RecorderScreen } from './Components/audioRecorder'
import { BrowserRouter as Router, Switch, useLocation, Route } from 'react-router-dom/cjs/react-router-dom.min'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

export const AuthStatus = {
  NOT_DETERMINED: 0,
  NOT_LOGGED_IN: 1,
  LOGGED_IN: 2
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_DETERMINED);
  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoading(true);
      const storedAuthStatus = sessionStorage.getItem('authStatus');
      if (storedAuthStatus) { setAuthStatus(parseInt(storedAuthStatus, 10)); }
      else { setAuthStatus(AuthStatus.NOT_LOGGED_IN); }
      setIsLoading(false);
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    return () => { window.removeEventListener('storage', checkAuthStatus); };
  }, []);
  if (isLoading) { return <LoadingScreen />; }
  return (<Router><AppContent authStatus={authStatus} setAuthStatus={setAuthStatus} setIsLoading={setIsLoading} /></Router>);
}

function AppContent({ authStatus, setAuthStatus }) {
  const location = useLocation();
  const noAuthCheckRoutes = ['/', '/about', '/pricing', '/team', '/contact'];
  const shouldCheckAuth = !noAuthCheckRoutes.includes(location.pathname);
  const hideHeaderPaths = ['/home', '/login', '/login-admin', '/signup', '/404', '/new-session'];

  const getHeader = () => {
    if (location.pathname === '/home' || location.pathname === '/new-session') { return null; }
    if (['/login', '/signup'].includes(location.pathname)) { return <AuthHeader />; }
    return <Header />;
  };
  const showFooter = () => {
    return !hideHeaderPaths.includes(location.pathname) && location.pathname !== '/login' && location.pathname !== '/home';
  };
  useEffect(() => {
    if (!shouldCheckAuth) { return; }
    const simulateAuthCheck = () => { setTimeout(() => { setAuthStatus(AuthStatus.NOT_LOGGED_IN); }, 1000); };
    simulateAuthCheck();
  }, [shouldCheckAuth]);
  if (shouldCheckAuth && authStatus === AuthStatus.NOT_DETERMINED) { return <LoadingScreen />; }
  return (
    <>
      <ScrollToTop />
      {getHeader()}
      <Switch>
        <Route exact path="/" render={() => { return (<Home />) }}></Route>
        <Route exact path="/team" render={() => { return (<Team />) }}></Route>
        <Route exact path="/about" render={() => { return (<About />) }}></Route>
        <Route exact path="/pricing" render={() => { return (<Pricing />) }}></Route>
        <Route exact path="/contact" render={() => { return (<Contact />) }}></Route>
        <Route exact path="/new-session" render={() => { return (<RecorderScreen />) }}></Route>
        <Route exact path="/login" render={() => { return (<Login setAuthStatus={setAuthStatus} />) }}></Route>
        <Route exact path="/signup" render={() => { return (<Signup setAuthStatus={setAuthStatus} />) }}></Route>
        <Route exact path="/home" render={() => { return authStatus === AuthStatus.LOGGED_IN ? <AssistantPage /> : <PageNotFound /> }}></Route>
        <Route component={PageNotFound} />
      </Switch>
      {showFooter() && <Footer />}
    </ >
  );
}

export default App;