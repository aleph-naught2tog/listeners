# MouseEvent

## notes

* prefer `click` for activation tsuff

## types

* `mousedown` when pressed over an element, bubbles
* `mouseup` when released over an element, bubbles
* `mousemove` moved, bubbles
* `click`
* `dblclick`
* `mouseover`: _one_ event is dispatched total, and bubbles up until cancelled/reaches the route
* `mouseout` fires on element being moved off of; also fires on parent when you move ONTO a child, becaue you are no longer in the parent' space
* `mouseenter`: _one_ event per involveed element is fired -- **this can mess with performance**
* `mouseleave`

## Properties

- `screenX`: [long] horizontal coordinate _relative to the origin of the screen coordinate system_
- `screenY`: [long] vertical coordinate _relative to the origin of the screen coordinate system_
- `clientX`: [long] horizontal coordinate relative to the _viewport_ -- if my window is 400px wide and the element/CSS is 800px wide, `clientX` will vary from 0 to 400, but `screenX` will vary from 0 to 800
- `clientY`: [long] veritcal coordinate relative to the _viewport_
- `movementX` (`mousemove`) relative to last `mousemove`
- `movementY` (`mousemove`) relative to last `mousemove`
- `offsetX` relative to padding edge
- `offsetY`
- `pageX` relative to document
- `pageY`

- `ctrlKey`: [boolean]
- `shiftKey`: [boolean]
- `altKey`: [boolean]
- `metaKey`: [boolean]

- `button`: [short] which pointer device button changed state -- valid during `mouseup`, `mousedown`
  - `0` primary button : **a value of `0` can also just be the unitialized value -- a la null**
  - `1` middle/wheel
  - `2` secondary button (e.g., right click)
  - `3` backwards
  - `4` forwards
- `buttons`: [unsigned short] -- state of which buttons are/are not active/are any buttons active -- this **accurately** reflects no buttons pushed, etc
  - `0` -- no button currently active
  - `1` -- primary button (e.g., left click)
  - `2` -- secondary button (e.g., left click)
  - `4` -- aux button (mouse/middle)
  - e.g.: a value of 3 means both primary and secondary are clicked (1 + 2); 5 mean left and middle are clicked (1 + 4)

- `relatedTarget`
  - for mouseover, mouseout, mouseenter, mouseleave

## `buttons` lookup

- `0` -- no button currently active
- `1` -- primary button (e.g., left click)
- `2` -- secondary button (e.g., left click)
- `4` -- aux button (mouse/middle)

|   4   |   2   |   1   |
| :---: | :---: | :---: |
|   1   |   0   |   0   |
|   0   |   1   |   0   |
|   0   |   0   |   1   |
|   0   |   0   |   0   |

## Orders

### canon

* `click`
  1. mousedown
  2. click
  3. mouseup

### Move over A

1. `mousemove`
2. device moved into element A
3. `mouseover` A
4. `mouseenter` A
5. `mousemove` A // loop
6. device moved out of element A
7. `mouseout` A
8. `mouseleave` A

### Move into A, into A.B, to just A

mousemove
device into A
mouseover A
mouseenter A
mousemove A
into nested element B
mouseout A
mouseover B
mouseenter B
mousemove B // multiple
from B into A
mouseout B
mouseleave B
mouseover A
mousemove A
mouseout A
mouseleave A

### nesting

```html
<A>
  <B>
    <C></C>
  </B>
</A>
```

from elsewhere to C and back out
stack: `C`, `A`, `B`

1. mousemove
2. device moved into C
3. mouseover C // just once, for C
3. mouseenter A // once per element
3. mouseenter B
3. mouseenter C
4. mousemove C // multiples
5. device leaves C
6. mouseout C
7. mouseleave C
7. mouseleave B
7. mouseleave A
