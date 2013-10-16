#!/usr/bin/env python

import requests, arrow

SAVE = './img/snap'
URL = 'http://62.220.135.212/jpg/image.jpg'

#Save 1 image per 15 minute max
#~1.5G per year of image max

minutes = int(round(int(arrow.now().format('mm'))/15)*15)
SAVE += '/%s%s.jpg' % (arrow.now().format('YYYYMMDDHH'), minutes)
r = requests.get(URL)
f = open(SAVE, 'w+')
f.write(r.content)
f.close()

print 'Content-Type: text/html'
print ''
print 'OK ' % len(r.content)
