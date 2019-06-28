import time 
import Adafruit_DHT 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
# Use a service account
cred = credentials.Certificate("semantic-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

collection_sem = db.collection(u'semantic labs')
device_ref = collection_sem.document(u'1')

current_time = datetime.datetime.now()
print(current_time)
update_time = current_time
minutes = 15
threshold = minutes * 60
while True:


    sensor_name = Adafruit_DHT.DHT11 #
    sensor_pin = 4
    
    humidity, temperature = Adafruit_DHT.read_retry(sensor_name, sensor_pin)
    print ("Hello",temperature)
    device_ref.update({
        u'Connected_Edges.1.Connected_Devices.1.data.current': temperature,
    })
    
    device_ref.update({
         u'Connected_Edges.1.Connected_Devices.2.data.current': humidity,
    })
    
    
    time.sleep(5)
    current_time = datetime.datetime.now()
    elapsed_seconds = (current_time - update_time).seconds
    if elapsed_seconds > threshold:
        update_time = current_time
        update_time_string = update_time.__str__()[:16]
        prepend = u'Connected_Edges.1.Connected_Devices.1.data.historical.'

        temp_hist_time = prepend+update_time_string
        device_ref.update({
            temp_hist_time:temperature,
            })

        prepend = u'Connected_Edges.1.Connected_Devices.2.data.historical.'
        hum_hist_time = prepend+update_time_string
        device_ref.update({
            hum_hist_time:humidity,
            })

