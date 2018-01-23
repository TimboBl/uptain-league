import React from 'react';
import "../App.css"

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
                    <td><button onClick={this.increaseScore}>Victory</button></td>
                    <td><button onClick={this.decreaseScore}>Defeat</button></td>
                </tr>
        )
    }

    increaseScore() {
        this.props.openMatchWindow("win", this.props.player);
    }

    decreaseScore() {
        this.props.openMatchWindow("loss", this.props.player);
    }

}

export default CustomTableRow;