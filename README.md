# just-okay-ui

## Shared

### Config

- `id` - `HTMLElement.id`
- `classNames` - `HTMLElement.className`


### Functions

#### `dispose`

Disposes a component:
- remove component's `HTMLElement` from DOM
- prevent component's functions processing


## Button

### Config

#### `content` - *optional*

Value is one of `HTMLElement`, `string`.


#### `isIcon` - *optional*

Icon-button supports only `string` content (best for emoji). A separate wrapper for content is created for `isIcon: true`.

> Default: `false`


#### `size` - *optional*

Value is one of `xs`, `sm`, `md`, `lg`.

> Default: `md`


#### `variant` - *optional*

Value is one of `primary`, `secondary`, `tertiary`.

> Default: `primary`


### Callbacks

#### `onClick` - *optional*

Callback function without arguments. The callback is fired on `click` event.

### Functions

#### `click`

Triggers `HTMLElement.click`.


## Checkbox

### Config

#### `name` - *required*

Value of `string` type is used as identifier of the `input[type=checkbox]`.

#### `value` - *required*

Value of `string` type is used as `HTMLInputElement.value`.


#### `checked` - *optional*

Value of `boolean` type represents checkbox checked state.

> Default: `false`


#### `displayText` - *optional*

Value of `string` type represents text displayed to user.

> Default: value of `value` property


#### `size` - *optional*

Value is one of `xs`, `sm`, `md`, `lg`.

> Default: `md`


#### `variant` - *optional*

Value is one of `primary`, `secondary`, `tertiary`.

> Default: `primary`


### Callbacks

#### `onClick` - *optional*

Callback function with argument of type:
```
{
    value: string;
    checked: boolean;
}
```

The callback is fired on `click` event.


### Functions

#### `check`

Makes checked state to `true`.

#### `setChecked`

Sets checked state to specified value.

##### Arguments
- `checked` (`boolean`) - new checked state.

#### `toggle`

Switches checked state.

#### `uncheck`

Make checked state to `false`.


## Loader

### Config

#### `blur` - *optional*

Value of `boolean` type represents whether `target` is blurred.

> Default: `true`


#### `pointerSpeed` - *optional*

Value is one of `slow`, `regular`, `fast`. It represents a speed of loader's pointer.

> Default: `regular`.


#### `size` - *optional*

Value is one of `xs`, `sm`, `md`, `lg`.

> Default: `md`


#### `target` - *optional*

Value of `HTMLElement` type represents a target element for the loader.

> Default: `document.body`


### Functions

#### `on`

Starts loader.


#### `off`

Stops loader.

## Modal

### Config

#### `content` - *required*

Object of type:
```
{
    main: HTMLElement | string;
    title?: HTMLElement | string;
    footer?: HTMLElement | string;
}
```

##### `main` - *required*

Value is one of `HTMLElement`, `string`. It represents a content of the main modal section.


##### `title` - *optional*

Value is one of `HTMLElement`, `string`. It represents a content of the title modal section.

The section is rendered even if `title` is not provided as the section contains 'close' modal button.


##### `footer` - *optional*

Value is one of `HTMLElement`, `string`. It represents a content of the title modal section.

The section is not rendered when not provided.

#### `blur` - *optional*

Value of `boolean` type represents whether `target` is blurred.

> Default: `true`


#### `closeOnOutsideClick` - *optional*

Value of `boolean` type represents the close behavior for outside click.

> Default: `false`


#### `destroyOnClose` - *optional*

Value of `boolean` type represents the close behavior of the component.

More details are in *Shared > Functions > dispose*.

> Default: `true`



#### `fullScreen` - *optional*

Value of `boolean` type represents whether a component takes the whole viewport.

> Default: `false`


#### `size` - *optional*

Value is one of `xs`, `sm`, `md`, `lg`.

> Default: `md`


### Callbacks

#### `onClose`

Callback function without arguments. The callback is fired on 'close' modal button `click` event.


### Functions

#### `show`

Shows the modal.


#### `close`

Closes the modal.

## Tooltip

### Config

#### `content` - *required*

Value is one of `HTMLElement`, `string`.


#### `target` - *required*

Value of `HTMLElement` type represents a target element for the tooltip.

#### `position` - *optional*

Value is one of `top`, `right`, `bottom`, `left`. It represents a position of tooltip relative to `target` element.

#### `size` - *optional*

Value is one of `xs`, `sm`, `md`, `lg`.

> Default: `md`

#### `transition` - *optional*

Value is one of `slow`, `regular`, `fast`, `number` (in milliseconds). It represents a duration before showing and hiding of the tooltip. 

> Default: `regular`
