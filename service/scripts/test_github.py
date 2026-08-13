#!/usr/bin/env python3
"""Checks for the webhook signature comparison. Run: python3 service/scripts/test_github.py"""

import hashlib
import hmac
import os
import sys
import tempfile

SECRET = 'topsecret'
BODY = b'{"ref": "refs/heads/staging"}'

CONFIG = """GITHUB:
  REPOSITORY: /tmp/repo
  SECRET: topsecret
  STAGING_BRANCH: staging
  SSH_URL: git@github.com:IMGIITRoorkee/chakra-library.git
"""


def load_module():
    handle = tempfile.NamedTemporaryFile('w', suffix='.yml', delete=False)
    handle.write(CONFIG)
    handle.close()
    os.environ['CHAKRA_LIBRARY_CONFIG'] = handle.name
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import github

    return github


def sign(algorithm, prefix, body=BODY, secret=SECRET):
    return prefix + hmac.new(secret.encode(), body, algorithm).hexdigest()


def main():
    github = load_module()
    matches = github.signature_matches
    sha1 = sign(hashlib.sha1, 'sha1=')
    sha256 = sign(hashlib.sha256, 'sha256=')

    assert matches(SECRET, BODY, {'X-Hub-Signature': sha1})
    assert matches(SECRET, BODY, {'X-Hub-Signature-256': sha256})

    # The SHA-256 header wins when present, so a good SHA-1 must not rescue a bad SHA-256.
    assert not matches(SECRET, BODY, {'X-Hub-Signature-256': 'sha256=' + '0' * 64,
                                      'X-Hub-Signature': sha1})

    assert not matches(SECRET, BODY, {'X-Hub-Signature': 'sha1=' + '0' * 40})
    assert not matches(SECRET, BODY, {'X-Hub-Signature': sha1[:-1]})
    assert not matches(SECRET, b'tampered', {'X-Hub-Signature': sha1})
    assert not matches('wrongsecret', BODY, {'X-Hub-Signature': sha1})
    assert not matches(SECRET, BODY, {})

    print('signature_matches: 8 checks pass')


if __name__ == '__main__':
    main()
