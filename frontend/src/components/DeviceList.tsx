import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { Map } from "./Map";
ModuleRegistry.registerModules([AllCommunityModule]);

interface device {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
}

export default function DeviceList() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<any[]>([{ field: "name" }, { field: "status" }, { field: "location"}]);

  // Due to data fetching being asynchronous we have to use useEffect. This ensures
  // that the data gets fetched as the component mounts.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000");
        const devices: device[] = response.data;

        const rowData = devices.map((device) => {
          const deviceLocation = "" + device.latitude + ", " + device.longitude;
          return { name: device.name, status: device.status, location: deviceLocation };
        });

        setRowData(rowData); // Update rowData state after fetch
        setLoading(false);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    }

    fetchData(); // Call fetchData when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full w-full flex">
      <div className="flex-1">
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>

      <div className="flex-1">      
        <Map devices={rowData} />
      </div>

    </div>
  );
}
