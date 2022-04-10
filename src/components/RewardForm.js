import React, { Component } from "react";
import blogUtils from "../utils/blogUtils";

class RewardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { rewardAmount: 0 };
  }

  componentDidMount() {
    blogUtils.instance.events.RewardSubmission({}, (err, event) => {
      alert("Success! You just rewarded ", event.returnValues.writer);
      console.log(
        "EVENT!! Rewarded submission with ID ",
        event.returnValues.submissionID
      );
    });
  }

  mySubmitHandler = async () => {
    if (this.state.rewardAmount > 0) {
      const submissionID = this.props.submissionIndex + 1;
      await blogUtils.getSubmission(submissionID).then(async (sub) => {
        if (sub.writer === blogUtils.accounts[0]) {
          alert("You can't reward yourself!");
        } else {
          await blogUtils.rewardSubmission(
            submissionID,
            this.state.rewardAmount
          );
          this.props.fetchSubmissions();
        }
      });
    }
  };
  myChangeHandler = (event) => {
    this.setState({ rewardAmount: event.target.value });
  };
  render() {
    return (
      <form
        className="rewardForm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="content d-flex justify-content-center pt-5">
          <div
            className="primary-input"
            style={{ border: "1px solid black", borderRadius: "14px" }}
          >
            <div className="mb-3 ps-4 ps-xl-6">
              <label htmlFor="" className="contact-input">
                <input type="number" onChange={this.myChangeHandler} />
                <button
                  type="button"
                  className="btn"
                  onClick={() => this.mySubmitHandler()}
                >
                  <span>Reward</span>
                </button>
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RewardForm;
