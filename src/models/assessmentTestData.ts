import { WordData } from "./wordData";

export class AssessmentTestData {
  testIndex: number = 0;
  testStatus: boolean = false;
  totalWordList: number = 0;
  knownWordList: Array<WordData> = [new WordData()];
  unknownWordList: Array<WordData> = [new WordData()];
  consistancyPercentage = 0;
  constructor(testIndex: number) {
    this.testIndex = testIndex;
  }
}
