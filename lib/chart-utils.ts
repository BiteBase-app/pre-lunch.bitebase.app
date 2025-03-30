// Helper function to create VisActor chart specifications
export function createChartSpec(type: string, data: any[], options: any = {}) {
  const defaultOptions = {
    width: "auto",
    height: 400,
    padding: [40, 40, 60, 60],
    background: "#f8f9fa",
  }

  const mergedOptions = { ...defaultOptions, ...options }

  switch (type) {
    case "bar":
      return createBarChartSpec(data, mergedOptions)
    case "line":
      return createLineChartSpec(data, mergedOptions)
    case "pie":
      return createPieChartSpec(data, mergedOptions)
    case "scatter":
      return createScatterChartSpec(data, mergedOptions)
    case "heatmap":
      return createHeatmapSpec(data, mergedOptions)
    default:
      throw new Error(`Unsupported chart type: ${type}`)
  }
}

function createBarChartSpec(data: any[], options: any) {
  const { xField = "x", yField = "y", colorField, padding, background } = options

  return {
    type: "bar",
    background,
    padding,
    data: [
      {
        id: "source",
        values: data,
      },
    ],
    scales: [
      {
        id: "xScale",
        type: "band",
        domain: { data: "source", field: xField },
        range: "width",
        padding: 0.2,
      },
      {
        id: "yScale",
        type: "linear",
        domain: { data: "source", field: yField },
        range: "height",
        nice: true,
        zero: true,
      },
      colorField
        ? {
            id: "colorScale",
            type: "ordinal",
            domain: { data: "source", field: colorField },
            range: ["#1E88E5", "#FFC107", "#D81B60", "#7CB342", "#8E24AA", "#00ACC1", "#FF7043", "#5E35B1"],
          }
        : null,
    ].filter(Boolean),
    axes: [
      {
        orient: "bottom",
        scale: "xScale",
        title: options.xTitle || "",
        grid: true,
      },
      {
        orient: "left",
        scale: "yScale",
        title: options.yTitle || "",
        grid: true,
        tickCount: 5,
      },
    ],
    marks: [
      {
        type: "bar",
        from: { data: "source" },
        encode: {
          x: { scale: "xScale", field: xField },
          y: { scale: "yScale", field: yField },
          width: { scale: "xScale", band: 1 },
          fill: colorField ? { scale: "colorScale", field: colorField } : "#1E88E5",
          tooltip: [{ field: xField }, { field: yField }],
        },
      },
    ],
  }
}

function createLineChartSpec(data: any[], options: any) {
  const { xField = "x", yField = "y", seriesField, padding, background } = options

  if (!seriesField) {
    // Single line chart
    return {
      type: "line",
      background,
      padding,
      data: [
        {
          id: "source",
          values: data,
        },
      ],
      scales: [
        {
          id: "xScale",
          type: options.xScaleType || "linear",
          domain: { data: "source", field: xField },
          range: "width",
        },
        {
          id: "yScale",
          type: "linear",
          domain: { data: "source", field: yField },
          range: "height",
          nice: true,
          zero: true,
        },
      ],
      axes: [
        {
          orient: "bottom",
          scale: "xScale",
          title: options.xTitle || "",
          grid: true,
        },
        {
          orient: "left",
          scale: "yScale",
          title: options.yTitle || "",
          grid: true,
          tickCount: 5,
        },
      ],
      marks: [
        {
          type: "line",
          from: { data: "source" },
          encode: {
            x: { scale: "xScale", field: xField },
            y: { scale: "yScale", field: yField },
            stroke: options.lineColor || "#1E88E5",
            strokeWidth: 2,
            tooltip: [{ field: xField }, { field: yField }],
          },
        },
        {
          type: "symbol",
          from: { data: "source" },
          encode: {
            x: { scale: "xScale", field: xField },
            y: { scale: "yScale", field: yField },
            fill: options.pointColor || "#1E88E5",
            size: 30,
            tooltip: [{ field: xField }, { field: yField }],
          },
        },
      ],
    }
  } else {
    // Multi-line chart
    // Implementation would go here
    return {}
  }
}

function createPieChartSpec(data: any[], options: any) {
  const { valueField = "value", categoryField = "category", padding, background } = options

  return {
    type: "pie",
    background,
    padding,
    data: [
      {
        id: "source",
        values: data,
      },
    ],
    scales: [
      {
        id: "colorScale",
        type: "ordinal",
        domain: { data: "source", field: categoryField },
        range: ["#1E88E5", "#FFC107", "#D81B60", "#7CB342", "#8E24AA", "#00ACC1", "#FF7043", "#5E35B1"],
      },
    ],
    marks: [
      {
        type: "arc",
        from: { data: "source" },
        encode: {
          theta: { field: valueField },
          color: { scale: "colorScale", field: categoryField },
          tooltip: [{ field: categoryField }, { field: valueField }],
        },
        style: {
          stroke: "#fff",
          strokeWidth: 1,
        },
      },
    ],
    legends: [
      {
        type: "discrete",
        orient: "right",
        title: options.legendTitle || "",
        encode: {
          color: { scale: "colorScale", field: categoryField },
        },
      },
    ],
  }
}

function createScatterChartSpec(data: any[], options: any) {
  // Implementation would go here
  return {}
}

function createHeatmapSpec(data: any[], options: any) {
  // Implementation would go here
  return {}
}

