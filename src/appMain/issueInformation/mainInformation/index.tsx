import { AppState } from "@store";
import { useSelector } from "react-redux";
import "./index.css";

export default function MainInformation() {
  const { inventoryIssue, store, resourceCategory } = useSelector(
    (state: AppState) => ({
      inventoryIssue: state.issues.selectedRow?.id,
      store: state.issues.selectedRow?.storename,
      resourceCategory: state.issues.selectedRow?.resourcecategoryname,
    })
  );
  return (
    <>
      <div id="main-info-labels" className="col-3">
        <label htmlFor="inventory-issue">Inventory Issue #</label>
        <label htmlFor="store">Store:</label>
        <label htmlFor="resource-category">Resource Category:</label>
      </div>
      <div id="main-info-values" className="col-9">
        <input
          id="inventory-issue"
          type="text"
          className="form-control"
          value={inventoryIssue ?? ""}
          readOnly
        />
        <input
          id="store"
          type="text"
          className="form-control"
          value={store ?? ""}
          readOnly
        />
        <input
          id="resource-category"
          type="text"
          className="form-control"
          value={resourceCategory ?? ""}
          readOnly
        />
      </div>
    </>
  );
}
