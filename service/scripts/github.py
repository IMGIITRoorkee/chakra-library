from flask import Flask, request
import io
import yaml
import hmac
import hashlib
import json
import subprocess

with io.open('../config/config.yml', 'r') as stream:
    try:
        CONFIG = yaml.safe_load(stream)
    except yaml.YAMLError as exc:
        print(exc)
        raise

repository = CONFIG['GITHUB']['REPOSITORY']
secret = CONFIG['GITHUB']['SECRET']
staging = CONFIG['GITHUB']['STAGING_BRANCH']
ssh_url = CONFIG['GITHUB']['SSH_URL']

app = Flask(__name__)

@app.route('/', methods=['POST'])
def server():
    encoded_secret = secret.encode()
    signature = 'sha1=' + hmac.new(encoded_secret, request.get_data(), hashlib.sha1).hexdigest()

    if signature == request.headers.get('X-Hub-Signature'):
        payload = request.form.get("payload")
        payload = json.loads(payload)
        
        if payload["ref"] == f"refs/heads/{staging}":
            if payload["repository"]["ssh_url"] == ssh_url:
                pull = subprocess.Popen(["git", "pull", "origin", staging], cwd=repository)
                output, error = pull.communicate()
                print(output, error)
                return "OK", 200
            else:
                return "Request from non-root repository", 400
        else:
            return "Non-staging branch", 200
    else:
        return "Invalid Signature", 400

