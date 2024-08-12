const { BucketItem } = require("../models/schema");

const handleErro = (err) => {
  const error = {
    title: "",
    step: "",
    tobedoneAt: "",
  };
  if (err.message.includes("bucket validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const fetchBuckets = async (req, res) => {
  try {
    const bucket = await BucketItem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(bucket);
  } catch (error) {
    console.log(error.message);
  }
};
const createBucket = async (req, res) => {
  const steps = req.body.steps.map((x) => {
    return {
      step: x,
      done: false,
    };
  });
  const item = {
    user: req.user._id,
    title: req.body.title,
    description: req.body.description,
    steps,
    tobedoneAt: req.body.expectedFinishDate,
  };
  try {
    const bucketItem = await BucketItem.create(item);
    res.status(200).json(bucketItem);
  } catch (error) {
    const err = handleErro(error);
    res.status(400).json(err);
  }
};
const deleteBucket = async (req, res) => {
  try {
    const deleted = await BucketItem.findByIdAndDelete(req.body._id).select(
      "_id"
    );
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error.message);
  }
};
const removeTask = async (req, res) => {
  console.log("remove task");
  const date = new Date();
  try {
    const item = await BucketItem.findByIdAndUpdate(
      req.body.item_id,
      { $pull: { steps: { _id: req.body.task_id } } },
      { new: true }
    );
    const meter = Math.round(
      (item.steps.filter((step) => step.done === true).length /
        item.steps.length) *
        100
    );
    item.meter = meter;
    if (item.meter == 100) {
      item.doneAt = date;
    }
    await item.save();
    res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
  }
};
const taskDone = async (req, res) => {
  console.log("task done");
  const date = new Date();
  try {
    const updateditem = await BucketItem.findOneAndUpdate(
      { _id: req.body.item_id, "steps._id": req.body.task_id },
      { $set: { "steps.$.done": true, "steps.$.finishedAt": date } },
      { new: true }
    );
    const meter = Math.round(
      (updateditem.steps.filter((step) => step.done === true).length /
        updateditem.steps.length) *
        100
    );
    updateditem.meter = meter;
    if (meter == 100) {
      updateditem.doneAt = date;
    }
    await updateditem.save();
    res.status(200).json(updateditem);
  } catch (error) {
    console.log(error.message);
  }
};
const addtask = async (req, res) => {
  const step = {
    step: req.body.step,
    done: false,
    finishedAt: null,
  };
  try {
    const updateditem = await BucketItem.findByIdAndUpdate(
      req.body.bucket_id,
      { $push: { steps: step } },
      { new: true }
    );
    const meter = Math.round(
      (updateditem.steps.filter((step) => step.done === true).length /
        updateditem.steps.length) *
        100
    );
    updateditem.meter = meter;
    if (meter < 100) {
      updateditem.doneAt = null;
    }
    await updateditem.save();
    res.status(200).json(updateditem);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  fetchBuckets,
  createBucket,
  deleteBucket,
  removeTask,
  taskDone,
  addtask,
};
