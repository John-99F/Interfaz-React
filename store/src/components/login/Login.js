import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            emailUser:"",
            password:""
        };
      
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        try {
            event.preventDefault();
            const emailExpression = /\S+@\S+\.\S+/;

            const isEmailFormated = emailExpression.test(this.state.emailUser);
            if (this.state.emailUser != null && isEmailFormated){
                if(this.state.password != null){
                    console.log(`state`,this.state);
                    const url = await fetch('http://localhost:8080/api/user/'+`${this.state.emailUser}/${this.state.password}`);
                    const urlEmail = await fetch('http://localhost:8080/api/user/'+`emailexist/${this.state.emailUser}`);
        
                    const jsonFormat = await url.json();
                    const jsonEmail =await urlEmail.json(); 
                    if (jsonEmail) {
                        if (jsonFormat.id != null  && jsonFormat.password != null) {
                            alert("si funciona")
                        }else{
                            alert("Contraseña equivocada");
                        }
                    }else{
                        alert("Usuario no existe !!");
                    }
                }else{
                    alert('Campo vacio')
                }
                
            }else{
                alert('Campo email vacio')
            }
          
        } catch (error) {
            console.log(`error`,error);
        }   
    }

    render(){
        return(
            <div>
            <header>
                <div ClassName="mb-3">
                    <h1>CANGREJO LTDA</h1>
                </div>
            </header>
                <h1>Login Ingreso</h1>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Floating>
                        <Form.Control 
                           onKeyUp={(event)=>
                            this.setState({emailUser:event.target.value})
                        }
                           type="email"
                        />
                        <Form.Label>
                            Email
                        </Form.Label>
                    </Form.Floating>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control 
                            type="password"
                            onKeyUp={(event)=>
                            this.setState({password:event.target.value})}
                        />
                        <Form.Label>Password</Form.Label>
                </Form.Group>
                <Button className="btn btn-success" type="submit">
                    Ingresar
                    </Button>                
                </Form>
            </div>
        );
    }
}
export default Login;