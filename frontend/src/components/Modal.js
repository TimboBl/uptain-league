import React from "react";
import ReactModal from "react-modal";

const modalStyle = {
    content: {
        position: "absolute",
        top: "20%",
        bottom: "auto",
        fontFamily: "Maven Pro"
    }
};

class Modal extends React.Component{

    render() {
        return (
            <ReactModal isOpen={this.props.playerWindowOpen}
                        contentLabel={"Test"}
                        style={modalStyle}>
                <h1 style={{fontFamily: "Maven Pro", textAlign: "center"}}>Add a new Player to the league</h1>
                First Name: <input type={"text"} style={{position: "absolute"}}/> <br/>
                Initial Score: <input type={"text"} style={{position: "absolute"}}/>
                <footer>
                    <button style={{color: "#fff",
                        backgroundColor: "#E36568",
                        fontFamily: "Maven Pro",
                        float: "right"}} onClick={this.props.closePlayerWindow}>Close</button>
                </footer>
            </ReactModal>
        )
    }
}

export default Modal;