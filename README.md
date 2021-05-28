# ln-sanitycheck

# Table of Content

- Introduction
- Build
- Demo
- License

# Build

## Required Deno

Not ready to build, but if you want play you can build it with the following dependences

#### System dependences

- [Deno](https://deno.land/manual/getting_started/installation)
- Aleph.js with the following command `deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.31/cli.ts`

#### C-Lightning dependences

- [lightning-rest](https://github.com/clightning4j/lightning-rest)

#### Run the server

```bash
git clone https://github.com/clightning4j/ln-sanitycheck.git
cd ln-sanitycheck
aleph start
```

#### With Docker and Docker Compose

```bash
git clone https://github.com/clightning4j/ln-sanitycheck.git
cd ln-sanitycheck
docker-compose up --build
```

# Demo

A demo is available at the [following link](https://bruce.bublina.eu.org/)

# License

TODO