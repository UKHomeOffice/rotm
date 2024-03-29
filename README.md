# Report Online Terrorist Material (ROTM)

[![Docker Repository on Quay.io](https://quay.io/repository/ukhomeofficedigital/rotm/status "Docker Repository on Quay.io")](https://quay.io/repository/ukhomeofficedigital/rotm) [![Build Status](https://travis-ci.org/UKHomeOffice/rotm.svg?branch=master)](https://travis-ci.org/UKHomeOffice/rotm)

This project is built with [HOF](https://github.com/UKHomeOffice/hof) and uses [Docker](https://www.docker.com/).

## Getting started

Get the project from GitHub
```bash
$ git clone git@github.com:UKHomeOffice/rotm.git && cd rotm
```

Install the dependencies and build the project resources
```bash
$ yarn
```

[Install Docker Compose](https://docs.docker.com/compose/install/)

Run the services locally with Docker Compose
```bash
$ docker-compose up
```

Getting your hands dirty (You'll need [Redis](http://redis.io/) for this)
```bash
$ yarn start:dev
```

For anything else ROTM-related, look in [package.json](./package.json) for a full list of scripts etc, and
[config.js](./config.js) for environment variables.

Otherwise, see [HOF](https://github.com/UKHomeOffice/hof).

## Running acceptance tests

To run the acceptance test

```bash
$ yarn test:acceptance
```

To run a test by tag, add a tag to your test e.g. @links and run the following command

```bash
$ yarn test:cucumber @links
```

To run a test by it's name (or grep) e.g. if the test has `I can select the 'back' button`

```bash
$ yarn test:cucumber-name "I can select the 'back' button"
```
