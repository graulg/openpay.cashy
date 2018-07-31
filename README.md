# openpay.cashy

##### Clonar y ejecutar
```
git clone https://github.com/graulg/openpay.cashy.git
npm install
node app
```

##### Perticiones vía cURL
###### Listar clientes
```
curl http://localhost:3000/clientes/listar -X POST -d ''
```

###### Registrar cliente
```
curl http://localhost:3000/clientes/registrar -H "Content-type: application/json" -X POST -d '{"name":"Desde", "last_name": "cURl", "email": "qwerty@email.com"}'
```
