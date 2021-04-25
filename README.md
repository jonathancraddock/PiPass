# PiPass

PiPass is a proof of concept for bulk password automation via RPi-Zero-W based USB keystroke injection. An example use-case could be the erasure and BIOS reset of several hundred laptops at the end of a hardware lease, where unique and horrific system passwords have been set on every device. It can be used in other ways, but you should bear in mind that it's not secure.

> P4wnP1_aloa : https://github.com/RoganDawes/P4wnP1_aloa  
> RPi-Zero-WH : https://www.amazon.co.uk/dp/B08VHL6CZG  
> Bulma : https://bulma.io/  

The build is P4wnP1 A.L.O.A and a Raspberry Pi Zero-W is required, for its WiFi support. I'm using Bulma for the page; it's light, and mobile friendly.

#### *Connect RPi to laptop*
![](https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-laptop-1.jpg)

The portable battery is not essential, but it lasts all day and avoids any delay while the WiFi reassociates. The RPi-Zero is hosting a simple web interface.

#### *Enter asset number and send keystrokes*
![](https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-phone-1.jpg)

The web interface validates the asset number, and you can view the password for cross-reference. Press "Go!" to inject the keystrokes.

## Detailed Description

The convential approach to this task is that a list of asset numbers (or serial numbers) is supplied, along with the corresponding passwords.

```text
...
LAP-254, zfKX8cryUgJuHajk
LAP-255, VscuXQ8MrbLqTJNh
LAP-256, 9KFCHBAvYXD6ezas
LAP-257, V4FW3SKAMhbDPmtJ
...
```

The laptop is switched on, the boot is interrupted, and you're prompted to type in a BIOS password. Find the BIOS security settings, and to clear the system password you're prompted for the password, again. Then you clear the system passord, reset the BIOS to its defaults, and finally boot into DBAN, Blancco, or your erasure method of choice. It's simple, but the password lookup and entry is tedious.

That's the pain-point that PiPass is aiming to aleviate.

&nbsp;  

&nbsp;  

...to be continued! ;-)

### USB Gadget Settings

I found the default P4wnP1 was not accepted as a keyboard by my Lenovo laptop at the POST stage, and when initially entering the BIOS system password. I copied the following Vendor ID and Product ID from an old Lenovo keyboard, and switched off everything apart from the keyboard functionality. With these settings in place, it's been working fine on my Lenovo and Dell laptops.

![](https://github.com/jonathancraddock/PiPass/blob/main/images/usb-gadget-settings.jpg)

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
