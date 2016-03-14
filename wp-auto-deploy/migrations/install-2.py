import subprocess
import settings

path = '--path={}'.format(settings.wordpress_dir)
dbname = '--dbname={}'.format(settings.db_name)
dbuser = '--dbuser={}'.format(settings.user)
dbpass = '--dbpass={}'.format(settings.password)
url = '--url={}'.format(settings.url)
title = '--title={}'.format(settings.title)
wp_admin = '--admin_user={}'.format(settings.wp_admin)
wp_admin_pass = '--admin_password={}'.format(settings.wp_admin_pass)
wp_admin_email = '--admin_email={}'.format(settings.wp_admin_email)

subprocess.call(['wp', 'core', 'config', path, dbname, dbuser, dbpass])

is_installed = subprocess.call(['wp', 'core', 'is-installed', path])
if is_installed > 0:
    subprocess.call(['wp', 'core', 'install', path, url, title, wp_admin, wp_admin_pass, wp_admin_email])
