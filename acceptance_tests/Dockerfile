FROM ruby:2.2.1

COPY . ./
RUN bundle install
RUN apt-get update && \
    apt-get install -y build-essential chrpath libssl-dev libxft-dev && \
    apt-get install -y libfreetype6 libfreetype6-dev && \
    apt-get install -y libfontconfig1 libfontconfig1-dev


RUN export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64" && \
    curl -L -O https://bitbucket.org/ariya/phantomjs/downloads/${PHANTOM_JS}.tar.bz2

RUN export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64" && \
    tar xvjf ${PHANTOM_JS}.tar.bz2 && \
    mv ${PHANTOM_JS} /usr/local/share && \
    ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin

CMD ["cucumber"]

