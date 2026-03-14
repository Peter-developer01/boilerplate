# boilerplate

This is a simple Node.js script to easily create new HTML/CSS/JS projects from the command line.

Usage:
- `npm install -g .`
- `boilerplate [options] <dirname>`

Options:
```text
  -y, --yes   yes: include everything
  -n, --no    no: include only HTML
  --css       include CSS
  --no-css    don't include CSS
  --js        include JS
  --no-js     don't include JS
  --dry-run   don't actually do anything
  --force     force overwrite if directory exists
  -h, --help  display help for command
```