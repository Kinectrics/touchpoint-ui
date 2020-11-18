import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCircleNotch, faTimes, faTimesCircle, faCaretRight, faSortAlphaDown, faSortAlphaDownAlt, faCaretDown, faFilter, faColumns, faCheck, faWindowRestore, faPlus, faMinus, faCaretLeft, faCalendar, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import { Dropdown, Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Split from 'react-split';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ":root{\n\t/*Theme Variables*/\n\t\n\t/* Nav */\n\t--navColor: #008ae6;\n\t--navTextColor: white;\n\t--navHoverColor: rgb(196, 196, 196);\n\t--navClickedColor: rgb(177, 177, 177);\n\t--dockColor: rgb(37, 37, 37);\n\t--dockTextColor: var(--navTextColor);\n\t\n\t/* Body Background */\n\t--bodyAltBG: rgb(224, 230, 245);\n\t\n\t/* Text */\n\t--mainTextColor: rgb(26, 26, 26);\n\t--labelColor: var(--navColor);\n\t--lockedTextColor: rgb(122, 122, 122);\n\t\n\t/* Cards */\n\t--cardBG: white;\n\t--borderColor:  rgba(211, 211, 211, 0.705);\n\t\n\t/* Main Table */\n\t--tableActiveColor: rgb(2, 187, 219);\n\t\n\t/* FreeButtons */\n\t--freeButtonNeutralBG: var(--labelColor);\n\t--freeButtonPositiveBG: rgb(0, 138, 230);\n\t--freeButtonNegativeBG: rgb(211, 67, 0);\n\t--freeButtonTextColor: white;\n\t\n\t/* Inputs */\n\t--inputColor: rgb(238, 238, 238);\n\t--inputInvalidColor: rgb(236, 171, 171);\n\t--inputValidColor: rgb(153, 238, 153);\n\t\n\t/* Structure Variables */\n\t--appToolbarHeight: 30px;\n\t--controlBarHeight: 49px;\n\t--tabHeaderHeight: 30px;\n\t--dockWidth: 65px;\n\t--drawerWidth: 350px;\n}\n\nbody {\n\tmargin: 0;\n\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n\t  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n\t  sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\theight: 100vh;\n\twidth: 100vw;\n\toverflow: hidden;\n}\n\n*{\n\tbox-sizing: border-box;\n}\n\na{\n\tcolor: var(--labelColor)\n}\n\n/* App Structure CSS */\n.TouchPointApp{\n\theight: 100vh;\n\twidth: 100vw;\n\toverflow: hidden;\n\tmargin: 0;\n\tpadding: 0;\n\tbackground-color: var(--navColor);\n\tcolor: var(--mainTextColor);\n}\n\n.moduleContainer{\n\toverflow: hidden;\n\tbackground-color: var(--bodyAltBG);\n\tmargin: 0;\n\tpadding: 0;\n\tposition: fixed;\n}\n\n.screenBlocker{\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\twidth:100vw;\n\theight: 100vh;\n\tz-index: 999;\n}\n\n/* Screen Effects */\n.screenEffect{\n\twidth:100%;\n\theight: 100%;\n\toverflow: hidden;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.blurScreenEffect{\n\ttransition: filter 200ms ease-in-out;\n\tfilter: blur(8px) brightness(90%);\n}\n\n\n/* Quick Styles */\n.flexCenter{ \n\t/*Centers content inside a div in both directions*/\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.flexY{ \n\t/*Centers content inside a div in both directions*/\n\tdisplay: flex;\n\talign-items: center;\n}\n";
styleInject(css_248z);

var css_248z$1 = "/* Styles for all Input type components */\n\n.input{\n\tbackground-color: var(--inputColor);\n\tcolor: var(--mainTextColor);\n\toutline: none !important;\n\tpadding: 5px 15px;\n\tborder-radius: 15px;\n\tborder: 1px solid var(--borderColor);\n\tfont-size: 12pt;\n}\n\n.input.invalid{\n\tbackground-color: var(--inputInvalidColor);\n}\n\n.input.valid{\n\tbackground-color: var(--inputValidColor);\n}\n\n.input:focus:not(.locked){\n\t/* filter: brightness(102%); */\n\tborder-color: var(--tableActiveColor);\n}\n\n.input.locked, .locked .input\n.input.locked:hover, .locked .input:hover\n.input.locked:focus, .locked .input:focus{\n\tcursor: default !important;\n\tfilter: grayscale(50%);\n\topacity: 85%;\n\tcolor: var(--lockedTextColor);\n}\n";
styleInject(css_248z$1);

var css_248z$2 = ".systemPopupBackdrop{\n\tz-index: 300;\n\tbackground-color: var(--overlayBackdropColor);\n\twidth: 100vw;\n\theight: 100vh;\n\tposition: fixed;\n\ttop:0;\n\t\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\t\n\ttransition: opacity 300ms ease-out;\n}\n\n.systemPopupBackdrop:Hover{\n\tcursor: pointer;\n}\n\n.systemPopupBackdrop.forceOpen:Hover{\n\tcursor: default;\n}\n\n.systemPopupBackdrop.transparent{\n\topacity: 0;\n}\n\n.systemPopupBackdrop>.InfoCard,\n.systemPopupBackdrop>div>.InfoCard{\n\twidth: 35%;\n\theight: 20%;\n\tcursor: default;\t\n}\n\n\n";
styleInject(css_248z$2);

function SystemPopupHandler(props) {
  var num = props.activePopups.length; //Clicking the background closes the popup

  function clickBackdrop(e) {
    if (e.target.classList.contains('systemPopupBackdrop')) {
      props.system.Popup.closeAll();
    }
  } //If the active popup isn't null, render it


  if (num === 0) {
    return null;
  }

  return props.activePopups.map(function (Pop, idx) {
    return /*#__PURE__*/React.createElement("div", {
      className: "systemPopupBackdrop " + props.popupEffect,
      onClick: clickBackdrop,
      key: idx,
      style: {
        display: idx === num - 1 ? null : 'none',
        width: '100%',
        height: '100%'
      }
    }, typeof Pop == 'function' ? /*#__PURE__*/React.createElement(Pop, null) : Pop);
  });
}

//Context hooks for variable and functions that are system wide

var moduleContext = /*#__PURE__*/createContext({});

function SystemModuleContainer(props) {
  //Adjusts the module container to fit between the system toolbars
  var styleSettings = {
    height: props.system.Layout.get().heightCSS,
    width: props.system.Layout.get().widthCSS,
    right: '0'
  };
  var moduleList = props.system.Modules.list();
  var moduleDataState = useState({}); //Render the chosen module

  return /*#__PURE__*/React.createElement(moduleContext.Provider, {
    value: moduleDataState
  }, /*#__PURE__*/React.createElement("div", {
    className: "moduleContainer",
    style: styleSettings
  }, /*#__PURE__*/React.createElement(Switch, null, Object.keys(moduleList).map(function (m) {
    return /*#__PURE__*/React.createElement(Route, {
      path: '/' + m,
      key: 'routeFor' + m,
      component: moduleList[m].component
    });
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/",
    component: moduleList[props.system.Modules.getHomeName()].component
  }))));
}

//Context hooks for variable and functions that are system wide

var systemContext = /*#__PURE__*/createContext({});

//Context hooks for variable and functions that are system wide
//Only certain components support locking (see docs for more information)

var lockedContext = /*#__PURE__*/createContext(false);

var ThemeEngine = /*#__PURE__*/function () {
  function ThemeEngine() {
    _classCallCheck(this, ThemeEngine);

    //The list of available themes.
    this.themes = {
      orange: {
        /* Main Table */
        tableActiveColor: 'rgb(221, 70, 0)',

        /* Text */
        mainTextColor: 'rgb(26, 26, 26)',
        labelColor: 'var(--navColor)',
        lockedTextColor: 'rgb(122, 122, 122)',

        /* Nav */
        navColor: 'rgb(211, 67, 0)',
        navTextColor: 'white',
        navHoverColor: 'rgb(196, 196, 196)',
        navClickedColor: 'rgb(177, 177, 177)',

        /* Body Background */
        bodyAltBG: 'rgb(224, 230, 245)',

        /* Cards */
        cardBG: 'white',
        borderColor: 'rgba(211, 211, 211, 0.705)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'rgb(0, 138, 230)',
        freeButtonNegativeBG: 'rgb(211, 67, 0)',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: 'rgb(238, 238, 238)',
        inputInvalidColor: 'rgb(236, 171, 171)',
        inputValidColor: 'rgb(153, 238, 153)'
      },
      blue: {
        /* Main Table */
        tableActiveColor: 'rgb(2, 187, 219)',

        /* Text */
        mainTextColor: 'rgb(26, 26, 26)',
        labelColor: 'var(--navColor)',
        lockedTextColor: 'rgb(122, 122, 122)',

        /* Nav */
        navColor: 'rgb(0, 138, 230)',
        navTextColor: 'white',
        navHoverColor: 'rgb(196, 196, 196)',
        navClickedColor: 'rgb(177, 177, 177)',

        /* Body Background */
        bodyAltBG: 'rgb(224, 230, 245)',

        /* Cards */
        cardBG: 'white',
        borderColor: 'rgba(211, 211, 211, 0.705)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'green',
        freeButtonNegativeBG: 'red',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: 'rgb(245, 245, 245)',
        inputInvalidColor: 'rgb(236, 171, 171)',
        inputValidColor: 'rgb(153, 238, 153)'
      },
      dark: {
        /* Main Table */
        tableActiveColor: '#63A1FF',

        /* Text */
        mainTextColor: 'rgb(211, 211, 211)',
        labelColor: '#63A1FF',
        lockedTextColor: 'rgb(122, 122, 122)',

        /* Nav */
        navColor: '#35363A',
        navTextColor: 'rgb(211, 211, 211)',
        navHoverColor: 'rgb(196, 196, 196)',
        navClickedColor: 'rgb(177, 177, 177)',

        /* Body Background */
        bodyAltBG: '#222229',

        /* Cards */
        cardBG: '#313440',
        borderColor: 'rgba(211, 211, 211, 0.158)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'green',
        freeButtonNegativeBG: 'red',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: '#202124',
        inputInvalidColor: 'rgb(134, 67, 67)',
        inputValidColor: 'rgb(45, 104, 45)'
      }
    };
  } //Set the CSS cariables that control theme colors


  _createClass(ThemeEngine, [{
    key: "setTheme",
    value: function setTheme(themeName) {
      //check if a theme exists with that name 
      if (this.themes[themeName]) {
        var themeData = this.themes[themeName.toLowerCase()];
        Object.entries(themeData).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          document.documentElement.style.setProperty('--' + key, value);
        });
        localStorage.setItem('themeName', themeName);
      }
    } //fethches the user's preferred theme and applies it

  }, {
    key: "getUserTheme",
    value: function getUserTheme() {
      this.setTheme(localStorage.getItem('themeName'));
    }
  }]);

  return ThemeEngine;
}();

function TouchPointApp(props) {
  //System-wide state
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      activePopups = _useState2[0],
      setPopups = _useState2[1];

  var portalDestination = useRef(); //Set moduleTransition to 'transition' while the modules are being switched out

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      screenBlock = _useState4[0],
      setScreenBlock = _useState4[1]; //if true, no clicks will register


  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      popupEffect = _useState6[0],
      setPopupEffect = _useState6[1];

  var _useState7 = useState(props.locked),
      _useState8 = _slicedToArray(_useState7, 2),
      moduleLock = _useState8[0],
      setModuleLock = _useState8[1];

  var _useState9 = useState(''),
      _useState10 = _slicedToArray(_useState9, 2),
      screenEffect = _useState10[0],
      setScreenEffect = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      drawerExists = _useState12[0],
      setDrawerExists = _useState12[1];

  var _useState13 = useState({
    heightCSS: '100%',
    widthCSS: '100%',
    widths: {},
    heights: {}
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      layout = _useState14[0],
      setLayout = _useState14[1];

  function saveSettings(settingsID, settingsToken) {
    if (props.saveSettings && settingsID) {
      props.saveSettings(settingsID, settingsToken);
    }
  }

  function getSettings(_x) {
    return _getSettings.apply(this, arguments);
  } //Functions that are available to all modules and can be used system-wode 
  //Used for things like switching modules, sending out emails, etc. for consistency across the system


  function _getSettings() {
    _getSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(settingsID) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (!(props.getSettings && settingsID)) {
                _context2.next = 5;
                break;
              }

              _context2.next = 4;
              return props.getSettings(settingsID);

            case 4:
              return _context2.abrupt("return", _context2.sent);

            case 5:
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              return _context2.abrupt("return", null);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return _getSettings.apply(this, arguments);
  }

  var System = {
    //Setting system wide variables
    Theme: {
      set: function set(themeName) {
        var themeEngine = new ThemeEngine();
        themeEngine.setTheme(themeName);
        saveSettings('TouchPointAppTheme', themeName);
      }
    },
    Modules: {
      open: function open(moduleName) {
        if (props.modules[moduleName]) {
          //setActiveModule(moduleName)
          window.location.href = '#/' + moduleName;
          setModuleLock(props.modules[moduleName].locked);

          if (props.onOpenModule) {
            props.onOpenModule(moduleName);
          }
        }
      },
      list: function list() {
        var modules = {};
        Object.keys(props.modules).forEach(function (m) {
          if (!props.modules[m].hidden) {
            modules[m] = props.modules[m];
          }
        });
        return modules;
      },
      getHomeName: function getHomeName() {
        return props.homeModule;
      }
    },
    Input: {
      enable: function enable() {
        setScreenBlock(false);
      },
      disable: function disable(forTime) {
        setScreenBlock(true);

        if (forTime) {
          setTimeout(function () {
            return setScreenBlock(false);
          }, forTime);
        }
      }
    },
    Popup: {
      open: function open(PopupComponent) {
        setScreenBlock(true);
        setTimeout(function () {
          return setScreenBlock(false);
        }, 400);
        setScreenEffect('blurScreenEffect');
        setPopupEffect('transparent');

        var newPopups = _toConsumableArray(activePopups);

        newPopups.push(PopupComponent);
        setPopups(newPopups);
        setTimeout(function () {
          return setPopupEffect('');
        }, 0);
      },
      close: function close() {
        // if(activePopup.props.onClose){activePopup.props.onClose()}
        setPopupEffect('transparent');

        var newPopups = _toConsumableArray(activePopups);

        newPopups.pop();
        setTimeout(function () {
          return setPopups(newPopups);
        }, 100);
        var drawerIsOpen = document.getElementById('TouchPointAppDrawer').classList.toString().includes('open');

        if (!drawerIsOpen) {
          setScreenEffect('');
        }
      },
      closeAll: function closeAll() {
        // if(activePopup.props.onClose){activePopup.props.onClose()}
        setPopupEffect('transparent');
        setTimeout(function () {
          return setPopups([]);
        }, 100);
        var drawerIsOpen = document.getElementById('TouchPointAppDrawer').classList.toString().includes('open');

        if (!drawerIsOpen) {
          setScreenEffect('');
        }
      }
    },
    Drawer: {
      open: function open() {
        var drawerHandler = document.getElementById('TouchPointDrawerHandler');

        if (drawerHandler) {
          drawerHandler.classList.add('SystemDrawerHandler');
        }

        var drawerBox = document.getElementById('TouchPointAppDrawer');

        if (drawerBox) {
          drawerBox.classList.add('open');
        }

        setScreenEffect('blurScreenEffect');
      },
      close: function close() {
        var drawerHandler = document.getElementById('TouchPointDrawerHandler');

        if (drawerHandler) {
          drawerHandler.classList.remove('SystemDrawerHandler');
        }

        var drawerBox = document.getElementById('TouchPointAppDrawer');

        if (drawerBox) {
          drawerBox.classList.remove('open');
        }

        setScreenEffect('');
      },
      Exists: drawerExists,
      setExists: setDrawerExists,
      portalDestination: portalDestination,
      className: activePopups.length > 0 ? screenEffect : ''
    },
    //Internal variables for structuring the app
    Layout: {
      get: function get() {
        return layout;
      },
      set: setLayout
    },
    Settings: {
      save: saveSettings,
      get: getSettings
    },
    io: props.io
  }; //initial setup - theme and settings

  useEffect(function () {
    function applySavedTheme() {
      return _applySavedTheme.apply(this, arguments);
    }

    function _applySavedTheme() {
      _applySavedTheme = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var newTheme, themeEngine;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return System.Settings.get('TouchPointAppTheme');

              case 2:
                newTheme = _context.sent;

                if (newTheme) {
                  themeEngine = new ThemeEngine();
                  themeEngine.setTheme(newTheme);
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _applySavedTheme.apply(this, arguments);
    }

    applySavedTheme();
  }, []); //Input blocker for clicks

  var screenBlocker = null;

  if (screenBlock) {
    screenBlocker = /*#__PURE__*/React.createElement("div", {
      className: "screenBlocker"
    });
  } else screenBlocker = null; //The App JSX itself


  return /*#__PURE__*/React.createElement("div", {
    className: "TouchPointApp "
  }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: props.locked
  }, /*#__PURE__*/React.createElement(systemContext.Provider, {
    value: System
  }, /*#__PURE__*/React.createElement(HashRouter, null, screenBlocker, /*#__PURE__*/React.createElement("div", {
    ref: portalDestination
  }), /*#__PURE__*/React.createElement("div", {
    className: 'screenEffect ' + screenEffect
  }, props.children, /*#__PURE__*/React.createElement(SystemModuleContainer, {
    system: System,
    locked: props.locked || moduleLock
  })), /*#__PURE__*/React.createElement(SystemPopupHandler, {
    system: System,
    activePopups: activePopups,
    popupEffect: popupEffect
  })))));
} //Proptypes

TouchPointApp.propTypes = {
  locked: PropTypes.bool,
  modules: PropTypes.object.isRequired,
  homeModule: PropTypes.string,
  io: PropTypes.any,
  onOpenModule: PropTypes.func,
  saveSettings: PropTypes.func,
  getSettings: PropTypes.func
};

var css_248z$3 = ".AppToolbar{\n\tbackground-color: var(--navColor) !important;\n\t\n\twidth: 100%;\n\tcolor: var(--navTextColor);\n\tpadding: 0 30px 0 10px;\n\tz-index: 3;\n\theight: var(--appToolbarHeight);\n}\n\n.AppToolbar .buttonContainer{\n\tbox-sizing: border-box;\n\tposition: relative;\n\theight: var(--appToolbarHeight);\n\tfloat: left;\n\tposition: absolute;\n\tleft: 0;\n\tbackground-color: var(--navColor);\n\tpadding-left: 10px;\n}\n\n.AppToolbar .brandingContainer{\n\tbox-sizing: border-box;\n\tposition: relative;\n\ttext-align: right;\n\tfont-weight: bold;\n\tposition: absolute;\n\tright: 0;\n\tpadding-right: 10px;\n\tpadding-top: 2px;\n\tbackground-color: var(--navColor);\n}\n\n.AppToolbar button{\n\tpadding: 0;\n\tbackground-color: transparent !important;\n\tborder: none;\n\tfont-size: 13pt;\n\tmargin-bottom: 4px;\n\tmargin-right: 40px;\n\tcolor: var(--navTextColor);\n\theight: 100%;\n}\n\n.AppToolbar button::after{\n\tcontent: none;\n}\n\n.AppToolbar button:hover{\n\tcolor: var(--navHoverColor);\n}\n\n.AppToolbar button:active, .AppToolbar button:focus{\n\tborder: none !important;\n\toutline: none !important;\n\tbox-shadow: none !important;\n\tcolor: var(--navClickedColor) !important;\n}\n\n.AppToolbar a{\n\tbackground-color: var(--cardBG) !important;\n\tcolor: var(--mainTextColor) !important;\n}\n\n.AppToolbar a:hover{\n\tfilter: brightness(95%);\n}\n\n.AppToolbar .dropdown-menu{\n\tbackground-color: var(--cardBG) !important;\n}\n\n\n";
styleInject(css_248z$3);

function useSystem() {
  return useContext(systemContext);
}

//can resize to fit around them

function usePresence(componentName, height, width) {
  var _useSystem = useSystem(),
      Layout = _useSystem.Layout;

  function refreshCSS(layoutSettings) {
    var heightCSS = 'calc(100%';
    var widthCSS = 'calc(100%';
    Object.values(layoutSettings.heights).forEach(function (h) {
      if (h) {
        heightCSS = heightCSS + ' - ' + h;
      }
    });
    Object.values(layoutSettings.widths).forEach(function (w) {
      if (w) {
        widthCSS = widthCSS + ' - ' + w;
      }
    });
    layoutSettings.heightCSS = heightCSS + ')';
    layoutSettings.widthCSS = widthCSS + ')';
  }

  useEffect(function () {
    var newLayout = _objectSpread2({}, Layout.get());

    newLayout.widths[componentName] = width;
    newLayout.heights[componentName] = height;
    refreshCSS(newLayout);
    Layout.set(newLayout);
    return function () {
      var newLayout = _objectSpread2({}, Layout.get());

      newLayout.widths[componentName] = 0;
      newLayout.heights[componentName] = 0;
      refreshCSS(newLayout);
      Layout.set(newLayout);
    };
  }, []);
}

function AppToolbar(props) {
  //Declare itself to the app so the modules can be fit around it 
  usePresence('TouchPointAppToolbar', 'var(--appToolbarHeight)');
  return /*#__PURE__*/React.createElement("div", {
    className: "AppToolbar",
    style: props.style
  }, /*#__PURE__*/React.createElement("div", {
    className: "brandingContainer"
  }, props.label), /*#__PURE__*/React.createElement("div", {
    className: "buttonContainer flexY"
  }, props.children));
} //

AppToolbar.propTypes = {
  label: PropTypes.any
};

var css_248z$4 = ".AppFooter{\n\twidth: 100%;\n\tpadding-top: 2px;\n\tbackground-color: var(--navColor) !important;\n\tbox-sizing: border-box;\n\tposition: absolute;\n\tbottom:0px;\n\theight: var(--appToolbarHeight);\n\tfont-size: 13pt;\n\tcolor: var(--navTextColor);\n\ttext-align: right;\n\tz-index: 3;\n\t\n}\n\n.AppFooter .leftSide{\n\tposition: absolute;\n\tleft: 0;\n\tpadding: 0 10px;\n\ttext-align: left;\n\tmax-width: calc(50% - 20px);\n\toverflow-x: hidden;\n}\n\n.AppFooter .rightSide{\n\tposition: absolute;\n\tright: 0;\n\tpadding: 0 10px;\n\ttext-align: right;\n\tmax-width: calc(50% - 20px);\n\toverflow-x: hidden;\n}";
styleInject(css_248z$4);

function AppFooter(props) {
  //Declare itself to the app so the modules can be fit around it
  usePresence('TouchPointAppFooter', 'var(--appToolbarHeight)');
  return /*#__PURE__*/React.createElement("div", {
    className: "AppFooter",
    style: props.style
  }, props.children);
}

var css_248z$5 = ".SystemDrawerHandler{\n\tz-index: 10;\n\tbackground-color: var(--overlayBackdropColor);\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\ttop:0;\n\tcursor: pointer;\n}\n\n.AppDrawer{\n\theight: 100%;\n\twidth: var(--drawerWidth);\n\tposition: fixed;\n\tz-index: 10;\n\tleft: 0;\n\tpadding: 15px 15px;\n\tdisplay: none;\n}\n\n.AppDrawer.open{\n\tdisplay: block;\n}\n\n.AppDrawer .drawerContainer{\n\theight: 100%;\n\twidth: 100%;\n\tbackground-color: var(--cardBG);\n\tborder-radius: 10px;\n\tposition: relative;\n\tcursor: default;\n\toverflow: hidden;\n}\n\n.AppDrawer .scroller{\n\tpadding: 10px;\n\tpadding-top: 30px;\n\toverflow-x: hidden;\n\theight: 100%;\n}\n\n.AppDrawer .CloseButton{\n\tposition: absolute;\n\ttop:8px;\n\tright: 10px;\n\tfont-size: 15pt;\n}\n\n.AppDrawer h1{\n\tfont-size: 16pt;\n\tposition: absolute;\n\ttop:8px;\n\tleft: 10px;\n\tcolor: var(--labelColor);\n}\n\n";
styleInject(css_248z$5);

var css_248z$6 = ".CoreButton{\n\toutline: none !important;\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: inherit;\n\tfont-size: inherit;\n\tfont-weight: inherit;\n}";
styleInject(css_248z$6);

var css_248z$7 = ".Loading{\n\tfont-size: 30pt;\n\tdisplay: inline-block;\n\topacity: 60%;\n}\n\n.Loading .rotate{\n\tanimation: spin 0.7s infinite linear;\n\tdisplay: inline-block;\n}\n\n.Loading .pulse{\n\tanimation: pulse 0.7s infinite ease-in-out;\n\tdisplay: inline-block;\n}\n\n@keyframes spin {\n    0% {transform:rotate(0deg);}\n    100% {transform:rotate(360deg);}\n}\n\n@keyframes pulse {\n    0% {transform:scale(1);}\n    20% {transform:scale(1.2);}\n    100% {transform:scale(1);}\n}";
styleInject(css_248z$7);

function Loading(props) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'Loading ' + props.className,
    style: props.style
  }, /*#__PURE__*/React.createElement("span", {
    className: props.animation ? props.animation : 'rotate'
  }, props.children ? props.children : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCircleNotch
  })));
}
Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  animation: PropTypes.string
};

