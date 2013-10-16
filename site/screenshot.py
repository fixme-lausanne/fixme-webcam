#!/usr/bin/env python

import requests

SAVE = './img/snap'
URL = 'http://62.220.135.212/jpg/image.jpg'

r = requests.get(URL)
f = open('%s/image.jpg' % SAVE, 'w+')
f.write(r.content)
f.close()
