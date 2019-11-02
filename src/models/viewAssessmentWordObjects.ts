import { WordData } from "./wordData";
import { UUID } from "angular2-uuid";

export class ViewAssessmentWordObjects {
  assessmentWordObjectId: UUID = "uuid number";
  wordData: WordData = new WordData();
  testArrayKnown: Array<boolean> = [false];
  stringKnownArray: Array<String> = ["k1", "k2"];
  totalKnownTime: number = 0;
  totalTest: number = 0;
  wordAdded: boolean = false;
  wordType: String = "word type";
  constructor() {
    this.assessmentWordObjectId = UUID.UUID();
  }
}
