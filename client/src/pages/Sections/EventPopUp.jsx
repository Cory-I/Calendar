import { useState, useEffect } from "react";
export default function EventPopup({
  date,
  types,
  groups,
  onClose,
  onCreateEvent,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    notes: "",
    type_id: "",
    group_id: "",
    start_time: "",
    end_time: "",
    is_all_day: false,

    frequency: "",
    interval: 1,
    by_day: "",
    until_date: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  //temporary for create event date
  useEffect(() => {
    if (!date?.dateString) return;

    setFormData((prev) => ({
      ...prev,
      start_time: `${date.dateString}T12:00`,
      end_time: `${date.dateString}T13:00`,
    }));
  }, [date]);
  //temporary for create event date
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type_id) {
      alert("Please select a type.");
      return;
    }
    await onCreateEvent(formData);

    onClose();
  };
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Create Event</h2>

        <p>
          Selected Date:{" "}
          {date?.dateString
            ? new Date(date.dateString).toLocaleDateString()
            : ""}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <h4>Type</h4>

          <select
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
          >
            <option value="">Select Type</option>

            {types?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <h4>Group</h4>

          <select
            name="group_id"
            value={formData.group_id}
            onChange={handleChange}
          >
            <option value="">No Group</option>

            {groups?.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <h4>Time</h4>

          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
          />

          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="is_all_day"
              checked={formData.is_all_day}
              onChange={handleChange}
            />
            All Day
          </label>

          <h4>Recurrence</h4>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="">Does Not Repeat</option>

            <option value="daily">Daily</option>

            <option value="weekly">Weekly</option>

            <option value="monthly">Monthly</option>

            <option value="yearly">Yearly</option>
          </select>

          {formData.frequency === "weekly" && (
            <select
              name="by_day"
              value={formData.by_day}
              onChange={handleChange}
            >
              <option value="">Select Day</option>

              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          )}

          <input
            type="number"
            name="interval"
            min="1"
            value={formData.interval}
            onChange={handleChange}
          />

          <input
            type="date"
            name="until_date"
            value={formData.until_date}
            onChange={handleChange}
          />

          <div className="popup-buttons">
            <button type="submit">Create Event</button>

            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
