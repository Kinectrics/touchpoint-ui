import React, { createContext, useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faTimes, faCaretRight, faPlus, faCaretDown, faFilter, faCog, faTimesCircle, faSortAmountUp, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { v4 } from 'uuid';
import produce from 'immer';
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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var css_248z = ":root{\n\t/*Theme Variables*/\n\t\n\t/* Nav */\n\t--navColor: #008ae6;\n\t--navTextColor: white;\n\t--navHoverColor: rgb(196, 196, 196);\n\t--navClickedColor: rgb(177, 177, 177);\n\t\n\t/* Body Background */\n\t--bodyAltBG: rgb(224, 230, 245);\n\t\n\t/* Text */\n\t--mainTextColor: rgb(26, 26, 26);\n\t--labelColor: var(--navColor);\n\t--lockedTextColor: rgb(122, 122, 122);\n\t\n\t/* Cards */\n\t--cardBG: white;\n\t/* --dynamicCardShadow: 5px 5px 50px -9px var(--shadowColor);\n\t--shadowColor: rgba(0, 0, 0, 0.521); */\n\t\n\t/* Main Table */\n\t--tableActiveColor: rgb(2, 187, 219);\n\t\n\t/* FreeButtons */\n\t--freeButtonNeutralBG: var(--labelColor);\n\t--freeButtonPositiveBG: var(--navColor);\n\t--freeButtonNegativeBG: var(--navColor);\n\t--freeButtonTextColor: white;\n\t\n\t/* Inputs */\n\t--inputColor: rgb(238, 238, 238);\n\t\n\t/* Structure Variables */\n\t--systemToolbarHeight: 30px;\n\t--controlBarHeight: 49px;\n}\n\nbody {\n\tmargin: 0;\n\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n\t  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n\t  sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\theight: 100%;\n\twidth: 100%;\n}\n\na{\n\tcolor: var(--labelColor)\n}\n\n/* App Structure CSS */\n.TouchPointApp{\n\theight: 100vh;\n\twidth: 100vw;\n\toverflow: hidden;\n\tmargin: 0;\n\tpadding: 0;\n\tbackground-color: var(--navColor);\n}\n\n.moduleContainer{\n\toverflow: hidden;\n\tbackground-color: var(--bodyAltBG);\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.screenBlocker{\n\tposition: fixed;\n\ttop:0;\n\tleft:0;\n\twidth:100vw;\n\theight: 100vh;\n\tz-index: 999;\n}\n\n/* Screen Effects */\n.screenEffect{\n\twidth:100%;\n\theight: 100%;\n\toverflow: hidden;\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.blurScreenEffect{\n\ttransition: filter 200ms ease-in-out;\n\tfilter: blur(8px) brightness(90%);\n}\n\n\n/* Quick Styles */\n.flexCenter{ \n\t/*Centers content inside a div in both directions*/\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.flexY{ \n\t/*Centers content inside a div in both directions*/\n\tdisplay: flex;\n\talign-items: center;\n}";
styleInject(css_248z);

var css_248z$1 = ".systemPopupBackdrop{\n\tz-index: 900;\n\tbackground-color: var(--overlayBackdropColor);\n\twidth: 100vw;\n\theight: 100vh;\n\tposition: fixed;\n\ttop:0;\n\t\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\t\n\ttransition: opacity 300ms ease-out;\n}\n\n.systemPopupBackdrop:Hover{\n\tcursor: pointer;\n}\n\n.systemPopupBackdrop.forceOpen:Hover{\n\tcursor: default;\n}\n\n.systemPopupBackdrop.transparent{\n\topacity: 0;\n}\n\n.systemPopupBackdrop>.InfoCard{\n\twidth: 30%;\n\theight: 20%;\n\tcursor: default;\t\n}\n\n\n";
styleInject(css_248z$1);

function SystemPopupHandler(props) {
  //Clicking the background closes the popup
  function clickBackdrop(e) {
    if (e.target.classList.contains('systemPopupBackdrop') && !props.activePopup.props.forceOpen) {
      props.system.closePopup();
    }
  }

  var forceClass = '';

  if (props.activePopup !== null && props.activePopup.props.forceOpen) {
    forceClass = 'forceOpen';
  } //If the active popup isn't null, render it


  if (props.activePopup != null) {
    //support for oth JSX and function components
    // if(typeof props.activePopup === 'function'){pop = props.activePopup()}
    return /*#__PURE__*/React.createElement("div", {
      className: "systemPopupBackdrop " + props.popupEffect + ' ' + forceClass,
      onClick: clickBackdrop
    }, props.activePopup);
  } else return null;
}

//Context hooks for variable and functions that are system wide
//Only certain components support locking (see docs for more information)

var lockedContext = /*#__PURE__*/createContext(false);

function SystemModuleContainer(props) {
  var n = 0;

  if (props.system.layout.hasSystemToolbar) {
    n++;
  }

  if (props.system.layout.hasSystemFooter) {
    n++;
  } //Adjusts the module container to fit between the system toolbars


  var styleSettings = {
    height: 'calc(100vh - ' + n + ' * var(--systemToolbarHeight))',
    width: '100vw'
  }; //Get the active module

  var ActiveModule = props.system.getModules()[props.system.getActiveModule()]; //If there's no active module render the home module

  if (!ActiveModule) {
    ActiveModule = props.system.getModules()[props.system.getHomeModule()];
  } else if (!ActiveModule) {
    //If there's no home module render the first module in the list
    ActiveModule = Object.keys(props.system.getModules())[0];
  }

  var moduleList = props.system.getModules(); //Render the chosen module

  return /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: ActiveModule.locked || props.locked
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
    component: moduleList[props.system.getHomeModule()].component
  }))));
}

//Context hooks for variable and functions that are system wide

var systemContext = /*#__PURE__*/createContext({});

var SystemThemeEngine = /*#__PURE__*/function () {
  function SystemThemeEngine() {
    _classCallCheck(this, SystemThemeEngine);

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
        shadowColor: 'rgba(54, 54, 54, 0.034)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'rgb(0, 138, 230)',
        freeButtonNegativeBG: 'rgb(211, 67, 0)',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: 'rgb(238, 238, 238)'
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
        shadowColor: 'rgba(54, 54, 54, 0.014)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'green',
        freeButtonNegativeBG: 'red',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: 'rgb(238, 238, 238)'
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
        shadowColor: 'rgba(0, 0, 0, 0.06)',

        /* FreeButtons */
        freeButtonNeutralBG: 'var(--labelColor)',
        freeButtonPositiveBG: 'green',
        freeButtonNegativeBG: 'red',
        freeButtonTextColor: 'white',

        /* Inputs */
        inputColor: '#202124'
      }
    };
  } //Set the CSS cariables that control theme colors


  _createClass(SystemThemeEngine, [{
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
    value: function getUserTheme(userName) {
      this.setTheme(localStorage.getItem('themeName'));
    }
  }]);

  return SystemThemeEngine;
}();

function TouchPointApp(props) {
  //System-wide state
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      activePopup = _useState2[0],
      setPopup = _useState2[1];

  var _useState3 = useState(props.defaultModule),
      _useState4 = _slicedToArray(_useState3, 2),
      activeModule = _useState4[0],
      setActiveModule = _useState4[1]; //Set moduleTransition to 'transition' while the modules are being switched out


  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      screenEffect = _useState6[0],
      setScreenEffect = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      screenBlock = _useState8[0],
      setScreenBlock = _useState8[1]; //if true, no clicks will register


  var _useState9 = useState(''),
      _useState10 = _slicedToArray(_useState9, 2),
      popupEffect = _useState10[0],
      setPopupEffect = _useState10[1]; //Layout state - allows modules to fit available space between system toolbars


  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      hasAppToolbar = _useState12[0],
      setHasAppToolbar = _useState12[1];

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      hasAppFooter = _useState14[0],
      setHasAppFooter = _useState14[1]; //Functions that are available to all modules and can be used system-wode 
  //Used for things like switching modules, sending out emails, etc. for consistency across the system


  var System = {
    //Accessing system wide information
    getActiveModule: function getActiveModule() {
      return activeModule;
    },
    //Create a copy of props.modules, excluding any hidden modules. 
    getModules: function getModules() {
      var modules = {};
      Object.keys(props.modules).forEach(function (m) {
        if (!props.modules[m].hidden) {
          modules[m] = props.modules[m];
        }
      });
      return modules;
    },
    getHomeModule: function getHomeModule() {
      return props.homeModule;
    },
    //Setting system wide variables
    setTheme: function setTheme(themeName) {
      var themeEngine = new SystemThemeEngine();
      themeEngine.setTheme(themeName);
    },
    //Interacting with the parent app
    openModule: function openModule(moduleName) {
      if (props.modules[moduleName]) {
        //setActiveModule(moduleName)
        window.location.href = '#/' + moduleName;
      }
    },
    disableInput: function disableInput(forTime) {
      setScreenBlock(true);

      if (forTime) {
        setTimeout(function () {
          return setScreenBlock(false);
        }, forTime);
      }
    },
    enableInput: function enableInput() {
      setScreenBlock(false);
    },
    openPopup: function openPopup(PopupComponent) {
      setScreenBlock(true);
      setTimeout(function () {
        return setScreenBlock(false);
      }, 400);
      setScreenEffect('blurScreenEffect');
      setPopupEffect('transparent');
      setPopup(PopupComponent);
      setTimeout(function () {
        return setPopupEffect('');
      }, 0);
    },
    closePopup: function closePopup() {
      // if(activePopup.props.onClose){activePopup.props.onClose()}
      setPopupEffect('transparent');
      setTimeout(function () {
        return setPopup(null);
      }, 250);
      setScreenEffect('');
    },
    //Internal variables for structuring the app
    layout: {
      hasAppToolbar: hasAppToolbar,
      setHasAppToolbar: setHasAppToolbar,
      hasAppFooter: hasAppFooter,
      setHasAppFooter: setHasAppFooter
    },
    io: props.io
  }; //Initial setup. Initaializes the theme handler object, and sets the theme to the preffered user theme

  useEffect(function () {
    var themeEngine = new SystemThemeEngine();
    themeEngine.getUserTheme(System.io.getActiveUser());
  }, []); //Input blocker for clicks

  var screenBlocker = null;

  if (screenBlock) {
    screenBlocker = /*#__PURE__*/React.createElement("div", {
      className: "screenBlocker"
    });
  } else screenBlocker = null; //The App JSX itself


  return /*#__PURE__*/React.createElement("div", {
    className: "TouchPointApp "
  }, /*#__PURE__*/React.createElement(systemContext.Provider, {
    value: System
  }, /*#__PURE__*/React.createElement(HashRouter, null, screenBlocker, /*#__PURE__*/React.createElement("div", {
    className: 'screenEffect ' + screenEffect
  }, props.children, /*#__PURE__*/React.createElement(SystemModuleContainer, {
    system: System,
    locked: props.locked
  })), /*#__PURE__*/React.createElement(SystemPopupHandler, {
    system: System,
    activePopup: activePopup,
    popupEffect: popupEffect
  }))));
} //Proptypes

