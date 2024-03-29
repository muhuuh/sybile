import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ graphData }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (graphData && d3Container.current) {
      const { nodes, links } = graphData;

      // Set the dimensions and margins of the graph
      const width = 800,
        height = 600;

      // Append the SVG object to the container
      const svg = d3
        .select(d3Container.current)
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px solid black"); // Just to see the canvas boundaries

      // Initialize the links
      const link = svg
        .selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#aaa");

      // Initialize the nodes
      const node = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 5) // Radius of node circle
        .style("fill", "#69b3a2");

      // Let's list the force we wanna apply on the network
      const simulation = d3
        .forceSimulation(nodes) // Force algorithm is applied to data.nodes
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        ) // This force provides links between nodes
        .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes
        .force("center", d3.forceCenter(width / 2, height / 2)); // This force attracts nodes to the center of the svg area

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation.on("tick", () => {
        // Update node positions on each tick
        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        // Update link positions on each tick
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
      });
    }
  }, [graphData]); // Redraw the graph whenever the data changes

  return <svg ref={d3Container}></svg>;
};

export default GraphVisualization;
