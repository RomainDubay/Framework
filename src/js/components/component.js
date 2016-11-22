import $ from 'jquery';

export default class Component {

  constructor(context = document) {

  	let $body = $('body');

  	console.log($body);
  	console.log("working");
  }
}
