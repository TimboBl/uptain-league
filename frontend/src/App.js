import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header /*style={{backgroundColor: "rgb(147, 212, 217"}}*/>
                    <a href={"http://www.uptain.de"} ><img src={"http://www.uptain.de/wp-content/uploads/2016/06/logo-1.png"} alt={"This should be a logo"}
                                     height={40} width={108} style={{float: "left", paddingLeft: "40px", paddingTop: "10px"}}/></a>
                    <h1 className={"headline"} style={{paddingTop: "50px", textAlign: "center"}}>uptain Leaderbord</h1>
                </header>
                <body>
                <table style={{margin: "auto"}}>
                    <th>
                        <td className={"tableHeader"} style={{paddingRight: "10px"}}>Player</td>
                        <td className={"tableHeader"} style={{paddingLeft: "10px"}}>Score</td>
                    </th>
                </table>
                </body>
            </div>
        );
    }
}

export default App;
