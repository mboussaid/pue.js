# Pue - A JavaScript Utility Class

**Pue** is a JavaScript utility class that provides various functions for common web development tasks, including DOM manipulation, event handling, and more.
### Selecting DOM Elements

You can use **Pue** to select DOM elements by their CSS selectors.

```javascript
// Select a single element
const singleElement = pue.el('.my-element');

// Select multiple elements
const multipleElements = pue.els('.my-elements');
```

### Creating and Using References

**Pue** allows you to create references with data binding capabilities.

```javascript
// Create a reference
const myRef = pue.ref('myReference');

// Set the value of the reference
myRef.value = 'Hello, Pue!';

// Watch for changes in the reference
pue.watch(myRef, () => {
  console.log(`Reference value changed: ${myRef.value}`);
});
```

### Computed References

You can create computed references that depend on other references.

```javascript
// Create references
const num1 = pue.ref(5);
const num2 = pue.ref(10);

// Create a computed reference that calculates the sum
const sum = pue.computed(() => num1.value + num2.value, [num1, num2]);

// Watch for changes in the computed reference
pue.watch(sum, () => {
  console.log(`Sum is now: ${sum.value}`);
});

// Update the values of the dependent references
num1.value = 7;
num2.value = 20;
```

### Event Listeners

**Pue** makes it easy to add event listeners to DOM elements.

```javascript
// Attach a click event listener
pue.onClick(singleElement, () => {
  console.log('Element clicked!');
});

// Attach a double-click event listener
pue.onDoubleClick(singleElement, () => {
  console.log('Element double-clicked!');
});

// Attach a keydown event listener
pue.onKeyDown(document, (event) => {
  console.log(`Key pressed: ${event.key}`);
});
```

### Rendering Mustache Templates

You can use **Pue** to render Mustache templates with data.

```javascript
const template = 'Hello, {{name}}!';
const data = { name: 'Pue' };

const renderedHTML = pue.render(template, data);
console.log(renderedHTML); // Outputs: Hello, Pue!
```

