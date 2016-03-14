"""Creates WP database and WP user"""

import settings
import mysql.connector

conn = mysql.connector.connect(user=settings.mysql_admin, password=settings.admin_pass)
cur = conn.cursor(buffered=True)

query = 'CREATE DATABASE IF NOT EXISTS {}'.format(settings.db_name)
cur.execute(query)

query = 'GRANT ALL PRIVILEGES ON {}.* TO "{}"@"{}" IDENTIFIED BY "{}"'.format(settings.db_name,
                                                                              settings.user,
                                                                              settings.host,
                                                                              settings.password)
cur.execute(query)

query = 'FLUSH PRIVILEGES'
cur.execute(query)

conn.commit()
conn.close()

