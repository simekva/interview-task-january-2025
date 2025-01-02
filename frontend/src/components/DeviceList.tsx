import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { MapBox } from "./Map";
ModuleRegistry.registerModules([AllCommunityModule]);

export interface device {
  name: string;
  location: string;
  status: string;
}

interface apiResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
}

export default function DeviceList() {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<device[]>([]);
  // Loading state to ensure asynchronosity.
  const [loading, setLoading] = useState(true);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<any[]>([
    { field: "name" },
    { field: "status" },
    { field: "location" },
  ]);

  // Due to data fetching being asynchronous we have to use useEffect. This ensures
  // that the data gets fetched before the component mounts.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000");

        const devices: apiResponse[] = response.data;

        // Map apiResponses to objects of type Device.
        const rowData = devices.map((device) => {
          const deviceLocation = "" + device.latitude + ", " + device.longitude;
          return {
            name: device.name,
            status: device.status,
            location: deviceLocation,
          };
        });

        setRowData(rowData);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching data: ", e);
      }
    }

    fetchData(); // Call fetchData when component mounts
  }, []);

  // Clicking a specific device in the list for zooming functionality.
  const [selectedDevice, setSelectedDevice] = useState<device | null>(null);

  const handleRowClick = (event: any) => {
    const selectedDevice = event.data;
    setSelectedDevice(selectedDevice);
  };

  // Functionality for sorting, connected to the checkbox. ag-grid itself supports
  // binary sorting, but it's locked behind a pay-wall, so i implemented it myself.
  const [showInactive, setShowInactive] = useState(true);

  const handleCheckboxChange = () => {
    setShowInactive(!showInactive);
  };

  // Use memo for caching.
  const filteredRowData = useMemo(() => {
    return showInactive
      ? rowData
      : rowData.filter((device) => device.status === "active");
  }, [showInactive, rowData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        {/* Show Inactive text + checkbox at the top */}
        <div className="text-left pl-8 pt-4 flex items-center">
          <p>Show inactive: </p>
          <input
            defaultChecked={showInactive}
            onChange={handleCheckboxChange}
            className="ml-4"
            type="checkbox"
          />
        </div>

        <div className="flex flex-1">
          {/* Left side: Ag Grid */}
          <div className="flex-1 p-4">
            <AgGridReact
              rowData={filteredRowData}
              columnDefs={colDefs}
              onRowClicked={handleRowClick}
            />
          </div>
          {/* Right side: Map */}
          <div className="flex-1 p-4">
            <MapBox
              devices={rowData}
              selectedDevice={selectedDevice}
              showInactive={showInactive}
            />
          </div>
        </div>
      </div>
    </>
  );
}
