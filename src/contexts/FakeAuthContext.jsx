import { createContext, useContext, useReducer } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Initial auth state
const initialState = {
  user: null,
  isAuthenticated: false,
};

// 3. Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action type in AuthReducer");
  }
}

// 4. Fake user data
// const FAKE_USER = {
//   name: "Preet",
//   email: "Preet@2001.com",
//   password: "qwerty",
//   avatar: "/p.jpeg", // ✅ Make sure this file exists in the /public folder
// };

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

const FAKE_USER = {
  name: "Priti",
  email: "phadtarepriti0230@gmail.com",
  password: "Priti@13",
  avatar: "/p.jpeg",
};

// 5. AuthProvider component
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      alert("Invalid email or password");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Custom hook for consuming the context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

// 7. Export
export { AuthProvider, useAuth };
