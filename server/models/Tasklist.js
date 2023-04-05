const { Schema, model } = require("mongoose");

const taskListSchema = new Schema({
  listName: {
    type: String,
    required: true,
    trim: true,
  },

  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

 

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  users: [User.schema],

});

taskList.methods.countTasks = function() {
  const filteredList = taskListSchema.tasks.filter(task => task.taskComplete === true);
  return filteredList.length;
};

const Tasklist = model("Tasklist", taskListSchema);

module.exports = Tasklist;
