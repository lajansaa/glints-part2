# glints-part2

## How to run locally
1. Git clone project
2. Run ```npm install``` to install node modules
3. Create pg database ```createdb glints```
4. Open db.js file in repo and change configs accordingly
5. Run ```node src/server/seed/generate_seed_sql.js``` to generate insert statements
6. Run ```psql -d glints -f src/server/seed/tables.sql``` to create tables in database
7. Run ```psql -d glints -f src/server/seed/seed.sql``` to insert data into database
8. Run ```npm run dev``` to start server