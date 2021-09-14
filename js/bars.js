const width = 300;
const height = 300;

//创建画布
let svg = d3.select(".bar_chart").append("svg").attr("width", width).attr("height", height)
let dataset;
d3.csv("../dataset/exp1_titanic_disaster.csv", d3.autoType).then(data => {
  dataset = data;
  console.log(dataset.map(item => item.Class))
})

//选择svg内所有的矩形
svg.selectAll("rect")
  .data(dataset) //绑定数组
  .enter() //指定选择集的enter部分
  .append("rect") //添加足够数量的矩形元素
  .attr("x", 20)
  .attr("y", function (d, i) {
    return i * rect_height;
  })
  .attr("width", function (d) {
    return d;
  })
  .attr("height", rect_height - 2)
  .attr("fill", "steelblue"); //给矩形元素设置颜色