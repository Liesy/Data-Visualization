let dataset;
d3.csv("../dataset/exp1_titanic_disaster.csv", d3.autoType).then((data) => {
  dataset = toChartItem(data);
  console.log(dataset);

  //比例尺
  const x = d3
    .scaleBand()
    .domain(dataset.map((item) => item.class))
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([
      d3.max(
        dataset,
        (item) => Math.max(item.count.female, item.count.male) || 0
      ),
      0,
    ])
    .range([margin.top, height - margin.bottom]);

  //画布
  let svg = d3
    .select(".bar_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //x轴
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));
  //y轴
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));
  //添加female
  svg
    .selectAll(".female_bar")
    .data(dataset)
    .enter()
    .append("g")
    .attr("class", "female_bar")
    .append("rect")
    .attr("fill", (d) => colorMap(d.class, "female"))
    .attr("x", (item) => x(item.class) || null)
    .attr("width", x.bandwidth() / 2)
    .attr("y", (item) => y(item.count.female))
    .attr("height", (item) => y(0) - y(item.count.female));
  svg
    .selectAll(".female_label")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "female_label")
    .text((item) => item.count.female)
    .attr("x", (item) => (x(item.class) || 0) + x.bandwidth() / 4)
    .attr("y", (item) => y(item.count.female) - 4)
    .attr("font-size", 18)
    .attr("text-anchor", "middle");
  //添加male
  svg
    .selectAll(".male_bar")
    .data(dataset)
    .enter()
    .append("g")
    .attr("class", "male_bar")
    .append("rect")
    .attr("fill", (d) => colorMap(d.class, "male"))
    .attr("x", (item) => (x(item.class) || null) + x.bandwidth() / 2)
    .attr("width", x.bandwidth() / 2)
    .attr("y", (item) => y(item.count.male))
    .attr("height", (item) => y(0) - y(item.count.male));
  svg
    .selectAll(".male_label")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "male_label")
    .text((item) => item.count.male)
    .attr("x", (item) => (x(item.class) || 0) + (x.bandwidth() * 3) / 4)
    .attr("y", (item) => y(item.count.male) - 4)
    .attr("font-size", 18)
    .attr("text-anchor", "middle");
});
