import RPi.GPIO as GPIO
import time


from time import sleep
import Adafruit_DHT 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
# Use a service account
"""FIREBASE SETUPS"""
cred = credentials.Certificate("semantic-key.json")
firebase_admin.initialize_app(cred)
"""DATABASE SETUPS"""
db = firestore.client()
servo_sem = db.collection(u'semantic')
sensor_ref = servo_sem.document(u'display')


"""ACTUATOR SETUPS"""
servo = 22
GPIO.setmode(GPIO.BOARD)
GPIO.setup(servo, GPIO.OUT)
pwm=GPIO.PWM(servo, 50)
pwm.start(0)

"""SENSOR SETUP"""
current_time = datetime.datetime.now()
print(current_time)
update_time = current_time
minutes = 15
threshold = minutes * 60

def SetAngle(angle):
	duty = angle / 18 + 2
	GPIO.output(servo, True)
	pwm.ChangeDutyCycle(duty)
	sleep(1)
	GPIO.output(servo, False)
	pwm.ChangeDutyCycle(0)


def on_snapshot(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:

        print(doc.to_dict())
        all_doc = doc.to_dict()
        angle = all_doc["direction"]
        SetAngle(int(angle))

               

""" LISTENER SETUP """
current_servo_value_watch = sensor_ref.on_snapshot(on_snapshot)