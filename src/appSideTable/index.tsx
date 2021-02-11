import "./index.css";
import DataTable from "@util/dataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@store";
import { selectRow } from "@store/issues";
import SearchBox from "./serachBox";

export default function AppSideTable() {
  const { columns, data } = useSelector((state: AppState) => {
    return {
      columns: state.issues.columns.filter((v) => v.visible),
      data: state.issues.data,
    };
  });
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div id="side-table" className="col-3 bg-dark">
      <SearchBox />
      <DataTable
        striped
        columns={columns}
        data={data}
        onSelectedRow={(v) => dispatch(selectRow(v))}
      />
    </div>
  );
}
