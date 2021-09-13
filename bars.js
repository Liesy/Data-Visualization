let width = 300;
let height = 300;
let svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
let dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度)
let rect_height = 25;
svg.selectAll("rect") //选择svg内所有的矩形
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