TouchPointApp.propTypes = {
  locked: PropTypes.bool,
  modules: PropTypes.object.isRequired,
  activeUser: PropTypes.string.isRequired,
  homeModule: PropTypes.string,
  io: PropTypes.any
};

var css_248z$2 = ".AppToolbar{\n\tbackground-color: var(--navColor) !important;\n\t\n\twidth: 100%;\n\tcolor: var(--navTextColor);\n\tpadding: 0 30px 0 10px;\n\tz-index: 3;\n}\n\n.AppToolbar .buttonContainer{\n\tbox-sizing: border-box;\n\tposition: relative;\n\theight: var(--systemToolbarHeight);\n\twidth: 70%;\n\tfloat: left;\n}\n\n.AppToolbar .brandingContainer{\n\tbox-sizing: border-box;\n\tposition: relative;\n\twidth: 30%;\n\ttext-align: right;\n\tfont-weight: bold;\n}\n\n.AppToolbar button{\n\tpadding: 0;\n\tbackground-color: transparent !important;\n\tborder: none;\n\tfont-size: 13pt;\n\tmargin-bottom: 4px;\n\tmargin-right: 40px;\n\tcolor: var(--navTextColor);\n\theight: 100%;\n}\n\n.AppToolbar button::after{\n\tcontent: none;\n}\n\n.AppToolbar button:hover{\n\tcolor: var(--navHoverColor);\n}\n\n.AppToolbar button:active, .AppToolbar button:focus{\n\tborder: none !important;\n\toutline: none !important;\n\tbox-shadow: none !important;\n\tcolor: var(--navClickedColor) !important;\n}\n\n.AppToolbar .homeButton{\n\tmargin-top: 2px;\n\tpadding-left: 4px;\n\tbackground-color: var(--navColor) !important;\n\tborder: none;\n\tcolor: var(--navTextColor);\n}\n\n.AppToolbar a{\n\tbackground-color: var(--cardBG) !important;\n\tcolor: var(--mainTextColor) !important;\n}\n\n.AppToolbar a:hover{\n\tfilter: brightness(95%);\n}\n\n.AppToolbar .dropdown-menu{\n\tbackground-color: var(--cardBG) !important;\n}\n\n\n";
styleInject(css_248z$2);

function useSystem() {
  return useContext(systemContext);
}

//can resize to fit around them

function usePresence(componentName) {
  var System = useSystem();
  useEffect(function () {
    System.layout['setHas' + componentName](true);
    return function () {
      System.layout['setHas' + componentName](false);
    };
  }, []);
}

function AppToolbar(props) {
  var System = useSystem();
  var devMode = '';

  if (process.env.NODE_ENV === 'development') {
    devMode = '(Dev Mode)';
  } //Declare itself to the app so the modules can be fit around it 


  usePresence('AppToolbar');
  var moduleList = System.getModules();
  return /*#__PURE__*/React.createElement("div", {
    className: "AppToolbar flexY"
  }, /*#__PURE__*/React.createElement("div", {
    className: "buttonContainer flexY"
  }, /*#__PURE__*/React.createElement("button", {
    className: "homeButton",
    onClick: function onClick(e) {
      System.openModule(System.getHomeModule());
      e.target.blur();
    }
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faHome
  }), " Home"), /*#__PURE__*/React.createElement(DropdownButton, {
    title: "Application"
  }, Object.keys(moduleList).map(function (m) {
    if (m !== System.getHomeModule()) {
      return /*#__PURE__*/React.createElement(Dropdown.Item, {
        onClick: function onClick() {
          return System.openModule(m);
        },
        key: 'SystemToolBarOpenModule' + m
      }, moduleList[m].name);
    } else return null;
  })), /*#__PURE__*/React.createElement(DropdownButton, {
    title: "Tools"
  }, /*#__PURE__*/React.createElement(Dropdown.Item, null, "Class V Estimation")), /*#__PURE__*/React.createElement(DropdownButton, {
    title: "Settings"
  }, /*#__PURE__*/React.createElement(Dropdown.Item, null, "User Delegation"), /*#__PURE__*/React.createElement(Dropdown.Item, {
    onClick: function onClick() {
      return System.setTheme('blue');
    }
  }, "Blue Theme"), /*#__PURE__*/React.createElement(Dropdown.Item, {
    onClick: function onClick() {
      return System.setTheme('orange');
    }
  }, "Orange Theme"), /*#__PURE__*/React.createElement(Dropdown.Item, {
    onClick: function onClick() {
      return System.setTheme('dark');
    }
  }, "Dark Theme")), /*#__PURE__*/React.createElement(DropdownButton, {
    title: "Support"
  }, /*#__PURE__*/React.createElement(Dropdown.Item, null, "Request Change"), /*#__PURE__*/React.createElement(Dropdown.Item, null, "Report Bug"), /*#__PURE__*/React.createElement(Dropdown.Item, null, "Contact Dev Team")), /*#__PURE__*/React.createElement(DropdownButton, {
    title: "Help"
  }, /*#__PURE__*/React.createElement(Dropdown.Item, null, "View Help Files"), /*#__PURE__*/React.createElement(Dropdown.Item, null, "About DMS"))), /*#__PURE__*/React.createElement("div", {
    className: "brandingContainer"
  }, "Bruce Power DMS ", devMode));
}

var css_248z$3 = ".AppFooter{\n\twidth: 100%;\n\tpadding-top: 2px;\n\tbackground-color: var(--navColor) !important;\n\tbox-sizing: border-box;\n\tposition: absolute;\n\tbottom:0px;\n\theight: var(--systemToolbarHeight);\n\tfont-size: 13pt;\n\tcolor: var(--navTextColor);\n\ttext-align: right;\n\tz-index: 3;\n\t\n}\n\n.AppFooter .leftSide{\n\tposition: absolute;\n\tleft: 0;\n\tpadding: 0 10px;\n\ttext-align: left;\n\tmax-width: calc(50% - 20px);\n\toverflow-x: hidden;\n}\n\n.AppFooter .rightSide{\n\tposition: absolute;\n\tright: 0;\n\tpadding: 0 10px;\n\ttext-align: right;\n\tmax-width: calc(50% - 20px);\n\toverflow-x: hidden;\n}";
styleInject(css_248z$3);

function AppFooter(props) {
  var System = useSystem();
  var v = System.io.getVersion(); //Declare itself to the app so the modules can be fit around it

  usePresence('AppFooter');
  return /*#__PURE__*/React.createElement("div", {
    className: "AppFooter"
  }, /*#__PURE__*/React.createElement("span", {
    className: "leftSide"
  }, System.io.getActiveUser(), " | Security Profile: ", System.io.getSecurityProfile(), " | Version: ", v.number + ' - ' + v.environment), /*#__PURE__*/React.createElement("span", {
    className: "rightSide"
  }));
}

var css_248z$4 = ".CoreButton{\n\toutline: none !important;\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: inherit;\n\tfont-size: inherit;\n\tfont-weight: inherit;\n}";
styleInject(css_248z$4);

function CoreButton(props) {
  //deccides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var lockedClass = '';

  if (locked) {
    lockedClass = 'locked ';
  } //handles the onChange event. Only fires if component is not locked


  function clickHandler(e) {
    if (!locked && props.onClick !== undefined) {
      props.onClick(e);
    }
  }

  if (!props.hidden) {
    return /*#__PURE__*/React.createElement("button", {
      className: 'CoreButton ' + lockedClass + ' ' + props.className,
      onClick: clickHandler
    }, props.children);
  } else {
    return null;
  }
} //Proptypes

CoreButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  className: PropTypes.string
};

var css_248z$5 = ".FreeButton{\n\toutline: none !important;\n\tborder: none;\n\tborder-radius: 15px;\n\t\n\tcolor: var(--freeButtonTextColor);\n\t\n\tfont-size: 12pt;\n\tfont-weight: bold;\n\tpadding: 8px 17px;\n\tborder-radius: 30px;\n\tmargin:10px;\n\tbox-sizing: border-box;\n}\n\n.FreeButton.wide{\n\twidth: 100%;\n\tdisplay: block;\n\tmargin: 0;\n}\n\n.FreeButton.neutral{\n\tbackground-color: var(--freeButtonNeutralBG);\n}\n\n.FreeButton.positive{\n\tbackground-color: var(--freeButtonPositiveBG);\n\t\n}\n\n.FreeButton.negative{\n\tbackground-color: var(--freeButtonNegativeBG);\n}\n\n.FreeButton:hover{\n\tfilter: brightness(110%);\n}\n\n.FreeButton:active{\n\tfilter: brightness(95%);\n}\n\n.FreeButton.locked{\n\tcursor: default !important;\n\tfilter: grayscale(95%) brightness(70%) !important;\n\topacity: 50% !important;\n}\n";
styleInject(css_248z$5);

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
    className: "FreeButton " + purpose + ' ' + wideClass + ' ' + props.className
  }, props.children);
} //Proptypes

FreeButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool,
  purpose: PropTypes.string,
  wide: PropTypes.bool
};

var css_248z$6 = ".Tile{\n\theight: 150px;\n\twidth: 150px;\n\tbackground-color: var(--cardBG);\n\tmargin: 30px;\n\ttransition: all 0.3s;\n\tfont-size: 12pt;\n\ttext-align: center;\n\tcolor: var(--mainTextColor);\n\tborder-radius: 15px;\n\tborder-style: solid;\n\tborder-color: var(--bodyAltBG);\n\tborder-width: 1px;\n\t\n}\n\n.Tile .logo{\n\theight: 80%;\n\tfont-size: 60pt;\n\tcolor: var(--labelColor)\n}\n\n.Tile:hover{\n\theight: 160px;\n\twidth: 160px;\n\tbackground-color: var(--navColor);\n\tmargin: 25px;\n\tcursor: pointer;\n\tcolor: var(--navTextColor);\n\tbox-shadow: var(--dynamicCardShadow);\n}\n\n.Tile:hover > .logo{\n\tcolor: var(--navTextColor);\n\ttransition: all 0.25s ease-in-out;\n}\n\n.Tile img{\n\theight:85px;\n}\n\n.Tile:hover img, .Tile.splashScreen img{\n\tfilter: brightness(0) saturate(100%) invert(100%);\n}\n\n.Tile:active{\n\theight: 140px;\n\twidth: 140px;\n\tmargin: 35px;\n\ttransition: all 0.05s;\n}\n\n.Tile.splashScreen{\n\theight: 100vh;\n\twidth: 100vw;\n\tmargin: 0;\n\tz-index: 998;\n\ttransition: all 0.4s;\n\tposition: fixed;\n\tright:0;\n\ttop:0;\n\tborder-radius: 0;\n\tcursor: default;\n\tbackground-color: var(--navColor);\n\tcolor: var(--navTextColor);\n\tborder:none;\n}\n\n.Tile.splashScreen > .logo{\n\tcolor: var(--navTextColor);\n\ttransition: all 0.25s;\n}\n\n";
styleInject(css_248z$6);

function Tile(props) {
  //When a module is clicked, a splash screen is dispalyed for a second
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      splash = _useState2[0],
      setSplash = _useState2[1];

  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  function clickHandler() {
    if (!locked && props.splashScreen && props.onClick) {
      setSplash('splashScreen');
      setTimeout(function () {
        props.onClick();
      }, 550);
    } else if (!locked && props.onClick) {
      props.onClick();
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "Tile " + splash,
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo flexCenter"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.icon
  })), props.title);
} //Proptypes

Tile.propTypes = {
  locked: PropTypes.bool,
  icon: PropTypes.any,
  title: PropTypes.string,
  splashScreen: PropTypes.bool,
  onClick: PropTypes.func
};

var css_248z$7 = "/* Styles for all Input type components */\n\n.input{\n\tbackground-color: var(--inputColor);\n\tcolor: var(--mainTextColor);\n\toutline: none !important;\n\tpadding: 5px 15px;\n\tborder-radius: 20px;\n\tborder: none;\n\tfont-size: 12pt;\n}\n\n.input:hover, .input:focus{\n\tfilter: brightness(102%);\n}\n\n.input.locked, .locked .input\n.input.locked:hover, .locked .input:hover\n.input.locked:focus, .locked .input:focus{\n\tcursor: default !important;\n\tfilter: grayscale(50%);\n\topacity: 85%;\n\tcolor: var(--lockedTextColor);\n}\n";
styleInject(css_248z$7);

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
  }

  function blurHandler(e) {
    if (!locked && props.onBlur) {
      props.onBlur(e);
    }
  } //For the onEnter event


  function keyPressHandler(e) {
    if (e.key === 'Enter' && props.onEnter !== undefined) {
      props.onEnter(e);
    }
  }

  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "input TextBox " + lockedClass,
    defaultValue: props.defaultValue,
    onChange: changeHandler,
    readOnly: locked,
    onKeyPress: keyPressHandler,
    placeholder: props.placeholder,
    onBlur: blurHandler
  });
} //Proptypes

TextBox.propTypes = {
  locked: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
  onEnter: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

var css_248z$8 = ".SearchBar .searchButton{\n\tbackground-color: transparent;\n\tborder: none;\n\tcolor: var(--mainTextColor);\n\tfont-size: 13pt;\n\ttransition: all 0.1s;\n\toutline: none !important;\n\ttransform: translateX(-35px);\n\tpadding-top: 5px;\n\tposition: absolute;\n}\n\n.SearchBar input{\n\tpadding-right: 32px;\n\twidth: 100%;\n}\n\n.SearchBar .searchButton:hover{\n\tfont-size: 14pt;\n}\n\n.SearchBar .searchButton:active{\n\ttransition: none;\n\tfont-size: 13pt;\n}\n\n.SearchBar.locked .searchButton{\n\tbackground-color: transparent;\n\tborder: none;\n\tcolor: var(--lockedTextColor);\n}";
styleInject(css_248z$8);

function SearchBar(props) {
  var _useState = useState(props.defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1]; //deccides if the component is locked based on props and parents in the tree


  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //Search button click event

  function searchHandler(e) {
    if (!locked && props.onSearch) {
      props.onSearch(e, searchText);
    }
  } //handles the onChange event. Only fires if component is not locked


  function changeHandler(e) {
    setSearchText(e.target.value);

    if (!locked && props.onChange) {
      props.onChange(e);
    }
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "SearchBar"
  }, /*#__PURE__*/React.createElement(TextBox, {
    locked: props.locked,
    defaultValue: props.defaultValue,
    onChange: changeHandler,
    hidden: props.hdden,
    onEnter: props.onSearch,
    placeholder: "Search",
    onBlur: props.onBlur
  }), /*#__PURE__*/React.createElement("button", {
    className: "searchButton",
    onClick: searchHandler
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faSearch
  })));
} //Proptypes

SearchBar.propTypes = {
  locked: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  hidden: PropTypes.bool,
  onSearch: PropTypes.func,
  onBlur: PropTypes.func
};

//Context hooks for variable and functions that are system wide

var radioContext = /*#__PURE__*/createContext('');

function RadioGroup(props) {
  //decides if the component is locked based on props and parents in the tree
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  var _useState = useState(v4()),
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
    defaultValue: props.defaultValue
  };
  return /*#__PURE__*/React.createElement(radioContext.Provider, {
    value: radioData
  }, props.children);
} //Proptypes

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  locked: PropTypes.bool,
  groupID: PropTypes.any
};

var css_248z$9 = ".RadioButton label, .RadioButton .input{\n\tcursor: pointer;\n}\n\n.RadioButton input{\n\tmargin-right: 5px;\n}\t\n\n.RadioButton label{\n\tcolor: var(--mainTextColor);\n}\n\n.RadioButton .locked{\n\tcursor: default !important;\n}";
styleInject(css_248z$9);

function RadioButton(props) {
  var radioData = useContext(radioContext);

  var _useState = useState(v4()),
      _useState2 = _slicedToArray(_useState, 1),
      id = _useState2[0];

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

  var defaultChecked = radioData.defaultValue === props.value;
  return /*#__PURE__*/React.createElement("span", {
    className: "RadioButton flexY " + lockedClass
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    className: 'input ' + lockedClass,
    defaultChecked: defaultChecked,
    onClick: clickHandler,
    name: radioData.groupName,
    value: props.value,
    id: id
  }), /*#__PURE__*/React.createElement("label", {
    className: lockedClass,
    htmlFor: id
  }, props.labelValue));
}
RadioButton.propTypes = {
  labelValue: PropTypes.string,
  value: PropTypes.any
};

var css_248z$a = ".ControlButton{\n\toutline: none !important;\n\tborder: none;\n\tborder-radius: 15px;\n\t\n\tcolor: var(--navTextColor);\n\tbackground-color: transparent;\n\t\n\tfont-size: 14pt;\n\tfont-weight: bold;\n\tmargin:0;\n\tmargin-right: 30px;\n}\n\n.ControlButton:hover{\n\tcolor: var(--navHoverColor);\n}\n\n.ControlButton:active{\n\tcolor: var(--navClickedColor);\n}\n\n.ControlButton.locked{\n\tcolor: var(--navTextColor) !important;\n\tfilter: brightness(80%);\n\topacity: 60%;\n}\n";
styleInject(css_248z$a);

function ControlButton(props) {
  return /*#__PURE__*/React.createElement(CoreButton, {
    locked: props.locked,
    onClick: props.onClick,
    hidden: props.hidden,
    className: "ControlButton"
  }, props.children);
} //Proptypes

ControlButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool
};

var css_248z$b = ".ControlBar{\n\twidth:100%;\n\tbackground-color: var(--navColor);\t\n\tpadding: 10px;\n\tpadding-top: 5px;\n\tcolor: var(--navTextColor);\n\theight: var(--controlBarHeight);\n\tbox-sizing: border-box;\n}\n\n.ControlBar .buttonContainer{\n\tbox-sizing: border-box;\n\twidth: 80%;\n}\n\n.ControlBar .searchContainer{\n\tbox-sizing: border-box;\n\twidth: 20%;\n}\n\n.ControlBar .SearchBar{\n\twidth: 100%;\n}";
styleInject(css_248z$b);

//Context hooks for variable and functions that are system wide

var moduleContext = /*#__PURE__*/createContext({
  searchText: ''
});

function ControlBar(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;
  var moduleData = useContext(moduleContext);

  var _useState = useState(function () {}),
      _useState2 = _slicedToArray(_useState, 2),
      searchState = _useState2[0],
      setSearchState = _useState2[1]; //search


  function searchHandler(e) {
    moduleData.setSearchText(e.target.value);
  } //start searching after thet person has finished typing, using a 1 second delay


  function changeHandler(e) {
    clearTimeout(searchState);
    e.persist();
    setSearchState(setTimeout(function () {
      searchHandler(e);
    }, 250));
  }

  if (props.searchBar) {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "ControlBar flexY"
    }, /*#__PURE__*/React.createElement("div", {
      className: "buttonContainer"
    }, props.children), /*#__PURE__*/React.createElement("div", {
      className: "searchContainer"
    }, /*#__PURE__*/React.createElement(SearchBar, {
      locked: false,
      onChange: changeHandler,
      onSearch: searchHandler
    }))));
  } else {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "ControlBar flexY"
    }, /*#__PURE__*/React.createElement("div", {
      className: "buttonContainer"
    }, props.children)));
  }
} //Proptypes

