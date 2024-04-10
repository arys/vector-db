import client from "../client.js";
import apartmentSchema from "./apartment.js";

await client.schema
  .classCreator()
  .withClass(apartmentSchema)
  .do()