import {
  AreaStyleOptions,
  ChartOptions,
  ColorType,
  DeepPartial,
  SeriesOptionsCommon,
} from "lightweight-charts";

const chartDarkOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.Solid,
      color: "#2B2B43",
    },
    //lineColor: "#2B2B43",
    textColor: "#D9D9D9",
  },
  watermark: {
    color: "rgba(0, 0, 0, 0)",
  },
  grid: {
    vertLines: {
      color: "#2B2B43",
    },
    horzLines: {
      color: "#363C4E",
    },
  },
};
const chartLightOptions: DeepPartial<ChartOptions> = {
  layout: {
    background: {
      type: ColorType.Solid,
      color: "#FFFFFF",
    },
    //lineColor: "#2B2B43",
    textColor: "#191919",
  },
  watermark: {
    color: "rgba(0, 0, 0, 0)",
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      color: "#f0f3fa",
    },
  },
};

const areaLightOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
  topColor: "rgba(33, 150, 243, 0.56)",
  bottomColor: "rgba(33, 150, 243, 0.04)",
  lineColor: "rgba(33, 150, 243, 1)",
  priceFormat: { type: "volume" },
};

const areaDarkOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
  topColor: "rgba(32, 226, 47, 0.56)",
  bottomColor: "rgba(32, 226, 47, 0.04)",
  lineColor: "rgba(32, 226, 47, 1)",
  priceFormat: { type: "volume" },
};

export default {
  investment: {
    agencyCutPercentage: .4,
    simulatedHistoryLength: 365,
    numberOfInvestments: 50,
    chart: {
      ratio: 0.7,
      theme: {
        dark: {
          chart: chartDarkOptions,
          series: areaDarkOptions,
        },
        light: {
          chart: chartLightOptions,
          series: areaLightOptions,
        },
      },
    },
  },
};
