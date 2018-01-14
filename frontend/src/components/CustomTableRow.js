import React from 'react';
import "../App.css"

class CustomTableRow extends React.Component {
    render() {
        return (
                <tr className={"tableRow"}>
                    <td>{this.props.player}</td>
                    <td>{this.props.score}</td>
                    <td><button>Increase Score</button></td>
                    <td><button>Decrease Score</button></td>
                </tr>
        )
    }
}

export default CustomTableRow;