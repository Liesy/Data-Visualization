const radius =
  Math.min(
    width - margin.left - margin.right,
    height - margin.top - margin.bottom
  ) / 2;

let dataset2;
d3.csv("../dataset/exp1_titanic_disaster.csv", d3.autoType).then((data) => {
  dataset2 = toChartItem(data);
  console.log(dataset2);

  let svg = d3
    .select(".pie_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("g")
    .attr("class", "plot-area")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const pieChartData = d3.pie().value((d) => d[1]);

  dataset2.forEach((item, index, array) => {
    const arc = d3
      .arc()
      .innerRadius((radius * (index + 1)) / (array.length + 1) + 5)
      .outerRadius((radius * (index + 2)) / (array.length + 1));

    const subData = Object.entries(item.count);

    svg
      .selectAll("plot-area")
      .data(pieChartData(subData))
      .join("path")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .attr("d", arc)
      .attr("fill", (d) => colorMap(dataset2[index].class, d.data[0]));

    svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("text")
      .data(pieChartData(subData))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("font-size", 18)
      .attr("text-anchor", "middle")
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "0.5em")
          .text(
            (d) =>
              `${Math.round(((d.endAngle - d.startAngle) / Math.PI) * 50)}%`
          )
      );
  });
});