ControlBar.propTypes = {
  searchBar: PropTypes.bool,
  searchBarProps: PropTypes.object,
  locked: PropTypes.bool
};

var css_248z$c = ".CommentBox{\n\tresize: none;\n\tpadding: 20px;\n}";
styleInject(css_248z$c);

function CommentBox(props) {
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
  } //For the onEnter event


  function keyPressHandler(e) {//need esc functionality here
  }

  var styleSetings = {
    height: props.height,
    width: props.width
  };

  function blurHandler(e) {
    if (!locked && props.onBlur) {
      props.onBlur(e);
    }
  }

  return /*#__PURE__*/React.createElement("textarea", {
    className: "input CommentBox " + lockedClass,
    defaultValue: props.defaultValue,
    onChange: changeHandler,
    readOnly: locked,
    onKeyPress: keyPressHandler,
    style: styleSetings,
    placeholder: props.placeholder,
    onBlur: blurHandler
  });
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
  width: PropTypes.string
};

var css_248z$d = ".ComboBox{\n\tappearance: none;\n\t\n\tbackground-image: url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\");\n\tbackground-repeat: no-repeat;\n\tbackground-position-x: 97%;\n\tbackground-position-y: 5px;\n}\n\n.ComboBox.locked{\n\tbackground-image: none;\n}\n\n\n\n\n";
styleInject(css_248z$d);

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
      className: "ComboBox input " + lockedClass,
      defaultValue: props.defaultValue,
      onChange: changeHandler,
      disabled: locked
    }, kids);
  }
}

var css_248z$e = ".CloseButton{\n\tborder: none;\n\tbackground-color: transparent;\n\toutline: none !important;\n\tposition: relative;\n\tcolor: var(--lockedTextColor);\n}\n\n.CloseButton:active{\n\tfilter: brightness(70%);\n}";
styleInject(css_248z$e);

function CloseButton(props) {
  return /*#__PURE__*/React.createElement(CoreButton, {
    className: "CloseButton",
    onClick: props.onClick,
    locked: props.locked,
    hidden: props.hidden
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faTimes
  }));
} //Proptypes

CloseButton.propTypes = {
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool
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
    onClick: clickHandler
  }), /*#__PURE__*/React.createElement("span", {
    className: "checkmark"
  }), props.label);
}

var css_248z$f = ".InfoCard{\n\tpadding: 10px 20px;\n\tmargin: 0;\n\ttransition: all 0.25s;\n\t\n}\n\n.InfoCard .InfoCard{\n\tbox-shadow: none;\n\tborder: 1px solid var(--lockedTextColor);\n}\n\n\n.InfoCard .CloseButton{\n\tposition: absolute;\n\tright: 6px;\n\ttop: 6px;\n}\n\n.InfoCard.dynamicX:hover{\n\tpadding-left: 13px;\n\tpadding-right: 13px;\n\tcursor: pointer;\n}\n\n.InfoCard.dynamicX:hover .cardContainer,\n.InfoCard.dynamicY:hover .cardContainer{\n\tbox-shadow: var(--dynamicCardShadow);\n}\n\n.InfoCard.dynamicY:hover{\n\tpadding-top: 13px;\n\tpadding-bottom: 13px;\n\tcursor: pointer;\n}\n\n.InfoCard.dynamicX:active{\n\tpadding-left: 21px;\n\tpadding-right: 21px;\n\ttransition: all 0.05s;\n}\n\n.InfoCard.dynamicY:active{\n\tpadding-top: 21px;\n\tpadding-bottom: 21px;\n\ttransition: all 0.05s;\n}\n\n.InfoCard .cardContainer{\n\tbackground-color: var(--cardBG);\n\tcolor: var(--mainTextColor);\n\tborder-radius: 11px;\n\toverflow: hidden;\n\tbox-shadow: var(--cardShadow);\n\theight: 100%;\n\twidth: 100%;\n\tposition: relative;\n}\n\n.InfoCard .textBox{\n\tpadding: 11px;\n\twidth: 100%;\n\theight: 100%;\n\toverflow-y: auto;\n}\n\n.InfoCard .textBox.stripe{\n\tborder-left-width: 5px;\n\tborder-left-style: solid;\n\tborder-left-color: var(--labelColor);\n\tfloat:left;\n\theight: 100%;\n}\n\n.InfoCard label{\n\tmargin:0 10px 0px 0;\n\tfont-size: 12pt;\n\tcolor: var(--labelColor);\n\n}\n\n.InfoCard h1{\n\tfont-size: 15pt;\n\tfont-weight: bold;\n\tcolor: var(--labelColor)\n}\n\n.InfoCard h2{\n\tmargin: 7px 0px;\n\tfont-size: 12pt;\n\tfont-weight: bold;\n}\n\n.InfoCard p{\n\tmargin:0;\n}\n\n/* Tabs in an infocard */\n.InfoCard .InfoTabContainer{\n\tbackground-color: transparent;\n}\n\n.InfoCard .InfoTabContainer .nav-tabs,\n.InfoCard .InfoTabContainer .nav-tabs a{\n\tbackground-color: transparent !important;\n\tcolor: var(--labelColor) !important;\n\ttext-align: left;\n\tpadding: 0;\n\tmargin-left: 0;\n\tmargin-right: 20px;\n\tmargin-bottom: 6px;\t\n}\n\n.InfoCard .InfoTabContainer .nav-tabs a.active{\n\ttext-shadow: 1px 0px 0px var(--labelColor);\n\t\n\t\n\tborder-bottom-color: var(--labelColor) !important;\n\tborder-bottom-width: 5px !important;\n}\n\n/* Maintable in an infocard */\n.InfoCard .MainTable{\n\tbackground-color: transparent;\n}\n\n.InfoCard .MainTable .titleBar{\n\tfont-weight: bold;\n}\n";
styleInject(css_248z$f);

function InfoCard(props) {
  //locking the item. If a component somewhere above in the tree is locked, the context will 
  //cause this card to be locked as well
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //Assign classes based on props 

  var stripe = ''; //Adds a stripe down the left side

  if (props.stripe && !props.titleBar) {
    stripe = 'stripe';
  } //Adds hover and click effects in the x, y or xy directions


  var dynamic = ''; //dynamic effects are ignored if locked

  if (!locked) {
    if (props.dynamicX) {
      dynamic = 'dynamicX ';
    }

    if (props.dynamicY) {
      dynamic = dynamic + ' dynamicY ';
    }
  } //handles the onClick event. Only fires if the component is not locked


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
    titleBar = /*#__PURE__*/React.createElement("h1", null, props.title);
  }

  var closeButton;

  if (props.onClose) {
    closeButton = /*#__PURE__*/React.createElement(CloseButton, {
      onClick: closeHandler
    });
  } //if 'hidden' prop is true then dont show the component


  if (props.hidden) {
    return null;
  } else {
    var styleSettings = {
      width: props.width,
      height: props.height
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "InfoCard " + dynamic + ' ' + props.className,
      onClick: clickHandler,
      style: styleSettings
    }, /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: "cardContainer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "textBox " + stripe
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
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func
};

var css_248z$g = ".Popup .InfoCard{\n\tmax-width: 85%;\n\tmax-width: 90%;\n}\n\n.Popup .cardContainer{\n\tborder: 1px solid var(--labelColor);\n\tbox-sizing: var(--dynamicCardShadow);\n}\n\n\n\n";
styleInject(css_248z$g);

function Popup(props) {
  var system = useSystem();
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //Clicking the background closes the popup

  var handleCloseButton;

  if (!props.forceOpen) {
    handleCloseButton = function handleCloseButton() {
      if (!props.forceOpen) {
        system.closePopup();
      }
    };
  }

  return /*#__PURE__*/React.createElement(lockedContext.Provider, {
    value: locked
  }, /*#__PURE__*/React.createElement(InfoCard, {
    className: 'Popup ',
    stripe: true,
    title: props.title,
    width: props.width,
    height: props.height,
    onClose: handleCloseButton
  }, props.children));
} //Proptypes

Popup.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  forceOpen: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  locked: PropTypes.bool
};

//Context hooks for variable and functions that are system wide

var menuContext = /*#__PURE__*/createContext({});

