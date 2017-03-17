import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';



class App extends Component {
  constructor(props){
    super(props);
    this.addTask=this.addTask.bind(this);
    this.method=this.method.bind(this);
    this.delall=this.delall.bind(this);
    
    this.state={
     taskArray : []
  }
}
componentWillMount(){
   this.dataRef = firebase.database().ref().child('taskArray');
    this.dataRef.on('value', (snapshot) => {
     this.data =snapshot.val();
     if(this.data!==null){
     this.setState({
        taskArray : this.data
      })
     }
    })
}
   addTask(ev){
      ev.preventDefault();
    if(this.refs.task.value !== ' ')
    {
    var  taskList = this.state.taskArray;
    taskList.push(this.refs.task.value);
    this.setState({
        taskArray : taskList
      })
    }
    this.dataRef.set(taskList);
      this.refs.task.value=" ";
    
  }
  method(a){
    var j = 0;
    var delt=this.state.taskArray;
    while(a!==delt[j])
    {
      j++;
    }
    console.log(j);
    
    delt.splice(j,1);
    this.dataRef.set(delt);
       this.setState({
       taskArray: delt
     })

  }

  delall(){
      let allDel = this.state.taskArray;
      allDel= [];
       this.dataRef.set(allDel);
       this.setState({
         taskArray : allDel
       })
     }
    
  render() {
    if(this.state.taskArray!== null)
    {
    
    let a;
     if(this.state.taskArray.length > 1) {a=" btn btn-danger"} else {a="no"};
     a = (this.state.taskArray.length > 1) ? " btn btn-danger" : "no";
     return (
      <div>
        <h1 className="heading">React Todo App</h1>
        <form onSubmit={this.addTask}>
          <input className="form-control" placeholder="Enter task" type="text" ref="task"/>
          <button className="btn btn-primary">Add Task</button>
          <ul className="list-group">
          
        {
        this.state.taskArray.map((v,i)=>{
          if(v!=='' && v!==null)
          {
          return <div key={i}> 
                   <Lixt value={v} /> 
                  <Button className="btn btn-warning" value={v}  func={this.method} />
      
                 </div>
          }
        })
        }
        </ul>
         
         <button className={a} onClick={this.delall}>Delete All</button>
         
          </form>
      </div>
    );
  }
  }
}
class Lixt extends Component{
   render(){
    return(
     
      
        <li  className="list-group-item">{this.props.value}</li>
  
      
    )
  }
}
class Button extends Component {
  render(){
    if(this.props.value !== ' ')
    {
      return(
        <button className="btn btn-warning" onClick={this.props.func.bind(this,this.props.value)} >Delete</button>
      );
    }
  }
}

export default App;
