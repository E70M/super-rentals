import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

let StubMapsService = Service.extend({
  getMapElement() {
    return Promise.resolve(document.createElement('div'));
  }
});

module('Integration | Component | rental-listing', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:map-element', StubMapsService);
    this.rental = EmberObject.create({
      image: 'fake.png',
      title: 'test-title',
      owner: 'test-owner',
      type: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
  });

  test('should display rental details', async function(assert) {
    await render(hbs`<RentalListing @rental={{this.rental}} />`);
    assert.equal(this.element.querySelector('.listing h3').textContent.trim(), 'test-title', 'Title: test-title');
    assert.equal(this.element.querySelector('.listing .owner').textContent.trim(), 'Owner: test-owner', 'Owner: test-owner');
  });

  test('should toggle wide class on click', async function(assert) {
    await render(hbs`<RentalListing @rental={{this.rental}} />`);
    assert.notOk(this.element.querySelector('.image.wide'), 'initially rendered small');
    await click('.image');
    assert.ok(this.element.querySelector('.image.wide'), 'rendered wide after click');
    await click('.image');
    assert.notOk(this.element.querySelector('.image.wide'), 'rendered small after second click');
  });
});