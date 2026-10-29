import client from "../client.js";

export const getTypes = async () => {
  const SQL = `
    SELECT *
    FROM types
    ORDER BY name;
  `;

  const { rows } = await client.query(SQL);

  return rows;
};
