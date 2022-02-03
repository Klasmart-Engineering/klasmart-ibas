"use strict";
const { Parser } = require("json2csv");

module.exports = {
  download: async (ctx) => {
    const { start = null, end = null } = ctx.query;

    const filter = {};
    if (start) filter["date_gte"] = start;
    if (end) filter["date_lte"] = end;

    console.log(filter);

    const schedules = await strapi.services.schedule.find(filter);

    const formatedSchedules = [];
    schedules.map((schedule) => {
      const { children = [] } = schedule;

      children.forEach((child, i) => {
        formatedSchedules.push({
          id: `${schedule.id}-${i + 1}`,
          booking_id: schedule.id,
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

    const json2csv = new Parser({ fields: fields });
    const csv = json2csv.parse(formatedSchedules);

    ctx.res.writeHead(200, {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=schedules-${new Date().getTime()}.csv`,
    });
    ctx.send(csv);
  },
};
