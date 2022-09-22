[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# robot-svarut

Sends messages via SvarUt

## Setup

Update docker.env with correct settings

```bash
CALLBACK_DIRECTORY_PATH=/src/test/directories/callback
DONE_DIRECTORY_PATH=/src/test/directories/done
ERRORS_DIRECTORY_PATH=/src/test/directories/errors
QUEUE_DIRECTORY_PATH=/src/test/directories/queue
RUNNING_DIRECTORY_PATH=/src/test/directories/running
RETRY_DIRECTORY_PATH=/src/test/directories/retries
JWT_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
SVARUT_SERVICE_URL=https://service.svarut.no
PAPERTRAIL_HOST=https://logs.collector.solarwinds.com/v1/log
PAPERTRAIL_TOKEN=secret token
NODE_ENV=production
EMANUEL_TEAMS_WEBHOOK=webhook-url
OVERRIDE_RECIPIENTS=false
OVERRIDE_RECIPIENTS_ADDRESSES=personalIdNumber,personalIdNumber
```

## Build

```bash
$ docker build -t robot-svarut .
```

## Usage

```
$ docker run --env-file=docker.env --volume=/test/data/directories/queue:/src/test/directories/queue --rm robot-svarut
```

This will start a container. Do the job. Stop the container and remove it.

## License

[MIT](LICENSE)
