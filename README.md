**@vladoavocado/mui-context-menu** is a React library that simplifies creating a context menu based on [Material UI (MUI)](https://mui.com/). With this package, you can quickly add a context menu to your application supporting nested items, custom item markup, and closing on outside clicks.

## Features

- **React Context–based** – All menu management logic is provided through the React Context API.
- **Nested Menus** – Menu items can include `children`, allowing for multi-level nesting.
- **Customizable** – Any React element can be used as a menu item.
- **Outside Click Detection** – Automatically closes the menu when the user clicks outside of it.
- **MUI Integration** – Designed to work seamlessly with Material UI v5/v6.

## Installation

Make sure you have `react`, `react-dom`, and the necessary MUI dependencies installed:

```bash
npm install @vladoavocado/mui-context-menu
# or
yarn add @vladoavocado/mui-context-menu
```

> Note: In peerDependencies, the following are required:
> - react >= 18
> - react-dom >= 18
> - @mui/material >= 5
> - @mui/icons-material >= 5
> - @emotion/react >= 11 and @emotion/styled >= 11

Check that you have matching versions or install these packages accordingly.

## Quick Start
1. Wrap your application with the provider
   To use the context, you must wrap your application (or the necessary part of it) with the withMUIContextMenuProvider higher-order component:
```tsx
import React from 'react';
import { withMUIContextMenuProvider } from '@vladoavocado/mui-context-menu';
import { YourApp } from './YourApp';

const AppWithProvider = withMUIContextMenuProvider(YourApp);

export function App() {
  return <AppWithProvider />;
}
```
2. Use the useMUIContextMenu hook to show the menu
   In the component where you want to manage the context menu, import the useMUIContextMenu hook and define your menu items.
```tsx
import React, { useState, useMemo } from 'react';
import { Button } from '@mui/material';
import { useMUIContextMenu } from '@vladoavocado/mui-context-menu';

function ExampleMenuButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Define the list of menu items
  const menuItems = useMemo(
    () => [
      { text: 'Settings' },
      { text: 'Profile' },
      {
        text: 'View',
        children: [
          { text: 'Theme' },
          { text: 'Notifications' },
        ],
      },
    ],
    []
  );

  // Use the hook, providing the items and the reference to the element (anchor)
  const { show, hide } = useMUIContextMenu({
    items: menuItems,
    anchorRef: anchorEl,
  });

  return (
    <Button
      variant="contained"
      ref={(ref) => setAnchorEl(ref)}
      onClick={() => {
        show(); // show the menu on click
      }}
      onBlur={() => {
        hide(); // optionally hide the menu on blur
      }}
    >
      Open Menu
    </Button>
  );
}

export default ExampleMenuButton;
```
Now, when you click the button, the context menu will appear. The library automatically handles clicks outside the menu to hide it.

## License
[MIT](https://mit-license.org/)
