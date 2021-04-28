# PiPass (v1)

PiPass (rhymes with "bypass") is an implementation of bulk password automation via RPi-Zero-W based USB keystroke injection, controlled from a locally hosted web interface.

An example use-case could be the erasure and BIOS reset of several hundred laptops at the end of a hardware lease where unique and horrific system passwords have been set on every device. It could be used in other ways, but you should bear in mind that it's no more secure than if you wrote a load of passwords on a sheet of paper and should be handled accordingly.

> P4wnP1_aloa : https://github.com/RoganDawes/P4wnP1_aloa  
> Kali : https://www.kali.org/  
> RPi-Zero-WH : https://www.amazon.co.uk/dp/B08VHL6CZG  
> jQuery : https://jquery.com/  
> Bulma : https://bulma.io/  

The hardware uses a Kali based "P4wnP1 A.L.O.A" build on a Raspberry Pi Zero-W. I'm using Bulma and jQuery for the web interface, interacting with PHP and a BASH script in the backend.

#### *Updated Web Interface* (Mon 26th Apr)
![](https://github.com/jonathancraddock/PiPass/blob/main/images/web-interface.jpg)
Interaction with the web interface is kept simple. Asset numbers are validated against the password list in realtime. Matched assets have their password displayed. To avoid accidental injection, the "Go!" button is enabled only after the checkbox is marked. If the keystroke injection fails, a notification is displayed. Typically this takes around 1 second. If the keystroke injection is successful, a confirmation message is displayed almost immediately.

#### *Connect RPi to laptop*
<p align="center"><img src="https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-laptop-1.jpg" width="60%" height="60%" /></p>

The portable battery is not essential, but it lasts all day and avoids any delay while the WiFi reassociates. The RPi-Zero is hosting a simple web interface.

#### *Enter asset number and send keystrokes*
<p align="center"><img src="https://github.com/jonathancraddock/PiPass/blob/main/images/pipass-phone-1.jpg" width="60%" height="60%" /></p>
The web interface validates the asset number, and you can view the password for cross-reference. Press "Go!" to inject the keystrokes.

## Detailed Description

The convential approach to this task is that a list of asset numbers (or serial numbers) is supplied, along with the corresponding passwords.

```text
...
LAP-00254, zfKX8cryUgJuHajk
LAP-00255, VscuXQ8MrbLqTJNh
LAP-00256, 9KFCHBAvYXD6ezas
LAP-00257, V4FW3SKAMhbDPmtJ
...
```

The laptop is switched on, the boot process is interrupted, and you're prompted to type in a BIOS password. Find the BIOS security settings, and to clear the system password you're prompted for the password, again. Then you clear the system password, reset the BIOS to its defaults, and finally boot into DBAN, Blancco, or your erasure method of choice. It's simple, but the password lookup and entry is tedious.

**That's the pain-point that PiPass is aiming to aleviate.**

&nbsp;  

&nbsp;  

...to be continued! ;-)

### Setting up the P4wnP1

(Draft notes)

* Download latest P4wnP1 image from -> https://github.com/RoganDawes/P4wnP1_aloa/releases  
* Write to SD card and boot the RPi-Zero
* Join its WiFi SSID, see notes here -> https://github.com/RoganDawes/P4wnP1_aloa
* Default address is -> http://172.24.0.1:8000
* Join the P4wnPi to the temporary network that you're using for laptop erasures
* Set the USB gadget settings as shown below
* *Your mobile phone may need to be on the same SSID / VLAN*
* SSH to the Rpi-Zero and install PHP (see below) and start Apache
* Copy the web interface files to /var/www/html (update password.json with assets and BIOS passwords)

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

Possible 'fix' for inconsistent timeout behaviour. See also: https://github.com/RoganDawes/P4wnP1_aloa/issues/296
```bash
timeout 1s P4wnP1_cli hid run -c 'press("SHIFT");delay(50);type("01234567890123456789")' -t 1
```
^- *command times out after 1 second if host is down, or cable is disconnected*

I've refined the BASH script as follows, and early testing suggests it's behaving as expected:

```bash
#!/bin/bash
# Timeout after 1 second
# Return only final line of status ( null | Terminated )
timeout 1s P4wnP1_cli hid run -c 'press("SHIFT");delay(50);type('\"$1\"')' -t 1 | tail -n 1
```
^- *the response "null" indicates a successful injection, and "Terminated" indicates the host is down or disconnected*

PHP
```bash
apt-get update
apt-get install php libapache2-mod-php
```

Apache (Testing)
```bash
systemctl start apache2
```
