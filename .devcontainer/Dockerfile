FROM quay.io/ukhomeofficedigital/hof-nodejs:24.19.0-alpine3.24-v2@sha256:2cb5ad2a042e372a063d16af5b4f05656f3ba1adba5b09a402254b57cef69409

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
  adduser --system nodejs --uid 999 --home /app/ && \
  chown -R 999:998 /app/

USER 999

WORKDIR /app
