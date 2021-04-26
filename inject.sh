#!/bin/bash

# Timeout after 1 second
# Return only final line of status ( null | Terminated )
timeout 1s P4wnP1_cli hid run -c 'press("SHIFT");delay(50);type('\"$1\"')' -t 1 | tail -n 1
