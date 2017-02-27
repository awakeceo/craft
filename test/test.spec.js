// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var $ = require('jquery');
var jq = require('chai-jquery');
var driver = new sw.Builder()
    .withCapabilities(sw.Capabilities.chrome())
    .build();

// And then...
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));
var expect = chai.expect;
var assert = chai.assert;
var jsdom = require('mocha-jsdom');
// And you're good to go!
var actions = driver.actions();
// jsdom();

describe("Page globals", function(){
    driver.get('localhost:3000');
   it('Нет вылезающих за overflow элементов', function() {
       expect(function() {
           var docWidth = document.documentElement.offsetWidth;
           var els = [];
           [].forEach.call(
               document.querySelectorAll('*'),
               function(el) {
                   if (el.offsetWidth > docWidth) {
                       els.push(el);
                   }
               }
           );
           return els.length === 0;
       }).to.be.true;
   })
});

describe("Header", function() {
    driver.get('localhost:3000');
    it('Header is full width (css)', function() {
        expect('#primary-nav').dom.to.have.style('width', '100%');
    });
    it('Header is full width (js)', function() {
        var header = driver.findElement(sw.By.css("#primary-nav")).offsetWidth;
        var docWidth = document.documentElement.offsetWidth;
        //expect(header).to.equal(docWidth);
        expect(function(){ return header === docWidth }).to.be.true;
    });
    it('Header elements has dropdowns', function() {
        var ele =  driver.findElement(sw.By.css('#primary-nav>li.has-dropdown'));
        actions.mouseMove(ele);
        expect('#primary-nav.dropdown').dom.to.have.style('visibility', 'visible');
    });
});