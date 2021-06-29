import React from 'react';
import "./VotesTable.css";


export class VotesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emps: []}
  }
  
  componentDidMount(){
    this.loadDashboard();
}

loadDashboard(){
    fetch('https://localhost:44374/api/Dashboard/votes', {
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
 
toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}


  render() {
    return (


<div className='employees'>
 <h1>Votes</h1><br/>

 <table className="customerss">
      <thead>
      <tr>
     {/*  <th> <input type="checkbox" onClick="toggle(this);" /></th>*/}
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

export default VotesTable;
