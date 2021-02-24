import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

export interface Column {
  title: string;
  index: string;
  visible: boolean;
}
export interface DataWithId extends Record<string, any> {
  id: number;
}
export interface Resource {
  id: number;
  name: string;
  code: string;
  quantity: number;
}
export interface ResourceCategory {
  id: number;
  name: string;
}
export interface Issue {
  resourceCategories: ResourceCategory[];
  selectedResourceCategory?: ResourceCategory;
  resources: Resource[];
  selectedResources?: Resource[];
}
export interface IssuesState {
  columns: Column[];
  data: DataWithId[];
  selectedRow?: DataWithId;
  addingIssue?: Issue;
}
export const fetchColumns = createAsyncThunk("issues/getColumns", async () => {
  const res = await axios.get<Column[]>(
    "https://bpro.net/api/v1/tableheader?tablename=inventoryissue"
  );
  return res.data;
});
export const fetchData = createAsyncThunk("issues/getData", async () => {
  const res = await axios.get<DataWithId[]>(
    "https://bpro.net/api/v1/inventoryissue"
  );
  return res.data;
});
export const fetchResourceCategories = createAsyncThunk(
  "issues/getResourceCategories",
  async () => {
    const res = await axios.get("https://bpro.net/api/v1/resource/category");
    return res.data;
  }
);
export const fetchResources = createAsyncThunk(
  "issues/getResources",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as { issues: IssuesState };
    const res = await axios.get(
      `https://bpro.net/api/v1/resource?resourcecategoryid=${state.issues.addingIssue?.selectedResourceCategory?.id}`
    );
    return res.data;
  }
);
export const addIssue = createAsyncThunk("issues/add", async (_, thunkApi) => {
  const state = thunkApi.getState() as { issues: IssuesState };
  if (
    !state.issues.addingIssue ||
    !state.issues.addingIssue.selectedResources ||
    !state.issues.addingIssue.selectedResourceCategory
  ) {
    return;
  }
  const rows = state.issues.addingIssue.selectedResources.map((v) => ({
    resourceid: v.id,
    resourcecode: v.code,
    resourcename: v.name,
    unitid: 1,
    currencyid: 1,
    unitcode: "liter(s)",
    quantity: v.quantity,
    store: "Store 01",
    rate: 1,
    storeid: 1,
    remarks: "test remarks",
  }));
  const date = dayjs().format("YYYY-MM-DD");
  const issue = {
    companyid: 1,
    divisionid: 1,
    storeid: 1,
    resourcecategoryid: state.issues.addingIssue.selectedResourceCategory.id,
    documentdate: date,
    postingdate: date,
    userreference: "any text",
    issuedto: "text",
    currencyid: 1,
    posted: false,
    draft: true,
    remarks: "remarks",
    rows,
  };
  await axios.post("https://bpro.net/api/v1/inventoryissue", issue);
});
const issuesSlice = createSlice<IssuesState, SliceCaseReducers<IssuesState>>({
  name: "issues",
  initialState: {
    columns: [],
    data: [],
  },
  reducers: {
    selectRow(state, action: PayloadAction<DataWithId>) {
      state.selectedRow = action.payload;
    },
    startAddMode(state) {
      state.addingIssue = {
        resourceCategories: [],
        resources: [],
      };
    },
    selectCategory(state, action: PayloadAction<ResourceCategory>) {
      if (state.addingIssue) {
        state.addingIssue.selectedResourceCategory = action.payload;
      }
    },
    addResource(state, action: PayloadAction<Resource>) {
      if (state.addingIssue) {
        if (!state.addingIssue.selectedResources) {
          state.addingIssue.selectedResources = [];
        }
        state.addingIssue.selectedResources.push(action.payload);
      }
    },
  },
  extraReducers: {
    [fetchColumns.fulfilled.type]: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    [fetchData.fulfilled.type]: (
      state,
      action: PayloadAction<DataWithId[]>
    ) => {
      state.data = action.payload;
    },
    [fetchResourceCategories.fulfilled.type]: (
      state,
      action: PayloadAction<ResourceCategory[]>
    ) => {
      if (state.addingIssue) {
        state.addingIssue.resourceCategories = action.payload;
      }
    },
    [fetchResources.fulfilled.type]: (
      state,
      action: PayloadAction<Resource[]>
    ) => {
      if (state.addingIssue) {
        state.addingIssue.resources = action.payload;
      }
    },
    [addIssue.fulfilled.type]: (state) => {
      delete state.addingIssue;
    },
  },
});
const { actions, reducer: issuesReducer } = issuesSlice;
export const {
  selectRow,
  startAddMode,
  selectCategory,
  addResource,
} = actions as {
  startAddMode: ActionCreatorWithoutPayload;
  selectRow: ActionCreatorWithPayload<DataWithId>;
  selectCategory: ActionCreatorWithPayload<ResourceCategory>;
  addResource: ActionCreatorWithPayload<Resource>;
};
export default issuesReducer;
