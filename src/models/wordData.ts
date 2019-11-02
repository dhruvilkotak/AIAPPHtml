import { Component } from "@angular/core";
import { File } from "@ionic-native/File";
import { UUID } from "angular2-uuid";

export class WordData {
  wordId: String = " word Id";
  wordText: String = " word text";
  wordCategory: String = "word category";
  constructor() {
    this.wordId = UUID.UUID();
  }
}
