
import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { MainApp } from './components/MainApp';

type View = 'signin' | 'signup';

const App: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState<View>('signin');

  if (currentUser) {
    return <MainApp user={currentUser} onLogout={logout} />;
  }

  return view === 'signin' ? (
    <SignInScreen onSignUpClick={() => setView('signup')} />
  ) : (
    <SignUpScreen onSignInClick={() => setView('signin')} />
  );
};

export default App;
