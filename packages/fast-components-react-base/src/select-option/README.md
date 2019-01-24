## Select option
The *select option* component implements the [option](https://www.w3.org/TR/wai-aria-1.1/#option) role and is intended to work in conjunction with the *select* component.

### Usage
The selected state of an option is controlled by the parent *Select* component.  Developers wishing to directly control the selected state of an option should do so through the "selectedOptions" prop of the parent *select*, similarly any initial default selection should be controlled thought the parent *select*'s defaultSelection prop.

### Accesibility
The *select option* component implements aria-selected and aria-disabled attributes.
