import { useState } from "react";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="espandable-panel-header d-flex justify-content-between">
          {header}
          <div className="expand-box d-flex align-items-start">
            <button className="btn btn-primary" onClick={toggleExpand}>
              {expanded ? "Callopse" : "Expand"}
            </button>
          </div>
        </div>
        {expanded && <div className="expandable-panel-content">{children}</div>}
      </div>
    </div>
  );
}

export default ExpandablePanel;
