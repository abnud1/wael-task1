import { AppState } from "@store";
import {
  DataWithId,
  fetchResourceCategories,
  ResourceCategory,
  selectCategory,
} from "@store/issues";
import DataTable from "@util/dataTable";
import SearchInput from "@util/searchInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./index.css";

export default function MainInformation() {
  const {
    inventoryIssue,
    store,
    resourceCategory,
    isAddingIssue,
    resourceCategories,
  } = useSelector((state: AppState) => ({
    inventoryIssue: state.issues.selectedRow?.id,
    store: state.issues.selectedRow?.storename,
    resourceCategory:
      state.issues.addingIssue?.selectedResourceCategory?.name ??
      state.issues.selectedRow?.resourcecategoryname,
    isAddingIssue:
      state.issues.addingIssue !== undefined &&
      state.issues.addingIssue !== null,
    resourceCategories: state.issues.addingIssue?.resourceCategories,
  }));
  const categoryInputClass = isAddingIssue
    ? "form-control issue-adding"
    : "form-control";
  const [isChooseCategoryModalOpen, setChooseCategoryModalOpen] = useState(
    false
  );
  const toggle = () => setChooseCategoryModalOpen(!isChooseCategoryModalOpen);
  const dispatch = useDispatch();
  const onCategoryDoubleClick = isAddingIssue
    ? () => {
        dispatch(fetchResourceCategories());
        setChooseCategoryModalOpen(true);
      }
    : undefined;
  const onSelectedCategory = (category: DataWithId) => {
    dispatch(selectCategory(category as ResourceCategory));
    setChooseCategoryModalOpen(false);
  };
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
          className={categoryInputClass}
          value={
            resourceCategory ??
            (isAddingIssue
              ? "Double Click Here to Choose Resource Category"
              : "")
          }
          onDoubleClick={onCategoryDoubleClick}
          readOnly
        />
      </div>
      <Modal
        id="resource-category-modal"
        isOpen={isChooseCategoryModalOpen}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          Resource Category Selection Dialog
        </ModalHeader>
        <ModalBody>
          <SearchInput dark />
          <DataTable
            columns={[
              { title: "Name", index: "name", visible: true },
              { title: "Description", index: "description", visible: true },
            ]}
            data={resourceCategories ?? []}
            onSelectedRow={onSelectedCategory}
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
