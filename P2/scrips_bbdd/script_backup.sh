TIMESTAMP=$(date +"%Y%m%d_%H%M")
docker exec -it p12-mongo-1 mongodump --uri="mongodb://root:example@localhost:27017/DAI?authSource=admin" --out /backup/$TIMESTAMP
docker cp p12-mongo-1:/backup/$TIMESTAMP ./backup/$TIMESTAMP