/* Fix this shit. oct,27*/
import client from "../client.js";
export const createEvent = async (
  client,
  { name, location, notes, type_id, user_id },
) => {
  const SQL = `
        INSERT INTO events (name, location, notes, type_id, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
  const {
    rows: [event],
  } = await client.query(SQL, [name, location, notes, type_id, user_id]);
  return event;
};

export const createEventInstance = async (
  client,
  { event_id, start_time, end_time, is_all_day },
) => {
  const SQL = `
            INSERT INTO event_instance (event_id, start_time, end_time, is_all_day, is_cancelled)
            VALUES ($1,$2,$3,$4,FALSE)
            RETURNING *`;
  const {
    rows: [instance],
  } = await client.query(SQL, [event_id, start_time, end_time, is_all_day]);
  return instance;
};

export const createUserEvent = async (
  client,
  { user_id, event_id, visibility },
) => {
  const SQL = `
    INSERT INTO user_event (user_id, event_id, visibility)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const {
    rows: [userEvent],
  } = await client.query(SQL, [user_id, event_id, visibility]);
  return userEvent;
};

export const createEventGroup = async (client, { event_id, group_id }) => {
  const SQL = `
    INSERT INTO event_group (event_id, group_id)
    VALUES ($1, $2)
    RETURNING *`;
  const {
    rows: [eventGroup],
  } = await client.query(SQL, [event_id, group_id]);
  return eventGroup;
};

export const createRecurrence = async (
  client,
  { event_id, frequency, interval, by_day, by_month_day, until_date, timezone },
) => {
  const SQL = `
    INSERT INTO event_recurrence (event_id, frequency, interval, by_day, by_month_day, until_date, timezone)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const {
    rows: [recurrence],
  } = await client.query(SQL, [
    event_id,
    frequency,
    interval,
    by_day,
    by_month_day,
    until_date,
    timezone,
  ]);
  return recurrence;
};

export const getEventInstances = async () => {
  const SQL = `
    SELECT
      events.id,
      events.name,
      event_instance.start_time,
      event_instance.end_time
    FROM events
    JOIN event_instance
      ON events.id = event_instance.event_id
    ORDER BY event_instance.start_time;
  `;

  const { rows } = await client.query(SQL);

  return rows;
};
