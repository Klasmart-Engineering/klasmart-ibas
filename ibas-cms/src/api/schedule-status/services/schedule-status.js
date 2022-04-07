'use strict';

/**
 * schedule-status service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::schedule-status.schedule-status');
