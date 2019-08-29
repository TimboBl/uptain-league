import React from 'react';
import "../App.css"

class MatchesRow extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
                <tr className={"tableRow"}>
                    <td>{this.props.time}</td>
                    <td>{this.props.winner}</td>
                    <td>{this.props.looser}</td>
                    <td>{this.props.result}</td>
                    <td>{this.props.costs}</td>
                </tr>
        )
    }



}

export default MatchesRow;