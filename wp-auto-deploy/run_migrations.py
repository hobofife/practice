"""Gets all of the filenames from ./migrations, sorts them by number,
and runs each file."""

import os

import mysql

names = {float(filename.split('-')[-1].replace('.py', '')): filename for filename in os.listdir('./migrations')}
for filename in sorted(names.items()):
    print(filename[0])


