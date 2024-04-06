import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GraphVisualization = ({ graphData }) => {
  const [tooltip, setTooltip] = useState({
    display: "none",
    label: "",
    x: 0,
    y: 0,
  });
  const d3Container = useRef(null);
  const width = 800,
    height = 600; // Define size

  useEffect(() => {
    if (
      graphData &&
      graphData.nodes &&
      graphData.links &&
      d3Container.current
    ) {
      // Clear the container first
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3
        .select(d3Container.current)
        .attr("viewBox", [0, 0, width, height])
        .style("border", "1px solid #00487C")
        .style("background-color", "#ffffff");

      // Create a container for zooming and panning
      const container = svg.append("g").attr("cursor", "grab");

      // Define the zoom behavior
      const zoomBehavior = d3
        .zoom()
        .scaleExtent([0.1, 4]) // Limit the zoom scale
        .on("zoom", (event) => {
          container.attr("transform", event.transform);
        });

      svg.call(zoomBehavior);

      // Now apply the initial transform
      if (!d3Container.current.__zoom) {
        const initialTransform = d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(0.1); // Adjusted initial scale to match the initial zoom level
        zoomBehavior.transform(svg, initialTransform);
      }

      // Create the simulation with forces
      const simulation = d3
        .forceSimulation(graphData.nodes)
        .force(
          "link",
          d3.forceLink(graphData.links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody().strength(-15)) // Further reduced repulsion force
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(10)); // Collision force to keep nodes separated

      // Apply zoom behavior to the container
      svg.call(
        d3.zoom().on("zoom", (event) => {
          container.attr("transform", event.transform);
        })
      );

      // Draw the links / edges
      const link = container
        .selectAll(".link")
        .data(graphData.links)
        .join("line")
        .attr("class", "link")
        .style("stroke", "#999")
        .style("stroke-opacity", 0.6)
        .style("stroke-width", (d) => Math.sqrt(d.value));

      // Draw the nodes / vertices
      const node = container
        .selectAll(".node")
        .data(graphData.nodes)
        .join("circle")
        .attr("class", "node")
        .attr("r", 5) // Node radius
        .style("fill", colorByGroup)
        .call(drag(simulation))
        // Tooltip events
        .on("mouseover", (event, d) => {
          setTooltip({
            display: "block",
            label: d.label,
            x: event.pageX,
            y: event.pageY,
          });
        })
        .on("mouseout", () => {
          setTooltip({ display: "none", label: "", x: 0, y: 0 });
        });

      //node.append("title").text((d) => d.label);

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });

      function drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }

      // Coloring function based on the group
      function colorByGroup(d) {
        if (d.group === "Sybil") {
          return "red"; // Sybil nodes in red
        }
        if (d.group === "Legitimate") {
          return "green"; // Sybil nodes in red
        } else {
          const scale = d3.scaleOrdinal(d3.schemeCategory10);
          return scale(d.group);
        }
      }
    }
  }, [graphData]); // Dependency array includes graphData to update the visualizatios

  return (
    <div>
      <svg ref={d3Container} width={width} height={height} />
      <div
        className="tooltip"
        style={{
          display: tooltip.display,
          position: "absolute",
          left: tooltip.x + 10,
          top: tooltip.y + 10,
          backgroundColor: "transparent",
          padding: "5px",
          border: "",
          pointerEvents: "none", // Prevent the tooltip from capturing mouse events
          zIndex: 1000,
        }}
      >
        {tooltip.label}
      </div>
    </div>
  );
};

export default GraphVisualization;
