DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS types CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS user_group CASCADE;
DROP TABLE IF EXISTS user_event CASCADE;
DROP TABLE IF EXISTS event_group CASCADE;
DROP TABLE IF EXISTS event_instance CASCADE;
DROP TABLE IF EXISTS event_recurrence CASCADE;
DROP TYPE IF EXISTS visibility_enum CASCADE;
DROP TYPE IF EXISTS frequency_enum CASCADE;
DROP TYPE IF EXISTS weekday_enum CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    name TEXT NOT NULL
);
CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name TEXT,
    color TEXT
);
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT,
    location TEXT,
    notes TEXT,
    type_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_types_a FOREIGN KEY (type_id) REFERENCES types(id),
    CONSTRAINT fk_users_a FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name TEXT
);
CREATE TABLE user_group (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    CONSTRAINT fk_users_b FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_groups_b FOREIGN KEY (group_id) REFERENCES groups(id)
);
CREATE TYPE visibility_enum AS ENUM (
    'private',
    'shared',
    'group'
);
CREATE TABLE user_event (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    visibility visibility_enum NOT NULL,
    CONSTRAINT fk_users_c FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_events_c FOREIGN KEY (event_id) REFERENCES events(id)
);
CREATE TABLE event_group (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    group_id INT NOT NULL,
    CONSTRAINT fk_events_d FOREIGN KEY (event_id) REFERENCES events(id),
    CONSTRAINT fk_groups_d FOREIGN KEY (group_id) REFERENCES groups(id)
);
CREATE TABLE event_instance (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_all_day BOOLEAN,
    is_cancelled BOOLEAN,
    CONSTRAINT fk_events_e FOREIGN KEY (event_id) REFERENCES events(id)
);
CREATE TYPE frequency_enum AS ENUM (
    'daily',
    'weekly',
    'monthly',
    'yearly'
);
CREATE TYPE weekday_enum AS ENUM (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
);
CREATE TABLE event_recurrence (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    frequency frequency_enum,
    interval INT,
    by_day weekday_enum,
    by_month_day INT,
    until_date TIMESTAMPTZ,
    timezone TEXT,
    CONSTRAINT fk_events_f FOREIGN KEY (event_id) REFERENCES events(id)
);