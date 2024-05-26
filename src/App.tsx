import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthConsumer } from './contexts/jwt-context';
import { SplashScreen } from './components/SplashScreen';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AuthConsumer>
        {(auth) => {
          const showSplashScreen = !auth.isInitialized;

          return showSplashScreen ? <SplashScreen /> : (
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          );
        }}
      </AuthConsumer>
    </AuthProvider>
  );
}

export default App;
