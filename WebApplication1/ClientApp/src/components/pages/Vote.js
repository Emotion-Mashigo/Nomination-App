import React from 'react';
import "./Vote.css";
import { Alert } from 'react-st-modal';



export class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emps: []}
  }
  
  componentDidMount(){
      this.refreshList();
  }
  refreshList(){
    fetch('https://localhost:44374/api/Vote/GetVotes', {
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

  Vote(index) {
    
    fetch('https://localhost:44374/api/Vote/' + parseInt(this.state.emps[index].employeeNumber), {
      method:'POST', 
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then((result)=>{

      console.log(result);
      Alert('You Have Successfully Voted for: '+ this.state.emps[index].employee.name, 'СONFIRMATION');
     

    }, (error)=>{
      console.log(error);
      Alert('Failed to Nominated: '+ this.state.emps[index].employeeNumber ,', Please Contact Your Admin', 'СONFIRMATION');
    });

    
  }
  
  render(){

    
    
    return (
      
      <main>
        
        <div className="main__containers">
      
          <div className="main__titles">
            <div className="main__greetings">
              <h1>Vote</h1>
              <p>Welcome to your Voting dashboard</p>
            </div>
          </div>

          <div>
           <div className="main__cardss">
            { this.state.emps &&
              this.state.emps.map((emp, index) => {
                
                return (
                  
                  <div className="cards" key={index}>
                    <i 
                      className="fa fa-user-o fa-4x text-red"
                      aria-hidden="true">
                    </i>
                    <p className="text-primary-p">{emp.employee.name}</p>
                    <p className="text-primary-p">{emp.employee.surname}</p>
                    <span className="font-bold text-title">{emp.employee.departments}</span>
                    <button type="submit" className="btn1" name="employeeNumber" onClick={() => this.Vote(index)}>Vote</button>
                  </div>
                

                );

              
              })
            }
               
          </div>


           
          </div>
              
      
          

        </div>

      </main>

    );
  };
}



export default Vote;


 