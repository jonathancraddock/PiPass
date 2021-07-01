#!/bin/bash

# Requires "Execute" permission
# chmod +x inject.sh

# 1/7/21, Added 'layout("gb"); to beginning of command

# Timeout after 1 second
# Return only final line of status ( null | Terminated )
timeout 1s P4wnP1_cli hid run -c 'layout("gb");press("SHIFT");delay(50);type('\"$1\"')' -t 1 | tail -n 1
