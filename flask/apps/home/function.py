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

def createkeyvalue(a,b):
    data = {"key":a,"value":b}
    requests.post("http://localhost:3000/api/projects/1/kv/1c",json=data)
    print(requests)
    print(data)
    return "Created Key Value"

def createdocument(a,b):
    data = {"key":a,"value":b}
    requests.post("http://localhost:3000/api/projects/1/kv/1c",json=data)
    print(requests)
    print(data)
    return "Created Document Store"