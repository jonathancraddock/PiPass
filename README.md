# PiPass

PiPass is a proof of concept for bulk password automation via RPi-Zero-W based USB keystroke injection. An example use-case could be the erasure and BIOS reset of several hundred laptops at the end of a hardware lease.

## Concept

Coming soon... ;-)

### Bash scripts and 'special' characters

Inserting a variable into a command that involves quotes and double-quotes seems to be regarded as a notorious gotcha. The following is a sample of the syntax:

```bash
P4wnP1_cli hid run -c 'type("example")'
```

In this case, a variable `$1` needs to replace the `example` phrase, and the following escaping appears to work consistently:

```bash
#!/bin/bash
P4wnP1_cli hid run -t 1 -c 'type('\"$1\"')'
```

For example: `.\inject.sh example`

### Footnotes

PHP
```bash
apt-get update
apt-get install php libapache2-mod-php
```

Apache (Testing)
```bash
systemctl start apache2
```
