### Hexlet tests and linter status:
![hexlet-check](https://github.com/asalex04/frontend-project-lvl2/workflows/hexlet-check/badge.svg)
![Node CI](https://github.com/asalex04/frontend-project-lvl2/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

### About ptoject
The second of four training projects of the Frontend JavaScript training program on the **Hexlet** online educational platform.
Gendiff is a CLI utility that compares two config files and displays the difference in different formats.

### Install
```
git clone git@github.com:asalex04/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
make link
```
### Calling help 
```$ gendiff --help```

[![asciicast](https://asciinema.org/a/f5r1MQS5PYP7lA0brWhz2kgLt.svg)](https://asciinema.org/a/f5r1MQS5PYP7lA0brWhz2kgLt)

### Comparing flat files (JSON)
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/pFQL7CeOki0einNDC3MsuQslk.svg)](https://asciinema.org/a/pFQL7CeOki0einNDC3MsuQslk)

###  Comparing flat files (YML)
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/jJaFZxw3WgzwuVirXJEUutAKh.svg)](https://asciinema.org/a/jJaFZxw3WgzwuVirXJEUutAKh)

### Comparing files with nested structures
```$ gendiff <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/B8ys9oGIbmNVFnqTQNphi5i9O.svg)](https://asciinema.org/a/B8ys9oGIbmNVFnqTQNphi5i9O)

### Compare files and output the result in plain format
```gendiff --format plain <firstConfig> <secondConfig>```

[![asciicast](https://asciinema.org/a/fFYMTpqPyQx19kgtkP7HdnCn6.svg)](https://asciinema.org/a/fFYMTpqPyQx19kgtkP7HdnCn6)

### Outputting the result in json format
```$ gendiff --format json filepath1.json filepath2.json```

[![asciicast](https://asciinema.org/a/T0ORF728L0ZFeIQsIJKVmO0wQ.svg)](https://asciinema.org/a/T0ORF728L0ZFeIQsIJKVmO0wQ)