var css_248z$h = ".menuButtonContainer{\n\tpadding: 0;\n\tmargin: 0;\n}\n\n.MenuButton{\n\toutline: none !important;\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: inherit;\n\tfont-size: inherit;\n\tfont-weight: inherit;\n\tbox-sizing: border-box;\n\tdisplay: inline-block;\n\toverflow: hidden;\n}\n\n.MenuButton.locked{\n\tcursor: default;\n}\n\n.MenuButton .smallIcon{\n\tfont-size: 8pt;\n}\n\n.dropdown-menu{\n\tbackground-color: var(--cardBG);\n\tpadding-top: 1px;\n}\n\n.Menu{\n\tbackground-color: var(--cardBG);\n\tcolor: var(--mainTextColor);\n\tpadding-top: 7px;\n\tpadding-top: 0;\n\tposition: relative;\n\tz-index: 10;\n}\n\n.MenuContainer{\n\toverflow-x: visible;\n}\n\n/* Buttons and links */\n.Menu a, .Menu button:not(.FreeButton){\n\twidth: 100%;\n\tcolor: var(--mainTextColor) !important;\n\tbackground-color: var(--cardBG);\n\tborder: none;\n\toutline: none !important;\n\ttext-align: left;\n\tpadding: 4px 20px !important;\n\tmargin: 0 !important;\n\tcursor: pointer;\n\tmargin: 3px 0;\n\twhite-space: nowrap;\n}\n\n.Menu a:hover, \n.Menu button:not(.FreeButton):hover{\n\tbackground-color: var(--cardBG);\n\tfilter: brightness(95%);\n\tcolor: var(--mainTextColor);\n}\n\n.Menu a:not(.nav-item):active, .Menu button:not(.FreeButton):active{\n\tfilter: brightness(91%) !important;\n}\n\n.Menu .FreeButton{\n\twidth: 100% - 20px;\n\tmargin: 0;\n}\n\n.Menu>div{\n\tmax-height: inherit;\n}\n\n/* Inputs */\n.Menu .TextBox{\n\twidth: calc(100% - 20px);\n\tmargin: 0 10px;\n\t\n}\n\n/* Tabbed menus */\n.Menu .InfoTabContainer{\n\tbackground-color: transparent;\n}\n\n.Menu .nav{\n\tpadding: 0 10px;\n\tmargin: 0 !important;\n\tposition: sticky;\n\ttop:0;\n\twidth: 100% !important;\n\tbackground-color: var(--cardBG);\n}\n\n.Menu .InfoTabContainer .nav-tabs,\n.Menu .InfoTabContainer .nav-tabs a{\n\twidth: fit-content;\n\tbackground-color:var(--cardBG) !important;\n\tcolor: var(--labelColor) !important;\n\ttext-align: left;\n\tpadding: 0;\n\tmargin-left: 10px;\n\tz-index: 3;\n\tfilter: none;\n}\n\n.Menu .InfoTabContainer .nav-tabs a.active{\n\ttext-shadow: 1px 0px 0px var(--labelColor);\n\t\n\tborder-bottom-color: var(--labelColor) !important;\n\tborder-bottom-width: 5px !important;\n}\n\n.Menu .InfoTabContainer, .tab-content, .tab-pane, \n.InfoTab{\n\tmax-height: inherit;\n}\n\n.Menu .InfoTabContainer{\n\toverflow-y: hidden;\n\t\n}\n\n/* Submenus */\n\n.Menu .MenuButton{\n\tposition: relative;\n}\n\n.Menu .subMenuIcon{\n\tposition: absolute;\t\n\tright: 5px;\n\tbackground-color: var(--cardBG);\n}\n\n.Menu .menuButtonContainer{\n\twidth: 100%;\n}";
styleInject(css_248z$h);

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
  var icon = null;

  if (parentMenuData.submenu) {
    icon = /*#__PURE__*/React.createElement("span", {
      className: "subMenuIcon"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faCaretRight
    }));
  }

  var direction = props.direction;

  if (parentMenuData.submenu) {
    direction = 'right';
  } //button


  var dropButton = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
    var onClick = _ref.onClick;

    function clickHandler(e) {
      e.preventDefault();
      onClick(e);
    }

    return /*#__PURE__*/React.createElement("button", {
      className: 'MenuButton ' + props.className + ' ' + lockedClass,
      onClick: clickHandler,
      ref: ref
    }, props.children, icon);
  }); //Menu Itself

  var menuStyle = {
    maxHeight: props.maxHeight,
    width: props.width,
    height: props.height
  };
  var dropMenu = /*#__PURE__*/React.forwardRef(function (_ref2, ref) {
    var style = _ref2.style,
        className = _ref2.className;
    return /*#__PURE__*/React.createElement(menuContext.Provider, {
      value: {
        submenu: true
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      style: {
        menuStyle: menuStyle
      },
      className: className + ' MenuContainer'
    }, /*#__PURE__*/React.createElement("div", _defineProperty({
      style: style,
      className: 'Menu'
    }, "style", menuStyle), props.menuContent)));
  }); //If locked return a button that does nothing, otherwise create a real dropdown button

  if (locked) {
    return dropButton;
  } else {
    return /*#__PURE__*/React.createElement("span", {
      className: "menuButtonContainer"
    }, /*#__PURE__*/React.createElement(Dropdown, {
      drop: direction,
      onToggle: toggleHandler
    }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
      as: dropButton
    }), /*#__PURE__*/React.createElement(Dropdown.Menu, {
      as: dropMenu
    })));
  }
} //Proptypes

