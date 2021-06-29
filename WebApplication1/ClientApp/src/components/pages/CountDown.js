import React from 'react';
import "./CountDown.css";



export class CountDown extends React.Component {
  constructor(props){
   super(props)
   this.state = {
     deadline: '01 July 2021',
     newDeadline:'DD MM YY'
   }
 }
 
 changeDeadline(){
   this.setState({deadline: this.state.newDeadline})
 }
 
 
 
 render(){
   return (
     
    <div className='countbg '>
    
      <br/><br/>
      <h2 id="headline">Countdown to  {this.state.deadline}</h2>
       <Clock  
        deadline = {this.state.deadline}       
   
        />
       
       <div>
       <input className="input-fields" placeholder = 'DD MM YY' onChange={event => this.setState({newDeadline:event.target.value})}   />
       <button className="buttonn" onClick={()=>this.changeDeadline()}>Submit</button>
       </div>
       </div>
     )}
 
}
 
class Clock extends React.Component {
  constructor(props){
    super();
    this.state= {
      days:0,
      hours:0,
      minutes:0,
      seconds:0      
    }
    
  }
  
  
  componentWillMount () {
     this.getTimeUntil(this.props.deadline);
  }
  
  componentDidMount(){
    setInterval(()=>this.getTimeUntil(this.props.deadline),1000)
  }
  
  leading0(num){
    if(num < 10){
      return '0' + num;
    }
    return num;
  }
  
  getTimeUntil(deadline){
    let time = Date.parse(deadline) - Date.parse(new Date());
    let seconds = Math.floor((time/1000)%60);
    let minutes = Math.floor((time/1000/60)%60);
    let hours = Math.floor(time/(1000*60*60)%24);
    let days = Math.floor(time/(1000*60*60*24));
    this.setState({days,hours,minutes,seconds});
    
  }
  
  
  render(){
    
    
    return (
      <div id="countdown">
      <ul>
        <li><span id="days"></span>{this.leading0(this.state.days)}<br/>days</li>
        <li><span id="hours"></span>{this.leading0(this.state.hours)}<br/>Hours</li>
        <li><span id="minutes"></span>{this.leading0(this.state.minutes)}<br/>Minutes</li>
        <li><span id="seconds"></span>{this.leading0(this.state.seconds)}<br/>Seconds</li>
      </ul>
    </div>
   
   
    )
  }
}
 
 



      


export default CountDown;


