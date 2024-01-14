import ICreateStyle from "../types/createStyle.interface";

export default class CreateStyle implements ICreateStyle {
  addStyle(style: string) {
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(style);

    return sheet;
  }
}