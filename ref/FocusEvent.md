# `FocusEvent`

## Properties

(additional to other `Event` and `UIEvent` properties)

* `relatedTarget`: the `relatedTarget` is the 'previous' element -- for a `focus` event whose `target` is the element _gaining_ focus, the `relatedTarget` is the element _losing_ focus. For a `blur` event, the `target` is the element _losing_ focus; the `relatedTarget` is the element _gaining_ focus.

## Types

* `focusin`: fired on an element _before_ it _receives_ focus
* `focus`: fired on an element _after_ it _receives_ focus
* `focusout`: fired on an element _before_ it _loses_ focus
* `blur`: fired on an element _after_ it _loses_ focus

## Flow (typical)

Assume we have two buttons; a **Pink** button and a **Blue** button.
Assume nothing has focus.

1. User shifts focus to **Pink** button.
2. `focusin` fires on **Pink** button -- **Pink** not yet focused.
3. `focus` fires on **Pink** button -- **Pink** now focused.
4. User shifts focus to **Blue** button.
5. `focusout` fires on **Pink** button -- **Pink** still focused.
6. `focusin` fires on **Blue** button -- **Blue** not yet focused.
7. `blur` fires on **Pink** button -- **Pink** no longer focused.
8. `focus` fires on **Blue** button -- **Blue** now focused.
