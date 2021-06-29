import React from 'react';
import "./Employees.css";


export class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emps: []}
  }
  
  componentDidMount(){
    this.loadDashboard();
}

loadDashboard(){
    fetch('https://localhost:44374/api/Dashboard/table', {
      method:'GET', 
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({emps:data});
      console.log(this.state.emps);
    });
  }
 



  render() {
    return (


<div className='employees'>
 <h1>Employees</h1><br/>

 <table className="customers" >
      <thead>
      <tr>
      {/*  <th> <input type="checkbox" onClick="toggle(this);" /></th>*/}
        <th>Employee Number</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Departments</th>
      </tr>
      </thead>
      <tbody>
      { this.state.emps &&
              this.state.emps.map((emp, index) => {
          return (
            <tr>
           {/* <center><input type="checkbox" /></center>*/}
            <td>{this.state.emps[index].number} </td>
            <td>{this.state.emps[index].name} </td>
            <td>{this.state.emps[index].surname}</td>
            <td>{this.state.emps[index].departments}</td>
          </tr>
          );
        })}
      </tbody>
    </table>

</div>


  
    );
  }
}

export default Employees;
