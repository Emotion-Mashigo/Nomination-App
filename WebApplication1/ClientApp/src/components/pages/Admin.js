import React from 'react';
import "./Admin.css";

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: Object, previousEmployees: Object}
  }
  
  componentDidMount(){
      this.loadDashboard();
  }
 
  loadDashboard(){
    fetch('https://localhost:44374/api/Dashboard/previouses',{
      method:'GET', 
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
    this.setState({previousEmployees:data});
      console.log(data);
    });

    fetch('https://localhost:44374/api/Dashboard/employee',{
      method:'GET', 
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
       this.setState({data:data});
      console.log(data);
    });

  }


  render(){

   return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
        
          <div className="main__greeting">
            <h1>Admin Dashboard</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
       
                <a href="./employeestable">
                  <div className="cardz">
                    <i
                      className="fa fa-users fa-4x text-red"
                      aria-hidden="true"
                    ></i>
                    <div className="card_inner">
                      <p className="text-primary-p">Number of Employees Nominated</p>
                      <span className="font-bold text-title">{ this.state.data.numberOfEmployees }</span> 
                    </div>
                  </div>
                </a>

                <a href="./nomineestables">
                  <div className="cardz">
                    <i className="fa fa-archive fa-4x text-red"
                    aria-hidden="true"
                    ></i>
                    <div className="card_inner">
                      <p className="text-primary-p">Number of Nominees</p>
                      <span className="font-bold text-title">{ this.state.data.numberOfNominees }</span>
                    </div>
                  </div>
               </a>

              <a href="./commentstables">
                <div className="cardz">
                  <i
                    className="fa fa-comment fa-4x text-red"
                    aria-hidden="true"
                  ></i>
                  <div className="card_inner">
                    <p className="text-primary-p">Number of Comments</p>
                    <span className="font-bold text-title">{ this.state.data.numberOfComments }</span>
                  </div>
                </div>
             </a>

             <a href="./votestables">
                <div className="cardz">
                  <i
                    className="fa fa-thumbs-up fa-4x text-red"
                    aria-hidden="true"
                  ></i>
                  <div className="card_inner">
                    <p className="text-primary-p">Number of Votes</p>
                   <span className="font-bold text-title">{ this.state.data.numberOfVotes }</span>
                  </div>
                  
                </div>
              </a>
              
         </div>  
        
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Employee of the Year</h1>
                <p></p>
                
              </div>
              <i className="fa fa-trophy" aria-hidden="true"></i>
            </div>
        
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Previous Employees of the Month</h1>
                <p></p>
              </div>
              <i className="fa fa-trophy" aria-hidden="true"></i>
            </div>

            <div className="charts__right__cards">
              { this.state.previousEmployees.previousMonths &&
                this.state.previousEmployees.previousMonths.map((month, index) => {
                  
                  return (
                    <div className="card3" key={index}>
                      <h1>{this.state.previousEmployees.previousEmployees[index].name}</h1>
                      <p>{month}</p>
                    </div>

              

                  );
                })
              }

            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
        
       </div>
     </main>
    );
  };
}

export default Admin;
