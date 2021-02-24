import { AppState } from "@store";
import DataTable from "@util/dataTable";
import TitleBordered from "@util/titleBordered";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  addResource,
  DataWithId,
  fetchResources,
  Resource,
} from "@store/issues";
import SearchInput from "@util/searchInput";
import "./index.css";

export default function IssueContents() {
  const columns = useSelector((state: AppState) =>
    state.issues.columns.filter((v) =>
      [
        "resourcecode",
        "resourcename",
        "quantity",
        "rate",
        "unitcode",
        "store",
      ].includes(v.index)
    )
  );
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
    } else if (state.issues.addingIssue?.selectedResources) {
      return state.issues.addingIssue.selectedResources;
    }
    return result;
  });
  const categoryResources = useSelector((state: AppState) => {
    if (state.issues.addingIssue) {
      return state.issues.addingIssue.resources;
    }
    return [];
  });
  const [isChooseResourceModalOpen, setChooseResourceModalOpen] = useState(
    false
  );
  const [quantity, setQuantity] = useState("");
  const toggle = () => setChooseResourceModalOpen(!isChooseResourceModalOpen);
  const dispatch = useDispatch();
  const onAddClick = () => {
    dispatch(fetchResources());
    setChooseResourceModalOpen(true);
  };
  const onSelectedResource = (v: DataWithId) => {
    const resource = v as Resource;
    dispatch(addResource({ ...resource, quantity: Number(quantity) }));
    setChooseResourceModalOpen(false);
  };
  return (
    <>
      <TitleBordered title="Issue Contents:">
        <div className="row">
          <button
            id="issue-contents-resource-add-button"
            className="btn bg-dark border-primary text-white"
            type="button"
            onClick={onAddClick}
          >
            Add
          </button>
        </div>
        <div className="row">
          <DataTable columns={columns} data={data} />
        </div>
      </TitleBordered>
      <Modal
        id="resource-modal"
        isOpen={isChooseResourceModalOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Resource Selection Dialog</ModalHeader>
        <ModalBody>
          <SearchInput dark />
          <label htmlFor="modal-quantity">Quantity</label>
          <input
            name="modal-quantity"
            id="modal-quantity"
            className="form-control"
            value={quantity}
            onChange={(ev) => setQuantity(ev.target.value)}
          />
          <DataTable
            columns={[
              { title: "Serial Number", index: "id", visible: true },
              { title: "Name", index: "name", visible: true },
              { title: "Description", index: "description", visible: true },
              { title: "Code", index: "code", visible: true },
            ]}
            data={categoryResources}
            onSelectedRow={onSelectedResource}
            striped
          />
        </ModalBody>
        <ModalFooter>
          <button className="" type="button">
            OK
          </button>
          <button className="" onClick={toggle} type="button">
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
