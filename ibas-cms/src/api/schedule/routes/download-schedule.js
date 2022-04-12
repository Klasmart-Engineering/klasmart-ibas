module.exports = {
    routes: [
        {
            "method": "GET",
            "path": "/download_schedules",
            "handler": "schedule.download",
            "config": {
              "policies": []
            }
        }
    ]
  }
  