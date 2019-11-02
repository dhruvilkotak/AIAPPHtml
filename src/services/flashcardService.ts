import { TextToSpeech } from "@ionic-native/text-to-speech";
import math from "mathjs";
export class FlashcardService {
  textToSpeechWordData(text: string, tts: TextToSpeech, showAnswer: boolean) {
    console.log("text:" + text);
    var speaktext: string = text.replace("/", "÷").replace("-", " minus ");
    if (showAnswer) speaktext = speaktext + " = " + this.getAnswer(text);

    tts
      .speak(speaktext + "")
      .then(() => console.log("Success"))
      .catch((reason: any) => console.log(reason));
  }

  getAnswer(equation: string) {
    return math.eval(equation.replace("x", "*").replace("X", "*"));
  }

  convertTextToMath(mathString: String) {
    var operation: string = "";
    var number1: string = "";
    var number2: string = "";

    var separators = [
      " ",
      "\\+",
      "-",
      "\\(",
      "\\)",
      "\\*",
      "/",
      ":",
      "\\?",
      "x",
      "X"
    ];
    var result = mathString.split(new RegExp(separators.join("|"), "g"));
    if (result.length == 2) {
      operation = mathString.charAt(result[0].length);
      if (operation == "*" || operation == "x") operation = "X";
      else if (operation == "/") operation = "÷";

      number1 = result[0];
      number2 = result[1];
    }
    return {
      result: result,
      operation: operation,
      number1: number1,
      number2: number2
    };
  }
}