function CoreButton(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function clickHandler(e) {
    if (!locked && !props.loading && props.onClick) {
      props.onClick(e);
    }
  }

  if (!props.hidden) {
    return /*#__PURE__*/React.createElement("button", {
      className: 'CoreButton ' + lockedClass + ' ' + props.className,
      onClick: clickHandler,
      style: props.style,
      onBlur: props.onBlur,
      type: props.type,
      tabIndex: props.tabIndex,
      title: props.title
    }, props.loading ? /*#__PURE__*/React.createElement(Loading, {
      style: {
        fontSize: 'inherit',
        opacity: '100%'
      }
    }) : props.children);
  } else {
    return null;
  }
} //Proptypes

CoreButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
  tabIndex: PropTypes.any,
  title: PropTypes.string
};

var css_248z$8 = ".CloseButton{\n\tborder: none;\n\tbackground-color: transparent;\n\toutline: none !important;\n\tposition: relative;\n\tcolor: var(--lockedTextColor);\n}\n\n.CloseButton:active{\n\tfilter: brightness(70%);\n}";
styleInject(css_248z$8);

function CloseButton(props) {
  return /*#__PURE__*/React.createElement(CoreButton, {
    className: "CloseButton",
    onClick: props.onClick,
    locked: props.locked,
    hidden: props.hidden,
    style: props.style,
    tabIndex: props.tabIndex
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  }));
} //Proptypes

CloseButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.any
};

function AppDrawer(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  var _useSystem = useSystem(),
      Drawer = _useSystem.Drawer;

  useEffect(function () {
    Drawer.setExists(true);
    return function () {
      return Drawer.setExists(false);
    };
  }, []); //Clicking the background closes the popup

  function clickBackdrop(e) {
    if (e.target.classList.contains('SystemDrawerHandler')) {
      Drawer.close();
    }
  }

  if (Drawer.portalDestination.current) {
    return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement("div", {
      id: "TouchPointDrawerHandler",
      onClick: clickBackdrop
    }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: 'AppDrawer',
      id: 'TouchPointAppDrawer',
      style: _objectSpread2(_objectSpread2({}, props.style), {}, {
        opacity: '93%'
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "drawerContainer",
      style: props.innerStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "scroller"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("h1", null, props.title), /*#__PURE__*/React.createElement(CloseButton, {
      locked: false,
      onClick: function onClick() {
        Drawer.close();
      }
    }), /*#__PURE__*/React.createElement("div", {
      id: "TouchPointDrawerContainer"
    }, props.children))))))), Drawer.portalDestination.current);
  } else return null;
}
AppDrawer.propTypes = {
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  locked: PropTypes.bool
};

var css_248z$9 = ".FreeButton{\n\toutline: none !important;\n\tborder: none;\n\tborder-radius: 15px;\n\t\n\tcolor: var(--freeButtonTextColor);\n\t\n\tfont-size: 12pt;\n\tfont-weight: bold;\n\tpadding: 8px 17px;\n\tbox-sizing: border-box;\n}\n\n.FreeButton.wide{\n\twidth: 100%;\n\tdisplay: block;\n\tmargin: 0;\n}\n\n.FreeButton.neutral{\n\tbackground-color: var(--freeButtonNeutralBG);\n}\n\n.FreeButton.positive{\n\tbackground-color: var(--freeButtonPositiveBG);\n\t\n}\n\n.FreeButton.negative{\n\tbackground-color: var(--freeButtonNegativeBG);\n}\n\n.FreeButton:hover{\n\tfilter: brightness(110%);\n}\n\n.FreeButton:active{\n\tfilter: brightness(95%);\n}\n\n.FreeButton.locked{\n\tcursor: default !important;\n\tfilter: grayscale(95%) brightness(70%) !important;\n\topacity: 50% !important;\n}\n";
styleInject(css_248z$9);

function FreeButton(props) {
  var purpose = 'neutral ';
  var wideClass = '';

  if (props.purpose) {
    purpose = props.purpose.toLowerCase();
  }

  if (props.wide) {
    wideClass = 'wide ';
  }

  return /*#__PURE__*/React.createElement(CoreButton, {
    locked: props.locked,
    onClick: props.onClick,
    hidden: props.hidden,
    className: "FreeButton " + purpose + ' ' + wideClass + ' ' + props.className,
    style: props.style,
    type: props.type,
    loading: props.loading,
    tabIndex: props.tabIndex,
    title: props.title
  }, props.children);
} //Proptypes

FreeButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  purpose: PropTypes.string,
  wide: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  loading: PropTypes.bool,
  tabIndex: PropTypes.any,
  title: PropTypes.string
};

var css_248z$a = "\n.ConfirmButton{\n\toutline: none !important;\n\tborder: none;\n\tborder-radius: 15px;\n\t\n\tcolor: var(--freeButtonTextColor);\n\tbackground-color: var(--freeButtonNeutralBG);\n\t\n\tfont-size: 11pt;\n\tfont-weight: bold;\n\tpadding: 0px 6px;\n\tbox-sizing: border-box;\n}\n\n.ConfirmButton.positive{\n\tbackground-color: var(--freeButtonPositiveBG);\n\t\n}\n\n.ConfirmButton.negative{\n\tbackground-color: var(--freeButtonNegativeBG);\n}\n\n.ConfirmButton:hover{\n\tfilter: brightness(110%);\n}\n\n.ConfirmButton:active{\n\tfilter: brightness(95%);\n}\n\n.ConfirmButton.locked{\n\tcursor: default !important;\n\tfilter: grayscale(95%) brightness(70%) !important;\n\topacity: 50% !important;\n}";
styleInject(css_248z$a);

function ConfirmButton(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  function clickHandler(e) {
    if (expanded) {
      if (props.onClick) {
        props.onClick(e);
      }

      setExpanded(false);

      if (props.onCollapse) {
        props.onCollapse();
      }
    } else {
      e.stopPropagation();
      setExpanded(true);

      if (props.onExpand) {
        props.onExpand(e);
      }

      e.stopPropagation();
    }
  }

  function blurHandler() {
    setExpanded(false);

    if (props.onCollapse) {
      props.onCollapse();
    }
  }

  return /*#__PURE__*/React.createElement(CoreButton, {
    className: props.className + ' ConfirmButton ' + (expanded ? ' expanded ' : '') + props.purpose,
    title: props.title,
    locked: props.locked,
    hidden: props.hidden,
    onClick: clickHandler,
    style: expanded ? _objectSpread2(_objectSpread2({}, props.style), props.expandedStyle) : props.style,
    loading: props.loading,
    onBlur: blurHandler
  }, expanded ? props.expandedContent : props.content);
} //

ConfirmButton.propTypes = {
  hidden: PropTypes.bool,
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  expandedStyle: PropTypes.object,
  className: PropTypes.string,
  content: PropTypes.any,
  expandedContent: PropTypes.any,
  purpose: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func
};

var css_248z$b = ".Tile{\n\theight: 100px;\n\twidth: 100px;\n\tpadding: 10px;\n}\n\n.TileContainer{\n\tpadding-top: 4px;\n\theight: 100%;\n\twidth: 100%;\n\tbackground-color: var(--cardBG);\n\ttransition: all 0.2s;\n\tfont-size: 10pt;\n\ttext-align: center;\n\tcolor: var(--mainTextColor);\n\tborder-radius: 15px;\n\tline-height: 10pt;\n\tposition: relative;\n}\n\n.Tile .logo{\n\theight: 65%;\n\tfont-size: 30pt;\n\tcolor: var(--labelColor)\n}\n\n.Tile .title{\n\tposition: absolute;\n\tbottom: 5px;\n\ttext-align: center;\n\twidth: 100%;\n}\n\n.TileContainer:hover{\n\tcursor: pointer;\n\tfilter: brightness(90%);\n}\n\n.Tile img{\n\theight: 90%;\n}\n\n.TileContainer:active{\n\tfilter: brightness(80%);\n\ttransition: all 0.05s;\n}\n\n.Tile.locked .TileContainer{\n\tfilter: opacity(60%);\n\tcursor: default;\n}\n\n.Tile.locked .logo{\n\tfilter: brightness(50%);\n}\n\n.Tile .notifications{\n\tposition: absolute;\n\ttop: -8px;\n\tright: -2px;\n\tfont-size: 9pt;\n\tcolor: white;\n\tbackground-color: red;\n\tfont-weight: bold;\n\tborder-radius: 10px;\n\tpadding: 4px 6px;\n}";
styleInject(css_248z$b);

function Tile(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  function clickHandler() {
    if (!locked && !props.loading && props.onClick) {
      props.onClick();
    }
  }

  var notifications = props.notifications < 99 ? props.notifications : '99+';
  var notificationBadge = props.notifications && !locked ? /*#__PURE__*/React.createElement("span", {
    className: "notifications"
  }, notifications) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: props.style,
    className: 'Tile' + (locked ? ' locked ' : ''),
    title: props.title
  }, /*#__PURE__*/React.createElement("div", {
    style: props.innserStyle,
    className: 'TileContainer ',
    onClick: clickHandler
  }, notificationBadge, /*#__PURE__*/React.createElement("div", {
    className: "logo flexCenter"
  }, props.loading ? /*#__PURE__*/React.createElement(Loading, {
    style: {
      fontSize: 'inherit',
      opacity: '100%'
    }
  }) : props.children), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, props.title)));
} //Proptypes

Tile.propTypes = _defineProperty({
  locked: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  loading: PropTypes.bool
}, "title", PropTypes.string);

var _TextBox$propTypes;
function TextBox(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    if (!locked && props.onChange) {
      props.onChange(e);
    }
  } //For the onEnter event


  function keyPressHandler(e) {
    if (!locked && e.key === 'Enter' && props.onEnter !== undefined) {
      props.onEnter(e);
    }
  }

  return /*#__PURE__*/React.createElement("input", {
    type: props.type ? props.type : "text",
    className: "input TextBox " + lockedClass + ' ' + props.className,
    defaultValue: props.defaultValue,
    onChange: changeHandler,
    readOnly: locked,
    onKeyPress: keyPressHandler,
    placeholder: props.placeholder,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    ref: props.inputRef,
    autoFocus: props.autoFocus,
    style: props.style,
    value: props.value,
    maxLength: props.maxLength,
    tabIndex: props.tabIndex
  });
} //Proptypes

TextBox.propTypes = (_TextBox$propTypes = {
  locked: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  inputRef: PropTypes.object,
  autoFocus: PropTypes.bool
}, _defineProperty(_TextBox$propTypes, "value", PropTypes.string), _defineProperty(_TextBox$propTypes, "type", PropTypes.string), _defineProperty(_TextBox$propTypes, "maxLength", PropTypes.number), _defineProperty(_TextBox$propTypes, "tabIndex", PropTypes.any), _defineProperty(_TextBox$propTypes, "onFocus", PropTypes.func), _defineProperty(_TextBox$propTypes, "onBlur", PropTypes.func), _TextBox$propTypes);

