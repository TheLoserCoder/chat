import React, {Component} from 'react'; 
import { render } from 'react-dom'; 
import io from '../socket.io-client-master/dist/socket.io'

let socket = io();



let d = 0;
class Login extends Component{ 

    constructor(props) 

    { 
        super(props);


        socket.on('login', () => {
            this.props.login();
        }) 
        
    }

    onLogin()
    {
        if(this.loginput.value){
            socket.emit('login', this.loginput.value);
        }
            
    }
    render()
    {
        return (
            <div id = "l-form">
                <div >
                    <input ref = { ref => this.loginput = ref  } id = "l-input" type = "text" ></input>
                </div>
                <div>
                    <div id = "l-submit" onClick = { this.onLogin.bind(this) } >
                        >
                    </div>
                </div>
            </div>
        )
    }
}


class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            messages: []
        }

        socket.on("takeMessage", this.takeMessage.bind(this))
        
    }
    sendMessage(event)
    {
        if(this.textarea.value && event.key == "Enter")
        {
            
            socket.emit('sendMessage', this.textarea.value);
            this.textarea.value = "";
        }
    }

    takeMessage(data)
    {
        this.state.messages.push(data);
        this.setState({
            messages: this.state.messages
        })

        this.messagesarea.scrollTop = this.messagesarea.scrollHeight;
    }
    render()
    {
        //let { messages } = this.state.messages;
        return(
            <div id = "chat">
                <div id = "message_field">
                    <div ref = { ref => this.messagesarea = ref }>
                        {
                            this.state.messages.map((val, i) => {
                                return (
                                    <div key = {i}>
                                        <div className = "login">{ val.login } </div>  
                                        <div className = "messageblock" >{ val.text }</div>   
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div id = "textarea">
                    <textarea ref = { ref => this.textarea = ref  } onKeyPress = {  this.sendMessage.bind(this) }></textarea>

                </div>
            </div>
        )
    }
}

class App extends Component{ 

    constructor(props) 

    { 
        super(props); 

        this.state = {
            isUserLogin: false
        }
    }

    login()
    {
        this.setState({ isUserLogin: true })
    }
    render()
    {
        return (
            <div>
               {
                   this.state.isUserLogin ? <Chat/> : <Login login = { this.login.bind(this) } />
               }
            </div>
        )
    }
}

render(<App/>, document.getElementById('app'));