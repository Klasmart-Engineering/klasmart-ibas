'use strict';

/**
 * schedule-allocation service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::schedule-allocation.schedule-allocation');
