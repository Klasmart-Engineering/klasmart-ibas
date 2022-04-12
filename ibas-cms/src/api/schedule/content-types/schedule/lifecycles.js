const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
    beforeUpdate(event) {
    //   const { data, where, select, populate } = event.params;
  
      if (!event.params.data.subscription_package){
        throw new ValidationError("subscription_package jangan null");
      }
      
    }
  };
  