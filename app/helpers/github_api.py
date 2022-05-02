import os
from github import Github
import base64

GITHUB_KEY = os.getenv('GITHUB_API_KEY')

def get_daily_readme_from_gh(daily_directory):
    g = Github(GITHUB_KEY)  
    repo = g.get_user().get_repo("curriculum")
    content_instance = repo.get_contents(f"{daily_directory}.md")
    decrypted_readme = base64.b64decode(content_instance.content).decode('utf-8')
    return decrypted_readme