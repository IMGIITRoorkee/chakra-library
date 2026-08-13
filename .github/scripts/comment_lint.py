#!/usr/bin/env python3
"""Enforce the repo comment rules: no dead code, no essays, no ticket refs, no tool attribution.

Usage: comment_lint.py FILE...   (exits 1 on any finding)
"""

import re
import sys
from pathlib import Path

MAX_BLOCK_LINES = 2

HASH_EXT = {'.py', '.sh', '.bash', '.yml', '.yaml', '.toml', '.cfg', '.conf'}
SLASH_EXT = {'.js', '.jsx', '.mjs', '.ts', '.tsx', '.scala', '.sbt', '.java', '.css', '.scss'}

# Machine-readable directives are not prose and are exempt from every rule.
PRAGMA = re.compile(
    r'noqa|type:\s*ignore|pylint:|ruff:|eslint|prettier|shellcheck|coding[:=]|'
    r'scalafmt|@ts-|istanbul|pragma|fmt:\s*(on|off)|nosec|codegen|DO NOT EDIT',
    re.I,
)
TICKET = re.compile(r'\(#\d+\)|\b(PR|ISSUE|TICKET|JIRA)[-\s]?\d+\b|\bPhase\s+\d+\.\d+')
ATTRIBUTION = re.compile(r'ponytail:|generated with|co-authored-by|claude|copilot|chatgpt', re.I)

CODE_SHAPE = (
    re.compile(r'[{};]\s*$'),
    re.compile(r'=>|===|!==|&&|\|\||\+='),
    re.compile(r'^\s*(const|let|var|function|import|export|return|if|else|elif|for|while|'
               r'def|class|try|except|catch|switch|case|print|console\.|await|async)\b'),
    re.compile(r'^\s*[\w.\'"\[\]]+\s*[:=]\s*\S'),
    re.compile(r'^\s*[\w.]+\([^)]*\)\s*[,;]?\s*$'),
)


def strip_marker(line, ext):
    stripped = line.strip()
    if ext in HASH_EXT and stripped.startswith('#'):
        return stripped.lstrip('#').strip()
    if ext in SLASH_EXT and stripped.startswith('//'):
        return stripped.lstrip('/').strip()
    return None


def looks_like_code(lines):
    if len(lines) < 2:
        return False
    hits = sum(any(p.search(text) for p in CODE_SHAPE) for _, text in lines)
    return hits * 2 >= len(lines)


def judge(path, block):
    if not block:
        return []
    body = ' '.join(text for _, text in block)
    if not body or PRAGMA.search(body):
        return []

    line = block[0][0]
    findings = []
    if TICKET.search(body):
        findings.append(f'{path}:{line}: CMT001 ticket/PR reference in a comment; '
                        'put it in the commit message or PR description')
    if ATTRIBUTION.search(body):
        findings.append(f'{path}:{line}: CMT002 tool/agent attribution in a comment; remove it')
    if looks_like_code(block):
        findings.append(f'{path}:{line}: CMT003 commented-out code ({len(block)} lines); '
                        'delete it, git history keeps it')
    elif len(block) > MAX_BLOCK_LINES:
        findings.append(f'{path}:{line}: CMT004 comment block is {len(block)} lines '
                        f'(max {MAX_BLOCK_LINES}); state the constraint, move rationale to the PR')
    return findings


def check(path):
    ext = path.suffix
    if ext not in HASH_EXT and ext not in SLASH_EXT:
        return []
    try:
        lines = path.read_text(encoding='utf-8').splitlines()
    except (UnicodeDecodeError, OSError):
        return []

    findings, block = [], []
    for number, raw in enumerate(lines, 1):
        if number == 1 and raw.startswith('#!'):
            continue
        text = strip_marker(raw, ext)
        if text is not None:
            block.append((number, text))
        else:
            findings += judge(path, block)
            block = []
    return findings + judge(path, block)


def main(argv):
    findings = [f for arg in argv for f in check(Path(arg))]
    for finding in findings:
        print(finding)
    if findings:
        print(f'\n{len(findings)} comment-style finding(s).', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
