#!/bin/sh
trap 'kill $BGPID; exit' INT

if lsof -ti:9000 > 0; then
    kill -9 $(lsof -ti:9000)
fi

./ng-build.sh 

YELLOW='\033[1;33m'

(
    printf "\n${YELLOW}Launching php server\n" &&
    php -S localhost:9000
) &

BGPID=$!

fswatch -o -r -l 1 ./angular-components/src | xargs -n1 -I{} ./ng-build.sh 