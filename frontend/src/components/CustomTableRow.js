import React from 'react';
import "../App.css"

class CustomTableRow extends React.Component {

    constructor(props) {
        super(props);

        this.increaseScore = this.increaseScore.bind(this);
    }

    render() {
        return (
                <tr className={"tableRow"}>
                    <td>{this.props.player}</td>
                    <td>{this.props.score | 0}</td>
                    <td>{this.props.wins | 0}</td>
                    <td>{this.props.losses | 0}</td>
                    <td><button onClick={this.increaseScore}>Victory</button></td>
                </tr>
        )
    }

    increaseScore() {
        this.props.openMatchWindow("win", this.props.player);
    }

}

export default CustomTableRow;