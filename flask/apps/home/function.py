import requests

def projectall():
    try:
        response = requests.get("http://localhost:3000/api/projects/")
        projects = response.json()
    except:
        projects = [{'id': "",'name':"",'description':""}]
    return projects

def keyvalueall():
    try:
        response = requests.get("http://localhost:3000/api/projects/1/kv/")
        projects = response.json()
    except :
        projects = [{'id': "",'address':"",'projectId':""}]
    return projects

