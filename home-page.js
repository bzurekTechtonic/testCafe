import { Selector } from 'testcafe';

export default class HomePage {
  constructor() {
    this.contactUs = Selector('a').withAttribute('data-cy', 'navbar-contact-us-button-desktop');
  }
}