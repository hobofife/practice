import pickle
import random
import subprocess

FILENAME = './tmp_settings.p'


"""
Settings:

{'server_pids':[123,345],
 'current_port':8080,
 'used_ports':[8001, 8002]}

"""


def save_settings(settings_dict):
    with open(FILENAME, 'wb') as fh:
        pickle.dump(settings_dict, fh)


def new_settings():
    settings = {'server_pids':[],
                'used_ports':[8001],
                'current_port':None}
    save_settings(settings)
    print("New settings")

        
def get_settings():
    with open(FILENAME, 'rb') as fh:
        settings_dict = pickle.load(fh)
    return settings_dict
        
def kill_servers():
    settings = get_settings()
    print(settings)
    for server in settings['server_pids']:
        print(str(server))
        subprocess.call(['kill', str(server)])

def get_port():
    settings = get_settings()
    last_port = settings['used_ports'][-1]

    new_port = last_port + 1
    settings['current_port'] = str(new_port)
    settings['used_ports'].append(new_port)
    save_settings(settings)
    return str(new_port)
