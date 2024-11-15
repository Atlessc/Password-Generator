# Tooltip Component Documentation

This documentation explains how to use and customize the versatile `Tooltip` component. The `Tooltip` component is designed for flexibility, offering options for hover or click triggers, customizable styles, and advanced features such as floating tooltips and arrow customization.

---

## Installation

Ensure you have `styled-components` installed in your project:

```bash
npm install styled-components
```

Add the `Tooltip` component to your project by copying the implementation or placing it in a file like `Tooltip.js`.

---

## Basic Usage

```jsx
import Tooltip from './Tooltip';

const App = () => (
  <Tooltip text="Hello, I'm a tooltip!">
    <button>Hover me</button>
  </Tooltip>
);
```

By default:
- The tooltip appears on hover.
- It is positioned at the top of the anchor element.
- It has an arrow pointing toward the anchor element.

---

## Props

| **Prop**          | **Type**    | **Default** | **Description**                                                                 |
|--------------------|-------------|-------------|---------------------------------------------------------------------------------|
| `text`            | `string`    | `''`        | The content displayed inside the tooltip.                                      |
| `position`        | `string`    | `'top'`     | Tooltip position relative to the anchor. Options: `'top'`, `'bottom'`, `'left'`, `'right'`. |
| `trigger`         | `string`    | `'hover'`   | Controls how the tooltip is triggered. Options: `'hover'`, `'click'`.          |
| `backgroundColor` | `string`    | `'#333'`    | Background color of the tooltip box.                                           |
| `opacity`         | `number`    | `0.9`       | Opacity of the tooltip box.                                                    |
| `delay`           | `number`    | `0`         | Delay (in milliseconds) before showing or hiding the tooltip.                  |
| `allowEnter`      | `boolean`   | `true`      | If `true`, the tooltip remains visible when hovered.                           |
| `arrow`           | `boolean`   | `true`      | If `true`, an arrow is displayed pointing to the anchor element.               |
| `arrowSize`       | `number`    | `5`         | Size (in pixels) of the arrow.                                                 |
| `arrowColor`      | `string`    | Same as `backgroundColor` | Color of the arrow.                                              |
| `float`           | `boolean`   | `false`     | If `true`, the tooltip follows the mouse inside the anchor element.            |

---

## Advanced Examples

### 1. **Custom Background, Opacity, and Arrow**

```jsx
<Tooltip
  text="Custom tooltip"
  backgroundColor="#007BFF"
  opacity={0.95}
  arrowSize={10}
  arrowColor="#007BFF"
>
  <button>Hover me</button>
</Tooltip>
```

### 2. **Click Trigger**

```jsx
<Tooltip
  text="Click to show tooltip"
  trigger="click"
>
  <button>Click me</button>
</Tooltip>
```

### 3. **Tooltip with Delay**

```jsx
<Tooltip
  text="I appear with a delay"
  delay={500}
>
  <button>Hover me</button>
</Tooltip>
```

### 4. **Floating Tooltip**

```jsx
<Tooltip
  text="I follow the mouse!"
  float={true}
  backgroundColor="lightgreen"
>
  <span>Hover me</span>
</Tooltip>
```

### 5. **Tooltip Positioned to the Bottom**

```jsx
<Tooltip
  text="Tooltip below"
  position="bottom"
>
  <button>Hover me</button>
</Tooltip>
```

### 6. **Tooltip that Allows Interaction**

```jsx
<Tooltip
  text="You can interact with this tooltip"
  allowEnter={true}
>
  <button>Hover me</button>
</Tooltip>
```

---

## Styling

### Default Tooltip Box Styles
- The tooltip box is styled with `styled-components` and dynamically adapts to props like `backgroundColor`, `opacity`, and `position`.

### Default Arrow Styles
- The arrow is a triangle created using CSS borders.
- You can customize its size with the `arrowSize` prop and its color with the `arrowColor` prop.

---

## Behavior

### Trigger Options
- **Hover**: The tooltip shows when the user hovers over the anchor element.
- **Click**: The tooltip toggles visibility when the anchor element is clicked.

### Interaction
- If `allowEnter` is `true`, the tooltip will remain visible when the user hovers over it.

### Delayed Appearance
- The `delay` prop lets you add a delay before showing or hiding the tooltip.

### Floating Tooltip
- When `float` is `true`, the tooltip follows the mouse pointer inside the anchor element.

---

## Accessibility

This component includes basic accessibility features:
- Tooltips triggered by `hover` can also be displayed via keyboard focus (`onFocus`) and hidden with blur (`onBlur`).
- For `click` triggers, the tooltip toggles on click, allowing keyboard users to interact as well.

---

## Changelog

### v2.0.0
- Added `trigger` prop for hover or click modes.
- Added `delay` prop for customizable show/hide delays.
- Introduced `allowEnter` for hover interaction with the tooltip.
- Added `arrow` prop to toggle arrow visibility.
- Added `float` option for mouse-following tooltips.
- Introduced `arrowSize` and `arrowColor` for custom arrow styles.
