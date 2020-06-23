from pyspark import SparkContext, SparkConf
from pyspark.sql import SparkSession
import urllib2
import urllib
import json

conf = SparkConf().setAppName("Temp").setMaster("local")
sc = SparkContext(conf=conf)


url = "http://144.202.34.148:3010/obtenerTemperatura"

post_params = {"Tipo":"Completa","NoCo":"13590594"}

params = urllib.urlencode(post_params)
response = urllib2.urlopen(url, params)
json_response = json.loads(response.read())

datos = json_response["D"]

datosRDD = sc.parallelize(datos)
A = datosRDD.count()
D = datosRDD.map(lambda x: x["Temp"])
B= D.map(lambda x: x).reduce(lambda x, y: float(x) + float(y))
C = B/A

print(C)

