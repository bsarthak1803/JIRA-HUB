import requests
import json
from .BasicData import BasicData

class authentication:
    def authenticate(self, accessUrl, loginData):            
        basicData = BasicData()
        response = requests.post(accessUrl, data=json.dumps(loginData), headers=basicData.getHeader())
        return response
    