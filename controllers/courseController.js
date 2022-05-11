const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

exports.getAllCourses = (req, res) => {
  res.send(courses);
};

exports.getCourse = (req, res) => {
  const { id } = req.params;

  const course = courses.find((course) => course.id === parseInt(id));
  if (!course)
    return res.send({
      statusCode: 404,
      message: `course with given id ${id} not found`,
    });
  res.send(course);
};

exports.createCourse = (req, res) => {
  const name = req.body.name;

  const { error } = validateCourse(req.body.name);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(course);
  res.send(course);
};

exports.editCourse = (req, res) => {
  const name = req.body.name;
  const id = req.params.id;

  let course = courses.find((course) => course.id === parseInt(req.params.id));
  // Look up course
  if (!course) return res.status(404).send("Course doesn't not exist");

  // Validate, if invalid return 400 - Bad Request
  const { error } = validateCourse(req.body.name);

  if (error)
    return res.send({ status: 400, message: error.details[0].message });

  // Update, return updated course to the client

  const index = courses.indexOf(course);

  course.name = req.body.name;

  res.send(course);
};

exports.deleteCourse = (req, res) => {
  // check if exists. if not return a 404 DNE
  let course = courses.find((course) => course.id === parseInt(req.params.id));
  if (!course)
    return res.send({ status: 404, message: "Course does not not exist" });

  courses.splice(courses.indexOf(course), 1);
  // console.log(courses);

  res.send({ status: 200, message: "Course has been deleted" });
};

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
  });

  return schema.validate({ name: course });
};
