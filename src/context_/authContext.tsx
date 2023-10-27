import { createContext, useMemo, useState } from 'react';

interface AuthState {
  currentUser: UserType | null;
  setUser: (data: UserType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
}

type AuthProps = {
  children: React.ReactElement;
};

type UserType = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

type LoginType = {
  token: string;
};

export const AuthContext = createContext<AuthState>({
  currentUser: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const setUser = (data: UserType) => {
    localStorage.setItem('user', JSON.stringify(data));
    setCurrentUser(data);
  };

  const login = (data: LoginType) => {
    const { token } = data;
    localStorage.setItem('token', `Bearer ${token}`);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.replace('/login');
    }, 500);
  };

  const values = useMemo<AuthState>(
    () => ({
      currentUser,
      setUser,
      login,
      logout,
    }),
    [currentUser, setUser, login, logout]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
