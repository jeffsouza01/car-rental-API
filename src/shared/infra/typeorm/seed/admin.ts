import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("192.168.99.100");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at )
    values ('${id}', 'admin', 'admin@rentalculb.com', '${password}', 'jamok123omasd', 'true', 'now()' )`
  );

  await connection.close;
}

create().then(() => console.log("User Admin Created"));
