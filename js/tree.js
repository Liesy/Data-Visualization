TreeChartNode = {
  name: "",
  children: [],
};

toTreeChartRootNode = (data) => ({
  name: "root",
  children: data.map((item) => ({
    name: item.class,
    children: Object.entries(item.count).map(([key, value]) => ({
      name: key,
      children: [],
      value,
    })),
  })),
});

let dataset3;
d3.csv("../dataset/exp1_titanic_disaster.csv", d3.autoType).then((data) => {
  dataset3 = toChartItem(data);
  console.log(dataset3);

  const padding = 1.5;

  const root = d3
    .hierarchy(toTreeChartRootNode(dataset3))
    .sum((d) => d.value || 0);

  d3.treemap().size([width, height]).padding(padding)(root);

  let svg = d3
    .select(".tree_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("fill", (d) => colorMap(d.parent.data.name, d.data.name));

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => (d.x0 + d.x1) / 2) // +10 to adjust position (more right)
    .attr("y", (d) => (d.y0 + d.y1) / 2 + 5) // +20 to adjust position (lower)
    .text((d) => d.data.name)
    .attr("font-size", 18)
    .attr("text-anchor", "middle")
    .attr("fill", "white");
});
