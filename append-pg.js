const { Client } = require('pg');
const fs = require('fs');

(async () => {
  const client = new Client(JSON.parse(fs.readFileSync("credentials.json"))["db_append"]);
  await client.connect();
  const target = process.argv[2]; // moneyfarm, soisy
  const data = fs.readFileSync(0, "utf-8");
  try {
    switch(target) {
      case 'moneyfarm':
        await client.query('INSERT INTO moneyfarm_dump(data) VALUES ($1)', [data]);
        break;
      case 'soisy':
        await client.query('INSERT INTO soisy_dump(data) VALUES ($1)', [data]);
        break;
    }
    console.log(`added ${target} dump`);
  } catch (err) {
    console.error(err.stack);
  }

  await client.end();
})();
