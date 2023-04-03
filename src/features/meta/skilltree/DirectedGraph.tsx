import { useEffect, useId, useRef } from "react";
import { useAppSelector } from "../../../app/store";
const d3 = require('d3');

function renderGraph(canvas: HTMLCanvasElement, nodes: any) {
  nodes = JSON.parse(JSON.stringify(nodes))
  const links = nodes.flatMap((s: any) =>
    s.requiredSkills.map((r: any) => ({
      source: s,
      target: nodes.find((n: any) => n.id === r.toLowerCase()),
      value: 1,
    }))
  );
  var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d: any) { return (d as any).id; }))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter());
  
  simulation.nodes(nodes as any).on("tick", ticked);
  simulation.force("link").links(links);

  const width = 1000;
  const height = 1000;
  if (!canvas) {
    return;
  }
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  function ticked() {
    if (!context) {
      return;
    }
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2 + 40);

    context.beginPath();
    links.forEach(drawLink);
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    nodes.forEach(drawNode);
    context.fill();
    context.strokeStyle = "#fff";
    context.stroke();

    context.restore();
  }

  function drawLink(d: any) {
    if (!context) {
      return;
    }
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }
  
  function drawNode(d: any) {
    if (!context) {
      return;
    }
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    context.strokeText(d.name, d.x + 7, d.y + 3);
  }
}

const DirectedGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skills = useAppSelector((state) => state.skilltree);
  const nodes = skills.map((s) => ({ ...s, group: s.tier, id: s.name }));
  
  const id = "lemx32";
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    renderGraph(canvasRef.current, nodes);
  }, [nodes]);
  return <div id={id} style={{ height: "100%" }}>
    <canvas ref={canvasRef}></canvas>
  </div>;
};

export default DirectedGraph;
