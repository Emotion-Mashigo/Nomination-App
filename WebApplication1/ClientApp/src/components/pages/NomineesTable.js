import React from 'react';
import "./NomineesTable.css";


export class NomineesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emps: []}
  }
  
  componentDidMount(){
    this.loadDashboard();
}

loadDashboard(){
    fetch('https://localhost:44374/api/Dashboard/nominees', {
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
 <h1>Nominees <button className="btn" onClick={() => window.print()}><i className="fa fa-download"></i> Download</button><br/><br/></h1>



 <table className="customerst">
      <thead>
      <tr>
  
        <th>Employee Number</th>
        <th>Date</th>
        <th>Counter</th>
      
      </tr>
      </thead>
      <tbody>
      { this.state.emps &&
              this.state.emps.map((emp, index) => {
          return (
            <tr>
             {/* <center><input type="checkbox" /></center>*/}
            <td>{this.state.emps[index].employeeNumber} </td>
            <td>{this.state.emps[index].date} </td>
            <td>{this.state.emps[index].counter}</td>
     
          </tr>
          );
        })}
      </tbody>
    </table>

</div>


  
    );
  }
}

export default NomineesTable;
