# Keyboard Events

## default actions

dispatched after keydown/before keyup

* tab -> MUST shift focus
* if produces a character then must character
* enter or space -> MUST dispatch a click

## event loop

assuming that `event.preventDefault()` is never fired:

1. `keydown`
   1. if the key is held down and produces a character, the keydown event cotninues to be emitted and `event.repeat` is set to `true`
2. if the key produces a character such that the character would be inserted into an element that can accept input -- e.g., an input or textarea
   1. `beforeinput` fires
   2. `input` fires
3. `keyup` fires once key HAS BEEN released

### examples

| `type`      | `key`   | modifiers  | notes       |
| ----------- | ------- | ---------- | ----------- |
| keydown     | "Shift" | `shiftKey` |             |
| keydown     | "Q"     | `shiftKey` | capital 'Q' |
| beforeinput |         |            |             |
| input       |         |            |             |
| keyup       | "Q"     | `shiftKey` |             |
| keyup       | "Shift" |            |             |

| `type`  | `key`     | modifiers         | notes |
| ------- | --------- | ----------------- | ----- |
| keydown | "Control" | ctrlKey           |       |
| keydown | "Shift    | ctrlKey, shiftKey |       |
| keydown | "V"       | ctrlKey, shiftKey |       |
| keyup   | "V"       | ctrlKey, shiftKey |       |
| keyup   | "Shift"   | ctrlKey           |       |
| keyup   | "Control" |                   |       |
