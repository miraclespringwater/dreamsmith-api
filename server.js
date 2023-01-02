require("dotenv").config({ path: "./.prv.env" });
const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Dreamsmith [${process.env.NODE_ENV}] running on port ${port}`);
});
