import React, {Component} from 'react';
import './App.css';
import CustomTableRow from "./components/CustomTableRow";
import * as axios from 'axios';
import {BASE_URL, SCORES, UPDATE_KPI} from "./config/config";
import PlayerModal from "./components/PlayerModal";
import MatchModal from "./components/MatchModal";

class App extends Component {


    constructor() {
        super();
        this.getPlayers = this.getPlayers.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.closePlayerWindow = this.closePlayerWindow.bind(this);
        this.openMatchWindow = this.openMatchWindow.bind(this);
        this.closeMatchWindow = this.closeMatchWindow.bind(this);
        this.render = this.render.bind(this);
        this.updateKPI = this.updateKPI.bind(this);
        this.state = {
            rows: [],
            playerWindowOpen: false,
            matchWindowOpen: false,
            result: "",
            player: ""
        };
        this.getPlayers();
    }

    render() {
        return (
            <div className="App">
                <header /*style={{backgroundColor: "rgb(147, 212, 217"}}*/>
                    <a href={"http://www.uptain.de"}><img
                        src={"http://www.uptain.de/wp-content/uploads/2016/06/logo-1.png"} alt={"uptain.de"}
                        height={40} width={108} style={{float: "left", paddingLeft: "40px", paddingTop: "10px", cursor: "pointer"}}/></a>
                    <h1 className={"headline"} style={{paddingTop: "50px", textAlign: "center"}}>uptain Leaderboard</h1>
                </header>
                <PlayerModal playerWindowOpen={this.state.playerWindowOpen} closePlayerWindow={this.closePlayerWindow}/>
                <MatchModal matchWindowOpen={this.state.matchWindowOpen} closeMatchWindow={this.closeMatchWindow} result={this.state.result}
                player={this.state.player} players={this.state.rows} updateKPI={this.updateKPI}/>
                <div style={{backgroundColor: "#5b5553", width: "100%"}}>
                    <table style={{margin: "auto"}}>
                        <thead>
                        <tr>
                            <th className={"tableHeader"} style={{paddingRight: "10px"}}>Player</th>
                            <th className={"tableHeader"} style={{paddingLeft: "10px", paddingRight: "10px"}}>Score</th>
                            <th className={"tableHeader"} style={{paddingRight: "10px"}}>Victory</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.rows}</tbody>
                    </table>
                </div>
                <button onClick={this.addPlayer}>Add Player</button>
                <footer className={"footer"}>
                    <a target={"_blank"} href={"https://github.com/CkFreak/uptain-league/wiki/Submitting-a-Bug-Report"}
                       className={"footerLink"}>
                        How to report a Bug
                    </a>
                    <a  target={"_blank"} className={"footerLink"} href={"https://github.com/CkFreak/uptain-league/issues"}>
                        Report a Bug
                    </a>
                </footer>
            </div>
        );
    }

    getPlayers() {
        let rows = [];
        let self = this;
        axios.get(BASE_URL + SCORES).then((result) => {
           for (let i = 0; i < result.data.data.length; ++i) {
               rows.push(<CustomTableRow key={i} keyID={i} player={result.data.data[i].name}
                                                                  score={result.data.data[i].score}
                                         openMatchWindow={this.openMatchWindow}
                                            render={this.getPlayers}/>);
           }
            self.setState({rows: rows});
        }).catch((error) => {
            console.log(error);
        });
    }

    updateKPI() {
        const self = this;
        axios.post(BASE_URL + UPDATE_KPI, {
            leader: self.state.rows[0].props.player
        }).then(() => {
            console.log("Successfully updated Score on the uptain KPI Monitor");
        }).catch((error) => {
            console.log(error);
            console.log("Failed to update KPI Monitor leader");
        });
    }

    addPlayer() {
         this.setState({playerWindowOpen: true});
    }

    closePlayerWindow() {
        this.setState({playerWindowOpen: false});
        this.getPlayers();
    }

    openMatchWindow(result, player) {
        this.setState({result: result, player: player});
        this.setState({matchWindowOpen: true});
    }

    closeMatchWindow() {
        this.setState({matchWindowOpen: false, result: "", player: ""});
        this.getPlayers();
    }
}

export default App;
