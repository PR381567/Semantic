import sh

import pyrebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage


"""FIREBASE SETUPS"""
cred = credentials.Certificate("semantic-key.json")
firebase_admin.initialize_app(cred)

"""DATABASE SETUPS"""
db = firestore.client()
collection_sem = db.collection(u'semantic labs')
#TODO: make for all
location_ref = collection_sem.document(u'1')



def command(command_name):
    #TODO: run complex query
    lst = command_name.split(" ")
    command = lst[0]
    args = "".join(lst[1:])
    if args:
        output = getattr(sh,command)(args).__str__()
    else:
        output = getattr(sh,command)().__str__()
    print(output)
    return output
    

changed = 0
def on_snapshot(doc_snapshot, changes, read_time):
    global changed
    for doc in doc_snapshot:
        files = command("ls ")
        file_list = files.split()
        file_list.sort()
        try:
            print(doc.to_dict())
            all_doc = doc.to_dict()
            current_device = all_doc["Connected_Edges"]["1"]["settings"]
            if changed != current_device["change"]:
                changed = current_device["change"]
                command_name = current_device["current"]
                output_to_send = command(command_name)
                location_ref.update({
                    u"Connected_Edges.1.settings.output":output_to_send,
                    u'Connected_Edges.1.settings.file_upload':file_list
                    })
                
                
        except Exception as e:
            output_to_send = e.__str__()
            location_ref.update({
                    u"Connected_Edges.1.settings.output":output_to_send,
                    u'Connected_Edges.1.settings.file_upload':file_list
                    })

        

print(location_ref)
current_command_watch = location_ref.on_snapshot(on_snapshot)