FROM ruby:3.0.3

RUN apt-get update && apt-get install -y npm && npm install -g yarn

RUN mkdir /rorBooks
WORKDIR /rorBooks

ADD Gemfile /rorBooks/Gemfile
ADD Gemfile.lock /rorBooks/Gemfile.lock

RUN bundle install
ADD . /rorBooks