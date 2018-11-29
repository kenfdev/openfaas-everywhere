import os
import requests
import json


def handle(req):
    token = os.getenv('TOKEN')
    headers = {'content-type': 'application/json',
               'Authorization': 'token '+token}
    
    query = os.getenv('Http_Query')
    q = ''
    if query:
      year = query.split('=')[1]
      q = '+created:' + str(year) + '-01-01..' + str(year) + '-12-31'

    url = 'https://api.github.com/search/repositories?per_page=1&type=Repositories&q=language%3APython' + q
    r = requests.get(url, headers=headers)
    data = r.json()

    logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2000px-Python-logo-notext.svg.png'
    res = {'language': 'Python', 'count': data['total_count'], 'logoUrl': logo_url}

    return json.dumps(res)
