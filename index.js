const express = require("express");
const { route } = require("express/lib/application");
const courseRouter = require("./routes/courseRouter");

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/courses", courseRouter);

// ASSIGN PORT
const PORT = process.env.PORT || 3000;
// START SERVER
app.listen(`${PORT}`, () => console.log(`Server running on ${PORT}`));

// app.get("/", returnHome);
// app.get("/api/courses", getAllCourses);
// app.get("/api/courses/:id", getCourse);
// app.post("/api/courses", addCourse);
// app.put("/api/courses/:id", editCourse);
// app.delete("/api/courses/:id", deleteCourse);
