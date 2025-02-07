import { createContext, useContext, useEffect, useMemo, createElement, Fragment, useState, useRef, useCallback } from 'react';
import { Stack, Typography, Box, Menu as Menu$1 } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha } from '@mui/material/styles';

// file: packages/mui-context-menu/src/context/ContextMenuContext.ts
var noop = function noop() {
  console.info('Context menu is not initialized. Please wrap your component in <ContextMenuProvider>.');
};
var ContextMenuContext = /*#__PURE__*/createContext({
  openMenu: noop,
  closeMenu: noop,
  disableCloseOnOutsideClick: noop,
  isOpen: false
});

var useMUIContextMenu = function useMUIContextMenu(_ref) {
  var items = _ref.items,
    anchorRef = _ref.anchorRef,
    menuProps = _ref.menuProps,
    menuItemProps = _ref.menuItemProps;
  var _useContext = useContext(ContextMenuContext),
    isOpen = _useContext.isOpen,
    baseOpenMenu = _useContext.openMenu,
    baseCloseMenu = _useContext.closeMenu;
  return {
    isOpen: isOpen,
    openMenu: function openMenu() {
      baseOpenMenu({
        anchor: anchorRef || null,
        items: items,
        menuProps: menuProps,
        itemProps: menuItemProps
      });
    },
    closeMenu: baseCloseMenu,
    disableCloseOnOutsideClick: function disableCloseOnOutsideClick() {}
  };
};

