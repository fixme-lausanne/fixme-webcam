fixme-webcam
============
- A project to show the webcam filming the [FIXME 3D printer](https://fixme.ch/wiki/Ultimaker).

Site
----
- To test it, just open the index.html, it should work out of the box.
- The directory structure for the site is as follow
    - js : javascript library or element needed by them, script used directly in the html.
    - img : images used in the template.
    - css : stylesheets used in the template.
- To launch a development version, simply execute the dev.sh script. This will launch a simple http server in the site directory on port 8000.
- Configuration on the apache server:
    <Directory /var/www/webcam/htdocs>
        Options +ExecCGI
        Order Allow,Deny
        Allow from all
        AddHandler cgi-script .py
    </Directory>
- You still need to do a couple of commands after pushing to live:
  chmod +x /var/www/webcam/htdocs/screenshot.py
  chmod 770 /var/www/webcam/htdocs/img/snap
