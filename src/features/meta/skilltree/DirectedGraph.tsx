import { useEffect, useId, useRef } from "react";
import { useAppSelector } from "../../../app/store";
const d3 = require("d3");

function renderGraph(canvas: HTMLCanvasElement, nodes: any) {
  const width = canvas.width;
  const height = canvas.height;
  nodes = JSON.parse(JSON.stringify(nodes));
  const links = nodes.flatMap((s: any) =>
    s.requiredSkills.map((r: any) => ({
      source: s,
      target: nodes.find((n: any) => n.id === r.toLowerCase()),
      value: 1,
    }))
  );
  var simulation = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id(function (d: any) {
        return (d as any).id;
      })
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter());

  simulation.nodes(nodes as any).on("tick", ticked);
  simulation.force("link").links(links);

  d3.select(canvas).call(
    d3
      .drag()
      .container(canvas)
      .subject(dragsubject)
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  );

  if (!canvas) {
    return;
  }
  const context = canvas.getContext("2d");

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

  function dragsubject(event: any) {
    if (!event) {
      return;
    }
    console.log("drag", event);
    return simulation.find(event.x, event.y);
  }

  function dragstarted(event: any) {
    if (!event) {
      return;
    }
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    if (!event) {
      return;
    }
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event) {
      return;
    }
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
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

  return simulation;
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
    const sim = renderGraph(canvasRef.current, nodes);
    console.log("simulation started", sim);
    return function () {
      console.log("simulation stopped", sim);
      sim.stop();
    };
  }, [nodes]);
  return (
    <div id={id} style={{ height: "100%" }}>
      <canvas ref={canvasRef} width="1000" height="1000"></canvas>
    </div>
  );
};

export default DirectedGraph;
