let id = 0;

let ListData = [
  { id: ++id, name: "Math 01", status: "available" },
  { id: ++id, name: "Physic 01", status: "available" },
  { id: ++id, name: "Chemistry 01", status: "available" },
  { id: ++id, name: "Math 02", status: "available" },
  { id: ++id, name: "English 01", status: "available" },
  { id: ++id, name: "English 02", status: "available" },
  { id: ++id, name: "Chemistry 02", status: "available" },
];

module.exports.find = (callback) => {
  callback(null, ListData);
};
module.exports.findById = (id, callback) => {
  callback(
    null,
    ListData.find((item) => item.id == id)
  );
};
module.exports.save = (course, callback) => {
  let { name, status } = course;
  if (!name || !status) {
    callback({ message: "Course is invalid!" });
    return;
  }
  course = {
    id: Date.now(),
    name,
    status,
  };
  ListData.push(course);
  callback(null, course);
};
module.exports.delete = (id, callback) => {
  let roweffected = ListData.length;
  ListData = ListData.filter((item) => item.id != id);
  roweffected = roweffected - ListData.length;
  callback(null, { roweffected });
};
module.exports.update = (id, course, callback) => {
  let oldCourse = ListData.find((item) => item.id == id);
  if (!oldCourse) {
    callback("Course not found!");
    return;
  }
  let index = ListData.indexOf(oldCourse);
  Object.assign(oldCourse, course);
  ListData.fill(oldCourse, index, ++index);
  callback(null, oldCourse);
};
