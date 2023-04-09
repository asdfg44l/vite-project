#!/bin/bash

export BASE=$(cd $(dirname $0) && pwd -P)
export APP_NAME=$(echo $BASE | grep -o '[^/]*$')
export BUILD_ENV='dev'
export MAJOR_VERSION=1.0
export MINOR_VERSION=1000


while [[ $# > 0 ]]; do
    opt="$1"
    case $opt in
        --MAJOR_VERSION)
            shift
            MAJOR_VERSION=$1
            ;;
        --MINOR_VERSION)
            shift
            MINOR_VERSION=$1
            ;;
    esac
    shift
done

export PATH=$PATH:/sbin:/usr/sbin:/usr/bin:/usr/local/bin
export APP_VERSION="$APP_NAME-$BUILD_ENV-$MAJOR_VERSION.$MINOR_VERSION"

if [ "$BUILD_ENV" == "production" ]; then
    sed -i '' -e "s/0.0.0/$APP_VERSION/g" $BASE/package.json
    # sed -i '' -e "s/\(\"version\": \"\)[^\"]*\(\",\)/\1$APP_VERSION\2/g" $BASE/package.json
fi

sed -i '' -e "s/0.0.0/$APP_VERSION/g" $BASE/package.json

rm -rf $BASE/dist

source ${HOME}/.bash_profile # for using nvm
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

nvm use v16
node -v

npm install
npm run build

if [ "$?" != "0" ]; then
    echo "Build fail" 1>&2
    exit 1
fi

BUNDLE_PATH="$BASE/$APP_VERSION.tar.gz"

cd $BASE/dist
tar cvzf $BUNDLE_PATH .

mkdir $BASE/output/
mv $BUNDLE_PATH $BASE/output/

cd $BASE/output

# function csum {
#     $1 $2 >> $(echo $1 | tr '[:lower:]' '[:upper:]')
# }

# if [ "$(uname)" == "Linux" ]
# then
#     for i in *; do
#         $i | tee >(csum md5sum  $i) >(csum sha256sum $i) >/dev/null
#     done
# else
#     for i in *; do
#         $i | tee >(csum md5 $i) >(csum shasum $i) >/dev/null
#     done
# fi

