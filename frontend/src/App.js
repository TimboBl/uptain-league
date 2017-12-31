import React, {Component} from 'react';
import './App.css';
import CustomTableRow from "./components/CustomTableRow";

class App extends Component {

    constructor() {
        super();
        this.getPlayers = this.getPlayers.bind(this);
    }

    render() {
        return (
            <div className="App">
                <header /*style={{backgroundColor: "rgb(147, 212, 217"}}*/>
                    <a href={"http://www.uptain.de"}><img
                        src={"http://www.uptain.de/wp-content/uploads/2016/06/logo-1.png"} alt={"uptain.de"}
                        height={40} width={108} style={{float: "left", paddingLeft: "40px", paddingTop: "10px"}}/></a>
                    <h1 className={"headline"} style={{paddingTop: "50px", textAlign: "center"}}>uptain Leaderbord</h1>
                </header>
                <div style={{backgroundColor: "#5b5553", width: "100%"}}>
                    <table style={{margin: "auto"}}>
                        <thead>
                        <tr>
                            <th className={"tableHeader"} style={{paddingRight: "10px"}}>Player</th>
                            <th className={"tableHeader"} style={{paddingLeft: "10px"}}>Score</th>
                        </tr>
                        </thead>
                        <tbody>{this.getPlayers()}</tbody>
                    </table>
                </div>
            </div>
        );
    }

    getPlayers() {
        return <CustomTableRow key={1} keyID={1} player={"Test"} score={"10"}/>
    }
}

export default App;