function useModuleContext() {
  var _useContext = useContext(moduleContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      dataSource = _useContext2[0],
      setDataSource = _useContext2[1];

  return {
    get: function get(key) {
      return dataSource[key];
    },
    set: function set(key, value) {
      var newSource = _objectSpread2({}, dataSource);

      newSource[key] = value;
      setDataSource(newSource);
    },
    clear: function clear() {
      setDataSource({});
    }
  };
}

var css_248z$c = ".SearchBar{\n\tposition: relative;\n}\n\n.SearchBar .searchButton{\n\tbackground-color: transparent;\n\tborder: none;\n\tfont-size: 13pt;\n\ttransition: all 0.1s;\n\toutline: none !important;\n\ttransform: translateX(-35px);\n\tpadding-top: 5px;\n\tposition: absolute;\n\t\n\tcolor: var(--lockedTextColor);\n\topacity: 80%;\n}\n\n.SearchBar input{\n\tpadding-right: 32px;\n\twidth: 100%;\n}\n\n.SearchBar.locked .searchButton{\n\tbackground-color: transparent;\n\tborder: none;\n\tcolor: var(--lockedTextColor);\n}\n\n.SearchBar .searchComponentWrapper{\n\tposition: absolute;\n\ttop: 100%;\n\twidth: 100%;\n\theight: fit-content;\n\tbackground-color: var(--cardBG);\n\tborder: 1px solid var(--borderColor);\n\tborder-radius: 15px;\n\tz-index: 20;\n\tcolor: var(--mainTextColor);\n\tpadding: 10px;\n\t\n\tdisplay: none;\n}\n\n.SearchBar input:focus + \n.searchComponentWrapper,\n.SearchBar .searchComponentWrapper.alwaysShow\n{\n\tdisplay: block;\n}";
styleInject(css_248z$c);

function SearchBar(props) {
  var moduleData = useModuleContext();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      searchFunction = _useState2[0],
      setSearchFunction = _useState2[1];

  var searchRef = useRef();

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      searchBarValue = _useState4[0],
      setSearchBarValue = _useState4[1];

  var searchContext = moduleData.get('TouchPointSearchText');

  function focusSearchBar() {
    searchRef.current.focus();
  } //ctrl f handler


  function keyDownHandler(e) {
    var isCtrl = e.ctrlKey || e.metaKey;

    if (isCtrl && e.keyCode === 70) {
      e.preventDefault();
      focusSearchBar();
    }
  }

  useEffect(function () {
    window.addEventListener('keydown', keyDownHandler);
    return function () {
      moduleData.clear();
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  useEffect(function () {
    setSearchBarValue(searchContext ? searchContext : '');
  }, [searchContext]); //search

  function searchHandler() {
    moduleData.set('TouchPointSearchText', searchRef.current.value);
    searchRef.current.focus();
  } //clear


  function clearHandler() {
    moduleData.set('TouchPointSearchText', '');
    setSearchBarValue('');
    searchRef.current.focus();
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    clearTimeout(searchFunction);
    setSearchBarValue(e.target.value);
    setSearchFunction(setTimeout(function () {
      searchHandler();
    }, 250));

    if (props.onChange) {
      props.onChange(e.target.value);
    }
  } //for nested components


  function customizeValue(newValue) {
    var fakeEvent = {
      target: {
        value: newValue
      }
    };
    changeHandler(fakeEvent);
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "SearchBar"
  }, /*#__PURE__*/React.createElement(TextBox, {
    locked: false,
    onChange: changeHandler,
    onEnter: searchHandler,
    placeholder: "Search",
    value: searchBarValue,
    inputRef: searchRef,
    style: props.style,
    tabIndex: props.tabIndex
  }), searchBarValue && props.nestedComponent ? /*#__PURE__*/React.createElement("div", {
    className: props.alwaysShow ? 'searchComponentWrapper alwaysShow' : 'searchComponentWrapper',
    style: props.nestedProps ? props.nestedProps.style : null
  }, typeof props.nestedComponent == 'function' ? /*#__PURE__*/React.createElement(props.nestedComponent, _extends({}, props.nestedProps, {
    searchBarValue: searchBarValue,
    setSearchBarValue: customizeValue
  })) : props.nestedComponent) : null, searchBarValue ? /*#__PURE__*/React.createElement("button", {
    className: "searchButton",
    onClick: clearHandler
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimesCircle
  })) : null);
} //Proptypes

SearchBar.propTypes = {
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  tabIndex: PropTypes.any,
  alwaysShow: PropTypes.bool,
  nestedComponent: PropTypes.any,
  nestedProps: PropTypes.object
};

//Context hooks for variable and functions that are system wide

var radioContext = /*#__PURE__*/createContext({});

function RadioGroup(props) {
  //decides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  var _useState = useState(v4),
      _useState2 = _slicedToArray(_useState, 1),
      groupName = _useState2[0];

  function onChange(value) {
    if (props.onChange) {
      props.onChange(value, props.groupID);
    }
  }

  var radioData = {
    onChange: onChange,
    groupName: groupName,
    locked: locked,
    defaultValue: props.defaultValue,
    value: props.value
  };
  return /*#__PURE__*/React.createElement(radioContext.Provider, {
    value: radioData
  }, props.children);
} //Proptypes

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  locked: PropTypes.bool,
  groupID: PropTypes.any,
  value: PropTypes.any
};

var css_248z$d = ".RadioButton{\n\tpadding: 5px;\n}\n\n.RadioButton label, .RadioButton .input{\n\tcursor: pointer;\n}\n\n.RadioButton input{\n\tmargin-right: 5px;\n}\t\n\n.RadioButton label{\n\tcolor: var(--mainTextColor);\n\tmargin-bottom: 0;\n}\n\n.RadioButton .locked{\n\tcursor: default !important;\n}";
styleInject(css_248z$d);

function RadioButton(props) {
  var radioData = useContext(radioContext);

  var _useState = useState(v4),
      _useState2 = _slicedToArray(_useState, 1),
      id = _useState2[0];

  if (!radioData.onChange) {
    console.error('Radio Buttons need to be inside a RadioGroup component.');
  }

  var lockedClass = '';

  if (radioData.locked) {
    lockedClass = 'locked ';
  } //handles the clicking of the radio button - for locked radio buttons


  function clickHandler(e) {
    if (radioData.locked) {
      e.preventDefault();
    } else {
      radioData.onChange(props.value);
    }
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "RadioButton flexY " + lockedClass,
    style: props.style
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    className: 'input ' + lockedClass,
    defaultChecked: radioData.value !== undefined ? undefined : radioData.defaultValue === props.value,
    onClick: clickHandler,
    name: radioData.groupName,
    value: props.value,
    style: props.buttonStyle,
    id: id,
    checked: radioData.value !== undefined ? radioData.value === props.value : undefined,
    readOnly: radioData.value !== undefined,
    tabIndex: props.tabIndex,
    ref: props.inputRef
  }), /*#__PURE__*/React.createElement("label", {
    className: lockedClass,
    htmlFor: id,
    style: props.labelStyle
  }, props.children, props.labelValue));
}
RadioButton.propTypes = {
  value: PropTypes.any,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  tabIndex: PropTypes.any,
  inputRef: PropTypes.object
};

var css_248z$e = ".ControlBar{\n\twidth:100%;\n\tbackground-color: var(--navColor);\t\n\tpadding: 5px 10px;\n\tcolor: var(--navTextColor);\n\theight: var(--controlBarHeight);\n\tbox-sizing: border-box;\n\tposition: relative;\n}\n\n.ControlBar .buttonContainer{\n\tbox-sizing: border-box;\n\tposition: absolute;\n\tleft: 10px;\n\tbackground-color: var(--navColor);\n\theight: 100%;\n\t\n}\n\n.ControlBar .searchContainer{\n\tposition: absolute;\n\tright: 5px;\n\tbox-sizing: border-box;\n\twidth: max(20%, 250px);\n\theight: 100%;\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.ControlBar .SearchBar{\n\twidth: 100%;\n}\n\n.ControlBar .input{\n\tborder: none;\n}\n\n/* ControlButton */\n.ControlBar button:not(.searchButton):not(.FreeButton){\n\toutline: none !important;\n\tborder: none;\n\tborder-radius: 15px;\n\theight: 100%;\n\t\n\tcolor: var(--navTextColor);\n\tbackground-color: var(--navColor);\n\tbackground-color: transparent;\n\t\n\tfont-size: 14pt;\n\tfont-weight: bold;\n\tmargin:0;\n\tmargin-right: 30px;\n\twhite-space: nowrap;\n}\n\n.ControlBar button:not(.FreeButton):hover{\n\tcolor: var(--navHoverColor);\n}\n\n.ControlBar button:not(.FreeButton):active{\n\tcolor: var(--navClickedColor);\n}\n\n.ControlBar button.locked{\n\tcolor: var(--navTextColor) !important;\n\tfilter: brightness(80%);\n\topacity: 60%;\n\tcursor: default;\n}";
styleInject(css_248z$e);

function ControlBar(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  if (props.searchBar) {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "ControlBar flexY",
      style: props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "searchContainer"
    }, /*#__PURE__*/React.createElement(SearchBar, props.searchBarProps)), /*#__PURE__*/React.createElement("div", {
      className: "buttonContainer flexY"
    }, props.children)));
  } else {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "ControlBar flexY",
      style: props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "buttonContainer"
    }, props.children)));
  }
} //Proptypes

ControlBar.propTypes = {
  searchBar: PropTypes.bool,
  searchBarProps: PropTypes.object,
  locked: PropTypes.bool,
  style: PropTypes.object
};

var css_248z$f = ".CommentBox{\n\tresize: none;\n\tpadding: 5px;\n\tborder-radius: 7px;\n}";
styleInject(css_248z$f);

function CommentBox(props) {
  var _React$createElement;

  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    if (!locked && props.onChange !== undefined) {
      props.onChange(e);
    }
  }

  function blurHandler(e) {
    if (!locked && props.onBlur) {
      props.onBlur(e);
    }
  } //For the onEnter event


  function keyPressHandler(e) {
    if (!locked && e.key === 'Enter' && props.onEnter !== undefined) {
      e.preventDefault();
      e.target.blur();
      props.onEnter(e);
    }
  }

  return /*#__PURE__*/React.createElement("textarea", (_React$createElement = {
    className: "input CommentBox " + lockedClass + ' ' + props.className,
    defaultValue: props.defaultValue,
    onChange: changeHandler,
    readOnly: locked,
    placeholder: props.placeholder,
    onBlur: blurHandler,
    style: props.style,
    value: props.value,
    maxLength: props.maxLength,
    onKeyPress: keyPressHandler,
    autoFocus: props.autoFocus,
    onFocus: props.onFocus
  }, _defineProperty(_React$createElement, "onBlur", props.onBlur), _defineProperty(_React$createElement, "tabIndex", props.tabIndex), _defineProperty(_React$createElement, "ref", props.inputRef), _React$createElement));
} //Proptypes

CommentBox.propTypes = {
  locked: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  tabIndex: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  inputRef: PropTypes.object
};

var css_248z$g = ".ComboBox{\n\tappearance: none !important;\n\t\n\tbackground-image: url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\");\n\tbackground-repeat: no-repeat;\n\tbackground-position-x: 97%;\n\tbackground-position-y: 50%;\n}\n\n.ComboBox.locked{\n\tbackground-image: none;\n}\n\n\n\n\n";
styleInject(css_248z$g);

function ComboBox(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    if (!locked && props.onChange !== undefined) {
      props.onChange(e);
    }
  } //if its locked, only allow the default option


  var kids = props.children;

  if (locked) {
    kids = /*#__PURE__*/React.createElement("option", null, props.defaultValue);
  } //If it's hidden, don't render anything


  if (props.hidden) {
    return null;
  } else {
    return /*#__PURE__*/React.createElement("select", {
      className: "ComboBox input " + lockedClass + ' ' + props.className,
      defaultValue: props.defaultValue,
      onChange: changeHandler,
      disabled: locked,
      style: props.style,
      value: props.value,
      tabIndex: props.tabIndex,
      ref: props.inputRef
    }, kids);
  }
} //

ComboBox.propTypes = {
  hidden: PropTypes.bool,
  locked: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.any,
  inputRef: PropTypes.object
};

function CheckBox(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    if (!locked && props.onChange !== undefined) {
      props.onChange(e);
    }
  } //handles the clicking of the checkbox - for locked checkboxes


  function clickHandler(e) {
    if (locked) {
      e.preventDefault();
    }
  }

  return /*#__PURE__*/React.createElement("label", {
    className: "CheckBox flexY"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: 'input ' + lockedClass,
    defaultChecked: props.defaultValue,
    onChange: changeHandler,
    onClick: clickHandler,
    style: props.style,
    checked: props.checked,
    readOnly: props.checked !== undefined ? true : false,
    tabIndex: props.tabIndex,
    ref: props.inputRef
  }), /*#__PURE__*/React.createElement("span", {
    className: "checkmark"
  }), props.label);
}
CheckBox.propTypes = {
  locked: PropTypes.bool,
  hidden: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
  style: PropTypes.object,
  checked: PropTypes.bool,
  tabIndex: PropTypes.any,
  inputRef: PropTypes.object
};

//Context hooks for variable and functions that are system wide

var menuContext = /*#__PURE__*/createContext({});

var css_248z$h = ".menuButtonContainer{\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.MenuButton{\n\toutline: none !important;\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: inherit;\n\tfont-size: inherit;\n\tfont-weight: inherit;\n\tbox-sizing: border-box;\n\tdisplay: inline-block;\n\tposition: relative;\n}\n\n.MenuButton:hover{\n\tfilter: brightness(95%)\n}\n\n.MenuButton:active{\n\tfilter: brightness(90%)\n}\n\n.MenuButton.locked{\n\tcursor: default;\n\tfilter: none;\n}\n\n.MenuButton .smallIcon{\n\tfont-size: 8pt;\n}\n\n.dropdown-menu{\n\tbackground-color: var(--cardBG);\n\tpadding: 0;\n\tborder-radius: 7px;\n\toverflow: hidden;\n}\n\n.Menu{\n\tbackground-color: var(--cardBG);\n\tcolor: var(--mainTextColor);\n\tpadding-top: 7px;\n\tpadding-top: 0;\n\tposition: relative;\n\tz-index: 10;\n\toverflow-x: visible;\n}\n\n.MenuButton .notifications{\n\tposition: absolute;\n\ttop: -10px;\n\tright: -10px;\n\tfont-size: 9pt;\n\tcolor: white;\n\tbackground-color: red;\n\tfont-weight: bold;\n\tborder-radius: 10px;\n\tpadding: 2px 6px;\n}\n\n/* Buttons and links */\n.Menu a, .Menu button:not(.FreeButton):not(.ConfirmButton):not(.react-datepicker__navigation){\n\twidth: 100%;\n\tcolor: var(--mainTextColor) !important;\n\tbackground-color: var(--cardBG);\n\tborder: none;\n\toutline: none !important;\n\ttext-align: left;\n\tpadding: 4px 20px;\n\tmargin: 0 !important;\n\tcursor: pointer;\n\tmargin: 3px 0;\n\twhite-space: nowrap;\n}\n\n.Menu a:hover, \n.Menu button:not(.FreeButton):not(.ConfirmButton):hover{\n\tbackground-color: var(--cardBG);\n\tfilter: brightness(95%);\n\tcolor: var(--mainTextColor);\n}\n\n.Menu a:not(.nav-item):not(.disabled):active, .Menu button:not(.FreeButton):not(.disabled):not(.ConfirmButton):active{\n\tfilter: brightness(91%) !important;\n}\n\n.Menu .FreeButton{\n\twidth: 100% - 20px;\n\tmargin: 0;\n}\n\n.Menu>div{\n\tmax-height: inherit;\n}\n\n/* Inputs */\n.Menu .TextBox{\n\twidth: calc(100% - 20px);\n\tmargin: 0 10px;\n\t\n}\n\n/* Tabbed menus */\n.Menu .InfoTabContainer{\n\tbackground-color: transparent;\n}\n\n.Menu .nav{\n\tpadding: 0 10px;\n\tmargin: 0 !important;\n\tposition: sticky;\n\ttop:0;\n\twidth: 100% !important;\n\tbackground-color: var(--cardBG);\n}\n\n.Menu .InfoTabContainer .nav-tabs,\n.Menu .InfoTabContainer .nav-tabs a{\n\twidth: fit-content;\n\tbackground-color:var(--cardBG) !important;\n\tcolor: var(--labelColor) !important;\n\ttext-align: left;\n\tpadding: 0;\n\tmargin-left: 10px;\n\tz-index: 3;\n\tfilter: none;\n\tfont-size: 13pt;\n\theight: 30px;\n\tpadding-top: 0px !important;\n}\n\n.Menu .InfoTabContainer .nav-tabs a.active{\n\ttext-shadow: 1px 0px 0px var(--labelColor);\n\tborder-bottom-color: var(--labelColor) !important;\n\tborder-bottom-width: 3px !important;\n}\n\n.Menu .InfoTabContainer, .tab-content, .tab-pane, \n.InfoTab{\n\tmax-height: inherit;\n}\n\n.Menu .InfoTabContainer{\n\toverflow-y: hidden;\n\t\n}\n\n/* Submenus */\n.Menu .MenuButton{\n\tposition: relative;\n}\n\n.Menu .subMenuIcon{\n\tposition: absolute;\t\n\tright: 5px;\n\tbackground-color: var(--cardBG);\n}\n\n.Menu .menuButtonContainer{\n\twidth: 100%;\n}";
styleInject(css_248z$h);

var dropMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var menuMaxWidth = props.menuStyle && props.menuStyle.width ? null : '180px';
  return /*#__PURE__*/React.createElement(menuContext.Provider, {
    value: {
      submenu: true
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: props.className + ' Menu ' + props.menuClass,
    style: _objectSpread2(_objectSpread2({
      maxWidth: menuMaxWidth
    }, props.style), props.menuStyle),
    onClick: props.onClickBody
  }, typeof props.MenuContent == 'function' ? /*#__PURE__*/React.createElement(props.MenuContent, props.menuProps) : props.MenuContent));
});
function MenuButton(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass;

  if (locked) {
    lockedClass = 'locked';
  }

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      toggling = _useState2[0],
      setToggling = _useState2[1]; //handles both onOpen and onClose


  function toggleHandler(isOpen) {
    if (!toggling && isOpen && props.onOpen) {
      props.onOpen();
    } else if (!toggling && props.onClose && !isOpen) {
      props.onClose();
      setToggling(true);
    } //Prevent spamming


    setTimeout(function () {
      return setToggling(false);
    }, 300);
  } //check if it's inside of another menu, if so render as a submenu


  var parentMenuData = useContext(menuContext);
  var icon = parentMenuData.submenu ? /*#__PURE__*/React.createElement("span", {
    className: "subMenuIcon"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCaretRight
  })) : null;
  var direction = props.direction;

  if (parentMenuData.submenu) {
    direction = 'right';
  }

  var notifications = props.notifications < 99 ? props.notifications : '99+';
  var notificationBadge = props.notifications && !locked ? /*#__PURE__*/React.createElement("span", {
    className: "notifications",
    style: props.notificationStyle
  }, notifications) : null; //button

  var dropButton = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var onClick = _ref.onClick;

    function clickHandler(e) {
      e.preventDefault();
      onClick(e);
    }

    return /*#__PURE__*/React.createElement("button", {
      className: 'MenuButton ' + props.className + ' ' + lockedClass,
      onClick: clickHandler,
      ref: ref,
      style: props.style,
      title: props.title
    }, notificationBadge, props.children, icon);
  }); //Prevent submenus from sticking around after their parent has closed

  function onClickBody() {
    if (parentMenuData.submenu) {
      document.body.click();
    }
  }

  if (props.hidden) {
    return null;
  } //If locked return a button that does nothing, otherwise create a real dropdown button


  if (locked) {
    return /*#__PURE__*/React.createElement("button", {
      title: props.title,
      className: 'MenuButton ' + props.className + ' ' + lockedClass,
      style: props.style
    }, props.children, icon);
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "menuButtonContainer"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    drop: direction,
    onToggle: toggleHandler
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    as: dropButton
  }), /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/React.createElement(Dropdown.Menu, {
    as: dropMenu,
    MenuContent: props.menuContent,
    menuProps: props.menuProps,
    menuStyle: props.menuStyle,
    onClickBody: onClickBody
  }), document.body)));
} //Proptypes

