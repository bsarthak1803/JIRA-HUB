import requests
import json
from .BasicData import BasicData
class Jira:
    basicData = BasicData()
    def getIssue(self, accessUrl, headers):
        basicData = BasicData()
        response = requests.get(accessUrl, headers)
        if(response.status_code == 200):
            jsonData = response.json()
            fields = jsonData['fields']
            project = fields['project']
            print(project)
    def createJForm(self, accessUrl ,headers, techDesignLink, pullRequestLink,jiraLink,jiraNumber,RequirementLink,testCaseLink):
        basicData = BasicData()
        payload ={ "fields": {
 	                          "summary": "LHR: JIRA dummy form - api test",
 	                          "project": {"id": "15960"},
                              "issuetype": { "id": "13300" },
                              "customfield_20030": basicData.formatToJiraLink(techDesignLink,"Technical Design Document"),  #Tech Design
                              "customfield_20336": basicData.formatToJiraLink(RequirementLink,"Requirement"),                 #Requiremnt
                              "customfield_20340": basicData.formatToJiraLink(pullRequestLink,"Review link"),               #Pull request
                              "customfield_20331": basicData.formatToJiraLink(jiraLink,jiraNumber),                        #Project identifier
                              "customfield_20342": basicData.formatToJiraLink(testCaseLink, "Test Case")
                          }
                    }
        response = requests.post(accessUrl, data=json.dumps(payload), headers=headers)
        print(response)
        return response

    def addlinksToJira(self, accessUrl, headers, link, text):
        basicData = BasicData()
        linkPayload =    {
                        "object": {
                                    "url":link,
                                    "title":text}
                      }

        response = requests.post(accessUrl, data = json.dumps(linkPayload), headers = headers,)
        print(response.json())
        return response

    def addInternalLinksToJira(self, accessUrl, headers, jFormData, jformLink):
        basicData = BasicData()
        globalId = "appId=f94ddce3-b84a-3372-8c3c-e8cde2aa6265&issueId=" +  jFormData['id']
        linkPayload =    {
                        "globalId": globalId,
                        "self": jFormData['self'],
                        "application": {
		                                  "type": "com.atlassian.jira",
		                                  "name": "Jira"
	                                   },
                        "relationship": "encapsulates",
                        "object": {
                                    "url": jformLink,
                                    "title":jFormData['key']
                                    }
                      }


        response = requests.post(accessUrl, data = json.dumps(linkPayload), headers = headers,)
        print(response.json())
        return response

    def getBrowsableJiraUrl(self, jiraNumber, jiraBaseUrl):
        return jiraBaseUrl + "browse/" + jiraNumber




