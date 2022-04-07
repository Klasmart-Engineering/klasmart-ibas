'use strict';

/**
 * subscription-package router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::subscription-package.subscription-package');
