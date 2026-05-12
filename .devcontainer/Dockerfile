FROM quay.io/ukhomeofficedigital/hof-nodejs:20.20.2-alpine3.23@sha256:bcd17b68a0f1910f1670b07f6a47d1e2c28291bafc219807c494dc62b57ea25e

USER root

# Update packages as a result of Anchore security vulnerability checks
RUN apk update && \
    apk upgrade --no-cache


# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
