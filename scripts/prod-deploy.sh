read -p "***PRODUCTION DEPLOY*** Deploy UI to prod (y/n)?" CONT
if [ "$CONT" = "y" ]; then
    rm -rf ./build
    cp .env.prod .env
    yarn build
    aws s3 rm s3://app.boom.army --recursive
    aws s3 sync ./build s3://app.boom.army
    cp .env.dev .env
else
    echo "Phew! Dodged a bullet.";
fi