MenuButton.propTypes = {
  locked: PropTypes.bool,
  className: PropTypes.string,
  menuContent: PropTypes.any.isRequired,
  maxHeight: PropTypes.string,
  direction: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

var css_248z$i = ".MainTable{\n\toverflow-x: auto;\n\tpadding: 0px 10px;\n\twidth:100%;\n\tbackground-color: var(--bodyAltBG);\n\theight: 100%;\n\tpadding-bottom: 75vh;\n\tcolor: var(--mainTextColor);\n\tposition: relative;\n}\n\n.MainTable.noTransition *{\n\ttransition: none !important;\n}\n\n.MainTable .titleBar{\n\tposition: sticky;\n\ttop:0;\n\tz-index: 20;\n}\n\n.MainTable .topBar{\n\tdisplay: flex;\n\tpadding: 7px 0px;\n\tpadding-top: 3px;\n\tpadding-left: 30px;\n\tbackground-color: var(--bodyAltBG);\n}\n\n.MainTable .topBar .menuButtonContainer{\n\tpadding: 0;\n\tmargin-right: 10px;\n}\n\n.MainTable .theadBar{\n\toverflow-y: visible;\n\tbackground-color: var(--bodyAltBG);\n\tpadding-left: 25px;\n\tpadding-right: 25px;\n\tposition: sticky;\n\ttop:0;\n\tz-index: 20;\n}\n\n.MainTable .TheadButton{\n\twhite-space: nowrap;\n\ttext-align: left;\n\tpadding-left: 0;\t\n}\n\n.MainTable .TheadButton:active,\n.MainTable .TheadButton:focus{\n\tcolor: var(--labelColor);\n\tfilter: brightness(70%);\n}\n\n.MainTable .TheadButton.locked{\n\tcolor: var(--mainTextColor)\t!important;\n\tfilter: none !important;\n}\n\n.MainTable span{\n\tbox-sizing: border-box;\n\tdisplay: inline-block;\n\ttext-align: left;\n\tpadding: 0 3px;\n\tmargin: 0;\n\tmax-height: 100%;\n\tpadding-left: 23px;\n}\n\n.MainTable .badge{\n\tborder-radius: 10px;\n\ttext-align: center;\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n\tpadding-left: 0;\n\tfont-size: 11.5pt;\n\ttransition: none;\n}\n\n.MainTable span:first-child{\n\tpadding-left: 3px;\n}\n\n/* Controls */\n\n.MainTable .tableControls{\n\twidth: 50%;\n\tcolor: var(--lockedTextColor);\n\tfont-size: 12pt;\n\tpadding-top: 3px;\n}\n\n.MainTable .pageControls{\n\ttext-align: right;\n\tpadding: 0 10px;\n\tmargin: 0;\n\theight: 25px;\n\tcolor: var(--lockedTextColor);\n\twidth: 50%;\n\tright: 0;\n}\n\n.MainTable .topBar button{\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: var(--lockedTextColor);\n\tfont-size: 15pt;\n\tpadding: 0 10px;\n\toutline: none !important;\n}\n\n.MainTable .topBar button:hover{\n\tcolor: var(--labelColor);\n}\n\n.MainTable .topBar button:active{\n\tfilter: brightness(70%);\n}\n\n.MainTable .tableControls button{\n\tfont-size: 12pt;\n\tpadding-left: 0;\n\tmargin-right: 10px;\n}\n\n.MainTable .textButton{\n\tfont-size: 13pt !important;\n\theight: 100%;\n}\n\n.MainTable .smallIcon{\n\tfont-size: 10pt;\n}\n\n.MainTable .smallerIcon{\n\tfont-size: 9pt;\n}\n\n";
styleInject(css_248z$i);

var css_248z$j = ".MainTableRow{\n\twidth:100%;\n\tbackground-color: transparent;\n\tpadding: 4px 10px;\n\theight: 40px;\n\ttransition: all 0.2s;\n\tbox-sizing: border-box;\n}\n\n.MainTableRow.pointer{\n\tcursor: pointer;\n}\n\n.MainTableRow.dynamic:hover{\n\tpadding: 1px 0;\n}\n\n.MainTableRow.dynamic:active{\n\ttransition: all 0.05s ease-out;\n\tpadding: 3px 7px;\n}\n\n.MainTableRow span{\n\ttransition: inherit;\n\toverflow: hidden;\n}\n\n.MainTableRow .rowContainer{\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: var(--cardBG);\n\tpadding: 4px 15px;\n\tborder-radius: 10px;\n\tbox-shadow: var(--cardShadow);\n\ttransition: all 0.3s, color 0.15s ease-out;\t\n\toverflow: hidden;\n}\n\n.MainTableRow.dynamic .rowContainer:hover{\n\tbox-shadow: var(--dynamicCardShadow);\n\tpadding-left: 20px;\n\tpadding-top: 6px;\n}\n\n.MainTableRow .active{\n\tcolor: var(--tableActiveColor);\n}\n\n\n";
styleInject(css_248z$j);

var css_248z$k = ".InputCell.cellTextBox{\n\tborder: none;\n\toutline: none !important;\n\tfont-family: inherit;\n\tfont-size: inherit;\n\twidth: 100%;\n\tmargin: none;\n\theight: 100%;\n\tcolor: inherit;\n\tpadding: 1px 10px;\n\tborder-radius: 10px;\n}\n";
styleInject(css_248z$k);

function InputCell(props) {
  var _useState = useState(props.defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      initalValue = _useState2[0],
      setInitialValue = _useState2[1]; //When you focus on an item, the value is saved. if you escape, its restored


  function focusHandler(e) {
    setInitialValue(e.target.value);
  } //Handles keypresses, for enter or esc keys


  function keyHandler(e) {
    if (e.keyCode === 27) {
      //esc
      e.target.value = initalValue;
      e.target.blur();
    } else if (e.keyCode === 13) {
      //enter
      console.log('You pressed the enter key!');
    }
  } //Handles changes (commit changes)

  switch (props.dataHeader.dataType.kind) {
    default:
      return /*#__PURE__*/React.createElement("input", {
        className: "InputCell cellTextBox input",
        defaultValue: props.defaultValue,
        onKeyDown: keyHandler,
        onFocus: focusHandler
      });
  }
} //Proptypes

InputCell.propTypes = {
  defaultValue: PropTypes.string,
  dataRow: PropTypes.object
};

function MainTableRow(props) {
  var renderRow = true;
  var dynamicClass = '';
  var pointerClass = '';

  if (props.dynamic) {
    dynamicClass = 'dynamic';
  }

  if (props.setActiveRecord) {
    pointerClass = 'pointer';
  } //Check if this is the active row for style reasons 


  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      activeClass = _useState2[0],
      setActiveClass = _useState2[1]; //sends the dataRow object to the select record function


  function rowClickHandler() {
    if (props.setActiveRecord) {
      setActiveClass('active');
      props.setActiveRecord(props.dataRow);
    }
  }

  useEffect(function () {
    if (props.activeRecord === props.dataRow) {
      setActiveClass('active');
    } else {
      setActiveClass('');
    }
  }, [props.activeRecord, props.dataRow]); //check if it's filtered out by the search term 

  renderRow = props.dataHeaders.some(function (hdr) {
    if (props.searchText) {
      return hdr.dataType.search(props.dataRow[hdr.headerID], props.searchText);
    } else {
      return true;
    }
  }); //Only continue building the row if it's actually required

  var row;

  if (renderRow) {
    row = props.dataHeaders.map(function (hdr) {
      if (hdr.visible) {
        renderRow = renderRow && props.dataRow.TouchPointMetaVisible || props.noFilter; //Decide if the cell is editable or not based on the locked status, and the header onEdit function

        var cellContent = props.dataRow[hdr.headerID];

        if (!props.locked && hdr.onEdit && !hdr.locked) {
          cellContent = /*#__PURE__*/React.createElement(InputCell, {
            dataHeader: hdr,
            defaultValue: cellContent,
            dataRow: props.dataRow
          });
        } //No conditional formatting


        if (!hdr.styling) {
          return /*#__PURE__*/React.createElement("span", {
            key: hdr.headerID + props.rowKey,
            style: {
              width: hdr.width + '%'
            }
          }, cellContent);
        } else {
          //apply the styling function in the header object
          var myStyle = hdr.styling(props.dataRow[hdr.headerID], props.dataRow);
          return (
            /*#__PURE__*/
            //with coniditional formatting
            React.createElement("span", {
              className: "badge",
              key: hdr.headerID + props.rowKey,
              style: {
                width: 'calc(' + hdr.width + '% - 23px',
                color: myStyle.textColor,
                backgroundColor: myStyle.badgeColor,
                marginLeft: '23px'
              }
            }, cellContent)
          );
        }
      }
    });
  } // only the row if it passes the filter


  if (renderRow) {
    return /*#__PURE__*/React.createElement("div", {
      className: 'MainTableRow ' + dynamicClass + ' ' + pointerClass,
      onClick: rowClickHandler
    }, /*#__PURE__*/React.createElement("div", {
      className: "rowContainer " + activeClass
    }, row));
  } else return null;
} //Proptypes

MainTableRow.propTypes = {
  dataHeaders: PropTypes.array.isRequired,
  dataRow: PropTypes.object.isRequired,
  setActiveRecord: PropTypes.func,
  locked: PropTypes.bool,
  dynamic: PropTypes.bool
};

function InfoTab(props) {
  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined;

  if (!props.hidden) {
    return /*#__PURE__*/React.createElement(lockedContext.Provider, {
      value: locked
    }, /*#__PURE__*/React.createElement("div", {
      className: 'InfoTab ' + props.tabID
    }, props.children));
  } else return null;
} //Proptypes

InfoTab.propTypes = {
  tabTitle: PropTypes.string.isRequired,
  tabID: PropTypes.string.isRequired
};

var css_248z$l = ".InfoTabContainer{\n\tbackground-color: var(--bodyAltBG);\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n}\n\n.InfoTabContainer .tab-content{\n\toverflow-y: auto;\n\tcolor: var(--mainTextColor);\n\twidth: 100%;\n\toverflow-x: hidden;\n\tmargin: 0;\n\tpadding: 0;\n\theight: calc(100% - var(--systemToolbarHeight) - 10px);\n}\n\n.InfoTabContainer .tab-pane{\n\tpadding: 0;\n\tmargin: 0;\n\toverflow: hidden;\n}\n\n.InfoTabContainer .nav-tabs{\n\tbackground-color: var(--navColor);\n\toverflow: hidden;\n\tborder: none;\n\tpadding-left: 0px;\n}\n\n.InfoTabContainer .nav-tabs a{\n\tpadding: 6px 30px;\n\tpadding-top: 0;\n\tbackground-color: var(--navColor);\n\tcolor: \tvar(--navTextColor);\n\tborder-top-right-radius: 9px;\n\tborder-top-left-radius: 9px;\n\toutline: none !important;\n\tborder: none;\n\tmargin-right: 8px;\n\tmargin-left: 8px;\n\ttext-align: center;\n\tfont-size: 14pt;\n\tbox-sizing: border-box;\n}\n\n.InfoTabContainer .nav-tabs a.active{\n\tbackground-color: var(--navColor);\n\tcolor: \tvar(--navTextColor);\n\t\n\ttext-shadow: 1px 0px 0px var(--navTextColor);\n\t\n\tborder-bottom-style: solid;\n\tborder-bottom-color: var(--navTextColor);\n\tborder-bottom-width: 6px;\n}\n\n.InfoTabContainer .nav-tabs a:hover{\n\tcolor:var(--navHoverColor);\n}\n\n.InfoTabContainer .nav-tabs a.active:hover{\n\ttext-shadow: 1px 0px 0px var(--navHoverColor);\n}\n\n\n.InfoTabContainer .InfoTab{\n\toverflow: hidden;\n\twidth: 100%;\n}\n\n/* InfoCard components styled differntly */\n.InfoTabContainer .InfoCard{\n\tpadding: 10px !important;\n}\n\n";
styleInject(css_248z$l);

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
    if (!child.props.hidden) {
      return /*#__PURE__*/React.createElement(Tab, {
        eventKey: child.props.tabID,
        title: child.props.tabTitle
      }, child);
    } else return null;
  }))));
} //Proptypes

InfoTabContainer.propTypes = {
  defaultTab: PropTypes.string,
  onTabChange: PropTypes.func,
  locked: PropTypes.bool
};

var css_248z$m = ".FilterMenu{\n\theight: 100%;\n\toverflow-x: hidden;\n\toverflow-y: auto;\n\tmax-height: inherit;\n\tposition: relative;\n}\n\n.FilterMenu .topMenu{\n\tposition: sticky;\n\ttop: 0px;\n\tmargin-top: 0 !important;\n\tz-index: 3;\n\tbackground-color: var(--cardBG);\n}\n\n.FilterMenu .selectAll{\n\tfont-weight: bold;\n}";
styleInject(css_248z$m);

function FilterMenu(props) {
  var values = props.header.uniqueValues;

  function clickHandler(e, id) {
    var cb = document.getElementById(id);

    if (e.target !== cb) {
      cb.checked = !cb.checked;
    } //using immer to modify the dataHeaders state without breaking immutability rules


    props.dataHeaders.set(produce(props.dataHeaders.get(), function (draftHeaders) {
      draftHeaders[props.header.index].uniqueValues[cb.value] = cb.checked;
    }));
    props.data.filter();
  }

  function selectAll(e) {
    var cb = document.getElementById(props.header.headerID + 'selectAll');

    if (e.target !== cb) {
      cb.checked = !cb.checked;
    } //using immer to modify the dataHeaders state without breaking immutability rules


    props.dataHeaders.set(produce(props.dataHeaders.get(), function (draftHeaders) {
      draftHeaders[props.header.index].selectAll(cb.checked);
    }));
    props.data.filter();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "FilterMenu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topMenu"
  }, props.children, /*#__PURE__*/React.createElement("button", {
    onClick: selectAll,
    className: "selectAll"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: !props.header.hasFilter(),
    id: props.header.headerID + 'selectAll',
    style: {
      cursor: 'pointer'
    }
  }), ' Select All')), /*#__PURE__*/React.createElement("div", {
    className: "filterOptions"
  }, Object.keys(values).map(function (v, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: props.header.id + 'fv' + i,
      onClick: function onClick(e) {
        return clickHandler(e, props.header.headerID + 'fcb' + i);
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      defaultChecked: values[v],
      id: props.header.headerID + 'fcb' + i,
      value: v,
      style: {
        cursor: 'pointer'
      }
    }), ' ' + v);
  })));
}