var useClickOutside = function useClickOutside(anchors, onClose) {
  useEffect(function () {
    function handleClickOutside(event) {
      if (!anchors) {
        return;
      }
      var isClickInside = anchors.some(function (ref) {
        return ref == null ? void 0 : ref.contains(event.target);
      });
      if (!isClickInside) {
        onClose == null || onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchors, onClose]);
};

var useMuiContextMenuSettings = function useMuiContextMenuSettings() {
  var _useContext = useContext(ContextMenuContext),
    disableCloseOnOutsideClick = _useContext.disableCloseOnOutsideClick,
    closeMenu = _useContext.closeMenu,
    isOpen = _useContext.isOpen;
  return useMemo(function () {
    return {
      disableCloseOnOutsideClick: disableCloseOnOutsideClick,
      closeMenu: closeMenu,
      isOpen: isOpen
    };
  }, [disableCloseOnOutsideClick, isOpen]);
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

function IconText(_ref) {
  var text = _ref.text,
    startAdornment = _ref.startAdornment,
    endAdornment = _ref.endAdornment,
    hasChildren = _ref.hasChildren,
    textProps = _ref.textProps;
  if (typeof text !== 'string') {
    return createElement(Fragment, null, text);
  }
  return createElement(Stack, {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'space-between',
    sx: {
      width: '100%'
    }
  }, createElement(Stack, {
    gap: 1,
    alignItems: 'center',
    flexDirection: 'row'
  }, startAdornment, createElement(Typography, Object.assign({}, textProps), text), endAdornment), hasChildren && createElement(ChevronRightIcon, null));
}

var _excluded = ["onMouseEnter", "onMouseLeave", "isHighlighted", "isTextComponent", "highlight", "children"];
function MenuItem(_ref) {
  var onMouseEnter = _ref.onMouseEnter,
    onMouseLeave = _ref.onMouseLeave,
    isHighlighted = _ref.isHighlighted,
    isTextComponent = _ref.isTextComponent,
    _ref$highlight = _ref.highlight,
    highlight = _ref$highlight === void 0 ? true : _ref$highlight,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return createElement(Box, Object.assign({}, props, {
    sx: [function (_ref2) {
      var palette = _ref2.palette;
      return {
        px: 2,
        py: 1,
        width: '100%',
        pointerEvents: 'all',
        backgroundColor: isHighlighted && highlight ? alpha(palette.primary.light, 0.2) : 'transparent',
        '&:hover': {
          backgroundColor: isTextComponent || highlight ? alpha(palette.primary.light, 0.2) : 'transparent',
          cursor: 'default'
        }
      };
    }].concat(Array.isArray(props.sx) ? props.sx : [props.sx]),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }), children);
}
// event => openMenu(id, event)

function Menu(_ref) {
  var _menuProps$anchorOrig, _menuProps$transformO;
  var items = _ref.items,
    onAddRef = _ref.onAddRef,
    menuProps = _ref.menuProps,
    menuAnchorEl = _ref.menuAnchorEl,
    menuItemProps = _ref.menuItemProps,
    parentIndex = _ref.parentIndex,
    sx = _ref.sx;
  var _useState = useState({}),
    openSubmenus = _useState[0],
    setOpenSubmenus = _useState[1];
  var anchorTimeouts = useRef({});
  var closeMenu = function closeMenu(id) {
    anchorTimeouts.current[id] = setTimeout(function () {
      setOpenSubmenus(function (prevState) {
        var _extends2;
        return _extends({}, prevState, (_extends2 = {}, _extends2[id] = null, _extends2));
      });
      anchorTimeouts.current[id] = null;
    }, 300);
  };
  var openMenu = function openMenu(id, event) {
    var _setOpenSubmenus;
    if (openSubmenus[id]) {
      setOpenSubmenus({});
    }
    if (anchorTimeouts.current[id]) {
      clearTimeout(anchorTimeouts.current[id]);
      anchorTimeouts.current[id] = null;
    }
    setOpenSubmenus((_setOpenSubmenus = {}, _setOpenSubmenus[id] = event.currentTarget, _setOpenSubmenus));
  };
  useEffect(function () {
    if (!menuAnchorEl) {
      setOpenSubmenus({});
    }
  }, [menuAnchorEl]);
  return createElement(Menu$1, {
    ref: function ref(_ref2) {
      if (_ref2) {
        onAddRef == null || onAddRef(_ref2);
      }
    },
    open: Boolean(menuAnchorEl),
    anchorEl: menuAnchorEl,
    anchorOrigin: (_menuProps$anchorOrig = menuProps == null ? void 0 : menuProps.anchorOrigin) != null ? _menuProps$anchorOrig : {
      vertical: 'center',
      horizontal: 'center'
    },
    transformOrigin: (_menuProps$transformO = menuProps == null ? void 0 : menuProps.transformOrigin) != null ? _menuProps$transformO : {
      vertical: 'top',
      horizontal: 'right'
    },
    sx: _extends({
      padding: '1em',
      pointerEvents: 'none',
      '& .MuiList-root': {
        p: 0
      }
    }, sx),
    disableAutoFocus: true,
    disableEnforceFocus: true
  }, items.map(function (_ref3, index) {
    var _children$length;
    var text = _ref3.text,
      children = _ref3.children,
      textProps = _ref3.textProps,
      highlight = _ref3.highlight,
      startAdornment = _ref3.startAdornment,
      endAdornment = _ref3.endAdornment;
    var id = parentIndex + "-" + index;
    var onMouseEnter = function onMouseEnter(event) {
      return openMenu(id, event);
    };
    var onMouseLeave = function onMouseLeave() {
      if (openSubmenus[id]) {
        return;
      }
      if (openSubmenus[id] && children) {
        closeMenu(id);
      }
    };
    return createElement(MenuItem, Object.assign({}, menuItemProps, {
      key: id,
      highlight: highlight,
      isHighlighted: Boolean(openSubmenus[id] && items.length > 1),
      isTextComponent: typeof text === 'string',
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }), createElement(IconText, {
      text: text,
      hasChildren: ((_children$length = children == null ? void 0 : children.length) != null ? _children$length : 0) >= 1,
      textProps: textProps,
      startAdornment: startAdornment,
      endAdornment: endAdornment
    }), children && createElement(Menu, {
      items: children,
      menuAnchorEl: openSubmenus[id],
      parentIndex: id,
      onAddRef: onAddRef,
      menuItemProps: menuItemProps,
      menuProps: menuProps,
      sx: {
        pointerEvents: 'none',
        '& .MuiMenuItem-root': {
          pointerEvents: 'auto'
        }
      }
    }));
  }));
}

var withMUIContextMenuProvider = function withMUIContextMenuProvider(Component) {
  return function MUIContextMenuProvider(props) {
    var _useState = useState([]),
      items = _useState[0],
      setItems = _useState[1];
    var _useState2 = useState(null),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];
    var _useState3 = useState(null),
      menuProps = _useState3[0],
      setMenuProps = _useState3[1];
    var _useState4 = useState(null),
      itemProps = _useState4[0],
      setItemProps = _useState4[1];
    var _useState5 = useState(false),
      disableOutsideClick = _useState5[0],
      setDisableOutsideClick = _useState5[1];
    var submenuRefs = useRef([]);
    var openMenu = useCallback(function (options) {
      var anchor = options.anchor,
        customItems = options.items,
        customMenuProps = options.menuProps,
        customItemProps = options.itemProps,
        closeOnOutsideClick = options.closeOnOutsideClick;
      setAnchorEl(anchor);
      setItems(customItems);
      setMenuProps(customMenuProps != null ? customMenuProps : null);
      setItemProps(customItemProps != null ? customItemProps : null);
      setDisableOutsideClick(closeOnOutsideClick != null ? closeOnOutsideClick : false);
    }, []);
    var closeMenu = useCallback(function () {
      setAnchorEl(null);
    }, []);
    var disableCloseOnOutsideClick = useCallback(function (isDisabled) {
      setDisableOutsideClick(isDisabled);
    }, []);
    var contextApi = useMemo(function () {
      return {
        closeMenu: closeMenu,
        openMenu: openMenu,
        disableCloseOnOutsideClick: disableCloseOnOutsideClick,
        isOpen: Boolean(anchorEl)
      };
    }, []);
    useClickOutside(submenuRefs == null ? void 0 : submenuRefs.current, disableOutsideClick ? function () {} : closeMenu);
    return createElement(ContextMenuContext.Provider, {
      value: contextApi
    }, createElement(Component, Object.assign({}, props)), createElement(Menu, {
      items: items,
      parentIndex: '0',
      menuAnchorEl: anchorEl,
      menuProps: menuProps,
      menuItemProps: itemProps,
      onClose: closeMenu,
      onAddRef: function onAddRef(ref) {
        if (!submenuRefs.current.includes(ref)) {
          submenuRefs.current.push(ref);
        }
      }
    }));
  };
};

export { useMUIContextMenu, useMuiContextMenuSettings, withMUIContextMenuProvider };
//# sourceMappingURL=mui-context-menu.esm.js.map
