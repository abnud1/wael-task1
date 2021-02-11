import TitleBordered from "@util/titleBordered";
import "./index.css";
import IssueContents from "./issueContents";
import IssueInformation from "./issueInformation";

export default function AppMain() {
  return (
    <main className="col-9 bg-secondary">
      <TitleBordered title="Inventory Issue Details:">
        <div className="row">
          <IssueInformation />
        </div>
        <div id="issue-contents-row" className="row">
          <IssueContents />
        </div>
      </TitleBordered>
    </main>
  );
}
