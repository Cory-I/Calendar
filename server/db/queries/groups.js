import client from "../client.js";

export const getGroups = async () => {
  const SQL = `
    SELECT *
    FROM groups
    ORDER BY name;
  `;

  const { rows } = await client.query(SQL);

  return rows;
};
