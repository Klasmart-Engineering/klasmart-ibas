'use strict';

/**
 *  homepage controller
 */

const schema = require("../content-types/homepage/schema.json");
const createPopulatedController = require("../../../helpers/populate");
module.exports = createPopulatedController("api::homepage.homepage", schema);
