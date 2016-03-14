## Figuring out Wordpress deployment

* Should I keep the whole installtion in Git to keep correct versions of plugins, etc, or is scripting `wp-cli` good enough?


My idea is that the entire WP core and everything should be in Git, and any and all changes to the database should be scripted and the migration scripts should be kept in version control. 

Because I'll be dealing with many live users, I can't just copy the database back and forth, not that doing so is a good idea anyway, especially once the db gets large. But all of the db migrations that affect the app need to be executed by scripts and kept in version control. 

The reason for keeping the entire site installation in VC is so I can actually do upgrades and plug-in installations locally, pull the changes on the staging server, and then pull the changes on the production server.

Of course, passwords and such will not be in VC.

One thing I'm not sure about is URLs stored in the database. If I'm writing scripts for all database migrations, then maybe domains cd don't matter as long as I'm only going in one direction, but since I might want to copy a production database to staging once in awhile, I think the best bet is to keep the same domain for all environments and just change my host file.

Ah, and migration scripts should definitely be indempotent, so I can just automate running all migrations on an automated deployment.

---

Alright, so WP is extracted, nothing is touched except this notes file and I'm looking at the WP docs.

Working in a new virualenv (wp) so I can track my Python dependencies easily. Using python2 because I plan to use Fabric. Using the Oracle MySQL connector, maybe should have a task in Fabric to install that.

---

* Python script to create database
* Make sure wp-config.php is in .gitignore
* Added Nginx server defintion to ./etc/ for reference
* Installing wp-cli, will include the steps in the Fabric script
* Wrote Python script to run `wp core config` and `wp core install`