function TheadButton(props) {
  //Checks if the header has an active filter, to show a different icon
  var _useState = useState(props.noFilter ? 'sort' : 'filter'),
      _useState2 = _slicedToArray(_useState, 2),
      defaultTab = _useState2[0],
      setDefaultTab = _useState2[1]; //filter tab - if the correct props are available to enable filtering


  var filterMenu = null;
  filterMenu = /*#__PURE__*/React.createElement(InfoTab, {
    tabID: "filter",
    tabTitle: "Filter",
    hidden: props.noFilter
  }, /*#__PURE__*/React.createElement(FilterMenu, {
    dataHeaders: props.dataHeaders,
    header: props.header,
    data: props.data
  }, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faPlus
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      paddingLeft: '10px'
    }
  }, "More Filters")))); //Sort tab - if the correct props are available to enable sorting

  var sortMenu = /*#__PURE__*/React.createElement(InfoTab, {
    tabID: "sort",
    tabTitle: "Sort",
    hidden: props.noSort
  }, /*#__PURE__*/React.createElement("button", null, "Sort Test")); //Combine available tabs - if at least one is avilable

  var overallMenu = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoTabContainer, {
    defaultTab: defaultTab,
    onTabChange: function onTabChange(tabID) {
      setDefaultTab(tabID);
    }
  }, filterMenu, sortMenu)); //if there is a menu, add a dropdown icon

  var icon = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCaretDown
  });
  var iconClass = '';

  if (props.header.hasFilter()) {
    icon = /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faFilter
    });
    iconClass = 'smallerIcon';
  }

  if (props.noSort && props.noFilter) {
    return props.children;
  } else {
    return /*#__PURE__*/React.createElement(MenuButton, {
      className: "TheadButton",
      locked: false,
      menuContent: overallMenu,
      maxHeight: "50vh"
    }, props.children, /*#__PURE__*/React.createElement("span", {
      className: iconClass
    }, icon));
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

  return /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      return clickHandler(e, checkID);
    },
    style: {
      color: 'var(--mainTextColor'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: props.defaultChecked,
    id: checkID,
    value: props.value,
    style: {
      cursor: 'pointer'
    },
    disabled: props.disabled
  }), ' ', props.children);
}
CheckButton.propTypes = {
  defaultChecked: PropTypes.bool,
  value: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

function TableSettings(props) {
  function clickHandler(checked, idx) {
    props.setTransitionClass('noTransition');
    var reFilter = false;
    props.headers.set(produce(props.headers.get(), function (draftHeaders) {
      draftHeaders[idx].visible = checked;

      if (!checked && draftHeaders[idx].hasFilter()) {
        draftHeaders[idx].clearFilter();
        reFilter = true;
      }
    }));
    setTimeout(function () {
      if (reFilter) {
        props.data.filter();
      }

      props.setTransitionClass('');
    }, 0);
  }

  return /*#__PURE__*/React.createElement(MenuButton, {
    locked: false,
    menuContent: /*#__PURE__*/React.createElement("div", null, props.headers.get().map(function (h) {
      return /*#__PURE__*/React.createElement(CheckButton, {
        key: 'customizeHeader' + h.headerID,
        disabled: h.required,
        defaultChecked: h.visible,
        value: h.index,
        onClick: clickHandler
      }, h.displayName);
    }))
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faCog
  }), " Table Settings");
}

function TableControls(props) {
  var clearFilterButton = null;
  var sortButton = null;
  var filterButton = null;
  var settingsButton = null;
  var System = useSystem();

  if (props.hasFilter && !props.noFilter) {
    clearFilterButton = /*#__PURE__*/React.createElement("button", {
      onClick: props.clearFilter
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faTimesCircle
    }), " Clear Filter");
  }

  if (!props.noFilter) {
    filterButton = /*#__PURE__*/React.createElement(MenuButton, {
      menuContent: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MenuButton, {
        menuContent: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", null, "Outstanding Tasks"), /*#__PURE__*/React.createElement("button", null, "Assigned To Me"), /*#__PURE__*/React.createElement("button", null, "Due Soon"))
      }, "Saved Filters"), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          System.openPopup( /*#__PURE__*/React.createElement(Popup, {
            title: "Save Filter"
          }, /*#__PURE__*/React.createElement("label", null, "Filter Name: "), /*#__PURE__*/React.createElement(TextBox, null), /*#__PURE__*/React.createElement(FreeButton, {
            onClick: function onClick() {
              System.closePopup();
            }
          }, "Save")));
        }
      }, "Save Current Filter"))
    }, /*#__PURE__*/React.createElement("span", {
      className: "smallIcon"
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faFilter
    })), " Filter");
  }

  if (!props.noSort) {
    sortButton = /*#__PURE__*/React.createElement(MenuButton, {
      menuContent: /*#__PURE__*/React.createElement(MenuButton, {
        menuContent: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", null, "test2"), /*#__PURE__*/React.createElement("button", null, "test2"), /*#__PURE__*/React.createElement("button", null, "test2"))
      }, "test")
    }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
      icon: faSortAmountUp
    }), " Sort");
  }

  if (!props.noOptions) {
    settingsButton = /*#__PURE__*/React.createElement(TableSettings, {
      headers: props.dataHeaders,
      data: props.data,
      setTransitionClass: props.setTransitionClass
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "tableControls"
  }, settingsButton, sortButton, filterButton, clearFilterButton);
}

function MainTable(props) {
  //Sorting and filtering are optional (via props), only supported with if a dataset is provided
  var noSort = props.noSort;
  var noFilter = props.noFilter;
  var noOptions = props.noOptions; //support for dataSets or for just arrays

  var data = props.data;

  if (!Array.isArray(props.data)) {
    data = data.read();
  } else {
    noSort = true;
    noFilter = true;
  } //For dataSets - runs when dataSet refreshes (sets the filter options to match)


  useEffect(function () {
    if (!noFilter) {
      props.dataHeaders.embedData(data);
      props.data.setHeaders(props.dataHeaders);
    }
  }, [props.data.lastResolved]); //Active page handling

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      activePage = _useState2[0],
      setActivePage = _useState2[1]; //get the length of the data with teh filter applied


  var dataLength = 0;
  data.forEach(function (r) {
    if (r.TouchPointMetaVisible) {
      dataLength = dataLength + 1;
    }
  }); //if there's no way to set the active record, then no record is active

  var activeRecord;

  if (props.activeRecord && props.setActiveRecord) {
    activeRecord = props.activeRecord;
  } //default page Size


  var pageSize = props.pageSize;

  if (!pageSize) {
    pageSize = 500;
  } //deccides if the component is locked based on props and parents in the tree


  var lockedFromAbove = useContext(lockedContext);
  var locked = props.locked || lockedFromAbove && props.locked === undefined; //If clicking sets the active record then its animated
  //if there are editable cells the animations will be cancelled

  var dynamic;

  if (props.setActiveRecord) {
    dynamic = true;
  } //Normalize column widths to ensure they always add up to 100%


  var hasFilter = false;
  props.dataHeaders.get().forEach(function (hdr) {
    //if you have input cells in the table, hover effects will be cancelled
    if (hdr.onEdit) {
      dynamic = false;
    } //check if any headers have active filters (to show a clear filter button)


    if (hdr.hasFilter()) {
      hasFilter = true;
    }
  }); //access the parent module context for searching 

  var moduleData = useContext(moduleContext);
  var searchText;

  if (props.searchable) {
    searchText = moduleData.searchText;
  } //Counter for rendered rows


  var i = 1; //Buttons for page controls

  function pageForward() {
    if (activePage < Math.floor(dataLength / pageSize) - 1) {
      setActivePage(activePage + 1);
    }

    i = 1;
  }

  function BackButton() {
    if (activePage > 0) {
      return /*#__PURE__*/React.createElement("button", {
        onClick: pageBack
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faCaretLeft
      }));
    } else return null;
  }

  function pageBack() {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }

    i = 1;
  }

  function ForwardButton() {
    if (activePage < Math.floor(dataLength / pageSize) - 1) {
      return /*#__PURE__*/React.createElement("button", {
        onClick: pageForward
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faCaretRight
      }));
    } else return null;
  }

  function clearFilter() {
    props.dataHeaders.set(produce(props.dataHeaders.get(), function (draft) {
      draft.forEach(function (hdr) {
        hdr.clearFilter();
      });
    }));
    props.data.filter();
  }

  function PageControls() {
    if (dataLength > pageSize) {
      return /*#__PURE__*/React.createElement("div", {
        className: "pageControls"
      }, /*#__PURE__*/React.createElement(BackButton, null), /*#__PURE__*/React.createElement("button", {
        className: "textButton"
      }, "Showing ", 1 + activePage * pageSize, "-", Math.min((1 + activePage) * pageSize, dataLength) + ' ', "of ", "  ".concat(dataLength)), /*#__PURE__*/React.createElement(ForwardButton, null));
    } else return null;
  }

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      transitionClass = _useState4[0],
      setTransitionClass = _useState4[1]; //Render


  return /*#__PURE__*/React.createElement("div", {
    className: "MainTable " + transitionClass
  }, /*#__PURE__*/React.createElement("div", {
    className: "titleBar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topBar"
  }, /*#__PURE__*/React.createElement(TableControls, {
    hasFilter: hasFilter,
    noFilter: noFilter,
    noSort: noSort,
    clearFilter: clearFilter,
    noOptions: noOptions,
    dataHeaders: props.dataHeaders,
    data: props.data,
    setTransitionClass: setTransitionClass
  }), /*#__PURE__*/React.createElement(PageControls, null)), /*#__PURE__*/React.createElement("div", {
    className: "theadBar"
  }, props.dataHeaders.get().map(function (hdr) {
    if (hdr.visible) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          width: hdr.width + '%'
        },
        key: 'header' + hdr.headerID
      }, /*#__PURE__*/React.createElement(TheadButton, {
        header: hdr,
        data: props.data,
        dataHeaders: props.dataHeaders,
        noFilter: noFilter,
        noSort: noSort
      }, hdr.displayName + ' '));
    } else return null;
  }))), /*#__PURE__*/React.createElement("div", {
    className: 'tableBody ' + props.data.lastResolved
  }, data.map(function (dr) {
    //render the allowed numebr of rows, on th selected page
    if (i > activePage * pageSize && i <= (1 + activePage) * pageSize) {
      var r = /*#__PURE__*/React.createElement(MainTableRow, {
        dataRow: dr,
        dataHeaders: props.dataHeaders.get(),
        setActiveRecord: props.setActiveRecord,
        activeRecord: activeRecord,
        rowKey: 'MainTableRow' + i,
        key: 'MainTableRow' + i,
        locked: locked,
        dynamic: dynamic,
        searchText: searchText,
        noFilter: noFilter
      });

      if (r) {
        i++;
      } //Count the number of rows actually renedered (not filtered out)


      return r;
    } else if (i <= (1 + activePage) * pageSize) {
      i++;
    }

    return null;
  })));
} //Proptypes

MainTable.propTypes = {
  setActiveRecord: PropTypes.func,
  onEdit: PropTypes.func,
  dataHeaders: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  pageSize: PropTypes.number,
  locked: PropTypes.bool,
  searchable: PropTypes.bool,
  noSort: PropTypes.bool,
  noFilter: PropTypes.bool,
  noOptions: PropTypes.bool
};

