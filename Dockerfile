FROM hayd/ubuntu-deno
LABEL mantainer="Vincenzo Palazzo vincenzopalazzodev@gmail.com"

RUN deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.15/cli.ts

WORKDIR /lnwebapp

COPY . .

CMD [ "aleph", "dev" ]