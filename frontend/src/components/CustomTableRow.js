import React from 'react';
import "../App.css"
import * as axios from 'axios';
import {BASE_URL, UPDATE_SCORE} from "../config/config";

class CustomTableRow extends React.Component {

    constructor(props) {
        super(props);

        this.increaseScore = this.increaseScore.bind(this);
        this.decreaseScore = this.decreaseScore.bind(this);
    }

    render() {
        return (
                <tr className={"tableRow"}>
                    <td>{this.props.player}</td>
                    <td>{this.props.score}</td>
                    <td><button onClick={this.increaseScore}>Increase Score</button></td>
                    <td><button onClick={this.decreaseScore}>Decrease Score</button></td>
                </tr>
        )
    }

    increaseScore() {
        axios.put(BASE_URL + UPDATE_SCORE + this.props.player, {
            name: this.props.player,
            score: this.props.score + 1
        }).then(() => {
            this.props.render();
        }).catch((error) => {
            console.log(error);
        });
    }

    decreaseScore() {
        axios.put(BASE_URL + UPDATE_SCORE + this.props.player, {
            name: this.props.player,
            score: this.props.score - 1
        }).then(() => {
            this.props.render();
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default CustomTableRow;