import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

function ReusableDataGrid({ col, row, uniquekey, id, onChangeRow }) {
  return (
    <div>
      <DataGrid
        columns={col}
        rows={row}
        {...row}
        selectRow
        getRowId={(row) => {
          if (!row) {
            return -1;
          } else {
            return row?.[uniquekey];
          }
        }}
        density={"compact"}
        disableColumnSelector
        disableDensitySelector
        pagination={false}
        rowSelectionModel={id}
        onRowSelectionModelChange={(ids) => {
          onChangeRow(ids[0]);
        }}
        style={{ height: "380px" }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
      />
    </div>
  );
}

export default ReusableDataGrid;
