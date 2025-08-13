import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Tracker from './components/Tracker';
import { UserProvider } from "./components/UserContext";



function App() {  
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <div className="App">
      <h1>Document Life Tracker</h1>
        <AddDocumentForm />

      <DocumentList />
    </div>
        </Routes>
      </Router>
    </UserProvider>
     
  );
}


export default App;