import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Column {
  title: string;
  index: string;
  visible: boolean;
}
export interface DataWithId extends Record<string, any> {
  id: string;
}
export interface IssuesState {
  columns: Column[];
  data: DataWithId[];
  selectedRow?: DataWithId;
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
  },
});
const { actions, reducer: issuesReducer } = issuesSlice;
export const { selectRow } = actions;
export default issuesReducer;
