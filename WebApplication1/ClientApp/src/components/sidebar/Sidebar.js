import "./Sidebar.css";


const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
       { /*   <img src={logo} alt="logo" />   */   } <i className='fa fa-check-square-o fa-2x text-green'></i>
       <h1>Nomination App.</h1> 
     
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

    <div className="sidebar__menu">
    <a href="./dashboard">  <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <b>Dashboard</b>
        </div></a>
       
        <a href="./nominate"><div className="sidebar__link active_menu_link">
          <i className="fa fa-user" aria-hidden="true"></i>
            <b>Nominate</b>
        </div></a>


        <a href="./vote"><div className="sidebar__link active_menu_link">
          <i className="fa fa-calendar"></i>
         <b>Vote</b>
        </div></a>
        

    
      </div>
    </div>
  );
};

export default Sidebar;
