TouchPoint UI Documentation

TouchPoint UI is a front end development framework built on top of React. It is designed for building modular, expandable apps. The idea is that any app wide functionality is implemented once, and maintained by the app developer, and others can develop modules that then run inside of the app. Module developers and app developers are able to work almost completely independently, giving module developers the freedom to customize their modules, while ensuring a consistent UI and user experience across the app (and across all TouchPoint apps).


System Components
One-Off components that are the building blocks of the app. These are not used in development of modules.

TouchPointApp
The top-level container for the application. All app modules are rendered inside of the App component. 

The App component includes the system-wide UI components that are always present - SystemToolbar, SystemModuleContainer, SystemPopupHandler, SystemFooter.

The App component also handles rendering the correct module. It also handles system level popups, any popups that are not dependent on the active module (eg. theme selection). This is done through the SystemPopupHandler component. 

Props:
modules (object - required) a list of modules
homeModule (string - default ‘LockScreen’) - The module that acts as the home screen of your app. 
activeUser (string)
locked - locks everything in the app that isn’t explicitly unlocked (excludes filter and search features, but does not allow access to search results that 
io (anything) - see io section below

	The io prop
The io object can contain any functions or values, like a mini-library that app developers can make available to all modules in the app. It can be accessed anywhere inside the TouchPoint app by using System.io (see useSystem Hook below for more on this). It’s essentially an app-wide context provider that is very easy to access using a TouchPoint hook.

The io object allows app developers to extend the built in library of TouchPoint, and provides an easy way to create app-wide state and allow modules to interact with it easily. 

This lets states such as active user, authentication, notifications, security profile, permissions, etc. be customised by the app developer, so you are not tied to a specific implementation of one or the other. 

For example, in DMS, there are security profiles that allow you to ‘become’ another user temporarily, and do things on their behalf. While this exact feature is not built into TouchPoint UI, you can easily add it by creating a securityProfile state object, and putting get and set functions in the io object. You can also wrap these get and set function in any logic to check the validity of the request (eg. send a request to the server to verify the person is allowed to apply a given security profile).

The available functions of the io object should be included in the app documentation.

Note - For any app-wide functions you want to create that don’t interact with app-wide state, you can create a library and allow module developers to import and use it, or still add them to the io object, whichever suits your needs better. 


SystemToolbar, SystemFooter
The toolbar at the top and bottom of the page (contains the home button, file, settings... menus). This is standard across the app, and is always visible. 

SystemModuleContainer
The area where the active module is rendered. 
Selects what module to render depending on the ‘activeModule’ system state.
Modules must be added to the Switch to be available to render. 
All overflow is hidden, and the size is fixed. If scrolling is required you must create a scrollable section inside the module. 

SystemThemeEngine
Handles the theming for the app. This is used by the system object when dealing with themes, so modules shouldn’t interact with the theme engine directly. Has the following methods: 
getUserTheme(userName): if the user has selected a theme in the past, it will load that theme. If they haven’t it will load the default theme. 
setTheme(theme, userName): activates the theme and sets it as the user’s preference for the future


DataObjects
	
DataHeader
Defines a data field, typically tied to a field header in the database, but can also be a header for any data type, including sub-tables, functions, or other objects. 

Constructor Properties:
headerID (String): unique string identifying the header. Typically the same as the database field header.
displayName (String): the column title to be displayed in a table or label. 
required (boolean - default false): if true, the column will always be displayed in a table, and cannot be toggled on/off.
width (int - required): width of the column, as a % of the title bar. 
styling - (function - optional): A function that takes 2 parameters (cell value and the dataRow object) and returns a styling object in the format:
{badgeColor: “colorValue”,
textColor: “colorValue”} 
Where “colorValue” is a css color string. The styling will be applied to the cell. You can base styling based on just the cell value, or the whole row. For example, compare 2 values and make the greater one red. 
dataType (String - default ‘string’): Used to determine available filter types, display options, etc. Must be a dataType object (see data objects above)
onEdit (function - default none): lets the user edit the values in the column, and fires this function when they commit changes (either click out of the textbox - like an onBlur event, or click enter). If they click esc the cell value will reset, and this function will not be called. onEdit receives one parameter - the dataRow in it’s new updated state. Input validation is done before firing this function. It’s not fired if the validation is not passed.
locked - prevents any edits (only useful if the table had edit  functionality)
visible (boolean, default true)

Methods (mostly for internal use by TPUI components):
filter (function - optional): A function that accepts 2 arguments (the cell value, and the dataRow object) and returns true or false. If false, the row will not be rendered. 
addFilter(filterID, filterFunction, displayName) - adds a filter function to the header. 
filterID - a unique identifier. Must be a valid JS object prop name. This will be used to remove the filter later by calling removeFilter(filterID). Note that if you use a filterID that already exists, the existing one will be deleted and replaced by the new one
filterFunction - any function that takes 2 arguments (the cell value and the whole data row) and returns true if the filter passes, false if not. The DataRow argument is optional, it’s only used if you want to filter by comparing a value to its neighbors. 
displayName -  any string that will appear in the filter GUI
removeFilter(filterID) - removes a filter with the given filterID
getFilters( ) - returns an array of filters, each the following format: {func: the filter function, displayName: the GUI name, ID: the filterID, data: Any data that the filter needs to store}. This should be immutable, and never edited. 
setVisible(bool)
clearFilter()

	DataRow
DataRow is not a class, it’s just a standard format that all module data should be stored in. An object containing key value pairs for each headerID and cell value. Each key value must have a DataHeader object with a matching headerID
{HeaderID: cellValue, HeaderID: cellValue}

The following properties are appended to each DataRow when it’s included inside a Dataset (see useDataset below):
TouchPointMetaVisible - used to tell what rows have been filtered out. 
TouchPointMetaFilteredBy - shows what header/s have the filter on that made this row invisible. Used by the headers to know what values to show in the filter menu. 

DataType
Defines a data type for a table column. Used for data validation for inputs, and to determine what filters to use

Properties:
kind (string - required): determines the data type
string
Number
date
list
custom
Options (object - default varies): some types have options available 

Available options for:
String
maxLength
minLength
list
listValues (array): list of acceptable values
caseSensitive (boolean) 
custom
Validator (function): a function that accepts an input, and returns true if it is valid, and false if it is not

DataType.filterMenu - this is a functional component built into a DataType object. It’s used by TouchPoint table components to create the filter menus. 
It receives the dataHeaders array from the table, as well as the setDataHeaders state function, and the data in the table. It returns a menu component (used with a MenuButton in the table) which the user can interact with to filter the table.

DataType.filterMenu props (mostly for internal TPUI use):
header (a single DataHeader object - 


Creating a Module
You can create a module as a component and save it in the folder ‘src > Modules > {ModuleName}’

To add your module to DMS, you must first add it to the ‘SystemModuleContainer’ so it can be rendered. This can be done by adding a property to the object tree in the SystemModuleContainer component (found in src > SystemComponents).

TouchPoint Hooks

useSystem( )
The system object provides a way of accessing and interacting with the global app state.
It can be accessed from within any module using the useSystem hook:

import {useSystem} from 'src/TouchPointHooks'
const system = useSystem() //Create the system object
console.log(system.getActiveUser() ) 
//Expected output: ‘FAHMYY’ or whoever is logged in

The system object has the following methods:
getActiveModule( ): returns the name of the active module
getActiveUser( ): returns the name of the active user (not security profile)
getSecurityProfile( ): returns the active security profile
getAvailableProfiles( ): returns the list of available security profiles to the active user
getVersion( ): returns the version of DMS currently running in the format {number: ‘0.1’, environment: ‘Kinectrics QA’}
setSecurityProfile(profile): sets the security profile to the given profile
openModule(module, initialState): opens the given module, and passes the initialState prop. The initialState prop is used differently from module to module
customizeTable(dataHeaders): takes in an array of DataHeader objects, and opens a GUI for the user to select what columns are displayed and their order. Returns the updated array of dataHeaders.
openPopup(PopupComponent): renders the given component in the center of the screen as a popup
closePopup(): closes the active popup (if any
disableInput(forTime): app will ignore all clicks for a given number of ms. If no value is passed (or if it’s 0), then clicks will be disabled indefinitely until system.enableInput() is called
enableInput(): cancels the effects of disableInput and allows clicks to happen again
io: allows access to the io mini-library. This is an object defined by the developers of an app, that they make available to all modules in the app. This exists in case modules need a way to interact with state that the app developers have defined (for example - changing the active security profile state)

useDataset
This hook is used to fetch and store data from a record. It returns a DataSet object, which can be passed directly to a MainTable component to render the data, or to read the stored data. data at any time. The method Dataset.refresh() method will fetch new data from the server, and update the stored data inside. 

useDataset takes one parameter - the function you use to fetch the data. This can return either the data directly (as an array of DataRow objects) or a Promise of the data. This is where you would make any API calls or queries required to fetch the data. 

Params:
fetchFunction
defaultValue - the value to hold while the promise is pending

It returns a DataSet object with the following properties:
read( ) - a function that returns the data array inside as a state object. The returned value will remain up to date if the data is refreshed or changed, so components using the data will always have the most up to date value available. 
set( ) - replace the data with your own value. Note that any changes will be erased on the next refresh( ) call.
refresh( ) -  fetches the data again. This will cause any components using the read( ) value to re-render with the new value. Returns the status of the operation (resolved/rejected)
status - the status of the data. Can either be pending, resolved or rejected. If the status is pending or rejected, read( ) will return the latest available data from the last successful fetch attempt. By default, it is an empty array.
rejection - if a fetch operation returns a Promise that rejects, the rejection reason will be stored here. 
lastResolved - a JS Date object that represents the last successful refresh
lastRejected - a JS Date object 
isDataSet - is a value = to true. Just used to identify a dataset since it has no class/constructor.

Note: Since the data is set asynchronously, the first time your component renders it will receive the default data value (you can set this, but if you don’t it will be [{ }] )
This may cause unexpected behaviour if the initial state is not set correctly. 
#TODO add an example of deeply nested object props. 

useHeaders( [ ...DataHeaders] )
This hook takes in an array of DataHeader objects, and creates a set of headers for use with a table. The returned is passed to a MainTable component (through the dataHeaders prop). This will tell it what the columns should look like, and to enable features like filtering and customizing the table. 

The returned set of headers have the following methods. These are mostly used internally by table components, so you shouldn’t need to use them outside of some very specific needs (or if you’re making a custom table component or something):
get( ) -  returns the array of DataHeaders in the set. Note that this is an immutable array and should be treated as read-only, or React will cry. 
set([...DataHeaders] ) - replaces the current array of headers with a given array. If you need to mutate the array, you can grab it using get( ), change it, then replace it with set( ). 




Component PropTypes
Components use PropTypes to help identify what props are supported Using the React Proptypes Intellisense extension for VSCode is recommended - https://marketplace.visualstudio.com/items?itemName=OfHumanBondage.react-proptypes-intellisense


TouchPoint Components - Containers
Components that hold children. Containers all support ‘hidden’ and ‘locked’ props that can be used to manage permissions. These props cascade down to all children that also support locking, no matter how nested. This means that if a container is locked, all lockable components (nested containers, buttons, inputs etc.) are all locked. 

Module
This should be the top-level container for all modules.
This is a simple div with a className of the module name for styling. 
Correctly places the module inside the container and handles the module-level permissions. Also provides access to the system context (see above)

moduleName (string - required): The name of the module, and the className of the top-level div for styling purposes
locked
hidden - causes it not to appear in the module switcher or lock screen

SplitScreen
Adds a height-adjustable section to the bottom of the module. 
SplitScreenTab components as children and creates a tab for each one. 
Inside the SplitScreenTabs you can put anything you like. 

Props:
defaultSize (Integer, percent value between 1-100): the default size of the splitscreen when it first renders.

InfoTabContainer
Create a tab group that fills its container (typically used along with SplitScreen to create tabs at the bottom of the screen)
Takes InfoTabs as children
The defaultTab prop sets the tab that opens on load. Must match the tabID of a child

Accepts props:
locked
onTabChange (function - default none): a function that runs when a tab is changed. Can accept 2 arguments, the tabID, and the locked status of the tab.
	
InfoTab
Creates a tab inside of an InfoTabContainer. 

Props:
tabTitle (String - required): the display title of the tab
tabID (String - required): the tab name for identification purposes. Must be a valid html class name, and must be unique to the tab within its group.
locked
hidden


InfoCard
A blank card that renders all children inside of a div with class “.cardBody” 
Supports ‘onClick’ events that are called when clicking the card (see InfoCard guidelines for more on click events)
By default, the width will fill its container, and the height will grow to fit the content. 
You can set the width and height using props. 

The following options can be passed as props:
stripe (true/false - default false): Adds a stripe down the left side of the card. Cannot be used at the same time as TitleBar. TitleBar will be prioritized
title (string default blank): the title...
dynamicX (true/false - default false): Makes the card reactive to hovers and clicks in the x direction
dynamicY (true/false - default false): Makes the card reactive to hovers and clicks in the y direction
locked (true/false - default false): All children components will be locked in read only mode
hidden (true/false - default false): container and all children will not be rendered at all
onClick (function - default None) - callback function triggered when the card is clicked
width (string - default auto): any valid css string for width (eg: ‘500px’ or ‘50%’)
height (string - default auto): any valid css string for height (eg: ‘500px’ or ‘50%’)
className: adds a className to the component (used when creating custom components that incorporate an infocard)
onClose (function) adds a closebutton to the card, and applies the given function to it

InfoCard Style Guidelines: 
Use h2 tags for titles inside the card
Use label tags for labels/field names
Use p tags (or no tags) for all body text inside the card
If clicking the card itself does something, use the ‘dynamic’ effect. Inversely, do not use the ‘dynamicX’ and ‘dynamicY’ effects unless clicking the card does something. 



TouchPoint Components - Inputs
Components that take some kind of input from the user. These support ‘hidden’ and ‘locked’ props. Hidden Inputs will not appear at all. Locked Inputs will be read-only, and will be styled differently to show their locked status. 

ComboBox
Dropdown menu for selecting from a preset option list. Supports ‘locked’ and ‘hidden’ props. If locked it will be locked to the default output, and styled accordingly.

Takes <option> elements as children

The following options can be passed as props:
locked (true/false - default false): locked to the default option
hidden (true/false - default false): will not be rendered at all
onChange (function - default None): callback function to be triggered when the menu item is changed
defaultValue (string - default None): the initial value of the box



TextBox
A simple text box, similar to an <input> but with support for permissions. 

The following options can be passed as props:
locked (true/false - default false): locked to the default option
hidden (true/false - default false): will not be rendered at all
onChange (function - default None): callback function to be triggered when the menu item is changed
defaultValue (string - default None): the initial value of the box

CommentBox
A textbox for large amounts of text (multiple lines)

Props:
width: any valid css string for width
height: any valid css for height (eg. ‘10%’ or ‘100 px’)
defaultValue
onChange={changeHandler}
readOnly={locked}
onEsc
Placeholder
onBlur event handler

CheckBox
A simple check box, similar to an <input:checkbox> but with support for permissions. 

The following options can be passed as props:
locked (true/false - default false): locked to the default option
hidden (true/false - default false): will not be rendered at all
onChange (function - default None): callback function to be triggered when the menu item is changed
defaultValue (boolean - default None): the initial value (true = checked)
onEnter (function - default None): event to execute on enter key. Passes a single parameter to the function - the event object. (Tip: you can get the value of the textbox using event.target.value)
placeholder (String - default None): the alt text/ghost text in the textbox

RadioButton
A simple Radio Button, when wrapped in a RadioGroup component creates a radio button group. 
Use the RadioGroup to handle onChange events, and edit permissions.

Props
labelValue (string) - the text to display next to the radio button. This is for display only, and does not affect any functionality
value (any) - the value attached to the button. When selected, this value will be passed to the onChange function (defined in the radioGroup)

RadioGroup
A wrapper for RadioButtons. This is simply a context provider, event handler and permissions handler. It does not render any actual elements to the DOM. This means you can use this component anywhere, and it will not affect your styling/layout. 
Any RadioButtons inside this group will be bound together, so only one can be selected. When the selected button changes, the onChange function of this component will fire with one parameter (the selected value of the radiobutton)

Props:
onChange(function) - fires when any radio button in the group is selected. Receives on parameter, the selected value
defaultValue (any) -  the default selected radio button. Should match with the ‘value’ prop of one of the buttons in the group.
locked

SearchBar 
A textBox with some additional styling, and a ‘search’ button inside. Supports permissions, and enter to search.

Supports Props:
Any props supported by the TextBox component, except onEnter and placeholder, which are predefined.
onSearch (function - default None): Event handler for the search button. The SearchBar will pass 2 parameters to this function - the click event object, and the content of the search bar. 

CoreButton
Plain button with no styling. Supports permissions. All other button components are based off of this ControlButton component. Do not use CoreButtons unless you are creating a custom button component. Use one of the button components below. All are identical in functionality, and only differ in style. 
Recommended text and FontAwesome icons as children, but can support any children supported by HTML buttons. 

Supports Props:
locked (true/false - default false): locked to the default option
hidden (true/false - default false): will not be rendered at all
onClick (function - default None): callback function to be triggered when the button is clicked
className (string: default None): classnames to add to the button. Only used if you are creating custom button components

ControlBar
The top control bar of every module. Takes ControlButton components as children (see Components-Inputs section for more on ControlButtons)

Supports the following props:
searchBar (Boolean - default False): adds a SearchBar component (see components-inputs section) to the controlbar
searchBarProps (object - see SearchBar for defaults): Props to be passed to the search bar component. Format: {propName: value, propName: Value}. See SearchBar in Components-Inputs section for available SearchBar props.
locked (boolean - default false): locks all buttons and searchBar if there is one.



ControlButton
A button for the ControlBar component. Based on CoreButton and supports all CoreButton props.

FreeButton
A freestanding button for use anywhere in a module. Based on ControlButton.  
Supports all CoreButton props, as well as:
purpose (string - default ‘general’): used to determine the styling of the button. Can be any of the following:
‘neutral’ - For things like refresh, or any general purpose
‘positive’ - for things like submit or save
‘negative’ - for things like cancel or delete

Reusable Components - Display
Components used to display data.

MainTable
This the main table at the top of most modules. Handles applying filters, conditional formatting, and displaying the data. Clicking a row will set the active record and fire an optional callback function.

If you area allowing users to type data directly into the table, do not make it dynamic

Fun fact: MainTable actually isn’t a real table. It’s made of divs and spans.

Supports the following props:
setActiveRecord (set state function - default none): the set function for the active record state
activeRecord (state variable): the active record state variable
tableHeaders: (Array - required): An array of DataHeader objects (see Objects section). Each one will be a column in the table. These must be stored in a state object
setTableHeaders: (function - optional) if you want the table to be filterable, it needs to be able to change its headers. 
data (Dataset object - required): This can either be an array of DataRow objects for the body of the table, or a DataSet object (created using the useDataSet hook - covered above)
pageSize (int - default 500): the number of rows to display on each page
Searchable (boolean - default true): determines if the table responds to module wide search. It will be filtered as you type in the searchBar.
noSort
noFilter
noOptions -  removes the settings button and doesn’t allow any customization

MainTable components will only have sort and filter capability if you provide a Dataset, and not just an array. If you have your data in an array, buut want sort and filter functionality, you can convert it to a dataset by calling useDataset and then providing a function that returns your array. See example:

const someDataHeaders= useHeaders([
   new DataHeader('id','ID',20),
   new DataHeader('name','Employee Name',70),
   new DataHeader('position','Employee Position',60)
])
 
const myArray = [
   {id: 'row1', name: 'Youssof Fahmy', position: 'Developer'},
   {id: 'row2', name: 'Clara Birch', position: 'Programmer'},
   {id: 'row3', name: 'Claire Del Fatti', position: 'Analyst'}
]
 
myDataset = useDataset( ()=>{return myArray} ) 
 
<MainTable
   data = {myDataset}
   dataHeaders = {someDataHeaders}
/>


Note : #TODO needs a note about nested table data here. useEffect etc. See LAMP demo 1 for an example

Popup
A container for popup components. When active, a popup will blur everything in the background. You can render anything inside as children.

To create a popup, create a component (TestPopup in this example). Wrap the whole component in a Popup (Containers > Popups) and save it. 
You can run the system function system.openPopup(PopupComponent) and pass the TestPopup component as a parameter. This will open the popup. You can close a popup via system.closePopoup()

By default, clicking the background will close the popup.

Accepts the following props:
onClose (function - default none): function that runs when a user closes a popup. 
forceOpen (boolean - default false): overrides the default behaviour of clicking the background to close and removes the close button. If you do this you need to include some other way of closing the popup (via system.closePopup)
title  (string - default blank): the title that appears at the top of the popup container.
width (string - default auto): optional width of the popup - any valid css for width
height (string - default auto): optional width of the popup - any valid css for height
Locked (boolean - default false): locks all inputs/buttons inside the popup. Note - by default this does not inherit a locked prop from a parent module. 





MenuButton
Creates  a button that opens a dropdown menu. You can specify what goes in the dropdown menu by passing a Menu component JSX to the ‘menuContent’ renderProp.

#TODO add an example here

Props
locked - this locks the actually button, so you will be unable to open the menu at all. 
menuContent(any JSX content): All the content you want inside the menu 
direction (string default ‘down’) - the menu drop direction
className - add a className for more control over styling (not required most of the time)
Direction (string - default ‘down’)
onOpen
onClose
menuOptions (object): an object with a list of options for the menu itself
height (string default auto) - any valid css for height
width (string default auto) - any valid css for height
maxHeight

For sub-menus you can place a menuButton inside of the menuContent. This will automatically create a sub menu that will open when you hover over it. 

Note - Use buttons (not <a> tags) inside the menuContent for each menu item. HTML Buttons, TextBox, CommentBox, FreeButton, InfoTab, and MenuButton components will all be automatically placed and styled inside of a menuContent. 
Note: You can put a menuButton inside of another one’s menuContent to automatically create a submenu. However, since CSS only allows overflow to be visible, or hidden in both directions - subMenus are not supported inside any emeles with overflow set to anything other than visible.

MainTableRow
A building block for MainTable. Don’t use this component in modules, it is only used inside of the MainTable component. 
Checks that each data element passes it’s header’s filter, and then renders a <tr> element.

Accepts props (passed internally from the MainTable):
dataHeaders (array - required): Array of DataHeader objects
dataRow (DataRow object - required)

CheckButton
A button + checkbox for use inside of Menus (eg. the filter options in the MainTable filters)
Accepts children like a regular button. 

Props:
defaultChecked
value 
disabled
onClick - a callback function that should accept the parameters:
checked (boolean) - the state of the button once it’s been clicked
value -  the value assigned to the button via props

Permissions
Certain components (Inputs such as buttons, selects, and text boxes, as well as Containers such as cards, tabs, or modules) support ‘locked’ and ‘hidden’ props that can be used to manage  view/edit permissions. 

A hidden component will not appear at all, and any children will also be hidden.

A locked component will be in read only mode, and will not accept any input from the user. Locked inputs are also styled differently (eg. greyed out buttons). 

Any component by default will inherit the locked prop from its parent/container. However, if you explicitly set the locked prop of a component to ‘false’ it (and all its children) will be unlocked, even if its parent is locked. 

Note - TouchPoint UI is a front end library. Locking and hiding features are for styling only. Actual permissions and security features should not be handled by the front end JS of your app, as this is a large security risk, especially for public web apps. (you can probably get away with it for internal-use-only apps, but still not recommended)