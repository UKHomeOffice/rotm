FROM fedora:22

RUN dnf upgrade -y -q && dnf clean all
RUN dnf install -y -q nginx && dnf clean all

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-local-dev.conf /etc/nginx/nginx-local-dev.conf
COPY run.sh /run.sh
RUN chmod +x /run.sh

EXPOSE 80 443
CMD /run.sh