var css_248z$n = ".Module{\n\twidth:100%;\n\theight: 100%;\n\toverflow: hidden;\n\tbackground-color: var(--bodyAltBG);\n\tposition: relative;\n}";
styleInject(css_248z$n);

function Module(props) {
  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1];

  var moduleData = {
    searchText: searchText,
    setSearchText: setSearchText
  };
  return /*#__PURE__*/React.createElement(moduleContext.Provider, {
    value: moduleData
  }, /*#__PURE__*/React.createElement("div", {
    className: 'Module ' + props.moduleName
  }, props.children));
} //Proptypes

Module.propTypes = {
  moduleName: PropTypes.string
};

var css_248z$o = ".SplitScreen{\n\theight: 100%;\n\tdisplay: flex;\n\twidth: 100%;\n\tbackground-color: transparent;\n\tposition: fixed;\n\tpointer-events: none;\n\tz-index: 1;\n\tbox-sizing: border-box;\n\tbottom: 0;\n}\n\n.SplitScreen .topView{\n\tbackground-color: transparent;\n\tpointer-events: none;\n}\n\n.SplitScreen .bottomView{\n\tbox-sizing: border-box;\n\twidth: 100%;\n\theight: 100%;\n\toverflow-y: auto;\n\tbackground-color: var(--bodyAltBG);\n\tcolor: var(--mainTextColor);\n\tpointer-events: all;\n}\n\n.SplitScreen .gutter{\n\twidth: 100vw;\n\tbackground-color: var(--navColor);\n\tcursor: n-resize;\n\tpointer-events: all;\n\ttransition: all 100ms;\n}\n\n/* InfoCard components styled differntly */\n.SplitScreen .InfoCard{\n\tpadding: 10px !important;\n}\n\n.SplitScreen .MainTable{\n\tpadding-bottom: 0;\n}";
styleInject(css_248z$o);

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
    minSize: 150,
    gutterSize: 8,
    snapOffset: 1
  }, /*#__PURE__*/React.createElement("div", {
    className: "topView"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bottomView"
  }, props.children)));
} //Proptypes

SplitScreen.propTypes = {
  defaultSize: PropTypes.number
};

var DataType = /*#__PURE__*/function () {
  function DataType(kind, options) {
    _classCallCheck(this, DataType);

    if (kind) {
      this.kind = kind.toLowerCase();
    } else {
      this.kind = 'string';
    }

    this.options = options;
  } //checks if an input is valid for the datatype


  _createClass(DataType, [{
    key: "validate",
    value: function validate(input) {
      switch (this.kind) {
        case 'string':
          return true;

        case 'number':
          try {
            parseFloat(input);
            return true;
          } catch (err) {
            return false;
          }

        case 'list':
          if (this.options.includes.listValues(input)) {
            return true;
          } else {
            return false;
          }

        case 'custom':
          //This needs so much work...
          if (this.options.validator(input)) {
            return true;
          } else {
            return false;
          }

      } //if its not a valid type then ignore validation and just return true


      return true;
    } //Compares a value an search string to see if the value should be included in the search

  }, {
    key: "search",
    value: function search(value, searchText) {
      switch (this.kind) {
        case 'string':
          if (typeof value === 'string') {
            value = value.toLowerCase();
            return value.includes(searchText.toLowerCase());
          } else {
            return false;
          }

      } //if its not a vald type just return false until i deccide how to handle this better


      return false;
    }
  }]);

  return DataType;
}();

var DataHeader = /*#__PURE__*/function () {
  function DataHeader(options) {
    var _this = this;

    _classCallCheck(this, DataHeader);

    this.headerID = options.headerID;
    this.displayName = options.displayName;
    this.width = options.width ? options.width : 10;
    this.required = options.required ? options.required : false;
    this.visible = !options.visible === undefined ? options.visible : true;
    this.index = options.index;
    this.onEdit = options.onEdit ? options.onEdit : null;
    this.locked = options.locked ? options.locked : false;
    this.dataType = options.dataType ? options.dataType : new DataType('string');
    this.styling = options.styling ? options.styling : null;
    this.uniqueValues = {}; //Default filter list only has 1 functions (array filter)
    //By default no values are selected, which is the same as saying 'select all'

    this.filterList = {
      arrayFilter: {
        func: function func(cellValue) {
          return _this.uniqueValues[cellValue] || _this.uniqueValues[cellValue] === undefined;
        },
        displayName: 'Array Filter'
      }
    };
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
    value: function addFilter(filterID, filterFunction, displayName) {
      this.filterList[filterID] = {
        func: filterFunction,
        displayName: displayName,
        id: filterID
      };
    }
  }, {
    key: "removeFilter",
    value: function removeFilter(filterID) {
      delete this.filterList[filterID];
    } //Saves a list of unique values in the column - to be used in the filter dropdowns

  }, {
    key: "embedData",
    value: function embedData(data) {
      this.uniqueValues = uniqueByColumn(data, this.headerID, this.uniqueValues);
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
  }, {
    key: "setVisible",
    value: function setVisible(bool) {
      this.visible = bool;
    }
  }]);

  return DataHeader;
}(); //Returns an array of unique values from a column of DataRow objects

function uniqueByColumn(data, columnID, oldValues) {
  var res = {};
  data.forEach(function (r) {
    if (r.TouchPointMetaVisible || r.TouchPointMetaFilteredBy === columnID + ';') {
      //New vales added as true, old values keep their value
      if (oldValues[r[columnID]] === undefined) {
        res[r[columnID]] = true;
      } else {
        res[r[columnID]] = oldValues[r[columnID]];
      }
    }
  });
  return res;
}

function useDataset(fetchFunction) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [{}];

  //The array contains an empty object by default
  var _useState = useState(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      first = _useState4[0],
      setFirst = _useState4[1];

  var _useState5 = useState('Pending'),
      _useState6 = _slicedToArray(_useState5, 2),
      status = _useState6[0],
      setStatus = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      rejection = _useState8[0],
      setRejection = _useState8[1];

  var _useState9 = useState(),
      _useState10 = _slicedToArray(_useState9, 2),
      lastResolved = _useState10[0],
      setLastResolved = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      lastRejected = _useState12[0],
      setLastRejected = _useState12[1];

  var _useState13 = useState({
    get: function get() {
      return [];
    }
  }),
      _useState14 = _slicedToArray(_useState13, 2),
      headers = _useState14[0],
      setHeaders = _useState14[1]; //Filters the data based on given headers


  function filterData(values) {
    //Apply the filters to the data (define what rows are visible)
    return produce(values, function (draftValues) {
      draftValues.map(function (r) {
        r.TouchPointMetaFilteredBy = '';
        var noRender = false;
        headers.get().forEach(function (h) {
          if (!h.filter(r[h.headerID], r)) {
            noRender = true;
            r.TouchPointMetaFilteredBy = r.TouchPointMetaFilteredBy + [h.headerID] + ';';
          }
        });
        r.TouchPointMetaVisible = !noRender;
        return r;
      });
    });
  } //Fetch data and update state once the operation is complete. Keep the old value in the meantime


  function fetchData() {
    return _fetchData.apply(this, arguments);
  } //Automatically run the fetching function the first time, then wait for a refresh


  function _fetchData() {
    _fetchData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res, value;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setStatus('Pending');
              res = fetchFunction();
              _context.prev = 2;
              _context.t0 = filterData;
              _context.next = 6;
              return res;

            case 6:
              _context.t1 = _context.sent;
              value = (0, _context.t0)(_context.t1);
              setData(value);
              setStatus('Resolved');
              setRejection(null);
              setLastResolved(Date());
              return _context.abrupt("return", status);

            case 15:
              _context.prev = 15;
              _context.t2 = _context["catch"](2);
              setStatus('Rejected');
              setRejection(_context.t2);
              setLastRejected(Date());
              return _context.abrupt("return", status);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 15]]);
    }));
    return _fetchData.apply(this, arguments);
  }

  if (first) {
    setFirst(false);
    fetchData();
  } //Return a Dataset object


  return {
    read: function read() {
      return data;
    },
    refresh: function refresh() {
      if (status !== 'Pending') {
        fetchData();
      }
    },
    set: function set(val) {
      setData(val);
    },
    status: status,
    rejection: rejection,
    lastResolved: lastResolved,
    lastRejected: lastRejected,
    setHeaders: setHeaders,
    isDataset: true,
    filter: function filter() {
      var newData = filterData(data);
      setData(newData);
      headers.embedData(newData);
    }
  };
}

function useHeaders() {
  var dataHeaders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  function normalize(headerArray) {
    var totalWidth = 0;
    headerArray.forEach(function (hdr) {
      if (hdr.visible) {
        totalWidth = totalWidth + hdr.width;
      }
    });
    return headerArray.map(function (hdr, i) {
      hdr.width = 99 * (hdr.width / totalWidth);
      hdr.index = i;
      return hdr;
    });
  } //Saves a list of unique values in each column (header) - to be used in the filter dropdowns


  function embedData(data) {
    //using Immer to edit the header state while keeping it immutable
    setHeaders(produce(headers, function (draft) {
      draft.map(function (hdr) {
        hdr.embedData(data);
      });
    }));
  }

  var _useState = useState(normalize(dataHeaders.map(function (hdr) {
    return new DataHeader(hdr);
  }))),
      _useState2 = _slicedToArray(_useState, 2),
      headers = _useState2[0],
      setHeaders = _useState2[1];

  return {
    get: function get() {
      return headers;
    },
    set: function set(val) {
      setHeaders(normalize(val));
    },
    embedData: embedData
  };
}

export { AppFooter, AppToolbar, CheckBox, CloseButton, ComboBox, CommentBox, ControlBar, ControlButton, CoreButton, DataHeader, DataType, FreeButton, InfoCard, InfoTab, InfoTabContainer, MainTable, MenuButton, Module, Popup, RadioButton, RadioGroup, SearchBar, SplitScreen, TextBox, Tile, TouchPointApp, useDataset, useHeaders, useSystem };
//# sourceMappingURL=index.js.map
