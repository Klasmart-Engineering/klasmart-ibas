'use strict';

/**
 *  homepage controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::homepage.homepage', ({ strapi }) => ({
  // wrap a core action, leaving core logic in place
  async find(ctx) {
    // some custom logic here
    const populateList = [
        'shared.faq-content',
        'Header.buttons',
        'Clients.clients'
    ]
    // Push any additional query params to the array
    populateList.push(ctx.query.populate)
    ctx.query.populate = populateList.join(',')

    const content = await super.find(ctx)
    return content
  },
}));

