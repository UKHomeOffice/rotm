FROM quay.io/ukhomeofficedigital/hof-nodejs:24.19.0-alpine3.24-v3@sha256:20887d4a5a15886deb9653e96dc4393b10ad9c70cd8d134a43da6cee7ddd45f3

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
  adduser --system nodejs --uid 999 --home /app/ && \
  chown -R 999:998 /app/

USER 999

WORKDIR /app
