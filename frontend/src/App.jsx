import React, { useState, Suspense } from "react";

const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

export default function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1>Week 7 Deployment Demo</h1>
      <p>
        This is a minimal React app for deploying as part of the assignment.
      </p>
      <p>
        Try calling the backend health endpoint at <code>/health</code>.
      </p>

      <div style={{ marginTop: 16 }}>
        <button onClick={() => setShowHeavy(true)}>Load extra UI (lazy)</button>
      </div>

      {showHeavy && (
        <Suspense
          fallback={<div style={{ marginTop: 12 }}>Loading component...</div>}
        >
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
