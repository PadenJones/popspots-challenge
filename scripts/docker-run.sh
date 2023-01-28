#!/bin/bash
docker run --name popspots-challenge --env NODE_ENV=production --env-file ./server/.env -p 3000:3001 -d padenjones/popspots-challenge