These snippets provide examples of how to use various features of the **Pue** utility class in your web development projects.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Methods](#methods)
   - [el(selector, all)](#el-selector-all)
   - [els(selector)](#els-selector)
   - [ref(value)](#ref-value)
   - [watch(ref, effect)](#watch-ref-effect)
   - [computed(callback, refs)](#computed-callback-refs)
   - [timeout(callbacks, interval)](#timeout-callbacks-interval)
   - [interval(callbacks, interval)](#interval-callbacks-interval)
   - [style(el, obj)](#style-el-obj)
   - [render(template, obj)](#render-template-obj)
   - [onClick(el, callback)](#onclick-el-callback)
   - [onDoubleClick(el, callback)](#ondoubleclick-el-callback)
   - [onKeyDown(el, callback)](#onkeydown-el-callback)
   - [onKeyUp(el, callback)](#onkeyup-el-callback)
   - [onMouseEnter(el, callback)](#onmouseenter-el-callback)
   - [onMouseLeave(el, callback)](#onmouseleave-el-callback)
   - [onMouseMove(el, callback)](#onmousemove-el-callback)
   - [onContextMenu(el, callback)](#oncontextmenu-el-callback)
   - [onDragStart(el, callback)](#ondragstart-el-callback)
   - [onDragEnd(el, callback)](#ondragend-el-callback)
   - [onDragOver(el, callback)](#ondragover-el-callback)
   - [onDrop(el, callback)](#ondrop-el-callback)
   - [onTouchStart(el, callback)](#ontouchstart-el-callback)
   - [onTouchEnd(el, callback)](#ontouchend-el-callback)
   - [onTouchMove(el, callback)](#ontouchmove-el-callback)
   - [onTouchCancel(el, callback)](#ontouchcancel-el-callback)

## Introduction <a name="introduction"></a>

**Pue** is designed to simplify common tasks in web development. It offers functions for selecting elements, creating references with data binding, handling timeouts and intervals, and attaching event listeners to DOM elements.

## Getting Started <a name="getting-started"></a>

To use **Pue** in your project, follow these steps:

1. Import the Mustache library (if not already imported) since **Pue** uses it for rendering templates:

   ```javascript
   import Mustache from 'mustache';
   ```

2. Import **Pue**:

   ```javascript
   import pue from './pue'; // Adjust the path to match your project structure
   ```

3. You can now use the various methods provided by **Pue** to simplify your web development tasks.

## Methods <a name="methods"></a>

### `el(selector, all = false)` <a name="el-selector-all"></a>

- **Description**: Selects a DOM element by the specified selector.
- **Parameters**:
  - `selector` (string): The CSS selector for the element you want to select.
  - `all` (boolean): If set to `true`, it selects all matching elements; otherwise, it selects the first matching element.
- **Returns**: A DOM element or a NodeList of elements if `all` is `true`.

### `els(selector)` <a name="els-selector"></a>

- **Description**: Alias for `el(selector, true)`. Selects all DOM elements that match the specified selector.
- **Parameters**:
  - `selector` (string): The CSS selector for the elements you want to select.
- **Returns**: A NodeList of matching elements.

### `ref(value)` <a name="ref-value"></a>

- **Description**: Creates or retrieves a reference to a DOM element with data binding capabilities.
- **Parameters**:
  - `value` (string): The name of the reference.
- **Returns**: A reference object with data binding capabilities.

### `watch(ref, effect)` <a name="watch-ref-effect"></a>

- **Description**: Adds an effect (callback) to a reference. When the reference's value changes, the effect is triggered.
- **Parameters**:
  - `ref` (Reference object): The reference to watch.
  - `effect` (function): The callback function to execute when the reference changes.

### `computed(callback, refs)` <a name="computed-callback-refs"></a>

- **Description**: Creates a computed reference that depends on one or more other references. The computed reference updates its value when the dependencies change.
- **Parameters**:
  - `callback` (function): A function that computes the value of the reference.
  - `refs` (Reference or array of references): The references that the computed reference depends on.
- **Returns**: A computed reference.

### `timeout(callbacks, interval)` <a name="timeout-callbacks-interval"></a>

- **Description**: Executes one or more callbacks after a specified time interval.
- **Parameters**:
  - `callbacks` (function or array of functions): The callback(s) to execute.
  - `interval` (number): The time interval in milliseconds.

### `interval(callbacks, interval)` <a name="interval-callbacks-interval"></a>

- **Description**: Executes one or more callbacks at specified time intervals.
- **Parameters**:
  - `callbacks` (function or array of functions): The callback(s) to execute.
  - `interval` (number): The time interval in milliseconds.

### `style(el, obj)` <a name="style-el-obj"></a>

- **Description**: Applies CSS styles to one or more DOM elements.
- **Parameters**:
  - `el` (DOM element or array of DOM elements): The element(s) to apply styles to.
  - `obj` (object): An object containing CSS property-value pairs.

### `render(template, obj)` <a name="render-template-obj"></a>

- **Description**: Renders a Mustache template with the provided data object.
- **Parameters**:
  - `template` (string): The Mustache template string.
  - `obj` (object): The data object to use for rendering.
- **Returns**: The rendered HTML string.

### Event Listeners

**Pue** provides several methods to attach event listeners to DOM elements:

- `onClick(el, callback)`: Attaches a click event listener to the specified element(s).
- `onDoubleClick(el, callback)`: Attaches a double-click event listener to the specified element(s).
- `onKeyDown(el, callback)`: Attaches a keydown event listener to the specified element(s).
- `onKeyUp(el, callback)`: Attaches a keyup event listener to the specified element(s).
- `onMouseEnter(el, callback)`: Attaches a mouseenter event listener to the specified element(s).
- `onMouseLeave(el, callback

)`: Attaches a mouseleave event listener to the specified element(s).
- `onMouseMove(el, callback)`: Attaches a mousemove event listener to the specified element(s).
- `onContextMenu(el, callback)`: Attaches a contextmenu (right-click) event listener to the specified element(s).
- `onDragStart(el, callback)`: Attaches a dragstart event listener to the specified element(s).
- `onDragEnd(el, callback)`: Attaches a dragend event listener to the specified element(s).
- `onDragOver(el, callback)`: Attaches a dragover event listener to the specified element(s).
- `onDrop(el, callback)`: Attaches a drop event listener to the specified element(s).
- `onTouchStart(el, callback)`: Attaches a touchstart event listener to the specified element(s).
- `onTouchEnd(el, callback)`: Attaches a touchend event listener to the specified element(s).
- `onTouchMove(el, callback)`: Attaches a touchmove event listener to the specified element(s).
- `onTouchCancel(el, callback)`: Attaches a touchcancel event listener to the specified element(s).

These event listeners simplify the process of adding interactivity to your web applications.
