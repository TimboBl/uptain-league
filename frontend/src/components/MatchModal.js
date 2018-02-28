import React from 'react';
import ReactModal from "react-modal";
import * as axios from "axios/index";
import {BASE_URL, UPDATE_SCORE} from "../config/config";

const modalStyle = {
    content: {
        position: "absolute",
        top: "20%",
        bottom: "auto",
        fontFamily: "Maven Pro"
    }
};

class MatchModal extends React.Component {
    constructor(props) {
        super(props);
        this.saveMatch = this.saveMatch.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.createPlayers = this.createPlayers.bind(this);

        this.state = {
            name: "",
            error: ""
        }
    }

    render() {
        return (
            <ReactModal isOpen={this.props.matchWindowOpen}
                        contentLabel={"Test"}
                        style={modalStyle}>
                <h1 style={{fontFamily: "Maven Pro", textAlign: "center"}}>Record a match result</h1>
                 <br/>
                Opponent's Name: <select onChange={this.handleNameChange}>
                {this.createPlayers()}
            </select>
                <div style={{color: "#A94442"}}>{this.state.error}</div>
                <footer>
                    <div>
                        <button onClick={this.props.closeMatchWindow}>Close</button>

                        <button onClick={this.saveMatch}>Save</button>
                    </div>
                </footer>
            </ReactModal>
        )
    }

    saveMatch () {
        const self = this;
        if (this.state.name === "") {
            self.setState({error: "You need to enter a name"});
        } else {
            axios.put(BASE_URL + UPDATE_SCORE + self.props.player, {
                name: self.props.player,
                opponent: self.state.name,
                result: self.props.result
            }).then(() => {
                this.props.updateKPI();
                this.props.closeMatchWindow();
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    createPlayers() {
        let count = -1;
        return this.props.players.map((row) => {
            count++;
            return <option key={count} value={row.props.player}>{row.props.player}</option>;
        });
    }

    handleNameChange(e) {
        this.setState({error: ""});
        this.setState({name: e.target.value});
    }
}

export default MatchModal;