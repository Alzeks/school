import mongoose from "mongoose";


const teacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20, },
    password: { type: String, required: true, },
    lastname: { type: String, },
    img: { type: String, },
    isActive: { type: Boolean, default: true, },
    phone: { type: String, },
    address: { type: String, },
    subject: { type: String, },
  },
  { timestamps: true }
);

const subjectSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, unique: true, min: 3, max: 20, },
    teacher: {type: String},
    img: { type: String, },
  },
  { timestamps: true }
);

const scheduleSchema = new mongoose.Schema(
  {
    clas: { type: String, required: true, min: 3, max: 5 },
    subject: {type: String, required: true},
    day: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: { type: String, required: true},
  },
  { timestamps: true }
);

export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
export const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
export const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);
