 # Event Registration System

 **Assignment #1 - Object Oriented System Development**

 How to run the system:

1. A proper database must be created. You can use the SQL snippet below:

``` sql
CREATE TABLE students (
  studentid SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  department TEXT NOT NULL
);

CREATE TABLE events (
  eventid SERIAL PRIMARY KEY,
  eventname TEXT NOT NULL,
  eventdate DATE NOT NULL,
  numofparticipantsregistered INTEGER NOT NULL DEFAULT 0 CHECK (numofparticipantsregistered >= 0),
  maxparticipants INTEGER NOT NULL CHECK (maxparticipants >= 0)
);

CREATE TABLE registrations (
  registrationid SERIAL PRIMARY KEY,
  studentid INTEGER NOT NULL REFERENCES students(studentid) ON DELETE CASCADE,
  eventid INTEGER NOT NULL REFERENCES events(eventid) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(studentid)  -- optional: enforces one registration per student
);
```

2. Go to `db > dbConnection.js` and change the database name and password to your appropriate one.

3. In the terminal, run `node app.js`.

4. On a browser, go to http://localhost:3000/

Completion Date: March 1st, 2026

*- Ervin Lin*