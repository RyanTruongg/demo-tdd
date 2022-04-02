const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const course = require("./routes/course");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.route("/courses").get(course.getCourses).post(course.postCourse);
app
  .route("/courses/:id")
  .get(course.getCourse)
  .delete(course.deleteCourse)
  .put(course.updateCourse);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;
