import { Schedule, Subject, Teacher, } from "./models";
import { connectToDB } from "./utils";


export const fetchStudents = async () => {

  try {
    connectToDB();
    const users = await Teacher.find()

    return { users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchTeachers = async (page: number, q: string, s: string) => {
  const ITEM_PER_PAGE = 6;
  const regex = new RegExp(q, "i")
  const regex1 = new RegExp(s, "i")

  try {
    connectToDB();
    const count = await Teacher.find({ username: { $regex: regex } }).countDocuments();
    const teachers = await Teacher.find({ username: { $regex: regex }, subject: { $regex: regex1 } })

      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { teachers, count };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchTeacher = async (id: string) => {
  try {
    const teacher = await Teacher.findById(id)

    return { teacher };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchAllTeachers = async () => {
  try {
    const teacher = await Teacher.find()
    return teacher;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchSubjects = async (page: number, q: string) => {
  const ITEM_PER_PAGE = 6;
  const regex = new RegExp(q, "i");

  try {
    connectToDB();
    const count = await Subject.find({ subject: { $regex: regex } }).countDocuments();
    const subjects = await Subject.find()
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { subjects, count };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
}

export const fetchSchedule = async (q: string, s: string ) => {
  //const ITEM_PER_PAGE = 6;
  const regex = new RegExp(q, "i")
  const regex1 = new RegExp(s, "i")

  try {
    connectToDB();
    //const count = await Schedule.find({ subject: { $regex: regex } }).countDocuments();
    const schedule = await Schedule.find({day: { $regex: regex }, subject: { $regex: regex1 }})

      // .limit(ITEM_PER_PAGE)
      // .skip(ITEM_PER_PAGE * (page - 1));
    return schedule;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch Schedule!");
  }
}
