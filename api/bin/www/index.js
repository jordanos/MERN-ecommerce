const app = require('../../app');
const { connect } = require('../../config/db');
// Connect To Database
connect()
  .then()
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
