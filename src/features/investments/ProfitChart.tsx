import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { useEffect, useId, useRef, useState } from "react";
import { useAppSelector } from "../../app/store";
import { selectInvestmentById } from "./InvestmentsSlice";
import { format } from "date-fns";
import useDarkMode from "../../components/useDarkMode";
import config from "../../app/config";

type Props = {
  id: string;
};

const ProfitChart: React.FC<Props> = (props) => {
  const elementId = useId();
  const container = useRef<HTMLDivElement>(null);
  const item = useAppSelector(selectInvestmentById(props.id));
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [area, setArea] = useState<ISeriesApi<"Area"> | null>(null);
  const dark = useDarkMode();

  // create chart
  useEffect(() => {
    if (!container.current) {
      return;
    }

    const size = {
      width: document.body.clientWidth,
      height: Math.floor(document.body.clientWidth * config.investment.chart.ratio),
    };
    console.log("[Chart] construct", size);
    const api = createChart(container.current, size);
    const area = api.addAreaSeries({
      topColor: "rgba(33, 150, 243, 0.56)",
      bottomColor: "rgba(33, 150, 243, 0.04)",
      lineColor: "rgba(33, 150, 243, 1)",
      lineWidth: 2,
    });
    setChart(api);
    setArea(area);

    return function cleanup() {
      console.log("[Chart] cleanup");
      api.removeSeries(area);
      api.remove();
    };
  }, [container.current]);

  // update records
  useEffect(() => {
    if (!item || !item.history.length || !area) {
      return;
    }

    console.log("[Chart] update data", item.history.length);
    const records = item.history.map((h) => ({
      time: format(h.time, "yyyy-MM-dd"),
      value: h.value,
    }));
    area.setData(records);
  }, [item?.history, area]);

  // update theme
  useEffect(() => {
    if (!chart || !area) {
      return;
    }

    const data = dark
      ? config.investment.chart.theme.dark
      : config.investment.chart.theme.light;

    chart.applyOptions(data.chart);
    area.applyOptions(data.series);
  }, [dark, chart, area]);

  return (
    <div id={elementId} ref={container}></div>
  );
};

export default ProfitChart;
