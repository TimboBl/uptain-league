import React, {Component} from 'react';
import './App.css';
import CustomTableRow from "./components/CustomTableRow";
import * as axios from 'axios';
import {BASE_URL, SCORES} from "./config/config";
import Modal from "./components/Modal";

class App extends Component {

    constructor() {
        super();
        this.getPlayers = this.getPlayers.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.closePlayerWindow = this.closePlayerWindow.bind(this);
        this.state = {
            rows: [],
            playerWindowOpen: false
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
                    <h1 className={"headline"} style={{paddingTop: "50px", textAlign: "center"}}>uptain Leaderbord</h1>
                </header>
                <Modal playerWindowOpen={this.state.playerWindowOpen} closePlayerWindow={this.closePlayerWindow}/>
                <div style={{backgroundColor: "#5b5553", width: "100%"}}>
                    <table style={{margin: "auto"}}>
                        <thead>
                        <tr>
                            <th className={"tableHeader"} style={{paddingRight: "10px"}}>Player</th>
                            <th className={"tableHeader"} style={{paddingLeft: "10px", paddingRight: "10px"}}>Score</th>
                            <th className={"tableHeader"} style={{paddingRight: "10px"}}>Increase Score</th>
                            <th className={"tableHeader"} style={{paddingLeft: "10px"}}>Decrease Score</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.rows}</tbody>
                    </table>
                </div>
                <button onClick={this.addPlayer}>Add Player</button>
            </div>
        );
    }

    getPlayers() {
        let rows = [];
        let self = this;
        axios.get(BASE_URL + SCORES).then((result) => {
            console.log(result.data.data.length)
           for (let i = 0; i < result.data.data.length; ++i) {
               rows.push(<CustomTableRow key={i} keyID={i} player={result.data.data[i].name}
                                                                  score={result.data.data[i].score}/>);
           }
           self.setState({rows: rows});
           console.log(rows);
        }).catch((error) => {
            console.log(error);
        });
    }

    addPlayer() {
         this.setState({playerWindowOpen: true});
    }

    closePlayerWindow() {
        this.setState({playerWindowOpen: false});
    }
}

export default App;
