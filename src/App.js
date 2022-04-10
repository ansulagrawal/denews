import React, { Component } from "react";

import "./App.css";
import Submissions from "./components/Submissions.js";
import PublishForm from "./components/PublishForm.js";
import Navbar from "./components/Navbar";
import blogUtils from "./utils/blogUtils";
import MyRewards from "./components/MyRewards";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { tab: "Home", web3: null };

    }

    componentDidMount = async () => {
        this.setState({ web3: blogUtils.web3 });
    }

    buttonClicked = (event) => {
        switch (event.target.name) {
            case "Home":
                this.setState({ tab: "Home" });
                break;
            case "Write":
                this.setState({ tab: "Write" });
                break;
            case "Rewards":
                this.setState({ tab: "Rewards" });
                break;
        }
    }

    changeTab = (newTab) => {
        switch (newTab) {
            case "Home":
                this.setState({ tab: "Home" });
                break;
            case "Write":
                this.setState({ tab: "Write" });
                break;
            case "Rewards":
                this.setState({ tab: "Rewards" });
                break;
        }
    }

    render() {

        const header = 
        <div className="Header"> 
            <h1>DeNews <div className="titleDot"/></h1>
            <Navbar buttonClicked={this.buttonClicked} />
        </div>

        if (this.state.tab === "Home") {
            return (
                <div className="App">
                    {header}
                    <Submissions />
                </div>
            );
        } else if (this.state.tab === "Write") {
            return (
                <div className="App">
                    {header}
                    <PublishForm changeTab={this.changeTab} />
                </div>
            );
        }
        else if (this.state.tab === "Rewards") {
            return (
                <div className="App">
                    {header}
                    <MyRewards />
                </div>
            );
        }
    }
}

export default App;