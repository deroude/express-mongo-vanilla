db.auth('root', 'example')

db = db.getSiblingDB('codemancy')

db.createUser({
  user: 'codemancy',
  pwd: 'password',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});