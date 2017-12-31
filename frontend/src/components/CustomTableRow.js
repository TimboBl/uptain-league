import React from 'react';
import "../App.css"

class CustomTableRow extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <tr className={"tableRow"}>
                    <td>{this.props.player}</td>
                    <td>{this.props.score}</td>
                </tr>
        )
    }
}

export default CustomTableRow;