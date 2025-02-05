import { createContext, useContext, useEffect, createElement, Fragment, useState, useRef, useMemo } from 'react';
import { Stack, Typography, Box, Menu as Menu$1 } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { alpha } from '@mui/material/styles';

function noop() {
  // eslint-disable-next-line no-console
  console.info("Possibly you forgot to wrap your component with MUIContextMenuProvider.");
}
var MUIContextMenu = /*#__PURE__*/createContext({
  setItems: noop,
  setMenuAnchorRef: noop,
  setMenuProps: noop,
  setMenuItemProps: noop,
  menuAnchorEl: null
});

var useMUIContextMenu = function useMUIContextMenu(_ref) {
  var items = _ref.items,
    anchorRef = _ref.anchorRef,
    menuProps = _ref.menuProps,
    menuItemProps = _ref.menuItemProps;
  var _useContext = useContext(MUIContextMenu),
    setItems = _useContext.setItems,
    setMenuAnchorRef = _useContext.setMenuAnchorRef,
    setMenuProps = _useContext.setMenuProps,
    setMenuItemProps = _useContext.setMenuItemProps;
  useEffect(function () {
    setItems(items);
  }, [items]);
  useEffect(function () {
    if (menuProps) {
      setMenuProps(menuProps);
    }
  }, [menuProps]);
  useEffect(function () {
    if (menuItemProps) {
      setMenuItemProps(menuItemProps);
    }
  }, [menuItemProps]);
  return {
    show: function show() {
      setMenuAnchorRef(anchorRef);
    },
    hide: function hide() {
      setMenuAnchorRef(null);
    }
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
  console.log({
    props: props
  });
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
    onClick: function onClick(event) {
      return event.preventDefault();
    },
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }), children);
}
// event => openMenu(id, event)

function Menu(_ref) {
  var _menuProps$anchorOrig, _menuProps$transformO;
  var items = _ref.items,
    onClose = _ref.onClose,
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
    }, 600);
  };
  var openMenu = function openMenu(id, event) {
    var _setOpenSubmenus;
    if (anchorTimeouts.current[id]) {
      clearTimeout(anchorTimeouts.current[id]);
      anchorTimeouts.current[id] = null;
    }
    setOpenSubmenus((_setOpenSubmenus = {}, _setOpenSubmenus[id] = event.currentTarget, _setOpenSubmenus));
  };
  return createElement(Menu$1, {
    ref: function ref(_ref2) {
      if (_ref2) {
        onAddRef == null || onAddRef(_ref2);
      }
    },
    open: Boolean(menuAnchorEl),
    anchorEl: menuAnchorEl,
    anchorOrigin: (_menuProps$anchorOrig = menuProps == null ? void 0 : menuProps.anchorOrigin) != null ? _menuProps$anchorOrig : {
      vertical: 'top',
      horizontal: 'left'
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
    disableEnforceFocus: true,
    onMouseLeave: function onMouseLeave() {
      if (!openSubmenus[parentIndex]) {
        onClose == null || onClose();
      }
    }
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
      menuAnchorEl = _useState2[0],
      setMenuAnchorRef = _useState2[1];
    var _useState3 = useState(null),
      menuProps = _useState3[0],
      setMenuProps = _useState3[1];
    var _useState4 = useState(null),
      menuItemProps = _useState4[0],
      setMenuItemProps = _useState4[1];
    var submenuRefs = useRef([]);
    var contextApi = useMemo(function () {
      return {
        setItems: setItems,
        setMenuAnchorRef: setMenuAnchorRef,
        setMenuItemProps: setMenuItemProps,
        setMenuProps: setMenuProps,
        menuAnchorEl: menuAnchorEl
      };
    }, []);
    useClickOutside(submenuRefs == null ? void 0 : submenuRefs.current, function () {
      return setMenuAnchorRef(null);
    });
    return createElement(MUIContextMenu.Provider, {
      value: contextApi
    }, createElement(Component, Object.assign({}, props)), createElement(Menu, {
      items: items,
      parentIndex: '0',
      menuAnchorEl: menuAnchorEl,
      menuProps: menuProps,
      menuItemProps: menuItemProps,
      onClose: function onClose() {
        return setMenuAnchorRef(null);
      },
      onAddRef: function onAddRef(ref) {
        if (!submenuRefs.current.includes(ref)) {
          submenuRefs.current.push(ref);
        }
      }
    }));
  };
};

export { useMUIContextMenu, withMUIContextMenuProvider };
//# sourceMappingURL=mui-context-menu.esm.js.map
