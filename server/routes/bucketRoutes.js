const express = require("express");
const {
  fetchBuckets,
  createBucket,
  deleteBucket,
  removeTask,
  taskDone,
  addtask,
} = require("../controllers/bucketcontroller");

const bucketRouter = express.Router();

bucketRouter.get("/", fetchBuckets);
bucketRouter.post("/new-bucket", createBucket);
bucketRouter.post("/delete-bucket", deleteBucket);
bucketRouter.post("/delete-task", removeTask);
bucketRouter.post("/task-done", taskDone);
bucketRouter.post("/add-task", addtask);

module.exports = { bucketRouter };