MenuButton.propTypes = {
  locked: PropTypes.bool,
  className: PropTypes.string,
  menuContent: PropTypes.any.isRequired,
  maxHeight: PropTypes.string,
  direction: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  menuStyle: PropTypes.object,
  style: PropTypes.object,
  notificationStyle: PropTypes.object,
  menuProps: PropTypes.object,
  title: PropTypes.string
};

var css_248z$i = ".DockIcon{\n\twidth: var(--dockWidth);\n\tcolor: var(--dockTextColor);\n\tmargin-bottom: 8px;\n\tposition: relative;\n\tpadding-left: 0;\n\tpadding-right: 0;\n}\n\n.DockIcon .pic{\n\twidth: 100%;\n\ttext-align: center;\n\tmargin-bottom: -2px;\n}\n\n.DockIcon .title{\n\ttext-align: center;\n\tfont-size: 9pt;\n}\n\n.DockIcon.active{\n\tborder-left: 2px solid var(--dockTextColor);\n\tbox-sizing: border-box;\n}\n\n.DockIcon:not(.locked):hover{\n\tfilter: brightness(75%);\n\tbackground-color: transparent;\n}\n\n.DockIcon:not(.locked):active{\n\tfilter: brightness(60%);\n}\n\n.DockIcon.locked{\n\topacity: 80%;\n\tfilter: brightness(70%);\n\tcursor: default;\n}\n\n.DockIcon .notifications{\n\tposition: absolute;\n\ttop: -8px;\n\tright: 5px;\n\tfont-size: 9pt;\n\tcolor: white;\n\tbackground-color: red;\n\tfont-weight: bold;\n\tborder-radius: 10px;\n\tpadding: 0 3px;\n}\n";
styleInject(css_248z$i);

function DockIcon(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var icon = props.faIcon ? /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: props.faIcon
  }) : null;
  var iconStyle = {
    fontSize: props.title ? '17pt' : '20pt'
  };
  var notifications = props.notifications < 99 ? props.notifications : '99+';
  var notificationBadge = props.notifications && !locked ? /*#__PURE__*/React.createElement("span", {
    className: "notifications"
  }, notifications) : null;

  if (props.hidden) {
    return null;
  }

  if (props.menuContent) {
    function openHandler() {
      if (props.onClick) {
        props.onClick();
      }

      if (props.onOpen) {
        props.onOpen();
      }
    }

    return /*#__PURE__*/React.createElement(MenuButton, {
      className: "DockIcon",
      style: props.style,
      locked: props.locked,
      onOpen: openHandler,
      onClose: props.onClose,
      menuContent: props.menuContent,
      direction: "left",
      menuStyle: props.menuStyle,
      menuProps: props.menuProps
    }, notificationBadge, /*#__PURE__*/React.createElement("div", {
      className: "pic",
      style: iconStyle
    }, icon, props.children), /*#__PURE__*/React.createElement("div", {
      className: "title"
    }, props.title));
  }

  return /*#__PURE__*/React.createElement(CoreButton, {
    className: props.active ? 'DockIcon active' : 'DockIcon',
    style: props.style,
    locked: props.locked,
    onClick: props.onClick
  }, notificationBadge, /*#__PURE__*/React.createElement("div", {
    className: "pic",
    style: iconStyle
  }, icon, props.children), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, props.title));
} //proptypes

DockIcon.propTypes = {
  locked: PropTypes.bool,
  hidden: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
  notifications: PropTypes.number,
  onClick: PropTypes.func,
  menuContent: PropTypes.any,
  menuStyle: PropTypes.object,
  menuProps: PropTypes.object,
  active: PropTypes.bool
};

var css_248z$j = ".InfoCard{\n\tpadding: 10px 20px;\n\tmargin: 0;\n\ttransition: padding 0.25s;\n\t\n}\n\n.InfoCard .InfoCard .cardContainer{\n\tbox-shadow: none;\n\tborder: 1px solid var(--borderColor);\n}\n\n.InfoCard .CloseButton{\n\tposition: absolute;\n\tright: 6px;\n\ttop: 6px;\n}\n\n.InfoCard.dynamicX:hover{\n\tpadding-left: 13px;\n\tpadding-right: 13px;\n\tcursor: pointer;\n}\n\n.InfoCard.dynamicX:hover .cardContainer{\n\tbox-shadow: var(--dynamicCardShadow);\n}\n\n.InfoCard.dynamicX:active{\n\tpadding-left: 21px;\n\tpadding-right: 21px;\n\ttransition: padding 0.05s;\n}\n\n.InfoCard .cardContainer{\n\tbackground-color: var(--cardBG);\n\tcolor: var(--mainTextColor);\n\tborder-radius: 11px;\n\toverflow: hidden;\n\tbox-shadow: var(--cardShadow);\n\theight: 100%;\n\twidth: 100%;\n\tposition: relative;\n}\n\n.InfoCard .textBox{\n\tpadding: 11px;\n\twidth: 100%;\n\theight: 100%;\n\toverflow-y: auto;\n}\n\n.InfoCard .textBox.stripe{\n\tborder-left-width: 5px;\n\tborder-left-style: solid;\n\tborder-left-color: var(--labelColor);\n\tfloat:left;\n\theight: 100%;\n}\n\n.InfoCard label{\n\tmargin:0 10px 0px 0;\n\tfont-size: 12pt;\n\tcolor: var(--labelColor);\n\n}\n\n.InfoCard h1{\n\tfont-size: 15pt;\n\tfont-weight: bold;\n\tcolor: var(--labelColor);\n\tmargin-top: 0;\n}\n\n.InfoCard h2{\n\tmargin: 7px 0px;\n\tfont-size: 12pt;\n\tfont-weight: bold;\n}\n\n.InfoCard p{\n\tmargin:0;\n}\n\n/* Tabs in an infocard */\n.InfoCard .InfoTabContainer{\n\tbackground-color: transparent;\n}\n\n.InfoCard .InfoTabContainer .nav-tabs,\n.InfoCard .InfoTabContainer .nav-tabs a{\n\tbackground-color: transparent !important;\n\tcolor: var(--labelColor) !important;\n\ttext-align: left;\n\tpadding: 0;\n\tmargin-left: 0;\n\tmargin-right: 20px;\n\tmargin-bottom: 6px;\t\n}\n\n.InfoCard .InfoTabContainer .nav-tabs a.active{\n\ttext-shadow: 1px 0px 0px var(--labelColor);\n\t\n\t\n\tborder-bottom-color: var(--labelColor) !important;\n\tborder-bottom-width: 5px !important;\n}\n\n/* Maintable in an infocard */\n.InfoCard .MainTable{\n\tbackground-color: transparent;\n}\n\n.InfoCard .MainTable .titleBar{\n\tfont-weight: bold;\n}\n";
styleInject(css_248z$j);

function InfoCard(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //Assign classes based on props 

  var stripe = '';
  var hasStripe = props.stripe || props.stripeColor;

  if (hasStripe && !props.titleBar) {
    stripe = 'stripe';
  } //Adds hover and click effects


  var dynamic = !locked && props.onClick ? 'dynamicX' : ''; //handles the onClick event. Only fires if the component is not locked

  function clickHandler(e) {
    if (!locked && props.onClick !== undefined) {
      props.onClick(e);
    }
  }

  function closeHandler(e) {
    e.stopPropagation();
    props.onClose();
  } //If a title prop is provided, create an H1


  var titleBar;

  if (props.title) {
    titleBar = /*#__PURE__*/React.createElement("h1", {
      style: {
        color: props.stripeColor
      }
    }, props.title);
  }

  var closeButton;

  if (props.onClose) {
    closeButton = /*#__PURE__*/React.createElement(CloseButton, {
      onClick: closeHandler
    });
  }

  var stripeStyle = props.stripeColor ? {
    borderLeftColor: props.stripeColor
  } : undefined; //if 'hidden' prop is true then dont show the component

  if (props.hidden) {
    return null;
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "InfoCard " + dynamic + ' ' + props.className,
      onClick: clickHandler,
      style: props.style
    }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "cardContainer",
      style: props.innerStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "textBox " + stripe,
      style: stripeStyle
    }, closeButton, titleBar, props.children))));
  }
} //Proptypes

InfoCard.propTypes = {
  title: PropTypes.string,
  stripe: PropTypes.bool,
  dynamicX: PropTypes.bool,
  dynamicY: PropTypes.bool,
  locked: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  onClose: PropTypes.func,
  style: PropTypes.object,
  innerStyle: PropTypes.object,
  stripeColor: PropTypes.string
};

var css_248z$k = ".PopupCard{\n\tmax-width: 90%;\n}\n\n.PopupCard .cardContainer{\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: var(--labelColor);\n\tbox-sizing: var(--dynamicCardShadow);\n}\n\n.popupBlockClicks{\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight: 100%;\n\twidth: 100%;\n\tcursor: default;\n}\n\n";
styleInject(css_248z$k);

function PopupCard(props) {
  var system = useSystem();
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //Clicking the background closes the popup

  var handleCloseButton;

  if (!props.forceOpen) {
    handleCloseButton = function handleCloseButton() {
      if (!props.forceOpen) {
        system.Popup.close();
      }
    };
  }

  useEffect(function () {
    if (props.onOpen) {
      props.onOpen();
    }

    function handlKeypress(e) {
      if (e.key === 'Escape' && !props.forceOpen) {
        system.Popup.close();
      }
    }

    document.addEventListener('keydown', handlKeypress);
    return function () {
      if (props.onClose) {
        props.onClose();
      }

      document.removeEventListener('keydown', handlKeypress);
    };
  }, []);
  var content = /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, /*#__PURE__*/React.createElement(InfoCard, {
    className: 'PopupCard ',
    stripe: true,
    title: props.title,
    onClose: handleCloseButton,
    style: _objectSpread2({
      height: 'auto'
    }, props.style),
    innerStyle: _objectSpread2({
      borderColor: props.stripeColor
    }, props.innerStyle),
    stripeColor: props.stripeColor
  }, props.children));

  if (props.forceOpen) {
    return /*#__PURE__*/React.createElement("div", {
      className: 'popupBlockClicks'
    }, content);
  }

  return content;
} //Proptypes

PopupCard.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  forceOpen: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  locked: PropTypes.bool,
  style: PropTypes.object,
  innerStyle: PropTypes.object
};

var css_248z$l = ".MainTable{\n\twidth: 100%;\n\tposition: relative;\n\theight: 100%;\n\toverflow-x: auto;\n\toverflow-y: auto;\n\t--topBarHeight: 29px;\n\tcolor: var(--mainTextColor);\n\tbackground-color: var(--bodyAltBG);\n}\n\n.MainTable.noTransition *{\n\ttransition: none !important;\n}\n\n.MainTable .topBar{\n\tpadding: 7px 0px;\n\tpadding-top: 3px;\n\tpadding-left: 30px;\n\tbackground-color: var(--bodyAltBG);\n\tposition: sticky;\n\tleft: 0;\n\tz-index: 2;\n\ttop:0;\n\theight: var(--topBarHeight);\n}\n\n.MainTable .topBar .menuButtonContainer{\n\tpadding: 0;\n\tmargin-right: 10px;\n\tz-index: 11;\n}\n\n.MainTable .theadBar{\n\ttop: var(--topBarHeight);\n\toverflow-y: visible;\n\tbackground-color: var(--bodyAltBG);\n\tpadding-left: 25px;\n\tpadding-right: 25px;\n\tdisplay: flex;\n\tposition: sticky;\n\tz-index: 1;\n}\n\n.MainTable.hasNested .theadBar>span:first-child{\n\tpadding-left: 25px;\n}\n\n.MainTable .TheadButton, \n.MainTable .theadBarComponentWrapper{\n\twhite-space: nowrap;\n\ttext-align: left;\n\tpadding-left: 0;\n\tcolor: var(--mainTextColor);\t\n}\n\n.MainTable .theadBarComponentWrapper{\n\toverflow: hidden;\n}\n\n.MainTable .theadBarTheadButtonWrapper\n.menuButtonContainer,\n.MainTable .theadBarTheadButtonWrapper\n.menuButtonContainer .TheadButton{\n\twidth: 100%;\n\t/* overflow: hidden; removed as it causes the theadbutton to be very tall for no reason */\n}\n\n.MainTable .theadBarTheadButtonWrapper.shiftLeft\n.menuButtonContainer{\n\tpadding-left: 0;\n}\n\n.MainTable .theadBarTheadButtonWrapper.centeredHeader,\n.MainTable .theadBarTheadButtonWrapper.centeredHeader .TheadButton\n{\n\ttext-align: center;\n}\n\n\n.MainTable .TheadButton:active,\n.MainTable .TheadButton:focus,\n.MainTable .TheadButton.open{\n\tcolor: var(--labelColor);\n\tfilter: brightness(70%);\n}\n\n.MainTable .TheadButton.locked{\n\tcolor: var(--mainTextColor)\t!important;\n\tfilter: none !important;\n}\n\n.MainTable span{\n\tbox-sizing: border-box;\n\tdisplay: inline-block;\n\ttext-align: left;\n\tpadding: 0 3px;\n\tmargin: 0;\n\tmax-height: 100%;\n\tpadding-left: 23px;\n}\n\n.MainTable span:first-child{\n\tpadding-left: 3px;\n}\n\n/* Controls */\n.MainTable .topBarContainer{\n\tposition: relative;\n}\n\n.MainTable .tableControls{\n\tcolor: var(--lockedTextColor);\n\tfont-size: 12pt;\n\tbackground-color: var(--bodyAltBG);\n}\n\n.MainTable .pageControls{\n\ttext-align: right;\n\tpadding: 0 10px;\n\tmargin: 0;\n\theight: 25px;\n\tcolor: var(--lockedTextColor);\n\tposition: absolute;\n\tright: 0;\n\ttop: -2px;\n\tbackground-color: var(--bodyAltBG);\n}\n\n.MainTable .topBar button{\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: var(--lockedTextColor);\n\tfont-size: 15pt;\n\tpadding: 0 10px;\n\toutline: none !important;\n}\n\n.MainTable .topBar button:hover{\n\tcolor: var(--labelColor);\n}\n\n.MainTable .topBar button:active{\n\tfilter: brightness(70%);\n}\n\n.MainTable .tableControls button{\n\tfont-size: 12pt;\n\tpadding-left: 0;\n\tmargin-right: 10px;\n}\n\n.MainTable .textButton{\n\tfont-size: 13pt !important;\n\theight: 100%;\n}\n\n.MainTable .smallIcon{\n\tfont-size: 10pt;\n} \n\n.MainTable .smallerIcon{\n\tfont-size: 9pt;\n}";
styleInject(css_248z$l);

var css_248z$m = ".TheadMenu{\n\tdisplay: flex;\n\twidth: 100%;\t\n}\n\n.TheadMenu .compactText{\n\tfont-size: 11.5pt !important;\n\tpadding-left: 9px !important;\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.TheadMenu .compactText span{\n\ttext-overflow: ellipsis;\n\tdisplay: inline-block;\n\toverflow: hidden;\n\twidth: 100%;\n}\n\n.TheadMenu .FilterMenu{\n\tmax-height: inherit;\n\toverflow-x: hidden;\n\toverflow-y: auto;\n\tposition: relative;\n\twidth: 55%;\n\tborder-right: 1px solid var(--borderColor);\n}\n\n.TheadMenu .sideMenu{\n\twidth: 45%;\n\tposition: relative;\n\toverflow-y: auto;\n}\n\n.TheadMenu .SortMenu{\n\tposition: sticky;\n\ttop: 0;\n\tborder-bottom: 1px solid var(--borderColor);\n\tpadding-top: 10px;\n\tpadding-bottom: 10px;\n\tz-index: 1;\n\tbackground-color: var(--cardBG);\n}\n\n.TheadMenu .SortMenu .sortButton{\n\tposition: relative;\n}\n\n.TheadMenu .SortMenu .sortIcon{\n\tposition: absolute;\n\tright: 9px;\n\topacity: 75%;\n}\n\n\n.TheadMenu .FilterMenu .stickyMenu{\n\tz-index: 1;\n\tposition: sticky;\n\ttop: 0;\n}\n\n.TheadMenu .FilterMenu .selectAll{\n\tfont-weight: bold;\n\tbackground-color: var(--cardBG);\n}\n\n.TheadMenu .MoreFilters{\n\twidth: 100%;\n}\n\n.TheadMenu .MoreFilters .cancelIcon{\n\tposition: absolute; \n\tright: 5px;\n\ttop: 3px;\n\tcolor: var(--lockedTextColor);\n\tcursor: pointer;\n}\n\n.TheadMenu .MoreFilters .commitIcon{\n\tposition: absolute; \n\tright: 3px;\n\tbottom: 3px;\n\tcolor: var(--lockedTextColor);\n\tcursor: pointer;\n\tfont-size: 11pt;\n}\n\n.TheadMenu .MoreFilters .closeIcon:hover,\n.TheadMenu .MoreFilters .commitIcon:hover{\n\tfilter: brightness(115%);\n}\n\n.TheadMenu .MoreFilters .closeIcon:active,\n.TheadMenu .MoreFilters .commitIcon:active{\n\tfilter: brightness(90%);\n}\n\n.TheadMenu .MoreFilterButtonActive{\n\ttext-align: left;\n\tpadding-left: 20px;\n\tfilter: none !important;\n\tposition: relative;\n\twidth: 60%;\n}\n\n.TheadMenu .MoreFilterButtonActive .activeFilterButton .tag{\n\tdisplay: block;\n\tpadding-right: '10px';\n}\n\n.TheadMenu .MoreFilterButtonActive .input{\n\tfont-size: 10pt;\n\tpadding-top: 2px;\n\tpadding-bottom: 2px;\n\twidth: calc(100% - 10px);\n}";
styleInject(css_248z$m);

