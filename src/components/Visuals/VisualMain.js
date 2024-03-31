import React from "react";
import GraphVisualization from "./GraphVisualization";

const VisualMain = () => {
  // Hardcoded graph data
  const graphData = {
    nodes: [
      // Central fraudulent node
      { id: 1, label: "0xFraud", group: "Fraudulent" },
      // Fake identities clustering around the fraudulent node
      { id: 2, label: "Uniswap", group: "Sybil" },
      { id: 3, label: "Uniswap", group: "Sybil" },
      { id: 4, label: "Uniswap", group: "Sybil" },
      { id: 5, label: "Uniswap", group: "Sybil" },
      // Legitimate, unconnected nodes
      { id: 6, label: "0xLegit1", group: "Legitimate" },
      { id: 7, label: "0xLegit2", group: "Legitimate" },
      { id: 8, label: "0xLegit3", group: "Legitimate" },
      // A legitimate cluster, potentially victims of the attack
      { id: 9, label: "0xVictim1", group: "Victim" },
      { id: 10, label: "0xVictim2", group: "Victim" },
      { id: 11, label: "0xVictim3", group: "Victim" },
      { id: 12, label: "0xVictim4", group: "Victim" },
      // More fake identities
      { id: 13, label: "0xSybil5", group: "Sybil" },
      { id: 14, label: "0xSybil6", group: "Sybil" },
      { id: 15, label: "0xSybil7", group: "Sybil" },
      // More legitimate nodes
      { id: 16, label: "0xLegit4", group: "Legitimate" },
      { id: 17, label: "0xLegit5", group: "Legitimate" },
      { id: 18, label: "0xLegit6", group: "Legitimate" },
    ],
    links: [
      // Connections within the fraudulent cluster
      { source: 1, target: 2, value: 10 },
      { source: 1, target: 3, value: 10 },
      { source: 1, target: 4, value: 10 },
      { source: 1, target: 5, value: 10 },
      { source: 2, target: 3, value: 8 },
      { source: 2, target: 4, value: 8 },
      { source: 3, target: 5, value: 8 },
      // Connections within the victim cluster
      { source: 9, target: 10, value: 5 },
      { source: 9, target: 11, value: 5 },
      { source: 10, target: 12, value: 5 },
      { source: 11, target: 12, value: 5 },
      // Inter-cluster connections (Sybil nodes interacting with victims)
      { source: 2, target: 9, value: 3 },
      { source: 3, target: 10, value: 3 },
      // Additional fake identities
      { source: 1, target: 13, value: 10 },
      { source: 1, target: 14, value: 10 },
      { source: 13, target: 14, value: 8 },
      { source: 14, target: 15, value: 8 },
      // Some isolated links to legitimate nodes
      { source: 7, target: 16, value: 1 },
      { source: 17, target: 18, value: 1 },
    ],
  };

  return (
    <div>
      <div className="mb-12">Visual Main</div>
      <div className="flex justify-center">
        <GraphVisualization graphData={graphData} />
      </div>
    </div>
  );
};

export default VisualMain;
