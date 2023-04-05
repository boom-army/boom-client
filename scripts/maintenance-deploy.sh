read -p "***MAINTENANCE DEPLOY*** Deploy UI to prod (y/n)?" CONT
if [ "$CONT" = "y" ]; then
    rm -rf ./build
    mkdir ./build
    cp ./maintenance.html ./build/index.html
    aws s3 rm s3://boom.army --recursive
    aws s3 sync ./build s3://boom.army
else
    echo "Phew! No maintenance today.";
fi