function FilterMenu(props) {
  var values = props.header.uniqueValues;
  var selectAllRef = useRef({});

  function clickHandler(val) {
    var newHeaders = _toConsumableArray(props.dataHeaders.get());

    newHeaders[props.header.index].uniqueValues[val] = !newHeaders[props.header.index].uniqueValues[val];
    props.dataHeaders.set(newHeaders);
  }

  function selectAll(e) {
    var cb = selectAllRef.current;

    if (e.target !== cb) {
      cb.checked = !cb.checked;
    }

    var newHeaders = _toConsumableArray(props.dataHeaders.get());

    if (cb.checked) {
      newHeaders[props.header.index].clearFilter();
    } else {
      newHeaders[props.header.index].selectAll(cb.checked);
    }

    props.dataHeaders.set(newHeaders);
  }

  var spanStyle = {
    textAlign: 'left',
    paddingLeft: '7px'
  };
  var count = -1;
  var lim = 200;

  if (!props.noFilter) {
    return /*#__PURE__*/React.createElement("div", {
      className: "FilterMenu"
    }, /*#__PURE__*/React.createElement("div", {
      className: "stickyMenu"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: selectAll,
      className: "selectAll fullButton compactText"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !props.header.hasFilter(),
      ref: selectAllRef,
      style: {
        cursor: 'pointer'
      },
      readOnly: true
    }), /*#__PURE__*/React.createElement("span", {
      style: spanStyle
    }, 'Select All'))), Object.keys(values).map(function (v, i) {
      count++; //Limit the number of checkboxes that are rendered to 200

      if (count < lim) {
        return /*#__PURE__*/React.createElement("button", {
          className: 'fullButton compactText',
          key: props.header.id + 'fv' + count,
          onClick: function onClick(e) {
            return clickHandler(v);
          },
          title: props.header.format(v)
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: values[v],
          id: props.header.headerID + 'fcb' + i,
          value: v,
          style: {
            cursor: 'pointer'
          },
          readOnly: true
        }), /*#__PURE__*/React.createElement("span", {
          style: spanStyle
        }, v !== 0 && (!v || v.toString() === 'undefined') ? 'Blank' : props.header.format(v)));
      } else return null;
    }), count >= lim ? /*#__PURE__*/React.createElement("button", null, "... ", count - lim, " More") : null);
  } else return null;
}

var DataFilter = /*#__PURE__*/function () {
  function DataFilter(options) {
    _classCallCheck(this, DataFilter);

    this.options = options;
    this.displayName = options.type;
    this.filter = DataFilter.getFilterTypes()[options.id] ? DataFilter.getFilterTypes()[options.id].func : function () {
      return true;
    };
    this.displayName = DataFilter.getFilterTypes()[options.id].displayName;
    this.args = DataFilter.getFilterTypes()[options.id].args;
    this.options.value = options.value.toString().toLowerCase();
  }

  _createClass(DataFilter, [{
    key: "func",
    value: function func(val) {
      try {
        return this.filter(val, this.options);
      } catch (err) {
        return false;
      }
    }
  }], [{
    key: "getFilterTypes",
    value: function getFilterTypes() {
      return {
        includes: {
          func: function func(val, options) {
            return val.toString().toLowerCase().includes(options.value);
          },
          displayName: 'Search',
          availableTo: ['string']
        },
        doesNotInclude: {
          func: function func(val, options) {
            return !val.toString().toLowerCase().includes(options.value);
          },
          displayName: "Doesn't Include",
          availableTo: ['string']
        },
        lessThan: {
          func: function func(val, options) {
            return val < options.value || moment(val).isBefore(options.value, 'day');
          },
          displayName: 'Less than',
          availableTo: ['number', 'date']
        },
        greaterThan: {
          func: function func(val, options) {
            return val > options.value || moment(val).isAfter(options.value, 'day');
          },
          displayName: 'Greater than',
          availableTo: ['number', 'date']
        },
        equals: {
          func: function func(val, options) {
            return val.toString().toLowerCase() == options.value || moment(val).isSame(options.value, 'day');
          },
          displayName: 'Equals',
          availableTo: ['string', 'number', 'boolean', 'date']
        },
        doesNotEqual: {
          func: function func(val, options) {
            return val.toString().toLowerCase() != options.value && !moment(val).isSame(options.value, 'day');
          },
          displayName: "Doesn't Equal",
          availableTo: ['string', 'number', 'boolean', 'date']
        }
      };
    }
  }]);

  return DataFilter;
}();

function MoreFilterButtonActive(props) {
  var _useState = useState(props.header.filterList[props.filterID] && props.header.filterList[props.filterID].options.value ? props.header.format(props.header.filterList[props.filterID].options.value) : ''),
      _useState2 = _slicedToArray(_useState, 2),
      currentValue = _useState2[0],
      setCurrentValue = _useState2[1];

  function changeHandler(e) {
    setCurrentValue(e.target.value);
  }

  function commitHandler() {
    var newHeaders = _toConsumableArray(props.dataHeaders.get());

    newHeaders[props.header.index].addFilter({
      id: props.filterID,
      value: currentValue
    });
    props.dataHeaders.set(newHeaders);
  }

  function cancelHandler() {
    props.setActive(false); //if filter exists, remove it

    if (props.header.filterList[props.filterID]) {
      var newHeaders = _toConsumableArray(props.dataHeaders.get());

      newHeaders[props.header.index].removeFilter(props.filterID);
      props.dataHeaders.set(newHeaders);
    }

    props.data.filter();
  }

  function keyDownHandler(e) {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  function blurHandler(e) {
    if (currentValue.trim() === '') {
      cancelHandler();
    } else {
      commitHandler();
    }
  }

  return /*#__PURE__*/React.createElement("button", {
    className: "MoreFilterButtonActive disabled"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, props.filter.displayName), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    className: 'input wrap',
    autoFocus: true,
    onChange: changeHandler,
    value: currentValue,
    onKeyDown: keyDownHandler,
    onBlur: blurHandler
  }), /*#__PURE__*/React.createElement("span", {
    className: "cancelIcon",
    onClick: cancelHandler
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  })));
}

function MoreFilterButton(props) {
  var _useState = useState(props.header.filterList[props.filterID] ? true : false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  function activate() {
    if (!active) {
      setActive(true);

      var newHeaders = _toConsumableArray(props.dataHeaders.get());

      newHeaders[props.header.index].addFilter({
        id: props.filterID,
        value: ''
      });
      props.dataHeaders.set(newHeaders);
    }
  }

  useEffect(function () {
    var newActive = props.header.filterList[props.filterID] ? true : false;

    if (active !== newActive) {
      setActive(newActive);
    }
  });

  if (!active) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: activate,
      className: "MoreFilterButton"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        paddingRight: '10px'
      }
    }, props.filter.displayName));
  } else {
    return /*#__PURE__*/React.createElement(MoreFilterButtonActive, {
      dataHeaders: props.dataHeaders,
      data: props.data,
      filter: props.filter,
      filterID: props.filterID,
      header: props.header,
      setActive: setActive,
      active: active
    });
  }
}

function MoreFilters(props) {
  var filterList = DataFilter.getFilterTypes();

  if (!props.noFilter) {
    return /*#__PURE__*/React.createElement("div", {
      className: "MoreFilters"
    }, Object.keys(filterList).map(function (f, i) {
      if (filterList[f].availableTo.includes(props.header.type)) {
        return /*#__PURE__*/React.createElement(MoreFilterButton, {
          key: 'MoreFilterButton' + i,
          filter: filterList[f],
          filterID: f,
          header: props.header,
          dataHeaders: props.dataHeaders,
          data: props.data,
          openTrigger: props.openTrigger
        });
      } else return null;
    }));
  } else return null;
}

function SortMenu(props) {
  function sortData(e) {
    props.dataHeaders.addSortRule(props.header.headerID, e.target.value, props.header.index);
    props.data.sort();
  }

  var sortRule = props.dataHeaders.getSortRules().find(function (sr) {
    return sr.headerID === props.header.headerID;
  });
  var sortDir = sortRule ? sortRule.direction : '';
  var cancelIcon = /*#__PURE__*/React.createElement("span", {
    className: "sortIcon",
    onClick: function onClick(e) {
      props.dataHeaders.removeSortRule(props.header.headerID);
      props.data.sort();
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  }));

  if (!props.noSort) {
    return /*#__PURE__*/React.createElement("div", {
      className: "SortMenu"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: sortData,
      className: "fullButton sortButton",
      value: 'asc'
    }, "Sort Ascending", sortDir === 'asc' ? cancelIcon : null), /*#__PURE__*/React.createElement("button", {
      onClick: sortData,
      className: "fullButton sortButton",
      value: 'desc'
    }, "Sort Descending", sortDir === 'desc' ? cancelIcon : null));
  } else return null;
}

function TheadMenu(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "TheadMenu"
  }, /*#__PURE__*/React.createElement(FilterMenu, {
    dataHeaders: props.dataHeaders,
    header: props.header,
    data: props.data,
    openTrigger: props.openTrigger,
    noFilter: props.noFilter
  }), /*#__PURE__*/React.createElement("div", {
    className: "sideMenu",
    style: {
      width: props.noFilter ? '100%' : null
    }
  }, /*#__PURE__*/React.createElement(SortMenu, {
    data: props.data,
    header: props.header,
    dataHeaders: props.dataHeaders,
    noSort: props.noSort
  }), /*#__PURE__*/React.createElement(MoreFilters, {
    header: props.header,
    dataHeaders: props.dataHeaders,
    data: props.data,
    openTrigger: props.openTrigger,
    noFilter: props.noFilter
  })));
}

function TheadButton(props) {
  //if there is a menu, add a dropdown icon
  var arrowIcon = /*#__PURE__*/React.createElement("span", {
    className: "theadIcon"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCaretDown
  }));
  var filterIcon;
  var sortIcon;
  var hasFilter = props.header.hasFilter();
  var sortRule = props.dataHeaders.getSortRules().find(function (sr) {
    return sr.headerID === props.header.headerID;
  });

  if (sortRule) {
    arrowIcon = null;
    sortIcon = sortRule.direction === 'asc' ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faSortAlphaDown
    })) : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faSortAlphaDownAlt
    }));
  }

  if (hasFilter) {
    arrowIcon = null;
    filterIcon = /*#__PURE__*/React.createElement("span", {
      className: "smallIcon",
      style: {
        paddingLeft: '5px'
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faFilter
    }));
  } //changes every time the menu opens. Used by useEffect listeners in the menu to respond to the open event


  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      openTrigger = _useState2[0],
      setOpenTrigger = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  var openClass = isOpen ? ' open ' : '';

  if (props.noSort && props.noFilter) {
    return props.children;
  } else {
    return /*#__PURE__*/React.createElement(MenuButton, {
      className: 'TheadButton ' + openClass,
      locked: false,
      onOpen: function onOpen() {
        setOpenTrigger(!openTrigger);
        setIsOpen(true);
      },
      onClose: function onClose() {
        props.data.filter();
        setIsOpen(false);
      },
      menuContent: /*#__PURE__*/React.createElement(TheadMenu, {
        dataHeaders: props.dataHeaders,
        header: props.header,
        data: props.data,
        openTrigger: props.openTrigger,
        noSort: props.noSort,
        noFilter: props.noFilter
      }),
      menuStyle: {
        maxWidth: props.noFilter ? '180px' : '400px',
        maxHeight: '310px'
      }
    }, props.children, arrowIcon, sortIcon, filterIcon);
  }
}

function CheckButton(props) {
  var checkID = v4();

  function clickHandler(e, id) {
    if (!props.disabled) {
      var cb = document.getElementById(id);

      if (e.target !== cb) {
        cb.checked = !cb.checked;
      }

      if (props.onClick) {
        props.onClick(cb.checked, props.value);
      }
    }
  }

  var spanStyle = {
    textAlign: 'left',
    paddingLeft: '7px'
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      return clickHandler(e, checkID);
    },
    style: {
      color: 'var(--mainTextColor)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: props.defaultChecked,
    id: checkID,
    value: props.value,
    style: {
      cursor: 'pointer'
    },
    disabled: props.disabled,
    checked: props.checked,
    readOnly: props.checked !== undefined ? true : false
  }), /*#__PURE__*/React.createElement("span", {
    style: spanStyle
  }, props.children));
}
CheckButton.propTypes = {
  defaultChecked: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
};

function ColumnSettings(props) {
  function clickHandler(checked, idx) {
    props.headers.setVisible(idx, checked);
  }

  function applyHandler() {
    props.data.sort();
  }

  return /*#__PURE__*/React.createElement(MenuButton, {
    locked: false,
    menuStyle: {
      maxHeight: '300px',
      maxWidth: '300px'
    },
    onClose: applyHandler,
    menuContent: /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: 'auto',
        overflowX: 'hidden'
      }
    }, props.headers.get().map(function (h) {
      if (h.displayName) {
        return /*#__PURE__*/React.createElement(CheckButton, {
          key: 'customizeHeader' + h.headerID,
          disabled: h.required,
          checked: h.visible,
          value: h.index,
          onClick: clickHandler
        }, h.displayName);
      } else return null;
    }))
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faColumns
  }), " Column Settings");
}

var css_248z$n = ".SaveTableLayout .inputMenu{\n\tborder-bottom: 1px solid var(--borderColor);\n\tpadding: 5px 5px;\n\tpadding-left: 15px;\n\tposition: relative;\n\tpadding-bottom: 10px;\n}\n\n.SaveTableLayout .input{\n\tfont-size: 10pt;\n\tmargin-right: 10px;\n\tpadding-top: 2px;\n\tpadding-bottom: 2px;\n\twidth: calc(100% - 25px);\n}\n\n.SaveTableLayout .layoutButton{\n\tposition: relative;\n}\n\n.SaveTableLayout .cancelIcon{\n\tposition: absolute;  \n\tright: 5px;\n\ttop: 4px;\n\tcursor: pointer;\n\twidth: fit-content !important;\n\tz-index: 2;\n\tfilter: none !important;\n}\n\n.SaveTableLayout .commitIcon{\n\tposition: absolute; \n\tright: 5px;\n\tbottom: 9px;\n\tcolor: var(--lockedTextColor);\n\tcursor: pointer;\n\tfont-size: 11pt;\n}\n\n.SaveTableLayout .commitIcon:hover{\n\tfilter: brightness(115%);\n}\n\n.SaveTableLayout .commitIcon:active{\n\tfilter: brightness(90%);\n}\n\n.SaveTableLayout .layoutButtonText{\n\tmax-width: calc(100% - 30px);\n\ttext-align: left;\n\tpadding-left: 0;\n}\n";
styleInject(css_248z$n);

function SaveTableLayout(props) {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      saveName = _useState2[0],
      setSaveName = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      validClass = _useState4[0],
      setValidClass = _useState4[1];

  function changeHandler(e) {
    setSaveName(e.target.value);
    setValidClass('');
  }

  var savedLayouts = props.headers.getSavedLayouts();

  function commitHandler() {
    var nameExists = Object.values(savedLayouts).some(function (f) {
      return f.name === saveName;
    });

    if (saveName.trim() !== '' && !nameExists) {
      setSaveName('');
      props.headers.saveLayout(saveName);
    } else {
      setValidClass('invalid');
    }
  }

  function keyDownHandler(e) {
    if (e.key === 'Enter') {
      commitHandler();
      e.target.blur();
    }
  }

  function applyLayout(f) {
    props.headers.loadLayout(f);
    props.data.sort();
  }

  return /*#__PURE__*/React.createElement(MenuButton, {
    locked: false,
    onClose: function onClose() {
      return setValidClass('');
    },
    menuStyle: {
      width: '250px'
    },
    menuContent: /*#__PURE__*/React.createElement("div", {
      className: "SaveTableLayout"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inputMenu"
    }, /*#__PURE__*/React.createElement("span", null, "Save Current Layout"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      className: 'input ' + validClass,
      value: saveName,
      onChange: changeHandler,
      onKeyDown: keyDownHandler
    }), /*#__PURE__*/React.createElement("span", {
      className: "commitIcon",
      onClick: commitHandler
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCheck
    }))), Object.keys(savedLayouts).map(function (f) {
      return /*#__PURE__*/React.createElement("button", {
        className: 'layoutButton',
        key: 'saveLayoutButton' + f,
        onClick: function onClick() {
          applyLayout(f);
        }
      }, /*#__PURE__*/React.createElement(ConfirmButton, {
        className: "cancelIcon",
        onClick: function onClick(e) {
          props.headers.deleteLayout(f);
          e.stopPropagation();
        },
        content: /*#__PURE__*/React.createElement(FontAwesomeIcon, {
          icon: faTimes
        }),
        expandedContent: 'Delete',
        style: {
          backgroundColor: 'var(--cardBG)',
          color: 'var(--lockedTextColor)',
          padding: '0 5px'
        },
        locked: false
      }), /*#__PURE__*/React.createElement("span", {
        className: "layoutButtonText"
      }, savedLayouts[f].name));
    }))
  }, /*#__PURE__*/React.createElement("span", {
    className: ""
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faWindowRestore
  })), " Saved Layouts");
}

function TableControls(props) {
  var clearFilterButton = null;
  var layoutButton = null;
  var settingsButton = null;
  var expandControls;

  if (props.hasFilter && !props.noFilter) {
    clearFilterButton = /*#__PURE__*/React.createElement("button", {
      onClick: props.clearFilter
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faTimesCircle
    }), " Clear Filter");
  }

  if (!props.noFilter && !props.noSort && !props.noOptions) {
    layoutButton = /*#__PURE__*/React.createElement(SaveTableLayout, {
      headers: props.dataHeaders,
      data: props.data
    });
  }

  if (!props.noOptions) {
    settingsButton = /*#__PURE__*/React.createElement(ColumnSettings, {
      headers: props.dataHeaders,
      data: props.data
    });
  }

  if (props.showExpandControls) {
    expandControls = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var newExpanded = _objectSpread2({}, props.expandedRows);

        Object.keys(newExpanded).map(function (k) {
          newExpanded[k] = true;
        });
        props.setExpandedRows(newExpanded);
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faPlus
    }), " Expand All"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var newExpanded = _objectSpread2({}, props.expandedRows);

        Object.keys(newExpanded).map(function (k) {
          newExpanded[k] = false;
        });
        props.setExpandedRows(newExpanded);
      }
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faMinus
    }), " Collapse All"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "tableControls"
  }, settingsButton, layoutButton, expandControls, clearFilterButton);
}

function useSettings(settingsID, applySettings) {
  var _useSystem$Settings = useSystem().Settings,
      get = _useSystem$Settings.get,
      save = _useSystem$Settings.save;
  var debouncer = useRef();
  useEffect(function () {
    var fetchAndApply = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return get(settingsID);

              case 3:
                token = _context.sent;
                applySettings(token);
                _context.next = 9;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function fetchAndApply() {
        return _ref.apply(this, arguments);
      };
    }();

    if (settingsID) {
      fetchAndApply();
    }
  }, []);
  return function (newToken) {
    //Prevent creating many tokens too fast
    clearTimeout(debouncer.current);
    debouncer.current = setTimeout(function () {
      save(settingsID, newToken);
    }, 2000);
  };
}

