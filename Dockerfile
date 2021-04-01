FROM hayd/ubuntu-deno
LABEL mantainer="Vincenzo Palazzo vincenzopalazzodev@gmail.com"

RUN deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.23/cli.ts

WORKDIR /lnwebapp

COPY . .

## The production mode has some problem such as the following issue
# https://github.com/alephjs/aleph.js/issues/211
CMD [ "aleph", "dev" ]