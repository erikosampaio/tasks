import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import Button from 'react-bootstrap/Button';
import CreateTask from './create_tasks/CreateTasks';
   
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
  }
  
  async loadTasks() {
    let response = await fetch(`http://localhost:3001/api/v1/tasks`);
    const tasks = await response.json();
    this.setState({ tasks: tasks });
  }

  async deleteAllTaskDone() {
    let response = await fetch(`http://localhost:3001/api/v1/tasks`);
    const all_tasks = await response.json();
    let done_tasks = [];
    {
      all_tasks.map((task, index) => {
        if (task.done == true) {
          done_tasks.push(task);
        }
      })
    }
    if (done_tasks.length === 0) {
      window.alert(`Don't exists tasks to will be eraser!`);
    } else {
      if (window.confirm(`Are you sure you want to delete all tasks done?"`)) {
        {
          done_tasks.map((task, index) => {
            fetch(`http://localhost:3001/api/v1/tasks/${task.id}`, {method: 'DELETE'});
            this.loadTasks();
          })
        }
      }
    }
  }
  
  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">To-do</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done != true)}/>
          <CreateTask loadTasks={this.loadTasks}/>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">Done</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done == true)}/>
          <Button className="float-right remove_tasks_btn" onClick={() => this.deleteAllTaskDone()}>Remove all Tasks Done</Button>
        </Col>
      </Row>
    );
  }
}

export default Tasks;