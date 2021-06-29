import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Vote from "./components/pages/Vote";
import Nominate from "./components/pages/Nominate";
import Dashboard from "./components/pages/Dashboard";
import Admin from "./components/pages/Admin";
import Employees from "./components/pages/Employees";
import VotesTable from "./components/pages/VotesTable";
import NomineesTable from "./components/pages/NomineesTable";
import CommentsTable from "./components/pages/CommentsTable";
import CountDown from "./components/pages/CountDown";






const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
      <Router>
          <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
         
          
          <Switch>
  
            <Route path='/' component= {Dashboard} exact />
            <Route path='/dashboard' component= {Dashboard} />
            <Route path='/vote' component= {Vote} />
            <Route path='/nominate' component= {Nominate} />
            <Route path='/admin' component= {Admin} />
            <Route path='/employeestable' component= {Employees} />
            <Route path='/votestables' component= {VotesTable} />
            <Route path='/nomineestables' component= {NomineesTable} />
            <Route path='/commentstables' component= {CommentsTable} />
            <Route path='/countdown' component= {CountDown} />
       
           

 
          </Switch>
      </Router>
    </div>
  );
};

export default App;
