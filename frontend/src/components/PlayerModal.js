import React from "react";
import ReactModal from "react-modal";
import * as axios from 'axios';
import {BASE_URL, NEW_PLAYER} from "../config/config";

const modalStyle = {
    content: {
        position: "absolute",
        top: "20%",
        bottom: "auto",
        fontFamily: "Maven Pro"
    }
};

class PlayerModal extends React.Component{
    constructor(props) {
        super(props);
        this.saveNewPlayer = this.saveNewPlayer.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        this.state = {
            name: "",
            error: ""
        }
    }

    render() {
        return (
            <ReactModal isOpen={this.props.playerWindowOpen}
                        contentLabel={"Test"}
                        style={modalStyle}>
                <h1 style={{fontFamily: "Maven Pro", textAlign: "center"}}>Add a new Player to the league</h1>
                First Name: <input type={"text"} style={{position: "absolute"}} onChange={this.handleNameChange} onKeyDown={e => {
                    if (e.keyCode === 13) {
                        this.saveNewPlayer();
                    }
            }} autoFocus={"autofocus"}/> <br/>
                <div style={{color: "#A94442"}}>{this.state.error}</div>
                <footer>
                    <div>
                        <button onClick={this.props.closePlayerWindow}>Close</button>

                    <button onClick={this.saveNewPlayer}>Save</button>
                    </div>
                </footer>
            </ReactModal>
        )
    }

    saveNewPlayer () {
        const self = this;
        if (this.state.name === "") {
            self.setState({error: "You need to enter a name"});
        } else {
            axios.post(BASE_URL + NEW_PLAYER, {
                name: this.state.name
            }).then(() => {
                this.props.closePlayerWindow();
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 409) {
                    self.setState({error: "This player name is already taken"});
                }
            });
        }
    }

    handleNameChange(e) {
        this.setState({error: ""});
        this.setState({name: e.target.value});
    }
}

export default PlayerModal;