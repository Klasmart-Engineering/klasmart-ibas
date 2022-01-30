# Kidsloop Indonesia B2C Automation

B2C Sales Pipeline Automation for Indonesian Market

[![Built with Cookiecutter Django](https://img.shields.io/badge/built%20with-Cookiecutter%20Django-ff69b4.svg?logo=cookiecutter)](https://github.com/cookiecutter/cookiecutter-django/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)

## How do I get set up?

### Before you begin ###
Follow these steps to install the necessary tools:

* Install Docker Community Edition (CE) on your workstation. Depending on the OS, you may need to configure your Docker instance to use 4.00 GB of memory for all containers to run properly. Please refer to the Resources section if using Docker for Windows or Docker for Mac for more information.

* Install Docker Compose v1.29.1 and newer on your workstation.

* Older versions of docker-compose do not support all the features required by docker-compose.yaml file, so double check that your version meets the minimum version requirements.

### Set .env file
Set env vars value, copy the .env.example to .env files. Ask Indonesia team to set the values for each environment variables.

### Build the dockerize app
    $ docker-compose -f local.yml build

### Run the dockerize app
    $ docker-compose -f local.yml up


### Setting Up Your Users

-   To create a **normal user account**, just go to Sign Up and fill out the form. Once you submit it, you'll see a "Verify Your E-mail Address" page. Go to your console to see a simulated email verification message. Copy the link into your browser. Now the user's email should be verified and ready to go.

-   To create an **superuser account**, use this command:

    $ docker-compose -f local.yml run --rm django python manage.py createsuperuser

For convenience, you can keep your normal user logged in on Chrome and your superuser logged in on Firefox (or similar), so that you can see how the site behaves for both kinds of users.

### Type checks

Running type checks with mypy:

    $ docker-compose -f local.yml run --rm django mypy kidsloop_indonesia_b2c_automation

#### Running tests with pytest

    $ docker-compose -f local.yml run --rm django pytest

### Test coverage

To run the tests, check your test coverage, and generate an HTML coverage report:

    # run: $ docker-compose -f local.yml run --rm django coverage run -m pytest
    # run: $ docker-compose -f local.yml run --rm django coverage html
    # open file htmlcov/index.html

## Deployment

The following details how to deploy this application.

### Docker

See detailed [cookiecutter-django Docker documentation](http://cookiecutter-django.readthedocs.io/en/latest/deployment-with-docker.html).
