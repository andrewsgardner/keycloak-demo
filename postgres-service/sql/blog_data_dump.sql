CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4(), 
  username VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  PRIMARY KEY (username)
);

INSERT INTO users (username, first_name, last_name) VALUES ('rsmith', 'Rachel', 'Smith'), ('jpatel', 'Jason', 'Patel'), ('fwatkins', 'Frank', 'Watkins');

CREATE TABLE IF NOT EXISTS posts (
  id uuid DEFAULT uuid_generate_v4(), 
  userid varchar references users(username), 
  post_text text, 
  update_date timestamp default current_timestamp
);

INSERT INTO posts (userid, post_text) VALUES ('rsmith', 'First test...'), ('rsmith', 'Second test...'), ('jpatel', 'Third test...'), ('fwatkins', 'Fourth test...');