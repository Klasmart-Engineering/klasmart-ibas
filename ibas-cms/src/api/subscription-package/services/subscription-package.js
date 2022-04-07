'use strict';

/**
 * subscription-package service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::subscription-package.subscription-package');
