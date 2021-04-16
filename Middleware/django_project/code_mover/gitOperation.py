import os
from git.repo.base import Repo
import requests
import json

class gitOperation:
	def cloneRepo(git_url, local_path):
		cloned_repo = Repo.clone_from(git_url, local_path)
		return cloned_repo


	def checkoutNewBranch(cloned_repo, new_branch_name):
		new_branch = cloned_repo.create_head(new_branch_name)
		new_branch.checkout()


	def appendFile(cloned_repo, local_path, filename):
		os.chdir(local_path)
		fp = open(filename, "a+")
		fp.write(".")
		fp.close()
		file_path = os.path.join(cloned_repo.working_tree_dir, filename)
		return file_path


	def gitCommit(cloned_repo, file_path):
		cloned_repo.index.add([file_path])
		cloned_repo.index.commit("Modified README file")
		return cloned_repo


	def gitPush(cloned_repo, branch_name):
		cloned_repo.git.push("origin", branch_name)


	def create_pull_request(project_name, repo_name, title, description, head_branch, base_branch, user_id, password):
		payload = {
			"title": title,
			"body": description,
			"head": head_branch,
			"base": base_branch
		}
		git_pulls_api = ""+project_name+"/"+repo_name+"/pulls"
		r = requests.post(
			git_pulls_api,
			auth=(user_id, password),
			data=json.dumps(payload))
		if not r.ok:
			print("Request Failed: {0}".format(r.text))
		else:
			jsonVar = r.json()
			urlVar = jsonVar['url'].replace("/api/v3/repos", "")
			urlVar = urlVar.replace("/pulls/", "/pull/")
			return urlVar