function PageContols(props) {
  var showPageBack = props.activePage > 0;
  var showPageForward = (props.activePage + 1) * props.pageSize < props.dataLength; //If the data gets shorter than the active page then go back to page 1

  useEffect(function () {
    var lastRow = (props.activePage + 1) * props.pageSize;
    var diff = props.dataLength - lastRow;

    if (diff + props.pageSize < 0) {
      props.setActivePage(0);
    }
  });

  if (!props.pageSize) {
    return null;
  }

  function pageBack() {
    if (showPageBack) {
      props.setActivePage(props.activePage - 1);
      props.tableRef.current.scrollTop = 0;
    }
  }

  function pageForward() {
    if (showPageForward) {
      props.setActivePage(props.activePage + 1);
      props.tableRef.current.scrollTop = 0;
    }
  }

  if (props.dataLength > props.pageSize) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pageControls"
    }, showPageBack ? /*#__PURE__*/React.createElement("button", {
      onClick: pageBack
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCaretLeft
    })) : null, /*#__PURE__*/React.createElement("button", {
      className: "textButton"
    }, "Showing ", 1 + props.activePage * props.pageSize, "-", Math.min((1 + props.activePage) * props.pageSize, props.dataLength) + ' ', "of ", "  ".concat(props.dataLength)), showPageForward ? /*#__PURE__*/React.createElement("button", {
      onClick: pageForward
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCaretRight
    })) : null);
  } else return null;
}

var css_248z$o = ".MainTableRow{\n\ttransition: all 0.2s;\n\t\n\tbackground-color: var(--cardBG);\n\tmargin: 8px 15px;\n\tborder-radius: 10px;\n\t\n\ttransition: background-color 0.15 ease-out, color 0.15s ease-out;\t\n\toverflow: hidden;\n\tpadding: 0px 10px;\n}\n\n.MainTableRow .topRow{\n\theight: 30px;\n\tpadding: 4px 0px;\n\tposition: relative;\n}\n\n.MainTable.hasActive .MainTableRow .topRow.active{\n\tcolor: var(--tableActiveColor);\n}\n\n.MainTable:not(.hasActive) .MainTableRow{\n\tcolor: var(--mainTextColor);\n}\n\n.MainTable.hasActive .MainTableRow{\n\tcursor: pointer;\n}\n\n.MainTable.hasActive .MainTableRow:active:not(.expanded){\n\ttransition: all 0.05s ease-out;\n\tfilter: brightness(95%);\n}\n\n\n.MainTable:not(.hasActive) .MainTableRow{\n\tfilter: none !important;\n\tcursor: default;\n}\n\n\n.MainTableRow span.tableCell{\n\ttransition: inherit;\n\toverflow: hidden;\n}\n\n.MainTableRow span.plain{\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n}\n\n.MainTableRow .badge{\n\tborder-radius: 10px;\n\ttext-align: center;\n\tpadding: 4px 0;\n\tpadding-top: 2px;\n\tfont-size: 11.5pt;\n\ttransition: none;\n\tdisplay: inline-block;\n\theight: 100%;\n}\n\n/* expanded */\n.MainTableRow.expanded .topRow{\n\tborder-bottom: 1px solid var(--borderColor);\n\theight: 35px;\n\tpadding-bottom: 5px;\n}\n\n.MainTableRow .componentWrapper{\n\tcursor: default;\n\tposition: relative;\n}\n\n.MainTableRow .expandButton{\n\topacity: 50%;\n\tpadding-right: 0;\n\tcolor: var(--mainTextColor);\n\twidth: 18px;\n\tposition: absolute;\n\tleft: -2px;\n\tfont-size: 11pt;\n\tuser-select: none;\n\tcursor: pointer;\n}\n\n.MainTableRow .expandButton:hover{\n\tfilter: brightness(200%) !important;\n}\n\n.MainTableRow .expandButton:active{\n\tfilter: brightness(50%) !important;\n}\n\n/* Nested Tables */\n.MainTableRow .componentWrapper .topBar,\n.MainTableRow .componentWrapper .theadBar,\n.MainTableRow .componentWrapper .tableControls{\n\tbackground-color: transparent;\n}\n\n.MainTableRow .componentWrapper .MainTable{\n\tbackground-color: transparent;\n\twidth: 100%;\n}\n\n.MainTableRow .componentWrapper .MainTableRow{\n\tmargin-top: 2px;\n\tmargin-bottom: 2px;\n\tbackground-color: transparent;\n}\n\n.MainTableRow .componentWrapper .topRow{\n\tborder: none;\n\theight: 32px;\n}\n\n.MainTableRow .componentWrapper .topBar{\n\tdisplay: none;\n}\n\n.MainTableRow .componentWrapper .theadBar{\n\ttop:0;\n\theight: 20px;\n\tz-index: 0;\n}\n\n.MainTableRow .componentWrapper .theadBar span:first-child{\n\tpadding-left: 1px;\n}\n\n.MainTableRow .componentWrapper .mainSection{\n\tpadding-top: 5px;\n}\n\n/* Nested Tabs */\n.MainTableRow .InfoTabContainer{\n\tbackground-color: var(--cardBG);\n}\n\n.MainTableRow .InfoTab{\n\tpadding-top: 10px;\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs{\n\tborder-radius: 10px;\n\tbackground-color: var(--cardBG);\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs a{\n\tcolor: var(--navColor);\n\tbackground-color: transparent;\n\tpadding: 0px 10px;\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs a.active{\n\tcolor: var(--navColor);\n\tbackground-color: transparent;\n\ttext-shadow: 1px 0px 0px var(--navColor);\n\tborder-bottom: solid 3px var(--navColor);\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs a:hover{\n\tcolor:var(--navHoverColor);\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs a:hover{\n\tcolor:var(--navColor);\n\tfilter: brightness(60%);\n}\n\n.MainTableRow .InfoTabContainer .nav-tabs a.active:hover{\n\tcolor: \tvar(--navColor);\n}";
styleInject(css_248z$o);

var css_248z$p = ".MainTableRow .InputCell{\n\toutline: none !important;\n\tfont-family: inherit;\n\tfont-size: inherit;\n\twidth: 100%;\n\tmargin: none;\n\theight: 20px;\n\tbox-sizing: border-box;\n\tcolor: inherit;\n\tcolor: var(--mainTextColor);\n\tpadding: 1px 10px;\n\tborder-radius: 10px;\n\ttransition: background-color 750ms ease-out;\n}\n\n.MainTableRow .inputWrapper{\n\theight: 100%;\n}\n\n.MainTableRow .badge.inputWrapper{\n\tpadding: 0;\n}\n\n.MainTableRow .InputCell.invalid,\n.MainTableRow .InputCell.valid{\n\ttransition: all 0ms;\n}\n\n.MainTableRow .badge .InputCell{\n\tbackground-color: transparent;\n\tborder-radius: 0;\n\theight: 100%;\n\twidth: 100%;\n\ttext-align: inherit;\n\tfont-size: inherit;\n\tfont-weight: inherit;\n\tcolor: inherit;\n\tpadding: 4px 0;\n\tborder: none;\n}\n\n/* Cells for nested tables */\n.MainTableRow .MainTableRow .InputCell{\n\theight: calc(100% - 3px);\n}\n\n/* Combobox cell */\nselect.InputCell{\n\tvertical-align: top;\n\tpadding-top: 0 !important;\n\tcursor: pointer;\n}\n\nselect.InputCell:focus{\n\tborder: 1px solid var(--borderColor)\n}\n\n.MainTableRow .badge select.InputCell{\n\tpadding-bottom: 0;\n\tpadding-left: 5px;\n}\n\n/* Dates */\n.dateCellWrapper{\n\tposition: relative;\n}\n\n.MainTableRow .dateCellWrapper .menuButtonContainer{\n\tposition: absolute;\n\tright: 2px;\n\ttop: 0;\n\tpadding-top: 2px;\n\tpadding-left: 0 !important;\n\tfont-size: 9pt;\n\tcolor: var(--mainTextColor);\n}\n\n.dateCellMenu button.react-datepicker__navigation{\n\twidth: 10px !important;\n\tbackground-color: transparent !important;\n\ttext-align: initial;\n\tpadding: 0 !important;\n\toutline: none !important;\n}\n";
styleInject(css_248z$p);

function DateCell(props) {
  var _useState = useState(function () {
    return props.initalValue ? new Date(props.header.parse(props.initalValue)) : new Date();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      setSelectedDate = _useState2[1];

  function dateSelectHandler(d) {
    props.selectHandler({
      target: {
        value: props.header.format(d)
      }
    });
    setSelectedDate(d);
  }

  function openHandler() {
    setSelectedDate(props.currentValue ? new Date(props.header.parse(props.currentValue)) : new Date());
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "dateCellWrapper"
  }, /*#__PURE__*/React.createElement("input", {
    className: 'InputCell input ' + props.validClass,
    onKeyDown: props.keyHandler,
    onFocus: props.focusHandler,
    value: props.currentValue,
    onChange: props.changeHandler,
    onBlur: function onBlur() {
      return props.commitChanges();
    }
  }), /*#__PURE__*/React.createElement(MenuButton, {
    onOpen: openHandler,
    style: {
      opacity: '50%'
    },
    menuStyle: {
      height: 'fit-content',
      width: 'fit-content'
    },
    menuContent: /*#__PURE__*/React.createElement("div", {
      className: "dateCellMenu"
    }, /*#__PURE__*/React.createElement(DatePicker, {
      selected: selectedDate,
      onChange: dateSelectHandler,
      inline: true
    }))
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCalendar
  })));
}

function InputCell(props) {
  var _useState = useState(props.dataRow[props.header.headerID] ? props.header.format(props.dataRow[props.header.headerID]) : ''),
      _useState2 = _slicedToArray(_useState, 2),
      initalValue = _useState2[0],
      setInitialValue = _useState2[1];

  var _useState3 = useState(props.dataRow[props.header.headerID] ? props.header.format(props.dataRow[props.header.headerID]) : ''),
      _useState4 = _slicedToArray(_useState3, 2),
      currentValue = _useState4[0],
      setCurrentValue = _useState4[1]; // Update the value if the data is changed by an outside source


  useEffect(function () {
    var newVal = props.dataRow[props.header.headerID] ? props.dataRow[props.header.headerID] : '';
    setCurrentValue(props.header.format(newVal));
    setInitialValue(newVal);
  }, [props.dataRow[props.header.headerID]]); //When you focus on an item, the value is saved. if you escape, its restored

  function focusHandler(e) {
    setInitialValue(e.target.value);
  }

  var escRef = useRef(false); //Handles keypresses, for enter or esc keys

  function keyHandler(e) {
    if (e.keyCode === 27) {
      //esc
      setCurrentValue(initalValue);
      escRef.current = true;
      e.target.blur();
    } else if (e.keyCode === 13) {
      //enter
      e.target.blur();
    }
  }

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      validClass = _useState6[0],
      setValidClass = _useState6[1];

  function flashRed() {
    setValidClass('invalid');
    setTimeout(function () {
      return setValidClass('');
    }, 200);
  }

  function flashGreen() {
    setValidClass('valid');
    setTimeout(function () {
      return setValidClass('');
    }, 0);
  } //Chaches the value and updates the dataset when you're done editing


  function selectHandler(e) {
    setCurrentValue(e.target.value);
    commitChanges(e.target.value);
  } //Check if the input is valid and commit


  function commitChanges(_x) {
    return _commitChanges.apply(this, arguments);
  } //Chaches the value and updates the dataset when you're done editing


  function _commitChanges() {
    _commitChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
      var newValue, override, customSetRow, newData, newCellValue, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customSetRow = function _customSetRow(newRow) {
                props.setRow(newRow);
                override.value = true;
                override.newRow = newRow;
              };

              newValue = val ? val : currentValue;

              if (!escRef.current) {
                _context.next = 5;
                break;
              }

              escRef.current = false;
              return _context.abrupt("return");

            case 5:
              override = {
                value: false,
                newRow: {}
              };
              _context.prev = 6;

              if (!props.header.compare(props.dataRow[props.header.headerID], newValue)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              newData = JSON.parse(JSON.stringify(_toConsumableArray(props.dataset.read())));
              newCellValue = props.header.parse(newValue);
              newData[props.rowIndex][props.header.headerID] = newCellValue;
              _context.next = 14;
              return props.header.onEdit({
                cellValue: newCellValue,
                row: newData[props.rowIndex],
                oldCellValue: initalValue,
                oldRow: props.dataset.read()[props.rowIndex],
                setRow: customSetRow,
                parse: props.header.parse
              });

            case 14:
              res = _context.sent;

              if (res || res === undefined) {
                if (override.value) {
                  //if the onEdit handler is assuming control, dont edit the dataset in here
                  setCurrentValue(props.header.format(override.newRow[props.header.headerID]));
                } else {
                  props.dataset.set(newData);
                  setCurrentValue(props.header.format(newCellValue));
                }

                flashGreen();
              } else {
                setCurrentValue(props.header.format(initalValue));
                flashRed();
              }

              _context.next = 23;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](6);
              console.error(_context.t0);
              setCurrentValue(props.header.format(initalValue));
              flashRed();

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 18]]);
    }));
    return _commitChanges.apply(this, arguments);
  }

  function changeHandler(e) {
    setCurrentValue(e.target.value);
  } //Datebox cells


  if (props.header.type === 'date') {
    return /*#__PURE__*/React.createElement(DateCell, {
      currentValue: currentValue,
      setCurrentValue: setCurrentValue,
      commitChanges: commitChanges,
      header: props.header,
      validClass: validClass,
      keyHandler: keyHandler,
      focusHandler: focusHandler,
      changeHandler: changeHandler,
      initalValue: initalValue,
      selectHandler: selectHandler
    });
  } //Combobox cells


  if (props.header.options) {
    var myOptions = props.header.options;
    return /*#__PURE__*/React.createElement("select", {
      className: 'InputCell input ' + validClass,
      onKeyDown: keyHandler,
      onFocus: focusHandler,
      value: currentValue,
      onChange: selectHandler
    }, myOptions.map(function (v) {
      return /*#__PURE__*/React.createElement("option", {
        key: v,
        value: v
      }, v);
    }));
  }

  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: 'InputCell input ' + validClass,
    onKeyDown: keyHandler,
    onFocus: focusHandler,
    onBlur: function onBlur() {
      return commitChanges();
    },
    value: currentValue,
    onChange: changeHandler
  });
}

function MainTableRow(props) {
  var activeClass = props.dataset.getActiveRecord && props.dataset.getActiveRecord()[props.dataset.primaryKey] === props.dataRow[props.dataset.primaryKey] && !props.noActive ? ' active ' : '';

  function rowClickHandler() {
    if (!props.noActive) {
      props.dataset.selectRecord(props.dataRow[props.dataset.primaryKey]);
    }
  } //Allow nested components and onClicks to update their dataRow


  function setRow(newRow) {
    var newData = _toConsumableArray(props.dataset.read());

    newData[props.rowIndex] = newRow;
    props.dataset.set(newData);
  }

  var rowContent = props.dataHeaders.map(function (hdr, i) {
    if (hdr.visible || hdr.required) {
      function cellClickHandler() {
        if (hdr.onClick && !hdr.locked && !props.locked) {
          hdr.onClick({
            cellValue: props.dataRow[hdr.headerID],
            row: props.dataRow,
            setRow: setRow
          });
        }
      } //Decide if the cell is editable or not based on the locked status, and the header onEdit function


      var cellContent;
      var cellClass = hdr.onClick && !props.locked ? ' clickable plain tableCell ' : ' plain tableCell';
      var cellText = hdr.format(props.dataRow[hdr.headerID]);

      if (!props.locked && hdr.onEdit && !hdr.locked) {
        cellContent = /*#__PURE__*/React.createElement(InputCell, {
          header: hdr,
          dataRow: props.dataRow,
          rowIndex: props.rowIndex,
          dataset: props.dataset,
          setRow: setRow
        });
        cellClass = cellClass + ' inputWrapper ';
      } else {
        cellContent = cellText;
      }

      if (hdr.component) {
        //custom component cells
        return /*#__PURE__*/React.createElement("span", {
          key: hdr.headerID + props.rowKey,
          style: {
            width: hdr.width + 'px'
          },
          className: 'tableCell componentCell'
        }, /*#__PURE__*/React.createElement(hdr.component, _extends({
          row: props.dataRow,
          setRow: setRow
        }, hdr.props)));
      } else if (!hdr.styling) {
        //No conditional formatting
        return /*#__PURE__*/React.createElement("span", {
          key: hdr.headerID + props.rowKey,
          style: {
            width: hdr.width + 'px'
          },
          className: cellClass,
          title: cellText,
          onClick: cellClickHandler
        }, cellContent);
      } else {
        //with coniditional formatting
        var myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow);
        return /*#__PURE__*/React.createElement("span", {
          className: 'badge ' + cellClass,
          key: hdr.headerID + props.rowKey + i,
          onClick: cellClickHandler,
          style: _objectSpread2(_objectSpread2({
            width: 'calc(' + hdr.width + 'px - 23px)'
          }, myStyle), {}, {
            marginLeft: '23px'
          })
        }, cellContent);
      }
    }
  }); //Nested rows

  var expanded = props.expandedRows[props.dataRow[props.dataset.primaryKey]];

  function setExpanded(value) {
    var newExpanded = _objectSpread2({}, props.expandedRows);

    newExpanded[props.dataRow[props.dataset.primaryKey]] = value;
    props.setExpandedRows(newExpanded);
  }

  var expandedClass = expanded ? ' expanded ' : '';

  function expandHandler(e) {
    //don't set the active row when collapsing 
    if (expanded) {
      e.stopPropagation();
    }

    setExpanded(!expanded);
  }

  var expandIcon = props.nestedComponent ? /*#__PURE__*/React.createElement("span", {
    className: "expandButton",
    onClick: expandHandler
  }, expanded ? /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faMinus
  }) : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faPlus
  })) : null;
  useEffect(function () {
    //yes... I know. Trust me its okay here. 
    if (props.nestedComponent) {
      var newExpanded = props.expandedRows;
      newExpanded[props.dataRow[props.dataset.primaryKey]] = props.expandedRows[props.dataRow[props.dataset.primaryKey]] ? true : false;
      props.setExpandedRows(newExpanded);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: 'MainTableRow ' + expandedClass,
    onClick: rowClickHandler
  }, /*#__PURE__*/React.createElement("div", {
    className: 'topRow' + activeClass
  }, expandIcon, rowContent), expanded && props.nestedComponent ? /*#__PURE__*/React.createElement("div", {
    className: "componentWrapper"
  }, /*#__PURE__*/React.createElement("div", {
    style: props.nestedProps && props.nestedProps.fitToWidth ? {
      width: props.tableRef.current ? 'calc(' + props.tableRef.current.clientWidth + 'px - 48px)' : null
    } : undefined
  }, /*#__PURE__*/React.createElement(props.nestedComponent, _extends({}, props.nestedProps, {
    row: props.dataRow,
    dataRow: props.dataRow,
    setRow: setRow,
    rowIndex: props.rowIndex
  })))) : null);
}

