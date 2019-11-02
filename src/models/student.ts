import { StudentWordDetails } from "./StudentWordDetails";
import { StudentData } from "./StudentData";

export class Student {
  studentData: StudentData = new StudentData();
  studentWordDetailsArray: Array<StudentWordDetails> = [
    new StudentWordDetails("word"),
    new StudentWordDetails("math")
  ];
}
