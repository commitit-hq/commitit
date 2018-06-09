### DB CRUD

- deployment: `cleos set contract commititcrud ref.db.crud`
- create: `cleos push action commititcrud create '{"user":"commitittest","title":"first","content":"create a first one"}' -p commitittest`
- get: `cleos get table commititcrud commitittest data`
