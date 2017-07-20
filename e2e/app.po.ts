import { browser, by, element } from 'protractor';

export class TesisDgiClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dgi-root h1')).getText();
  }
}
