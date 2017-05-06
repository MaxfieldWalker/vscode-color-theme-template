## vscode-color-theme-template

[![Build Status](https://travis-ci.org/MaxfieldWalker/vscode-color-theme-template.svg?branch=master)](https://travis-ci.org/MaxfieldWalker/vscode-color-theme-template)
[![Coverage Status](https://coveralls.io/repos/github/MaxfieldWalker/vscode-color-theme-template/badge.svg?branch=master)](https://coveralls.io/github/MaxfieldWalker/vscode-color-theme-template?branch=master)


## Features
- Color variables
- Alpha value variables

## Example

```bash
$ vscode-color-theme-template ./theme.json ./out/theme.json


# Result
# {
#     "foreground": "$blue@mid", => will be replaced with "#0000FF80"
#
#     "colorPalette": {
#         "$blue": "#0000FF", <= Color definition
#         "@mid": "80"        <= Alpha value definition
#     }
# }
```


## Format

```json
// $color -> Hex Color (e.g. #000, #CDCDCD)
// @alpha -> Alpha value (e.g. FF, 80)

{
    "colorPalette": {
        "$blue": "#0000FF",
        "@medium": "80"
    }
}
```

## Author
[Maxfield Walker](https://github.com/MaxfieldWalker)

## License
MIT
