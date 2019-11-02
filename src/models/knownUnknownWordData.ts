import { WordData } from "./wordData";

export class KnownUnknownWordData {
  wordData: WordData = new WordData();
  postAssessmentCounter: number = 0;
  methodIndex: number = 0;
  methodName: string = "";
  wordId: String;
}
