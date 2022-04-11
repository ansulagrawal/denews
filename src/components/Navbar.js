import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <div className="topNav">
                <button name="Home" onClick={this.props.buttonClicked} className={`${this.props.active == "Home"? "active" :null}`}>Home</button>
                <button name="Write" onClick={this.props.buttonClicked} className={`${this.props.active == "Write"? "active" :null}`}>Write</button>
                <button name="Rewards" onClick={this.props.buttonClicked} className={`${this.props.active == "Rewards"? "active" :null}`}>My Reputation</button>
            </div>
        );
    }
}

export default Navbar;