#!/bin/bash

declare -r app_name="demo-app"
declare -r version="1.0"
# Stops execution of the script if error
set -e

export NODE_ENV=production
rm -rf .next && npm install && npm run build

zip -r app.zip .next pages public styles *.json *.js