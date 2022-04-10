'use strict';

/**
 *  seo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::seo.seo');

// const { createCoreController } = require('@strapi/strapi').factories;
// module.exports = createCoreController('api::seo.seo', ({ strapi }) =>  ({
//     // Method 2: Wrapping a core action (leaves core logic in place)
//     async find(ctx) {
//         // some custom logic here
//         ctx.query = { ...ctx.query, local: 'en' }
        
//         // Calling the default core action
//         const { data, _ } = await super.find(ctx);

//         let response = data[0]["attributes"]
//         response["image"] = response["image"]["data"]["attributes"]

//         return [response];
//     }
//   }));