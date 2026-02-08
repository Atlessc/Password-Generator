# Tabs Component Documentation

The `Tabs` component provides a responsive and accessible tab interface that integrates with global CSS variables for consistent theming. It supports URL syncing, dynamic styling, and optimized rendering with memoization.

---

## Overview

The `Tabs` component consists of the following parts:
1. **`Tabs`**: The main wrapper that manages active tab state and URL syncing.
2. **`TabsList`**: The container for the tab triggers.
3. **`TabsTrigger`**: Individual tab buttons for navigation.
4. **`TabsContent`**: The content area associated with a specific tab.

---

## Code

### Main Tabs Component

----code start {javascript}----
export const Tabs = ({ defaultValue, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromUrl = () => {
    const urlSearchParams = new URLSearchParams(location.search);
    return urlSearchParams.get('tab') || defaultValue;
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);

  useEffect(() => {
    const tabFromUrl = getTabFromUrl();
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    if (urlSearchParams.get('tab') !== activeTab) {
      urlSearchParams.set('tab', activeTab);
      navigate(`?${urlSearchParams.toString()}`, { replace: true });
    }
  }, [activeTab, navigate]);

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type.displayName === 'TabsList') {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return React.cloneElement(child, { activeTab });
      })}
    </div>
  );
};
----code end----

### TabsList Component

----code start {javascript}----
export const TabsList = memo(({ activeTab, setActiveTab, children }) => (
  <ResponsiveTabsList>
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        key: `tab-trigger-${index}`,
        isActive: activeTab === child.props.value,
        onClick: () => setActiveTab(child.props.value),
      })
    )}
  </ResponsiveTabsList>
));

TabsList.displayName = 'TabsList';
----code end----

### TabsTrigger Component

----code start {javascript}----
export const TabsTrigger = memo(({ isActive, onClick, children }) => (
  <StyledTabButton onClick={onClick} $isActive={isActive}>
    {children}
  </StyledTabButton>
));
----code end----

### TabsContent Component

----code start {javascript}----
export const TabsContent = memo(({ value, activeTab, children }) => {
  return activeTab === value ? <div>{children}</div> : null;
});
----code end----

---

## Styling Tokens

The `Tabs` component uses the following global CSS variables:

| **Variable**         | **Description**                                      |
|----------------------|------------------------------------------------------|
| `--color-primary`    | Active tab background color.                         |
| `--color-secondary`  | Background color for the inactive tabs.              |
| `--color-hover`      | Background color for hover states.                   |
| `--color-muted`      | Background color for inactive hover states.          |
| `--color-text`       | Text color for the tab.                              |
| `--border-width`     | Thickness of the tab border.                         |
| `--radius-md`        | Border radius for rounded corners.                   |
| `--spacing-md`       | Spacing between tabs.                                |
| `--spacing-xs`       | Padding for compact spacing.                         |
| `--font-size-sm`     | Font size for tab buttons.                           |
| `--font-size-xs`     | Smaller font size for mobile devices.                |
| `--transition-medium`| Transition duration for hover effects.               |

---

## Props

### Tabs

| **Prop**        | **Type**      | **Default** | **Description**                           |
|------------------|---------------|-------------|-------------------------------------------|
| `defaultValue`   | `string`      | `undefined` | The default tab to show.                  |
| `children`       | `ReactNode`   | `undefined` | Must include `TabsList` and `TabsContent`.|

### TabsList

| **Prop**        | **Type**      | **Default** | **Description**                           |
|------------------|---------------|-------------|-------------------------------------------|
| `children`       | `ReactNode`   | `undefined` | A collection of `TabsTrigger` components. |

### TabsTrigger

| **Prop**        | **Type**      | **Default** | **Description**                           |
|------------------|---------------|-------------|-------------------------------------------|
| `isActive`       | `boolean`     | `false`     | Whether the tab is currently active.      |
| `onClick`        | `func`        | `undefined` | Callback when the tab is clicked.         |
| `children`       | `ReactNode`   | `undefined` | The content of the tab trigger.           |

### TabsContent

| **Prop**        | **Type**      | **Default** | **Description**                           |
|------------------|---------------|-------------|-------------------------------------------|
| `value`          | `string`      | `undefined` | The value associated with the tab.        |
| `activeTab`      | `string`      | `undefined` | The currently active tab value.           |
| `children`       | `ReactNode`   | `undefined` | The content to display for the active tab.|

---

## Example Usage

### Basic Tabs Component

----code start {javascript}----
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const Example = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content for Tab 1</TabsContent>
    <TabsContent value="tab2">Content for Tab 2</TabsContent>
    <TabsContent value="tab3">Content for Tab 3</TabsContent>
  </Tabs>
);
----code end----

---

## Accessibility

1. **Keyboard Navigation**:
   - Fully keyboard-accessible. Use `Tab` to navigate between `TabsTrigger` elements.

2. **Responsive Design**:
   - Adjusts font sizes and spacing for mobile and tablet screens.

---

## Customization

To customize the `Tabs` component:
1. Modify global tokens in `GlobalStyles.js` or `theme.js`:
   - Example: Change `--color-primary` for active tab color.
   - Example: Adjust `--radius-md` for rounded or sharp tab corners.

2. Extend styles with additional classes or styled components.

---

## Changelog

### v1.1.0
- Integrated global CSS variables for consistent theming.
- Enhanced responsive behavior.

### v1.0.0
- Initial release with static styles and URL syncing.
