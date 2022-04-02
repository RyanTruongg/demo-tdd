const Course = require("../model/course");

/*
 * GET /courses route to retrieve all the courses.
 */
const getCourses = (req, res) => {
  Course.find((err, courses) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(courses);
  });
};

/*
 * POST /courses to save a new course.
 */
const postCourse = (req, res) => {
  const course = req.body;
  Course.save(course, (err, newCourse) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({
      message: "Course successfully added!",
      course: newCourse,
    });
  });
};

/*
 * GET /courses/:id route to retrieve a course given its id.
 */
const getCourse = (req, res) => {
  Course.findById(req.params.id, (err, course) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({
      course,
    });
  });
};

/*
 * DELETE /courses/:id to deconste a course given its id.
 */
const deleteCourse = (req, res) => {
  Course.delete(req.params.id, (err, result) => {
    res.json({
      message: "Course successfully deleted!",
      result,
    });
  });
};

/*
 * PUT /courses/:id to update a course given its id
 */
const updateCourse = (req, res) => {
  Course.update(req.params.id, req.body, (err, course) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send({
      message: "Course updated!",
      course,
    });
  });
};

//export all the functions
module.exports = {
  getCourses,
  postCourse,
  getCourse,
  deleteCourse,
  updateCourse,
};
