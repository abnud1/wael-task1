import CustomScroll from "react-custom-scroll";
import { Column, DataWithId } from "@store/issues";
import { useState } from "react";
import "react-custom-scroll/dist/customScroll.css";
import "./index.css";

interface DataTableProps {
  striped?: boolean;
  columns: Column[];
  data: DataWithId[];
  onSelectedRow?: (row: DataWithId) => void;
}

function DataTable(props: DataTableProps) {
  const { striped, columns, data, onSelectedRow } = props;
  const tableClassname = `table table-bordered table-dark${
    striped ? " table-striped" : ""
  }`;
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  return (
    <CustomScroll>
      <div className="data-table">
        <table className={tableClassname}>
          <thead className="bg-primary">
            <tr>
              <th
                key="empty"
                aria-label="nothing"
                className="bg-dark"
                scope="col"
              />
              {columns.map((col) => (
                <th key={col.index} scope="col">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((v) => (
              <tr
                onClick={() => {
                  setSelectedRowId(v.id);
                  onSelectedRow?.(v);
                }}
                key={v.id}
                className={v.id === selectedRowId ? "selected" : undefined}
              >
                <th
                  key="empty"
                  aria-label="nothing"
                  className="bg-primary"
                  scope="row"
                />
                {columns.map((col) => (
                  <td key={col.index}>{v[col.index]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CustomScroll>
  );
}
DataTable.defaultProps = {
  striped: false,
  onSelectedRow: undefined,
};
export default DataTable;
