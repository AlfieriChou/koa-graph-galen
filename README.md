# koa-graph-galen

## install dgraph

- download
```bash
curl https://get.dgraph.io -sSf | bash
```

- setup zreo
```
dgraph zero
```

- setup alpha
```
dgraph alpha --lru_mb 2048 --zero localhost:5080
```

- setup ratel
```
dgraph-ratel
```

## install by docker-compose
```
docker-compose up
```
