from django.http import HttpResponse, HttpResponseServerError
import json
import os
from git.repo.base import Repo
from .authentication import authentication
from .BasicData import BasicData
from .Jira import Jira
from .gitOperation import gitOperation
import shutil
import stat


def jira_hub(request):
    if request.method == "POST":
        a = request.body.decode("utf-8")
        data = json.loads(a)
        print (data)
        #to use data
        username = data['userID']
        password = data['pwd']
        isAuthenticatedUser = False
        jiranumbers = data['jiranumber_list']
        techDesignLinks = data['techdesign_list']
        localRepo = data['gitlocal_list']
        remoteRepoList = data['gitrepo_list']
        requirementLinks = data['requirement_list']
        testCaseLinks = data['testcase_list']

        jiraBaseUrl = ''
        jformBaseUrl = ''
        issueUrl = 'rest/api/2/issue/'
        sessionUrl = 'rest/auth/1/session'
        jiraBrowse = "browse/"
        jiraAuthUrl = jiraBaseUrl + sessionUrl
        jformAuthUrl = jformBaseUrl + sessionUrl
        jformIssueUrl = jformBaseUrl + issueUrl


        user_id = username
        #jira authentication
        loginData = {'username': username, 'password': password}
        userAuthentication = authentication()
        jiraAuthenticatedUser = userAuthentication.authenticate(jiraAuthUrl, loginData)
        jFormAuthenticatedUser = userAuthentication.authenticate(jformAuthUrl, loginData)
        if (jiraAuthenticatedUser.status_code == 200 and jFormAuthenticatedUser.status_code == 200):
            isAuthenticatedUser = True

        for i in range(0,len(jiranumbers)):
            jiraNumber = jiranumbers[i]
            jiraIssueUrl = jiraBaseUrl + issueUrl + jiraNumber
            jiraRemoteLink = jiraIssueUrl + '/remotelink'
            jiraIntenalLink = jiraIssueUrl + '/issueLink'
            techDesignLink = techDesignLinks[i]
            requirementLink = requirementLinks[i]
            testCaseLink =testCaseLinks[i]
            git_url = remoteRepoList[i]
            jira_no = jiranumbers[i]
            project_name = git_url[git_url.find('.com/') + 5:git_url.rfind('/')]
            repo_name = git_url[(git_url.rfind('/') + 1):]
            filename = "README.md"
            parentBranch = "master"

            local_path = localRepo[i] + jira_no
            if os.path.isdir(local_path):
                shutil.rmtree(local_path, onerror=handleError)
            cloned_repo = gitOperation.cloneRepo(git_url,local_path)
            gitOperation.checkoutNewBranch(cloned_repo, jira_no)
            file_path = gitOperation.appendFile(cloned_repo, local_path, filename)
            gitOperation.gitCommit(cloned_repo, file_path)
            gitOperation.gitPush(cloned_repo, jira_no)
            pullRequestLink = gitOperation.create_pull_request( project_name, repo_name, jira_no, "Title", jira_no, parentBranch, user_id, password)


            #########################################################################
            #                JIRA, Jform
            #########################################################################
            basicData = BasicData()
            jira = Jira()
            if(isAuthenticatedUser):
                jiraBrowseableLink = jiraBaseUrl + jiraBrowse + jiraNumber
                jFormCreated = jira.createJForm(jformIssueUrl, basicData.getCookieData(jFormAuthenticatedUser), techDesignLink, pullRequestLink,jiraBrowseableLink,jiraNumber,requirementLink,testCaseLink )
                if(jFormCreated.status_code == 200):
                    jformResponseJson = jFormCreated.json()
                    jformLink = jformBaseUrl + jiraBrowse + jformResponseJson['key']
                    jira.addInternalLinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), jformResponseJson, jformLink)

                jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), techDesignLink, "Tech Desgin"  )
                jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), pullRequestLink, "Review Link"  )
                jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), testCaseLink,"TestCase")
                jira.addlinksToJira(jiraRemoteLink, basicData.getCookieData(jiraAuthenticatedUser), requirementLink,"Requirement")

        return HttpResponse("Successful completed all the tasks",content_type='text/plain')
    else:
        return HttpResponse("The requset you are trying to make is impossible at this moment",content_type='text/plain')

def handleError(func, path, exc_info):
    # Check if file access issue
    if not os.access(path, os.W_OK):
        # Try to change the permision of file
        os.chmod(path, stat.S_IWUSR)
        # call the calling function again
        func(path)
