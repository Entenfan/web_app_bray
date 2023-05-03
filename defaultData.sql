
-- create
CREATE TABLE users (
                       userid INTEGER PRIMARY KEY,
                       username varchar(40) NOT NULL,
                       password varchar(40) NOT NULL,
                       comment varchar(255)
);

-- insert
INSERT INTO USERS VALUES (0001, 'Clark', '12345');
INSERT INTO USERS VALUES (0002, 'Dave', 'Password');
INSERT INTO USERS VALUES (0003, 'TestAdmin', 'sicheresPasswort', 'Test User, um Admin Funktionalitäten zu Testen (Achtung, passwort ändern!)');

-- fetch
SELECT * FROM users ;