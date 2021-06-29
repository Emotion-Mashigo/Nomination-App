import React from 'react';
import "./Nominate.css";
import { Alert } from 'react-st-modal';

export class Nominate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    
    console.log(JSON.stringify({
      employeeNumber: parseInt(event.target.EmployeeNumber.value) ,
      employeeName:event.target.Name.value,
      employeeSurname:event.target.Surname.value,
      employeeDepartment:event.target.Departments.value,

      reason:event.target.Reason.value }));

    var id = event.target.EmployeeNumber.value;
    
    fetch('https://localhost:44374/api/Nominate', {
      method:'POST', 
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        EmployeeNumber: parseInt(event.target.EmployeeNumber.value) ,
        EmployeeName:event.target.Name.value,
        EmployeeSurname:event.target.Surname.value,
        EmployeeDepartment:event.target.Departments.value,

        Reason:event.target.Reason.value })
    })
    //.then(res=> res.json())
    .then((result)=>{

      console.log(result);
      Alert('Successfully Nominated: '+ this.state.value, 'СONFIRMATION');
      event.target.reset();

    }, (error)=>{
      console.log(error);
      Alert('Failed to Nominated: '+ this.state.value+', Please Contact Your Admin', 'СONFIRMATION');
    });

  }
  

  render() {
    return (

      
        
      <div className='nominate'>
        <div className="wrapper">  
      <form onSubmit={this.handleSubmit}>
           <h1>Nominate</h1> 
         <div className="sub">
              <p>Welcome to your Nominating dashboard</p><br/>
         </div>

         <div className="box">
            <input className="input-field" type="number" placeholder="Employee Number" name="EmployeeNumber" required="required"/>
           
          </div>
      
          <div className="box">
            <input className="input-field" type="text"  placeholder="Name" name="Name"  value={this.state.value} onChange={this.handleChange} required="required"/>
       
         </div>

           <div className="box">
            <input className="input-field" type="text" placeholder="Surname" name="Surname"  required="required"/>
           
          </div>

          <div className="select" >
            <div className="main__greeting">
              <p>Choose a Department:</p>
            </div>
              <select name="Departments" id="department" required="required">
                <option value="">None</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Business Unit">Business Unit</option>
                <option value="Security">Security</option>
                <option value="Support">Support</option>
              </select>
             
            </div>

            {/* <div className="select" >
            <div className="main__greeting">
              <p>Select a Month :</p>
          </div>
              <select name="Months" id="months" required="required">
                <option value="">None</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
             
            </div> */}
           
           <div>
            <textarea className="input" rows="7" cols="45" name="Reason" id="textarea" placeholder=" Please Leave a Comment and state why you Nominating this Candidate" required="required"></textarea>
           
            </div>
            

            <button type="submit" className="btn1" >Submit
            </button>
        
        
      </form>
    </div> 
    </div>

    );
  }
}

export default Nominate;
