import React, { Component, useState } from "react";
import _ from "lodash";
import RewardForm from "./RewardForm";
import blogUtils from "../utils/blogUtils";
import Modal from "react-modal";

class Submissions extends Component {
  state = {
    submissionsCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    submissions: [],
    modalOpen: false,
  };
  componentDidMount = async () => {
    try {
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      await blogUtils.getVars();
      const web3 = blogUtils.web3;
      const accounts = blogUtils.accounts;
      const instance = blogUtils.instance;
      if (accounts) {
        this.setState(
          { web3, accounts, contract: instance },
          this.fetchSubmissions
        );
        // await instance.methods.publishSubmission("content", "title", 0).send({ from: accounts[0], value: web3.utils.toWei("0.05", "ether") });
        this.state.contract.events.SubmissionEvent({}, (err, event) => {
          console.log(
            "EVENT!! Added new submission with ID ",
            event.returnValues?.submissionID
          );
          this.fetchSubmissions();
        });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  fetchSubmissions = async () => {
    const contract = this.state.contract;
    let submissions = [];
    await contract.methods
      .getSubmissionsLength()
      .call()
      .then((res) => {
        this.setState({ submissionsCount: res });
      })
      .then(async () => {
        if (this.state.submissionsCount !== 0) {
          await contract.methods
            .getAllSubmissions()
            .call()
            .then((res) => {
              submissions = res;
            });
          this.setState({ submissions: submissions });
        }
      });
  };
  openModal() {
    this.setState({ modalOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    if (!this.state.accounts) {
      return (
        <p>
          {" "}
          Couldn't detect account. Please verify that you have metamask
          installed and running{" "}
        </p>
      );
    }
    if (blogUtils.networkId !== 80001) {
      return <p>Please connect to the Matic Mumbai network.</p>;
    }
    let Submissions = [];

    _.forEachRight(this.state.submissions, (value, index) => {
      let date = new Date(value[3] * 1000);
      Submissions.push(
        <div
          className="submission"
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2> {value[1]} </h2> <pre>{date.toString()}</pre>
          <pre>
            Written by {value[0]}, Rewards:{" "}
            {this.state.web3.utils.fromWei(value["reward"], "ether")} ETH{" "}
          </pre>{" "}
          <p> {value[2]} </p>{" "}
          <button
            className="auditFormButton"
            style={{ width: "110px" }}
            onClick={() => this.setState({ modalOpen: true })}
          >
            Audit
          </button>
          <RewardForm
            submissionIndex={index}
            fetchSubmissions={this.fetchSubmissions}
          />
        </div>
      );
    });

    const AuditForm = () => {
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [trustScore, setTrustScore] = useState(0);
      return (
        <form
          style={{ display: "flex", flexDirection: "column", width: "70%" }}
          className="auditForm"
        >
          <h1>Submit Audit Report</h1>
          <input type="text" placeholder="Title" className="auditInput" />
          <textarea
            type="text"
            placeholder="Description"
            className="auditInput"
          />
          <input
            type="input"
            placeholder="Trust Score"
            className="auditInput"
          />
          <button
            type="submit"
            className="auditFormButton"
            onClick={() =>
              alert("Audit report submitted! It is being reviewed")
            }
          >
            Submit
          </button>
        </form>
      );
    };

    return (
      <div>
        <h4>
          A total of {this.state.submissionsCount} news submission(s) currently
          exist on the blockchain
        </h4>
        {Submissions}
        <Modal
          isOpen={this.state.modalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.setState({ modalOpen: false })}
          style={{ width: "60vw" }}
          contentLabel="Example Modal"
        >
          <AuditForm />
        </Modal>
      </div>
    );
  }
}

export default Submissions;
