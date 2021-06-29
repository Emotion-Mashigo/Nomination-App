import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
       
      </div>
      <div className="navbar__right">
  
          <div className="tooltip"><img width="30" src={avatar} alt="avatar"  onClick={() => openForm()} />
          
          <span className="tooltiptext"><b>Admin Only</b></span>
          </div>

        <div className="form-popup" id="myForm">
        <form className="form-container">
          <div className="imgcontainer">
            <img src={avatar} alt="Avatar" className="avatar"/>
            <center><h1>Admin</h1></center>
          </div>

          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" required/>

          <label ><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required/>
          
          <a href="./admin"><button type="submit" className="btn">Login</button></a>
          <button type="button" className="btn cancel" onClick={() => closeForm()}>Close</button>
        </form>
      </div>
            
      </div>
    </nav>
  );
};

export default Navbar;
