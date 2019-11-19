import axios from 'axios';

const url = 'https://swapi.co/api/';

export const people = async _=> {
  const personObjArr = [];

  const { data } = await axios.get(`${url}people`);

  for(let i = 0; i < data.results.length; i++) {
    const fullName = data.results[i].name;
    const nameArr = fullName.split(' ');
    const person = {};

    person.first = nameArr[0];

    if(nameArr.length === 2) {
      person.last = nameArr[1];
    }
    else {
      person.last = 'StarWars';
    }
    person.email = `${nameArr[0]}.${nameArr[1]}@starwars.com`;
    person.inquiryType = randomInquiryValue();
    person.message = "Lorem ipsum dolor sit amet";
    personObjArr.push(person);
  }

  return personObjArr;
};

const randomInquiryValue = _=> {
  const values = ['info', 'sales', 'jobs', 'apprentice'];
  const rand = Math.floor(Math.random() * 4);
  return values[rand];
};