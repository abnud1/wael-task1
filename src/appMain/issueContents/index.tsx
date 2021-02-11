import { AppState } from "@store";
import DataTable from "@util/dataTable";
import TitleBordered from "@util/titleBordered";
import { useSelector } from "react-redux";
import "./index.css";

export default function IssueContents() {
  const columns = useSelector((state: AppState) => {
    return state.issues.columns.filter((v) =>
      [
        "resourcecode",
        "resourcename",
        "quantity",
        "rate",
        "unitcode",
        "store",
      ].includes(v.index)
    );
  });
  const data = useSelector((state: AppState) => {
    const result = [];
    if (state.issues.selectedRow) {
      const rowIds = JSON.parse(state.issues.selectedRow.rowid);
      const resourceCodes = JSON.parse(state.issues.selectedRow.resourcecode);
      const resourceNames = JSON.parse(state.issues.selectedRow.resourcename);
      const quantities = JSON.parse(state.issues.selectedRow.quantity);
      const rates = JSON.parse(state.issues.selectedRow.rate);
      const unitCodes = JSON.parse(state.issues.selectedRow.unitcode);
      const stores = JSON.parse(state.issues.selectedRow.store);
      for (let i = 0; i < resourceCodes.length; i += 1) {
        result.push({
          id: rowIds[i],
          resourcecode: resourceCodes[i],
          resourcename: resourceNames[i],
          quantity: quantities[i],
          rate: rates[i],
          unitcode: unitCodes[i],
          store: stores[i],
        });
      }
    }
    return result;
  });
  return (
    <TitleBordered title="Issue Contents:">
      <DataTable columns={columns} data={data} />
    </TitleBordered>
  );
}
