import { Selector } from 'testcafe';
import HomePage from './home-page';
import ContactUs from './contact-us';
import { people } from './people';

fixture `Getting Started`
  .page `techtonic.com`
  .beforeEach(async t => {
    t.ctx.peopleArr = await people();
  });

const hp = new HomePage;
const contact = new ContactUs;
const INQUIRY = 3;
const MESSAGE = 4;

test('section and div have id or class', async t => {
  const div = Selector('div');
  const section = Selector('section');
  const sectCount = await section.count;
  const divCount = await div.count;

  for(let i = 0; i < sectCount; i++) {
    await t
      .expect(section.nth(i).hasAttribute('class')).ok('Section didn\'t have an id or class');
  }

  for(let i = 0; i < divCount; i++) {
    await t
      .expect(div.nth(i).hasAttribute('class')).ok(`${div.nth(i)} div didn\'t have a class attribute`);
  }
  
});

test('Contact form fill', async t => {
  await t.click(hp.contactUs);

  let size = await contact.inputEl.count;
  
  for(let i = 0; i < t.ctx.peopleArr.length; i++) {
    const values = [];

    for(let k = 0; k < Object.values(t.ctx.peopleArr[i]).length; k++) {
      values.push(Object.values(t.ctx.peopleArr[i])[k]);
    }

    for(let j = 0; j < size; j++) {
      const dataAttr = await contact.inputEl.nth(j).getAttribute('data-cy');
      if(dataAttr) {
        await t
          .typeText(contact.inputEl.nth(j), values[j]);
          // .expect(contact.error.innerText).notOk('Incorrect Name or email');
      }
    }

    await t
      .click(contact.inquiryType)
      .click(contact.option.withAttribute('value', values[INQUIRY]))
      .typeText(contact.message, values[MESSAGE])
      .click(hp.contactUs);
  }
})
.after(async t => {
  console.dir(t.ctx.peopleArr);
});