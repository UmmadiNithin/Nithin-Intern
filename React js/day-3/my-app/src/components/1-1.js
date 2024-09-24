import React, { useState } from "react";

function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-component">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"} Component
      </button>
      {isVisible && <p>This is the component to show or hide!</p>}
    </div>
  );
}

export default ToggleComponent;
