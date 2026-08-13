from flask import Flask, request
import io
import os
import yaml
import hmac
import hashlib
import json
import subprocess

CONFIG_PATH = os.environ.get('CHAKRA_LIBRARY_CONFIG', '../config/config.yml')

with io.open(CONFIG_PATH, 'r') as stream:
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


def signature_matches(shared_secret, body, headers):
    """Compare the webhook signature in constant time, preferring SHA-256 over the deprecated SHA-1 header."""
    sent = headers.get('X-Hub-Signature-256')
    if sent:
        expected = 'sha256=' + hmac.new(shared_secret.encode(), body, hashlib.sha256).hexdigest()
    else:
        sent = headers.get('X-Hub-Signature') or ''
        expected = 'sha1=' + hmac.new(shared_secret.encode(), body, hashlib.sha1).hexdigest()
    return hmac.compare_digest(expected, sent)


@app.route('/', methods=['POST'])
def server():
    if signature_matches(secret, request.get_data(), request.headers):
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

