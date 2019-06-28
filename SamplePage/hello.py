import RPi.GPIO as GPIO
import time


from time import sleep

import datetime

servo = 22
GPIO.setmode(GPIO.BOARD)
GPIO.setup(servo, GPIO.OUT)
pwm=GPIO.PWM(servo, 50)
pwm.start(0)


def SetAngle(angle):
	duty = angle / 18 + 2
	GPIO.output(servo, True)
	pwm.ChangeDutyCycle(duty)
	sleep(1)
	GPIO.output(servo, False)
	pwm.ChangeDutyCycle(0)





print("Rotating motors ")

SetAngle(20)
SetAngle(150)
SetAngle(10)
SetAngle(150)
SetAngle(10)
SetAngle(150)
SetAngle(10)
SetAngle(150)
SetAngle(10)
SetAngle(150)
SetAngle(10)
SetAngle(150)
SetAngle(10)
