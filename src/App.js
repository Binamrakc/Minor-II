import Contact from './Contact.js';
import Dashboard from './Dashboard.js';
import logo from './logo.svg';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import { Routes, Route } from "react-router-dom";
import Users from './Users.js';
import CreateEvent from './CreateEvent.js';
import AdminReview from './AdminReview.js';
import AppSettings from './AppSetting.js';
import AuthPage from './AuthPage.js';
import RegisterPage from './Register.js';
import ViewProfile from './ViewProfile.js'
import ChangePassword from './Password.js';
import Chatbox from './Chatbox.js';
import AIChatbox from './Chatbox.js';

function App() {
  return (

    <div>
      <Navbar />

      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>

          <div className="col-10 p-6">
            <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/CreateEvent" element={<CreateEvent/>}/>
            <Route path="/AdminReview" element={<AdminReview/>}/>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/setting" element={<AppSettings/>}/>
            <Route path="/profile" element={<ViewProfile/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/email" element={<ChangePassword/>}/>
         
            </Routes>
            <AIChatbox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
