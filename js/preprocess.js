const width = 720;
const height = 600;
const margin = {
  top: 40,
  bottom: 40,
  left: 40,
  right: 40,
};

//数据预处理
const toChartItem = (rawData) =>
  rawData.reduce((prev, rawDataItem) => {
    let prevItem = prev.find((item) => item.class === rawDataItem.Class);
    if (!prevItem) {
      prevItem = { class: rawDataItem.Class, count: { female: 0, male: 0 } };
      prev.push(prevItem);
    }
    prevItem.count[rawDataItem.Sex] += rawDataItem.Count;
    return prev;
  }, []);

const colorMap = (className, gender) => {
  const map = {
    first: { female: "#ffa925", male: "#e88300" },
    second: { female: "#36e28a", male: "#00b965" },
    third: { female: "#55d3ff", male: "#00abea" },
    crew: { female: "#cf8fff", male: "#a569ea" },
  };
  return map[className][gender];
};
