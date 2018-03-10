import React from 'react';
import ReactModal from "react-modal";
import * as axios from "axios/index";
import {BASE_URL, UPDATE_SCORE} from "../config/config";
import "../App.css";

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
        this.handleScoreChange = this.handleScoreChange.bind(this);

        this.state = {
            name: "",
            error: "",
            score: "",// eslint-disable-next-line
            matchRegex: new RegExp("\\d:\\d"),
            submit: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.player});
    };

    render() {
        return (
            <ReactModal isOpen={this.props.matchWindowOpen}
                        contentLabel={"Test"}
                        style={modalStyle}>
                <h1 style={{fontFamily: "Maven Pro", textAlign: "center"}}>Record a match result</h1>
                <br/>
                Opponent's Name: <select onChange={this.handleNameChange} className={"playerSelect"}
                                         value={this.state.name}>
                {this.createPlayers()}
            </select>
                <br/>
                <form action={"demo"}>
                    <label id={"inputLabel"}>Your Score:</label> <input type={"text"} onChange={this.handleScoreChange}
                                                                        value={this.state.score}
                                                                        maxLength={3}
                                                                        onKeyDown={(e) => {
                                                                            if (e.keyCode === 13) {
                                                                                e.preventDefault();
                                                                                this.saveMatch();
                                                                            }
                                                                        }}/>
                </form>
                <div style={{color: "#A94442"}}>{this.state.error}</div>
                <footer>
                    <div>
                        <button onClick={() => {
                            this.props.closeMatchWindow();
                            this.setState({score: "", submit: false, error: ""});
                        }}>Close
                        </button>

                        <button onClick={this.saveMatch}>Save</button>
                    </div>
                </footer>
            </ReactModal>
        )
    }

    saveMatch() {
        const self = this;
        if (this.state.name === "" || this.state.name === this.props.player) {
            self.setState({error: "Please do not select yourself"});
        } else if (!this.state.submit) {
            self.setState({error: "You have not entered a score that matches the criteria. Score is enterd in the manner: 3:2"});
        } else {
            axios.put(BASE_URL + UPDATE_SCORE + self.props.player, {
                name: self.props.player,
                opponent: self.state.name,
                result: self.props.result,
                match: {
                    winner: self.props.player,
                    looser: self.state.name,
                    result: self.state.score
                }
            }).then(() => {
                this.props.updateKPI();
                this.setState({score: "", submit: false});
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

    handleScoreChange(e) {
        const value = e.target.value;
        this.setState({score: value, error: "", submit: true}, () => {
            if (!this.state.matchRegex.test(value)) {
                this.setState({error: "The Score need to be in the pattern d:d e.g. 3:2", submit: false});
            }
        });
    }
}

export default MatchModal;