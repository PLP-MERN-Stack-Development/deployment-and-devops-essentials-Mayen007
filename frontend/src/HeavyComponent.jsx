import React from "react";

export default function HeavyComponent() {
  // Simulate heavier UI / bundle by including some content
  return (
    <div style={{ marginTop: 20, padding: 12, border: "1px solid #ddd" }}>
      <h2>Heavy Component</h2>
      <p>This component is lazy-loaded to demonstrate code-splitting.</p>
      <p>When you build the app, this will be emitted as a separate chunk.</p>
    </div>
  );
}
