import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@store";
import { addIssue, startAddMode } from "@store/issues";
import AppSideTable from "./appSideTable";
import AppMain from "./appMain";

export default function App() {
  const isAddingIssue = useSelector(
    (state: AppState) =>
      state.issues.addingIssue !== null &&
      state.issues.addingIssue !== undefined
  );
  const dispatch = useDispatch();
  const onAddClick = () => {
    dispatch(startAddMode());
  };
  const onSave = () => {
    dispatch(addIssue());
  };
  return (
    <>
      <div id="add-buttons" className="row bg-secondary">
        {isAddingIssue ? (
          <>
            <button
              className="btn bg-dark border-primary text-white"
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn bg-dark border-primary text-white"
              type="button"
              onClick={onSave}
            >
              Save as Draft
            </button>
            <button
              className="btn bg-dark border-primary text-white"
              type="button"
            >
              Post
            </button>
          </>
        ) : (
          <>
            <button
              className="btn bg-dark border-primary text-white"
              type="button"
              onClick={onAddClick}
            >
              Add Inventory Issue (II)
            </button>
            <button
              className="btn bg-dark border-primary text-white"
              type="button"
            >
              Edit Selected Inventory Issue (II)
            </button>
          </>
        )}
      </div>
      <div className="row">
        <AppSideTable />
        <AppMain />
      </div>
    </>
  );
}
