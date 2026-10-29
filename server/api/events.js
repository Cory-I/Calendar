import express from "express";
import {
  createEvent,
  createEventInstance,
  createUserEvent,
  createEventGroup,
  createRecurrence,
  getEventInstances,
} from "../db/queries/events.js";
import client from "../db/client.js";
const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res, next) => {
  try {
    const events = await getEventInstances();

    res.send(events);
  } catch (error) {
    next(error);
  }
});

eventsRouter.post("/", async (req, res, next) => {
  /*   const client = await db.connect(); */
  try {
    await client.query("BEGIN");
    console.log("EVENT BODY:", req.body);
    const event = await createEvent(client, {
      name: req.body.name,
      location: req.body.location,
      notes: req.body.notes,
      type_id: req.body.type_id,
      user_id: /* req.body.user_id */ 1,
    });
    await createEventInstance(client, {
      event_id: event.id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      is_all_day: req.body.is_all_day,
    });
    console.log("CREATE USER EVENT:", {
      user_id: 1,
      event_id: event.id,
      visibility: req.body.group_id ? "group" : "private",
    });
    await createUserEvent(client, {
      user_id: /* req.body.user_id */ 1,
      event_id: event.id,
      visibility: req.body.group_id ? "group" : "private",
    });
    if (req.body.group_id) {
      await createEventGroup(client, {
        event_id: event.id,
        group_id: req.body.group_id,
      });
    }
    if (req.body.frequency) {
      await createRecurrence(client, {
        event_id: event.id,
        frequency: req.body.frequency,
        interval: req.body.interval,
        by_day: req.body.by_day,
        by_month_day: req.body.by_month_day,
        until_date: req.body.until_date,
        timezone: req.body.timezone,
      });
    }
    await client.query("COMMIT");
    res.send(event);
  } catch (error) {
    await client.query("ROLLBACK");
    next(error);
  } /* finally {
    client.release();
  } */
});
export default eventsRouter;
