export class ChatModel {
  constructor(public from?: string,
              public to?: string,
              public content?: string,
              public time?: Date) {
  }
}
