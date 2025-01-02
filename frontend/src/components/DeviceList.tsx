import React, { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { json } from "stream/consumers";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function DeviceList() {
  // Row Data: The data to be displayed.
  fetchData()
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<any[]>([{ field: "make" }, { field: "model" }, { field: "price" }, { field: "electric" }]);

  return (
    <div className="h-full w-full">
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}

// Fetching every device from backend
async function fetchData() {
  try{
    const response = await axios.get('http://localhost:3000')
    console.log(response.data)
  }
  catch (e) {
    console.log(e)
  }
}
