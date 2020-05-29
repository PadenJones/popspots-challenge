#!/bin/bash
docker run --name popspots-challenge --env NODE_ENV=production --env-file ./server/.env -p 3000:5000 -d padenjones/popspots-challenge
