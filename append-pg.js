const { Client } = require('pg');
const fs = require('fs');

(async () => {
  const client = new Client(JSON.parse(fs.readFileSync("credentials.json"))["db_append"]);
  await client.connect();

  const moneyfarm_data = fs.readFileSync(0, "utf-8");
  try {
    const res = await client.query('INSERT INTO moneyfarm_dump(data) VALUES ($1)', [moneyfarm_data]);
    console.log('added moneyfarm dump');
  } catch (err) {
    console.error(err.stack);
  }

  await client.end();
})();
