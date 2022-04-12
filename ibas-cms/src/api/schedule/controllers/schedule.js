'use strict';
const { Parser } = require("json2csv");
/**
 *  schedule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::schedule.schedule');

module.exports = createCoreController('api::schedule.schedule', ({ strapi }) =>  ({
    download: async (ctx) => {
        const { start = null, end = null } = ctx.query;
    
        const filter = {};
        if (start) filter["date_gte"] = start;
        if (end) filter["date_lte"] = end;
    
    
        const schedules = await strapi.db.query('api::schedule.schedule').findMany({
            select: ["id", "parent_name", "email", "phone", "date", "time", "children"]
        });

        const formatedSchedules = [];
        schedules.map((schedule) => {
          const { children = [] } = schedule;
    
          children.forEach((child, i) => {
            formatedSchedules.push({
              id: `${schedule.id}-${i + 1}`,
              parent_name: schedule.parent_name,
              parent_email: schedule.email,
              parent_number: schedule.phone,
              date: schedule.date,
              time: schedule.time,
              child_name: child.name,
              child_age: child.age,
              child_grade: child.grade,
              child_school_name: child.school_name,
            });
          });
        });
    
        const fields = [
          {
            label: "#ID",
            value: "id",
          },
          {
            label: "Parent Name",
            value: "parent_name",
          },
          {
            label: "Email",
            value: "parent_email",
          },
          {
            label: "Phone",
            value: "parent_number",
          },
          {
            label: "Date",
            value: "date",
          },
          {
            label: "Time",
            value: "time",
          },
          {
            label: "Child Name",
            value: "child_name",
          },
          {
            label: "Child Age",
            value: "child_age",
          },
          {
            label: "Child Grade",
            value: "child_grade",
          },
          {
            label: "School Name",
            value: "child_school_name",
          },
        ];
        
        const parser = new Parser({ fields: fields });
        const csv = parser.parse(formatedSchedules);
    
        ctx.attachment = `schedules-${new Date().getTime()}.csv`
        ctx.type = "text/csv"
        ctx.send(csv);
      },
}));
