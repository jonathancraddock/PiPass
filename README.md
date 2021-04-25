# PiPass

PiPass is a proof of concept for bulk password automation via RPi-Zero-W based USB keystroke injection. An example use-case could be the erasure and BIOS reset of several hundred laptops at the end of a hardware lease. It can be used in other ways, but you should bear in mind that it's not secure.

#### *Connect RPi to laptop*
![](https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-laptop-1.jpg)

The portable battery is not essential, but it lasts all day and avoids any delay while the WiFi reassociates.

#### *Enter asset number and send keystrokes*
![](https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-phone-1.jpg)

The web interface validates the asset number, and you can view the password for cross-reference.

## Concept

Coming soon... ;-)

&nbsp;  

&nbsp;  

### Bash scripts and 'special' characters

Inserting a variable into a command that involves quotes and double-quotes seems to be regarded as a notorious gotcha. The following is a sample of the normal command line syntax:

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
