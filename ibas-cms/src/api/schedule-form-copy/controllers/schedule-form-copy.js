// 'use strict';

// /**
//  *  schedule-form-copy controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::schedule-form-copy.schedule-form-copy');


'use strict';

/**
 *  homepage controller
 */

const schema = require("../content-types/schedule-form-copy/schema.json");
const createPopulatedController = require("../../../helpers/populate");
module.exports = createPopulatedController("api::schedule-form-copy.schedule-form-copy", schema);
