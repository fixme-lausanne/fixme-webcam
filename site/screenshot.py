#!/usr/bin/env python

import requests

SAVE = './img/snap'
URL = 'http://62.220.135.212/mjpg/video.mjpg'
start = False
image = []

# Extract an image from the stream
r = requests.get(URL, stream=True)
bound = r.headers['content-type'][36:]
for line in r.iter_lines():
    if line:
        if start == True:
            image.append(line)
        if line == bound:
            if start == True:
                break
            start = True


# Clean and write image data
res = ''.join(image[2:-1])
f = open('%s/image.jpg' % SAVE, 'w+')
f.write(res)
f.close()
