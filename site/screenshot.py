#!/usr/bin/env python

import requests

URL = 'http://62.220.135.212/mjpg/video.mjpg'
BOUND = '--myboundary' #FIXME Should be taken from HEADERS
start = False
image = bytes()

r = requests.get(URL, stream=True)
for line in r.iter_lines():
    if line:
        if start == True:
            image += line
        if line == BOUND:
            if start == True:
                break
            start = True


f = open('/tmp/image.jpg', 'w+')
f.write(image)
f.close()
