import React, {Component} from 'react';
import axios from 'axios';
import { Table,Button,Modal,ModalHeader,ModalFooter,ModalBody,FormGroup,Label,Input } from 'reactstrap';

class App extends Component {

  state = {
    employees:[],
    newEmployeeData : {
      name:'',
      email:''
    },
    newEmployeeModal : false
  }

  componentWillMount() {

    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
      this.setState({
        //employees : [{'title':'123456','nome':'Felipe','email':'felipe@2far.com.br'}]
        employees : [response.data]
      })
    });
  }

  toggleNewEmployee() {
    this.setState({
      newEmployeeModal: ! this.state.newEmployeeModal
    });
  }

  addEmployee() {
    axios.post('https://jsonplaceholder.typicode.com/todos/1',this.state.newEmployeeData).then((response) => {
      console.log(response.data);
    });
  }


  render() {

    let employees = this.state.employees.map((e) => {
      return(
        <tr key={e.id}>
          <td>{e.title}</td>
          <td>{e.title}</td>
          <td>{e.title}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    });
    

    return (
      <div className="App container">

          <Table>
              <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {employees}
              </tbody>
          </Table>

          <Button color="primary" onClick={this.toggleNewEmployee.bind(this)}>Add Employee</Button>
          <Modal isOpen={this.state.newEmployeeModal} toggle={this.toggleNewEmployee.bind(this)} className={this.props.className}>
            <ModalHeader toggle={this.toggleNewEmployee.bind(this)}>Add New Employee</ModalHeader>
            <ModalBody>
              
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" type="text" value={this.state.newEmployeeData.name} onChange={(e) => { 
                let { newEmployeeData } = this.state;
                newEmployeeData.name = e.target.value;
                this.setState({ newEmployeeData });
              } } />

              <Label for="email">Email</Label>
              <Input id="name" type="text" value={this.state.newEmployeeData.email} onChange={(e) => { 
                let { newEmployeeData } = this.state;
                newEmployeeData.email = e.target.value;
                this.setState({ newEmployeeData });
              } } />
            </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addEmployee.bind(this)}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewEmployee.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>


      </div>
    );
  }
}

export default App;
