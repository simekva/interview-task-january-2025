import React from "react";
import Map from "./components/Map";
import DeviceList from "./components/DeviceList";

function App(): React.JSX.Element {
  return (
    <div className="w-screen h-screen flex">
      <DeviceList />
      <Map />
    </div>
  );
}

export default App;
