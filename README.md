# Report Online Terrorist Material (ROTM)

[![Docker Repository on Quay.io](https://quay.io/repository/ukhomeofficedigital/rotm/status "Docker Repository on Quay.io")](https://quay.io/repository/ukhomeofficedigital/rotm) [![Build Status](https://travis-ci.org/UKHomeOffice/rotm.svg?branch=master)](https://travis-ci.org/UKHomeOffice/rotm)

This project is built with [HOF](https://github.com/UKHomeOffice/hof) and uses [Docker](https://www.docker.com/).

## Getting started

Before choosing an installation option, make sure you have access to the Google Cloud reCAPTCHA project and have authenticated locally. Follow [these Google Cloud authentication steps](#google-cloud-and-recaptcha-access-for-local-development).

- [Install & run locally](#install--run-the-application-locally)
- [Install & run locally with Docker Compose](#install--run-the-application-locally-with-docker-compose)
- **Recommended:** [Install & run locally with VS Code Dev Containers](#install--run-the-application-locally-with-vs-code-dev-containers)
- [Install & run locally with Docker Compose and NGINX proxy (for smoke testing)](#install--run-the-application-locally-with-docker-compose-and-nginx-proxy)

### Dependencies

- This form is built using the [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [Google reCAPTCHA Enterprise](https://docs.cloud.google.com/recaptcha/docs/overview) to protect this service from spam, abuse and automated submissions

## Install & Run the Application locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) - for supported versions see `engines.node` in [package.json](package.json)
- [Redis server](http://redis.io/download) running on default port 6379

### Setup

1. Create a `.env` file in the root directory and populate it with all the required environment variables for the project.
2. Install dependencies using the command `yarn`.
3. Start the service in development mode using `yarn run start:dev`.

## Install & Run the Application locally with Docker Compose

You can containerise the application using [Docker](https://www.docker.com). The `.devcontainer` directory includes a `docker-compose.dev.yml` file for orchestrating multi-container application.

### Prerequisites

   - [Docker](https://www.docker.com)

### Setup

By following these steps, you should be able to install and run your application using a Docker Compose. This provides a consistent development environment across different machines and ensures that all required dependencies are available.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

3. Open a terminal, navigate to the project directory and run: `docker compose -f .devcontainer/docker-compose.dev.yml up -d`

4. Once the containers are built and started, you can go inside the app container: `docker exec -it devcontainer-hof-rotm-app-1 sh` (note: Docker containers may be named differently)

5. Run the following commands to install dependencies and start your application:
   ```bash
   $ yarn
   $ yarn start:dev
   ```


## Install & Run the Application locally with VS Code Dev Containers

The recommended way to run the application locally is with [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/). If you do not already use [Visual Studio Code](https://code.visualstudio.com/), you can choose one of the other installation options above.

The `.devcontainer` folder provides a consistent development environment and is configured to mount your Google Cloud Application Default Credentials.

### Prerequisites
   - [Docker](https://www.docker.com)
   - [VS Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention

### Setup

By following these steps, you should be able to run your application using a devcontainer in VS Code. The Dev Containers extension lets you use a Docker container as a full-featured development environment. This provides a consistent development environment across different machines and ensures that all required dependencies are available. A `devcontainer.json` file in this project tells VS Code how to access (or create) a development container with a well-defined tool and runtime stack.

1. Make sure you have Docker installed and running on your machine. Docker is needed to create and manage your containers.

2. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extention in VS Code. This extension allows you to develop inside a containerised environment.

3. To configure your dev environment, copy `/.devcontainer/devcontainer.env.sample` to `devcontainer.env` in the same directory and fill in the necessary values. This ensures your development container is set up with the required environment variables.

4. Run the `Dev Containers: Open Folder in Container...` command from the Command Palette (F1) or click on the Remote Indicator (≶) in the status bar. This command will build and start the devcontainer based on the configuration files in the `.devcontainer` folder.

5. Once the devcontainer is built and started, you will be inside the containerised environment. You can now work on your project as if you were working locally, but with all the necessary dependencies and tools installed within the container.

6. To start the application, open a terminal within VS Code by going to `View -> Terminal` or by pressing `Ctrl+backtick`. In the terminal, navigate to the project directory if you're not already there.

7. Run the following commands in the VS Code terminal to install dependencies and start your application:
   ```bash
   $ yarn
   $ yarn start:dev
   ```


## Install & Run the Application locally with Docker Compose and NGINX proxy

[Install Docker Compose](https://docs.docker.com/compose/install/)

This option is useful for smoke testing or reproducing the full application stack behind the NGINX proxy, but is not recommended for day-to-day local development. The root [docker-compose.yml](docker-compose.yml) starts the application, Redis, MailDev and the NGINX proxy. The application image installs production dependencies using the frozen lockfile and starts the server without watching for source changes. For day-to-day development, use the [local installation](#install--run-the-application-locally) or [VS Code Dev Containers](#install--run-the-application-locally-with-vs-code-dev-containers) option instead.

Run the services locally with Docker Compose:
```bash
$ docker compose up --build
```

The application is available at `http://localhost:8080` and through the NGINX proxy at `http://localhost`. MailDev is available at `http://localhost:8000`.

### Google Cloud and reCAPTCHA access for local development

To run this project locally, you need access to the Google Cloud reCAPTCHA project.
If you do not already have access, contact the repository maintainers for onboarding guidance.

After access is granted, install the Google Cloud CLI locally and authenticate:

```bash
$ gcloud init
```

Follow the interactive instructions, then run:

```bash
$ gcloud auth application-default login
```

This creates an application default credentials file that the Google client libraries
use to authenticate before making API requests.

On Linux/macOS, the file is typically created at:

```text
~/.config/gcloud/application_default_credentials.json
```

If your local setup differs, use your Google Cloud CLI config path equivalent.

### Environment variables
You'll need to set the following env vars to run the application:

Variable                       | Description
---                            | ---
SESSION_SECRET                 | 32 bytes value for encryption compatibility
NOTIFY_KEY                     | Your GOV.UK notify key
NOTIFY_TEMPLATE                | GOV.UK notify template ID for user authorisation email
CASEWORKER_EMAIL               | Caseworker email
REFERRALS_EMAIL                | Referrals email
AWS_SECRET_ACCESS_KEY          | AWS Secret Access Key
AWS_ACCESS_KEY_ID              | AWS Access Key ID
FILE_VAULT_URL                 | The url that the file-vault service is running on
KEYCLOAK_TOKEN_URL             | The url of the keycloak server
KEYCLOAK_CLIENT_ID             | The client name used to authenticate with keycloak
KEYCLOAK_SECRET                | The secret used to authenticate with the keycloak client
KEYCLOAK_USERNAME              | Administrator username to authenticate with the keycloak client
KEYCLOAK_PASSWORD              | Administrator password used to authenticate with the keycloak client
RECAPTCHA_SITE_KEY_SCORE       | Recaptcha SCORE site key
RECAPTCHA_SITE_KEY_CHECKBOX    | Recaptcha CHECKBOX site key
RECAPTCHA_PROJECT_ID           | Recaptcha project ID
RECAPTCHA_THRESHOLD            | Recaptcha threshold (defaults to 0)

To set up HAProxy and Openresty, you will need to set the following environment variables in your openresty deployment kube file:

Variable                       | Description
---                            | ---
HAPROXY_UPSTREAM               | HAProxy upstream configuration
HAPROXY_UPSTREAM_SSL           | HAProxy upstream configuration
WAF_ADMIN_SALT                 | 32+ character random salt for password hashing
WAF_ADMIN_PASSWORD             | WAF Admin UI password

### Testing

#### Linting Tests
`$ yarn test:lint`

#### Unit Tests
`$ yarn test:unit`

### Additional information

For anything else ROTM-related, look in [package.json](./package.json) for a full list of scripts etc, and
[config.js](./config.js) for environment variables.

Otherwise, see [HOF](https://github.com/UKHomeOffice/hof).

### Microservices / Repos <a name="microservices-repos"></a>

These are the microservices used as part of ROTM:

* [File-vault](https://github.com/UKHomeOffice/file-vault) - A simple REST service that allows POSTing a file to an S3 bucket.
* [HOF Docker HAproxy](https://github.com/UKHomeOffice/hof-docker-haproxy) - Global rate limiting with stick-table sync
* [HOF Forms WAF](https://github.com/UKHomeOffice/hof-forms-waf) - A comprehensive, multi-layer spam protection system for web forms using OpenResty (Lua) for intelligent form analysis. Features a modern React-based Admin UI for real-time configuration management.
