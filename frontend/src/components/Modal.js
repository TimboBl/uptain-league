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

class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.saveNewPlayer = this.saveNewPlayer.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);

        this.state = {
            name: "",
            score: ""
        }
    }

    render() {
        return (
            <ReactModal isOpen={this.props.playerWindowOpen}
                        contentLabel={"Test"}
                        style={modalStyle}>
                <h1 style={{fontFamily: "Maven Pro", textAlign: "center"}}>Add a new Player to the league</h1>
                First Name: <input type={"text"} style={{position: "absolute"}} onChange={this.handleNameChange}/> <br/>
                Initial Score: <input type={"text"} style={{position: "absolute"}} onChange={this.handleScoreChange}/>
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
        if (this.state.name === "" || this.state.score === "") {
            console.log("You need to enter something");
        } else {
            axios.post(BASE_URL + NEW_PLAYER, {
                name: this.state.name,
                score: this.state.score
            }).then(() => {
                this.props.closePlayerWindow()
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    handleScoreChange(e) {
        this.setState({score: e.target.value});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
}

export default Modal;