import MainInformation from "./mainInformation";
import "./index.css";
import SecondaryInformation from "./secondaryInformation";

export default function IssueInformation() {
  return (
    <>
      <div id="issue-info" className="col-8">
        <div className="bg-dark">
          <span className="title-span btn-primary">
            1. Inventory Issue Information:
          </span>
        </div>
        <div className="row bg-dark">
          <MainInformation />
        </div>
        <div className="bg-dark" style={{ marginTop: "4px", height: "70px" }} />
      </div>
      <div id="issue-secondary" className="row col-4">
        <SecondaryInformation />
      </div>
    </>
  );
}
