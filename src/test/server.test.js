// const request = require("supertest");
// import { appData, app } from "../server/server";

const appData = require(appData);
// const app = require(app);
// const appData = {
//   name: "",
//   country: "",
//   latitude: "",
//   longitude: "",
// };

test("should be defined", () => {
  expect(appData).toBeDefined();
});
