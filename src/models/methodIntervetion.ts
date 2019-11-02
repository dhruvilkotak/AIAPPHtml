import { MethodSession } from "./methodIntervetionSession";

export class Method {
  methodName: string;
  methodIndex: number = 0;
  totalSessions: number = 0; // total completed sessions
  sessionsArray: Array<MethodSession> = []; // number of sessions
  ratio1: number = 0;
  ratio2: number = 0;
  totalOppurtunitiesToRespond: number = 0;
  constructor(methodName: string, methodIndex: number) {
    this.methodName = methodName;
    this.methodIndex = methodIndex;
    if (methodIndex == 0) {
      this.ratio1 = 5;
      this.ratio2 = 6;
    } else if (methodIndex == 1) {
      this.ratio1 = 6;
      this.ratio2 = 6;
      this.totalOppurtunitiesToRespond = 120;
    } else if (methodIndex == 2) {
      this.ratio1 = 31;
      this.ratio2 = 4;
    } else {
      this.ratio1 = 1;
      this.ratio2 = 1;
    }
  }
}
