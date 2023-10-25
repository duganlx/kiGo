# G2Plot

## 存在问题

- 官方文档与源代码不一致
  - yAxis 的 title 无法旋转
  - Mix 组件 Legend 配置类型不对
- 文档说明不清晰全面，源代码中有些参数类型为 any，无法确定其如何使用

## 参数说明

### `renderer`

在 G2Plot 中，可以通过设置 renderer 属性来指定图表的渲染方式，可以选择 'canvas' 或 'svg'。这两种渲染方式具有一些区别：

- 使用 <canvas> 元素进行绘制，绘制效率高，适用于大规模数据和复杂图表。能够更好地处理大量数据，对于数据量较大的图表，Canvas 渲染方式通常能够提供更好的性能和响应速度。支持动画效果和交互行为。
- 使用 <svg> 元素进行绘制，绘制效果更平滑、清晰，对于细节要求较高的图表可以获得更好的视觉效果。支持矢量图形，图表可以无损缩放和变换，适合在高分辨率设备上展示。对于简单的图表和小规模数据，SVG 渲染方式通常能够提供良好的可视化效果。

需要注意的是，SVG 渲染方式可能会占用更多的内存和计算资源，因为 SVG 图形本身是基于文档对象模型（DOM）的，每个数据点都是一个独立的元素。而 Canvas 渲染方式是通过绘制像素进行的，不需要额外的 DOM 元素。