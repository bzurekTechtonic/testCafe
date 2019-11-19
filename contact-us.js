import { Selector } from 'testcafe';

export default class ContactUs {
  constructor() {
    this.contactForm = Selector('form');
    this.inputEl = Selector('input');
    this.message = Selector('textarea');
    this.inquiryType = Selector('select');
    this.option = Selector('option');
    this.error = Selector('.field').child(2);
  }
}