function TableBody(props) {
  //Counter for rendered rows
  var rowCount = 1; //Loading option

  if (props.data.status === 'Pending' && !props.noLoading && props.data.isDataset && props.data.read().length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: props.tableRef.current ? props.tableRef.current.clientWidth : '100%'
      },
      className: "loadingContainer flexCenter"
    }, /*#__PURE__*/React.createElement(Loading, {
      style: {
        fontSize: '40pt'
      }
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: 'TableBody tableBody ' + props.data.lastResolved
  }, props.dataArray.map(function (dr, idx) {
    //render the allowed numebr of rows, on th selected page
    if (!props.pageSize || rowCount > props.activePage * props.pageSize && rowCount <= (1 + props.activePage) * props.pageSize) {
      var renderRow = dr !== [];

      if (props.searchable && props.metaData[idx]) {
        renderRow = !props.metaData[idx].searchHidden;
      }

      renderRow = renderRow && (props.noFilter || props.metaData[idx] && props.metaData[idx].visible);
      var rowKey = dr[props.data.primaryKey] ? dr[props.data.primaryKey] : idx;

      if (renderRow) {
        rowCount++;
        return /*#__PURE__*/React.createElement(MainTableRow, {
          dataRow: dr,
          dataset: props.data,
          dataHeaders: props.dataHeaders,
          rowKey: rowKey,
          key: rowKey,
          locked: props.locked,
          dynamic: props.dynamic,
          rowIndex: idx,
          nestedComponent: props.nestedComponent,
          nestedProps: props.nestedProps,
          noActive: props.noActive,
          tableRef: props.tableRef,
          expandedRows: props.expandedRows,
          setExpandedRows: props.setExpandedRows
        });
      } else {
        return null;
      }
    } else if (rowCount <= (1 + props.activePage) * props.pageSize) {
      rowCount++;
    }

    return null;
  }));
}

function CoreTable(props) {
  //Sorting and filtering are optional (via props), only supported with if a dataset is provided
  var noSort = props.noSort,
      noFilter = props.noFilter,
      noActive = props.noActive,
      locked = props.locked;
  var noOptions = props.noOptions || !props.settingsID; //expanded rows (if applicable)

  var hasNestedClass = props.nestedComponent ? ' hasNested ' : null; //support for dataSets or for just arrays

  var data = props.data.read();
  var metaData = props.metaData; //Settings token support 

  var saveSettings = useSettings(props.settingsID, function (token) {
    props.headers.applyToken(token);
    props.data.setLastResolved(new Date().toISOString()); //Sort trigger to make it sort on the next render using the below useEffect
  }); //Active page handling

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      activePage = _useState2[0],
      setActivePage = _useState2[1]; //When you search, return to page 0 in case the search results don't reach the current page


  useEffect(function () {
    setActivePage(0);
  }, [props.searchText]); //get the length of the data with the filter applied

  var dataLength = 0;
  data.forEach(function (r, idx) {
    if (metaData[idx]) {
      if (metaData[idx].visible && !metaData[idx].searchHidden) {
        dataLength++;
      }
    } else {
      dataLength++;
    }
  }); //For dataSets - runs when dataSet refreshes (sets the filter options to match)

  useEffect(function () {
    if (!noFilter) {
      props.headers.embedData(data, metaData);
    }

    if (!noOptions) {
      props.headers.setSettingsEngine({
        save: saveSettings
      });
    }

    props.data.sort();
    props.data.setLastEdited(new Date().toISOString());

    if (props.searchText) {
      props.data.search();
    }
  }, [props.data.lastResolved]);
  useEffect(function () {
    //Filtering a second time when data is refreshed. This is required because otherwise the wrong rows appear on screen if you refresh while a filter is on 
    props.data.filter();
  }, [props.data.lastEdited]); //If clicking sets the active record then its animated
  //if there are editable cells the animations will be cancelled

  var dynamic;
  var hasActiveClass = '';

  if (!noActive) {
    dynamic = true;
    hasActiveClass = ' hasActive ';
  }

  var hasFilter = false;
  var totalHeaderWidth = 70;
  props.headers.get().forEach(function (hdr) {
    //if you have input cells in the table, hover effects will be cancelled
    if (hdr.onEdit) {
      dynamic = false;
    }

    if (hdr.visible) {
      totalHeaderWidth = totalHeaderWidth + hdr.width;
    } //check if any headers have active filters (to show a clear filter button)


    if (hdr.hasFilter()) {
      hasFilter = true;
    }
  });

  function clearFilter() {
    var newHeaders = _toConsumableArray(props.headers.get());

    newHeaders.forEach(function (hdr) {
      hdr.clearFilter();
    });
    props.headers.set(newHeaders);
    props.data.filter();
  } //Positioning for nested components


  var tableRef = useRef();

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      expandedRows = _useState4[0],
      setExpandedRows = _useState4[1]; //Render


  return /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: props.locked
  }, /*#__PURE__*/React.createElement("div", {
    className: 'MainTable ' + hasActiveClass + hasNestedClass,
    ref: tableRef,
    style: props.style
  }, /*#__PURE__*/React.createElement("div", {
    className: "topBar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topBarContainer"
  }), /*#__PURE__*/React.createElement(TableControls, {
    hasFilter: hasFilter,
    noFilter: noFilter,
    noSort: noSort,
    clearFilter: clearFilter,
    noOptions: noOptions,
    dataHeaders: props.headers,
    data: props.data,
    showExpandControls: props.nestedComponent ? true : false,
    expandedRows: expandedRows,
    setExpandedRows: setExpandedRows
  }), /*#__PURE__*/React.createElement(PageContols, {
    activePage: activePage,
    setActivePage: setActivePage,
    dataLength: dataLength,
    pageSize: props.pageSize,
    tableRef: tableRef
  })), /*#__PURE__*/React.createElement("div", {
    className: "theadBar",
    style: {
      width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)'
    }
  }, props.headers.get().map(function (hdr, i) {
    if (hdr.visible || hdr.required) {
      //Custom component type headers have no filters
      if (hdr.component) return /*#__PURE__*/React.createElement("span", {
        style: {
          width: hdr.width + 'px'
        },
        key: 'header' + i,
        className: "theadBarComponentWrapper"
      }, hdr.displayName + ' ');
      var headerClass = hdr.onEdit ? ' theadBarTheadButtonWrapper ' : ' shiftLeft theadBarTheadButtonWrapper ';

      if (hdr.styling && !hdr.styling.textAlign) {
        headerClass = headerClass + ' centeredHeader ';
      }

      return /*#__PURE__*/React.createElement("span", {
        style: {
          width: hdr.width + 'px'
        },
        key: 'header' + i,
        className: headerClass
      }, /*#__PURE__*/React.createElement(TheadButton, {
        header: hdr,
        data: props.data,
        dataHeaders: props.headers,
        noFilter: noFilter,
        noSort: noSort
      }, hdr.displayName + ' '));
    } else return null;
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainSection",
    style: {
      width: 'max(calc(' + totalHeaderWidth + 'px + 70px), 100%)'
    }
  }, /*#__PURE__*/React.createElement(TableBody, {
    searchable: props.searchable,
    data: props.data,
    dataHeaders: props.headers.get(),
    locked: locked,
    dynamic: dynamic,
    nestedComponent: props.nestedComponent,
    nestedProps: props.nestedProps,
    noActive: noActive,
    tableRef: tableRef,
    pageSize: props.pageSize,
    activePage: activePage,
    metaData: metaData,
    dataArray: data,
    noLoading: props.noLoading,
    expandedRows: expandedRows,
    setExpandedRows: setExpandedRows
  }))));
}

function useDataset(fetchFunction) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  //The array contains an empty object by default
  var _useState = useState(options.defaultValue ? options.defaultValue : []),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState('Pending'),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      lastResolved = _useState6[0],
      setLastResolved = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      lastEdited = _useState8[0],
      setLastEdited = _useState8[1];

  var _useState9 = useState({}),
      _useState10 = _slicedToArray(_useState9, 2),
      activeRecord = _useState10[0],
      setActiveRecord = _useState10[1]; //Allowing you to choose the data arary you use, so you can set the active row right after fetching/setting new data


  function _selectRecord(newPrimaryKey) {
    var fromData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : data;
    var newIndex = fromData.findIndex(function (r) {
      return r[options.primaryKey] == newPrimaryKey;
    });

    if (newIndex > -1) {
      setActiveRecord(fromData[newIndex]);
      return fromData[newIndex];
    } else {
      setActiveRecord({});
      return {};
    }
  }

  function getActiveRecord() {
    return activeRecord;
  } //Fetch data and update state once the operation is complete. Keep the old value in the meantime


  function fetchData(_x) {
    return _fetchData.apply(this, arguments);
  } //Lets you edit the active row


  function _fetchData() {
    _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(override) {
      var newData;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(override || status !== 'Pending')) {
                _context.next = 18;
                break;
              }

              setStatus('Pending');
              _context.prev = 2;
              _context.next = 5;
              return fetchFunction();

            case 5:
              newData = _context.sent;
              setData(newData);

              _selectRecord(activeRecord[options.primaryKey], newData);

              setStatus('Resolved');
              setLastResolved(new Date().toISOString());
              return _context.abrupt("return", 'Resolved');

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](2);
              setStatus('Rejected');
              console.error(_context.t0);
              return _context.abrupt("return", 'Rejected');

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 13]]);
    }));
    return _fetchData.apply(this, arguments);
  }

  function editActiveRecord(newRecord) {
    var newData = newRecord ? _toConsumableArray(data) : [];

    if (!options.primaryKey) {
      console.error('No primary key set for this dataset.');
    }

    var activeIndex = data.findIndex(function (r) {
      return r[options.primaryKey] == activeRecord[options.primaryKey];
    }); //if you call this function without passing a new record, the record is deleted

    if (newRecord && activeIndex > -1) {
      newData[activeIndex] = newRecord;
      setActiveRecord(newRecord);
    } else {
      data.forEach(function (r, idx) {
        if (idx !== activeIndex) {
          newData.push(r);
        }
      });
      setActiveRecord({});
    }

    setData(newData);
  } //Lets you edit a record that isn't the active record by specifying a primary key


  function editSpecificRecord(recordKey, newRecord) {
    var newData = newRecord ? _toConsumableArray(data) : [];

    if (!options.primaryKey) {
      console.error('No primary key set for this dataset.');
    }

    var activeIndex = data.findIndex(function (r) {
      return r[options.primaryKey] == recordKey;
    }); //if you call this function without passing a new record, the record is deleted

    if (newRecord && activeIndex > -1) {
      newData[activeIndex] = newRecord;
    } else {
      data.forEach(function (r, idx) {
        if (idx !== activeIndex) {
          newData.push(r);
        }
      });
    }

    setData(newData);

    _selectRecord(activeRecord[options.primaryKey], newData);
  } //Automatically run the fetching function the first time, then wait for a refresh
  //If the dataset was spawned by a parent dataset, send its refresh function to the parent, so it can refresh when the parent refreshes


  useEffect(function () {
    fetchData(true);
  }, []); //Return a Dataset object

  return {
    read: function read() {
      return data;
    },
    refresh: fetchData,
    selectRecord: function selectRecord(newKey) {
      return _selectRecord(newKey);
    },
    getActiveRecord: getActiveRecord,
    setActiveRecord: editActiveRecord,
    setRecord: editSpecificRecord,
    status: status,
    lastResolved: lastResolved,
    setLastResolved: setLastResolved,
    setLastEdited: setLastEdited,
    lastEdited: lastEdited,
    //TouchPoint Controls
    isDataset: true,
    primaryKey: options.primaryKey,
    set: function set(newData) {
      setData(newData);

      _selectRecord(activeRecord[options.primaryKey], newData);
    }
  };
}

var _this = undefined;

var formatFunctions = {
  date: function date(cellValue) {
    return cellValue ? moment(new Date(cellValue)).format('DD-MMM-YY') : '';
  },
  boolean: function boolean(cellValue) {
    return cellValue ? 'True' : 'False';
  },
  other: function other(cellValue) {
    return cellValue;
  }
}; //Takes a user input and changes it to the correct data type (eg. Date string to new Date object)

var parseFunctions = {
  date: function date(input) {
    var testVal = input.toString().toLowerCase();

    if (testVal.trim() === '') {
      return '';
    }

    if (testVal === 'today' || testVal === 'td') {
      return moment().toISOString();
    }

    if (testVal === 'tomorrow' || testVal === 'tm') {
      return moment().add(1, 'day').toISOString();
    }

    if (testVal === 'yesterday' || testVal === 'yd') {
      return moment().subtract(1, 'day').toISOString();
    } //Special case for dates with no year - default to current year
    // const regNodash = /^[0-9]*(?:_?[a-z]+)*$/
    // const regWithDash = /^[0-9]*[-](?:_?[a-z])*$/


    if (isNaN(parseFloat(input.slice(-1)))) {
      var newInput = input + new Date().getFullYear();
      return moment(new Date(newInput)).toISOString();
    }

    return moment(new Date(input)).toISOString();
  },
  boolean: function boolean(input) {
    var testVal = input.toString().toLowerCase();

    if (testVal === 'true' || testVal === 'yes' || testVal == 1 || testVal === 'y' || testVal === 't') {
      return true;
    } else return false;
  },
  number: function number(input) {
    var newValue = Number(input);

    if (!isNaN(newValue)) {
      return newValue;
    } else {
      throw new Error('invalid input - not a number');
    }
  },
  other: function other(input) {
    return input;
  }
}; //Compares 2 values that may not be directly equal (eg. date object and date string)

var compareFunctions = {
  date: function date(a, b) {
    return moment(new Date(a)).isSame(new Date(b), 'day');
  },
  boolean: function boolean(a, b) {
    return _this.parse(a) === _this.parse(b);
  },
  other: function other(a, b) {
    return a == b;
  }
}; //

var DataType = function DataType(type) {
  _classCallCheck(this, DataType);

  this.format = formatFunctions[type] ? formatFunctions[type] : formatFunctions.other;
  this.parse = parseFunctions[type] ? parseFunctions[type] : parseFunctions.other;
  this.compare = compareFunctions[type] ? compareFunctions[type] : compareFunctions.other;
};

var DataHeader = /*#__PURE__*/function () {
  function DataHeader(options) {
    var _this = this;

    _classCallCheck(this, DataHeader);

    this.headerID = options.headerID;
    this.displayName = options.displayName;
    this.width = options.width ? options.width : 100;
    this.required = options.required ? options.required : false;
    this.visible = !options.visible === undefined ? options.visible : true;
    this.index = options.index;
    this.onEdit = options.onEdit ? options.onEdit : null;
    this.locked = options.locked ? options.locked : false;
    this.styling = options.styling ? options.styling : null;
    this.uniqueValues = {};
    this.type = options.type ? options.type : 'string';
    this.onClick = options.onClick;
    this.options = options.options;
    this.component = options.component;
    this.props = options.props; //Default filter list only has 1 functions (array filter)

    this.filterList = {
      arrayFilter: {
        func: function func(cellValue) {
          return _this.uniqueValues[cellValue] || _this.uniqueValues[cellValue] === undefined;
        }
      }
    };
    this.dataType = new DataType(this.type);
    this.format = this.dataType.format;
    this.parse = this.dataType.parse;
    this.compare = this.dataType.compare;
  }

  _createClass(DataHeader, [{
    key: "filter",
    value: function filter(cellValue, dataRow) {
      var _this2 = this;

      //Check if any of the filters fail
      //If any filters fail, res will be true. Return the opposite
      return !Object.keys(this.filterList).some(function (f) {
        return !_this2.filterList[f].func(cellValue, dataRow);
      });
    }
  }, {
    key: "addFilter",
    value: function addFilter(options) {
      this.filterList[options.id] = new DataFilter(_objectSpread2(_objectSpread2({}, options), {}, {
        headerType: this.type
      }));
    }
  }, {
    key: "removeFilter",
    value: function removeFilter(filterID) {
      delete this.filterList[filterID];
    } //Saves a list of unique values in the column - to be used in the filter dropdowns

  }, {
    key: "embedData",
    value: function embedData(data, metaData) {
      this.uniqueValues = uniqueByColumn(data, metaData, this.headerID, this.uniqueValues);
    }
  }, {
    key: "selectAll",
    value: function selectAll(setVal) {
      var _this3 = this;

      Object.keys(this.uniqueValues).map(function (uv) {
        _this3.uniqueValues[uv] = setVal;
      });
    } //checks if there are any active filters, including the array filter

  }, {
    key: "hasFilter",
    value: function hasFilter() {
      var _this4 = this;

      //array filter is always there, check if any other filters are there
      var testRes = Object.keys(this.filterList).length === 1; //if there are no other filters, check if the array filter is active

      if (testRes) {
        Object.keys(this.uniqueValues).forEach(function (val) {
          if (!_this4.uniqueValues[val]) {
            testRes = false;
          }
        });
      }

      return !testRes;
    }
  }, {
    key: "clearFilter",
    value: function clearFilter() {
      var _this5 = this;

      this.filterList = {
        arrayFilter: {
          func: function func(cellValue) {
            return _this5.uniqueValues[cellValue] || _this5.uniqueValues[cellValue] === undefined;
          },
          displayName: 'Array Filter'
        }
      };
      this.selectAll(true);
    }
  }]);

  return DataHeader;
}(); //Returns an array of unique values from a column of DataRow objects

function uniqueByColumn(data, metaData, columnID, oldValues) {
  var res = {};
  data.forEach(function (r, idx) {
    if (metaData[idx] && (metaData[idx].visible || metaData[idx].filteredBy === columnID + ';')) {
      //New vales added as true, old values keep their value
      if (oldValues[r[columnID]] === undefined) {
        res[r[columnID]] = true;
      } else {
        res[r[columnID]] = oldValues[r[columnID]];
      }
    }
  });
  var orderedRes = {};
  Object.keys(res).sort().forEach(function (key) {
    orderedRes[key] = res[key];
  });
  return orderedRes;
}

