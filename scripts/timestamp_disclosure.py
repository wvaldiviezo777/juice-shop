#Importo el módulo sys para direccionar el log al momento de correr mi Script en el archivo access.log.2024-12-14, ubicado dentro de logs/
import sys
sys.stdout = open('../logs/access.log.2024-12-14', 'w')

#Importo el módulo respectivo
import datetime

#Se observa el timestamp Unix (en segundos)
timestamp = 1734944650

#Procedo a convertir el timestamp a una fecha y hora
fecha = datetime.datetime.fromtimestamp(timestamp)

#Se observa la fecha en formato legible
print("Fecha en formato legible:", fecha)

#Se observa la fecha en formato con una zona horaria local
print("Fecha en formato con zona horaria local:", fecha.strftime('%Y-%m-%d %H:%M:%S'))