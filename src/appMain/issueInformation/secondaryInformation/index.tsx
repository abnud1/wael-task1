import { AppState } from "@store";
import { useSelector } from "react-redux";
import "./index.css";

export default function SecondaryInformation() {
  const {
    docDate,
    postingDate,
    issuedTo,
    userReference,
    remarks,
  } = useSelector((state: AppState) => ({
    docDate: state.issues.selectedRow?.documentdate,
    postingDate: state.issues.selectedRow?.postingdate,
    issuedTo: state.issues.selectedRow?.createdbyuser,
    userReference: state.issues.selectedRow?.userreference,
    remarks: state.issues.selectedRow?.remarks,
  }));
  return (
    <>
      <div id="secondary-info-labels" className="col-4">
        <label htmlFor="doc-date">Doc. Date:</label>
        <label htmlFor="posting-date">Posting Date:</label>
        <label htmlFor="issued-to">Issued To:</label>
        <label htmlFor="user-ref">User Ref. #:</label>
        <label htmlFor="remarks">Remarks:</label>
      </div>
      <div id="secondary-info-values" className="col-8">
        <input
          value={docDate ?? ""}
          id="doc-date"
          type="text"
          className="form-control"
          readOnly
        />
        <input
          id="posting-date"
          type="text"
          className="form-control"
          value={postingDate ?? ""}
          readOnly
        />
        <input
          id="issued-to"
          value={issuedTo ?? ""}
          type="text"
          className="form-control"
          readOnly
        />
        <input
          id="user-ref"
          value={userReference ?? ""}
          type="text"
          className="form-control"
          readOnly
        />
        <textarea
          id="remarks"
          value={remarks ?? ""}
          className="form-control"
          readOnly
        />
      </div>
    </>
  );
}
