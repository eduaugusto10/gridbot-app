import './App.css';
import Router from "./router";
import { AuthProvider } from "../src/context/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
