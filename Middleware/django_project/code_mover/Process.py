import sys
from authentication import authentication
from BasicData import BasicData
from Jira import Jira

def main(argv):
    jiraBaseUrl = ''
    jformBaseUrl = ''
    issueUrl = ''
    sessionUrl = 'rest/auth/1/session'
    jiraNumber = ''
    
    jiraAuthUrl = jiraBaseUrl + sessionUrl
    jformAuthUrl = jformBaseUrl + sessionUrl
    jiraIssueUrl = jiraBaseUrl + issueUrl + jiraNumber
    jformIssueUrl = jformBaseUrl + issueUrl 
    jiraRemoteLink = jiraIssueUrl + "/remotelink"
    jiraIntenalLink = jiraIssueUrl + "/issueLink"
    #user inputs
    username = ''
    password = ''
    techDesignLink = ''
    pullRequestLink = 'http://www.google.com'
    
    loginData = {'username':username, 'password':password}
    isAuthenticatedUser = False
    
    userAuthentication = authentication()
    basicData = BasicData()
    jira = Jira()
    
    jiraAuthenticatedUser = userAuthentication.authenticate(jiraAuthUrl,loginData)
    jFormAuthenticatedUser = userAuthentication.authenticate(jformAuthUrl,loginData)
    if(jiraAuthenticatedUser.status_code == 200 and jFormAuthenticatedUser.status_code == 200):
        isAuthenticatedUser = True
    else:
        return HttpResponse("Username or password is incorrect",content_type='text/plain')
        exit(0)   
    
    if(isAuthenticatedUser):
       jFormCreated = jira.createJForm(jformIssueUrl, basicData.getCookieData(jFormAuthenticatedUser), techDesignLink, pullRequestLink )
        if(jiraCreated.status_code == 200):
            jformResponseJson = jFormCreated.json()
        jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), techDesignLink, "Tech Desgin"  )
        jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), pullRequestLink, "Review Link"  )#
        
        jformLink = jformBaseUrl + "browse/" + jFormCreated['key']
        jira.addInternalLinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), jFormCreated, jformResponseJson)
if __name__ == '__main__':
    main(sys.argv)
