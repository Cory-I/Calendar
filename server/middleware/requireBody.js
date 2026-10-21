export default function requireBody(fields) {
  return (req, res, next) => {
    try {
      if (!req.body) return res.status(400).send("Request body not found.");
      const missing = fields.filter((field) => !(field in req.body));
      if (missing.length > 0)
        return res.status(400).send(`Missing fields: ${missing.join(", ")}`);
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
    }
    next();
  };
}
