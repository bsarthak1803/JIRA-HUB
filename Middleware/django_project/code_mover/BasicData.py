class BasicData:
    def getHeader(self):
        headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                    }
        return headers
        
    def getCookieData(self, authenticatedUser):
        jsonData = authenticatedUser.json()
        session = jsonData['session']
        sessionCookieData = session['name']+ '=' + session['value']
        headerWithCookie = {
                    'cookie' : sessionCookieData,
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                    }
        return headerWithCookie
    def formatToJiraLink(self, link, text):
        return "[" + text + "|" + link + "]"