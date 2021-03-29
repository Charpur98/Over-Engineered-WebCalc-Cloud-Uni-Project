FROM node:10

RUN apt-get update -y && apt-get install -y python3-pip python
WORKDIR /app
RUN pip3 install Flask

COPY ./src /app

EXPOSE 80

ENTRYPOINT ["python3"]
CMD ["app.py"]
