# Immutable.js + Promises

![screenshot-localhost-8080-2019 05 15-14-02-02](https://user-images.githubusercontent.com/11415818/57774141-0946ca00-771a-11e9-8cb4-a5ee4c403b17.png)

## Overview

The idea behind this project is to use the capabilities of dispatching Redux actions with Promises as
payloads, and then using Immutable.js to identify those payloads based on the meta params.

Essentially, each request is a collection of unique params: `{url, param1, ...}`. Using Immutable.js Records, we can generate a unique hash for each params object by using `.hashCode()`. This allows us to use the generated hashes as keys inside the Redux store, and have an easy way of accessing all the requests in the app.

## Run

```sh
$ yarn watch

```

## Tools used

-   React
-   Redux
-   Immutable.js

## Demo

**Heroku App**

Link: https://immutable-plus-promises.herokuapp.com/requests