function useHeaders() {
  var dataHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _useState = useState(dataHeaders.map(function (hdr, i) {
    var obj = new DataHeader(hdr);
    obj.index = i;
    return obj;
  })),
      _useState2 = _slicedToArray(_useState, 2),
      headers = _useState2[0],
      setHeaders = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      savedLayouts = _useState4[0],
      setSavedLayouts = _useState4[1];

  var _useState5 = useState({
    save: function save() {}
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      settingsEngine = _useState6[0],
      setSettingsEngine = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      tokenTrigger = _useState8[0],
      setTokenTrigger = _useState8[1];

  var sortRules = useRef([]);

  var setSortRules = function setSortRules(value) {
    sortRules.current = value;
  }; //Coverts the current layout to JSON and saves it


  function saveLayout(layoutName) {
    var newLayouts = _objectSpread2({}, savedLayouts);

    var saveID = v4();
    newLayouts[saveID] = {
      name: layoutName,
      headerOptions: {},
      sortRules: sortRules.current
    };
    headers.forEach(function (h) {
      newLayouts[saveID].headerOptions[h.headerID] = {
        visible: h.visible,
        filterList: []
      };
      Object.values(h.filterList).forEach(function (f) {
        if (f.options) {
          newLayouts[saveID].headerOptions[h.headerID].filterList.push(f.options);
        } //everything but arrayFilters

      }); //save array filter if there are selected values

      if (h.filterList.arrayFilter && Object.keys(h.uniqueValues).length) {
        var vals = Object.keys(h.uniqueValues);
        var unselectedValues = vals.filter(function (v) {
          return !h.uniqueValues[v];
        });

        if (unselectedValues.length < 50) {
          newLayouts[saveID].headerOptions[h.headerID].arrayFilterValues = unselectedValues;
        }
      }
    });
    setSavedLayouts(newLayouts);
    setTokenTrigger(true);
  }

  function loadLayout(id) {
    if (savedLayouts[id]) {
      var newHeaders = [];
      headers.forEach(function (h) {
        try {
          h.clearFilter(); //If there's no setting for this header it means it was added in an update. Hide it since its not selected. If its requried, it will show anyway. 

          h.visible = savedLayouts[id].headerOptions && savedLayouts[id].headerOptions[h.headerID] ? savedLayouts[id].headerOptions[h.headerID].visible : false;
          savedLayouts[id].headerOptions[h.headerID].filterList.forEach(function (f) {
            h.addFilter(f);
          }); //apply array filter

          if (savedLayouts[id].headerOptions[h.headerID].arrayFilterValues) {
            savedLayouts[id].headerOptions[h.headerID].arrayFilterValues.map(function (v) {
              h.uniqueValues[v] = false;
            });
          }
        } catch (err) {
          console.error(err);
        }

        newHeaders.push(h);
      });
      setHeaders(newHeaders);
      setSortRules(savedLayouts[id].sortRules);
      setTokenTrigger(true);
    }
  }

  function deleteLayout(id) {
    var newLayouts = _objectSpread2({}, savedLayouts);

    delete newLayouts[id];
    setSavedLayouts(newLayouts);
    setTokenTrigger(true);
  } //Saves a list of unique values in each column (header) - to be used in the filter dropdowns


  function embedData(data, metaData) {
    var newHeaders = _toConsumableArray(headers);

    newHeaders.forEach(function (hdr) {
      hdr.embedData(data, metaData);
    });
    setHeaders(newHeaders);
  }

  function applyToken(token) {
    try {
      var newSettings = JSON.parse(token);
      setSavedLayouts(newSettings.savedLayouts);

      var newHeaders = _toConsumableArray(headers);

      newHeaders.forEach(function (h) {
        h.visible = newSettings.headerOptions && newSettings.headerOptions && newSettings.headerOptions[h.headerID] ? newSettings.headerOptions[h.headerID].visible : true;
      });
      setSortRules(newSettings.sortRules ? newSettings.sortRules : []);
      setHeaders(newHeaders);
    } catch (err) {
      console.error(err);
    }
  }

  function setVisible(index, bool) {
    var newHeaders = _toConsumableArray(headers);

    newHeaders[index].visible = bool;
    setHeaders(newHeaders);
    setSortRules(_toConsumableArray(sortRules.current).filter(function (sr) {
      return sr.headerID !== headers[index].headerID;
    }));
    setTokenTrigger(true);
  } //If settings have changed since the last render, create and save a new token


  if (tokenTrigger) {
    setTokenTrigger(false);
    var res = {
      savedLayouts: savedLayouts,
      headerOptions: {},
      sortRules: sortRules.current
    };
    headers.forEach(function (hdr) {
      res.headerOptions[hdr.headerID] = {
        visible: hdr.visible
      };
    });
    settingsEngine.save(JSON.stringify(res));
  }

  function removeSortRule(headerID) {
    setSortRules(_toConsumableArray(sortRules.current).filter(function (sr) {
      return sr.headerID !== headerID;
    }));
    setTokenTrigger(true);
  }

  function addSortRule(headerID, direction, headerIndex) {
    var newSortRules = _toConsumableArray(sortRules.current).filter(function (sr) {
      return sr.headerID !== headerID;
    });

    newSortRules.push({
      headerID: headerID,
      direction: direction,
      index: headerIndex
    });
    setSortRules(newSortRules);
    setTokenTrigger(true);
  }

  return {
    get: function get() {
      return headers;
    },
    set: setHeaders,
    embedData: embedData,
    applyToken: applyToken,
    saveLayout: saveLayout,
    loadLayout: loadLayout,
    deleteLayout: deleteLayout,
    getSavedLayouts: function getSavedLayouts() {
      return savedLayouts;
    },
    setSettingsEngine: setSettingsEngine,
    setVisible: setVisible,
    addSortRule: addSortRule,
    removeSortRule: removeSortRule,
    getSortRules: function getSortRules() {
      return sortRules.current;
    }
  };
}

function MainTable(props) {
  //Converts static data to a dataset
  var wrapperDataset = useDataset(props.data.isDataset ? function () {
    return [];
  } : function () {
    return props.data;
  }, {
    primaryKey: props.primaryKey
  });
  var data = props.data.isDataset ? _objectSpread2({}, props.data) : wrapperDataset; //deccides if the component is locked based on props and parents in the tree

  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined || !props.data.isDataset;
  var headers = useHeaders(props.headers);

  var newProps = _objectSpread2({}, props);

  newProps.data = data;
  newProps.nestedComponent = null;
  newProps.noActive = true;
  newProps.headers = headers;

  var cleanProps = _objectSpread2({}, props);

  cleanProps.data = data;
  cleanProps.headers = headers; //Sort, search, and filter functionality

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      metaData = _useState2[0],
      setMetaData = _useState2[1];

  useEffect(function () {
    if (!props.data.isDataset) {
      data.refresh();
    }
  }, [props.data]); //SEARCH

  var searchText = useModuleContext().get('TouchPointSearchText');

  data.search = function () {
    if (props.searchable) {
      var values = data.read();
      var newMetaData = [];
      values.forEach(function (r, idx) {
        var rowMeta = metaData[idx] ? metaData[idx] : {};
        rowMeta.searchHidden = false;

        if (searchText) {
          var testVal = JSON.stringify(r).toLowerCase();
          rowMeta.searchHidden = !testVal.includes(searchText.toLowerCase());
        }

        newMetaData.push(rowMeta);
      });
      setMetaData(newMetaData);
    }
  };

  useEffect(function () {
    data.search();
  }, [searchText]); //FILTER

  function filterData(values) {
    var newMetaData = [];
    values.forEach(function (r, idx) {
      var rowMeta = metaData[idx] ? metaData[idx] : {};
      rowMeta.filteredBy = '';
      var noRender = false;
      headers.get().forEach(function (h) {
        var fltr = h.filter(r[h.headerID], r);

        if (!fltr && fltr != 'arrayFilter' && h.visible) {
          noRender = true;
          rowMeta.filteredBy = rowMeta.filteredBy + [h.headerID] + ';';
        }
      });
      rowMeta.visible = !noRender;
      newMetaData.push(rowMeta);
    });
    return newMetaData;
  }

  data.filter = function () {
    var newMeta = filterData(data.read());
    setMetaData(newMeta);
    headers.embedData(data.read(), newMeta);
  }; //SORT


  function sortData(values) {
    var newValues = _toConsumableArray(values);

    headers.getSortRules().forEach(function (sr) {
      if (headers.get()[sr.index] && headers.get()[sr.index].visible) {
        newValues = newValues.sort(function (aRow, bRow) {
          var aVal = aRow[sr.headerID] ? aRow[sr.headerID].toString().toLowerCase() : '';
          var bVal = bRow[sr.headerID] ? bRow[sr.headerID].toString().toLowerCase() : '';

          if (sr.direction === 'asc') {
            if (aVal > bVal) {
              return 1;
            } else if (aVal < bVal) {
              return -1;
            }

            return 0;
          } else {
            if (aVal < bVal) {
              return 1;
            } else if (aVal > bVal) {
              return -1;
            }

            return 0;
          }
        });
      }
    });
    return newValues;
  }

  data.sort = function () {
    var newData = props.noSort ? _toConsumableArray(data.read()) : sortData(data.read());
    data.set(newData);
    data.filter();
  }; //Select and return:
  //cleanProps - if a dataset is passed to the table, then no need to create one
  //newProps - if a dataset is not passed to the table, then create one and pass it


  if (props.data.isDataset) {
    return /*#__PURE__*/React.createElement(CoreTable, _extends({}, cleanProps, {
      metaData: metaData,
      locked: locked,
      searchText: searchText
    }));
  } else {
    return /*#__PURE__*/React.createElement(CoreTable, _extends({}, newProps, {
      metaData: metaData,
      locked: locked,
      searchText: searchText
    }));
  }
} //Proptypes

MainTable.propTypes = {
  onEdit: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  pageSize: PropTypes.number,
  locked: PropTypes.bool,
  searchable: PropTypes.bool,
  noSort: PropTypes.bool,
  noFilter: PropTypes.bool,
  noOptions: PropTypes.bool,
  noActive: PropTypes.bool,
  nestedProps: PropTypes.object,
  nestedComponent: PropTypes.func,
  settingsID: PropTypes.string,
  style: PropTypes.object,
  noLoading: PropTypes.bool
};

function RefreshButton(props) {
  if (props.data.status === 'Pending') {
    return /*#__PURE__*/React.createElement(CoreButton, {
      locked: props.locked,
      style: props.style,
      className: props.className,
      title: props.title
    }, /*#__PURE__*/React.createElement(Loading, {
      style: {
        fontSize: 'inherit',
        opacity: '100%'
      }
    }, props.icon ? props.icon : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faSyncAlt
    })), props.title ? props.title : ' Refresh');
  }

  function clickHandler() {
    if (Array.isArray(props.data)) {
      props.data.map(function (d) {
        return d.refresh();
      });
    } else {
      props.data.refresh();
    }
  }

  return /*#__PURE__*/React.createElement(CoreButton, {
    title: props.title,
    style: props.style,
    className: props.className,
    onClick: clickHandler,
    locked: props.locked,
    hidden: props.hidden
  }, props.icon ? props.icon : /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faSyncAlt
  }), props.title ? props.title : ' Refresh');
}
RefreshButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  icon: PropTypes.object,
  title: PropTypes.string
};

function InfoTab(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  if (!props.hidden) {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: 'InfoTab ' + props.tabID,
      style: props.style
    }, props.children));
  } else return null;
} //Proptypes

InfoTab.propTypes = {
  tabTitle: PropTypes.string,
  tabID: PropTypes.string.isRequired,
  style: PropTypes.object
};

var css_248z$q = ".InfoTabContainer{\n\tbackground-color: var(--bodyAltBG);\n\twidth: 100%;\n\theight: 100%;\n\toverflow-x: hidden;\n\toverflow-y: hidden;\n}\n\n.InfoTabContainer .tab-content{\n\tcolor: var(--mainTextColor);\n\twidth: 100%;\n\tmargin: 0;\n\tpadding: 0;\n\theight: calc(100% - var(--tabHeaderHeight));\n\tposition: relative;\n}\n\n.InfoTabContainer .tab-pane{\n\tpadding: 0;\n\tmargin: 0;\n\toverflow: hidden;\n\theight: 100%;\n}\n\n.InfoTabContainer .InfoTab{\n\toverflow: auto;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.InfoTabContainer .nav-tabs{\n\tbackground-color: var(--navColor);\n\theight: var(--tabHeaderHeight);\n\toverflow: hidden;\n\tborder: none;\n\tpadding-left: 0px;\n}\n\n.InfoTabContainer .nav-tabs a{\n\theight: var(--tabHeaderHeight);\n\tpadding: 0px 30px;\n\tbackground-color: transparent;\n\tcolor: \tvar(--navTextColor);\n\toutline: none !important;\n\tborder: none;\n\tmargin-right: 8px;\n\tmargin-left: 8px;\n\ttext-align: center;\n\tfont-size: 14pt;\n\tbox-sizing: border-box;\n}\n\n.InfoTabContainer .nav-tabs a.active{\n\tbackground-color: var(--navColor);\n\tcolor: \tvar(--navTextColor);\n\t\n\ttext-shadow: 1px 0px 0px var(--navTextColor);\n\tborder-bottom: solid 3px var(--navTextColor);\n}\n\n.InfoTabContainer .nav-tabs a:hover{\n\tfilter: brightness(80%);\n}\n\n.InfoTabContainer .nav-tabs a.active:hover{\n\tcolor: \tvar(--navTextColor);\n\tfilter: none;\n\tbackground-color: transparent;\n}\n\n/* InfoCard components styled differntly */\n.InfoTabContainer .InfoCard{\n\tpadding: 10px;\n}\n\n";
styleInject(css_248z$q);

function InfoTabContainer(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  return /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, /*#__PURE__*/React.createElement("div", {
    className: "InfoTabContainer"
  }, /*#__PURE__*/React.createElement(Tabs, {
    defaultActiveKey: props.defaultTab,
    transition: false,
    onSelect: function onSelect(tabID) {
      if (props.onTabChange) {
        props.onTabChange(tabID, locked);
      }
    }
  }, React.Children.map(props.children, function (child) {
    var tabTitle = child.props.tabTitle ? child.props.tabTitle : child.props.title;

    if (!child.props.hidden) {
      return /*#__PURE__*/React.createElement(Tab, {
        eventKey: child.props.tabID,
        title: tabTitle
      }, child);
    } else return null;
  }))));
} //Proptypes

InfoTabContainer.propTypes = {
  defaultTab: PropTypes.string,
  onTabChange: PropTypes.func,
  locked: PropTypes.bool
};

var css_248z$r = ".Module{\n\twidth:100%;\n\theight: 100%;\n\toverflow: hidden;\n\tbackground-color: var(--bodyAltBG);\n\tposition: relative;\n}";
styleInject(css_248z$r);

function Module(props) {
  var moduleData = useModuleContext();
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  useEffect(function () {
    moduleData.clear();
    return function () {
      moduleData.clear();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: 'Module ' + props.moduleName,
    style: props.style
  }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, props.children));
} //Proptypes

Module.propTypes = {
  moduleName: PropTypes.string,
  style: PropTypes.object,
  locked: PropTypes.bool
};

var css_248z$s = ".SplitScreen{\n\theight: 100%;\n\tdisplay: flex;\n\twidth: 100%;\n\tbackground-color: transparent;\n\tposition: absolute;\n\tz-index: 1;\n\tbox-sizing: border-box;\n\tbottom: 0;\n}\n\n.Module > .SplitScreen{\n\theight: calc(100% - var(--controlBarHeight));\n}\n\n.SplitScreen>div{\n\twidth: 100%;\n}\n\n.SplitScreen>div>div{\n\theight: 100%;\n\toverflow-y:auto;\n}\n\n.SplitScreen .gutter{\n\twidth: 100%;\n\tbackground-color: var(--navColor);\n\topacity: 60%;\n\tcursor: ns-resize;\n\tpointer-events: all;\n}\n\n/* InfoCard components styled differntly */\n.SplitScreen .InfoCard{\n\tpadding: 10px !important;\n}\n\n.SplitScreen .MainTable{\n\tpadding-bottom: 0;\n}";
styleInject(css_248z$s);

function SplitScreen(props) {
  var splitSize = 50;

  if (props.defaultSize) {
    splitSize = props.defaultSize;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "SplitScreen"
  }, /*#__PURE__*/React.createElement(Split, {
    direction: "vertical",
    sizes: [100 - splitSize, splitSize],
    minSize: 100,
    gutterSize: 4,
    snapOffset: 1,
    dragInterval: 20
  }, props.children));
} //Proptypes

SplitScreen.propTypes = {
  defaultSize: PropTypes.number
};

var css_248z$t = ".ControlledTabContainer{\n\tbackground-color: var(--bodyAltBG);\n\twidth: 100%;\n\theight: 100%;\n\toverflow-x: hidden;\n\toverflow-y: auto;\n}\n\n.ControlledTabContainer .tabWrapper{\n\twidth: 100%;\n\theight: 100%;\n}\n\n.ControlledTabContainer .InfoTab{\n\theight: 100%;\n\toverflow: auto;\n\twidth: 100%;\n}\n\n/* InfoCard components styled differntly */\n.ControlledTabContainer .InfoCard{\n\tpadding: 10px;\n}";
styleInject(css_248z$t);

function ControlledTabContainer(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  return /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, /*#__PURE__*/React.createElement("div", {
    className: "ControlledTabContainer",
    style: props.style
  }, React.Children.map(props.children, function (child) {
    if (!child.props.hidden) {
      return /*#__PURE__*/React.createElement("div", {
        className: "tabWrapper",
        style: props.activeTab === child.props.tabID ? {} : {
          display: 'None'
        }
      }, child);
    } else return null;
  })));
} //Proptypes

ControlledTabContainer.propTypes = {
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func,
  locked: PropTypes.bool,
  style: PropTypes.object
};

var css_248z$u = ".Dock{\n\tpadding: 6px 0;\n\twidth: var(--dockWidth);\n\tbackground-color: var(--dockColor);\n\tposition: fixed;\n\tleft:0;\n\theight: 100%;\n}";
styleInject(css_248z$u);

function Dock(props) {
  usePresence('TouchPointDock', 0, 'var(--dockWidth)');

  var _useSystem = useSystem(),
      Layout = _useSystem.Layout; //locking the item. If a component somewhere above in the tree is locked, the context will 


  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: "Dock",
    style: _objectSpread2(_objectSpread2({}, props.style), {}, {
      height: Layout.get().heightCSS
    })
  }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, props.children));
}
Dock.propTypes = {
  locked: PropTypes.bool,
  style: PropTypes.object
};

function useShortcuts(shortcuts) {
  var keymap = useRef({});

  function keyHandler(e) {
    var code = '';

    if (e.ctrlKey || e.metaKey) {
      code = code + 'ctrl';
    }

    if (e.shiftKey) {
      code = code + 'shift';
    }

    if (e.altKey) {
      code = code + 'alt';
    }

    code = code + e.key.toString().toLowerCase();

    if (keymap.current[code]) {
      keymap.current[code](e);
    }
  }

  useEffect(function () {
    shortcuts.map(function (e) {
      var code = '';

      if (e.ctrl || e.metaKey) {
        code = code + 'ctrl';
      }

      if (e.shift) {
        code = code + 'shift';
      }

      if (e.alt) {
        code = code + 'alt';
      }

      code = code + e.key.toString().toLowerCase();
      keymap.current[code] = e.callback;
    });

    if (shortcuts.length) {
      document.addEventListener('keydown', keyHandler);
    }

    return function () {
      return document.addEventListener('keydown', keyHandler);
    };
  }, []);
}

export { AppDrawer, AppFooter, AppToolbar, CheckBox, CloseButton, ComboBox, CommentBox, ConfirmButton, ControlBar, ControlledTabContainer, CoreButton, DataHeader, Dock, DockIcon, FreeButton, InfoCard, InfoTab, InfoTabContainer, Loading, MainTable, MenuButton, Module, PopupCard, RadioButton, RadioGroup, RefreshButton, SearchBar, SplitScreen, TextBox, Tile, TouchPointApp, useDataset, useModuleContext as useModuleData, usePresence, useSettings, useShortcuts, useSystem };
//# sourceMappingURL=index.js.map
