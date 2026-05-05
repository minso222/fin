"use strict";
/**
 * Cursor hook: on agent stop, commit all changes and push to origin (if any).
 * Fails open (exit 0) so a git/network error does not break the IDE workflow.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function drainStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve("");
      return;
    }
    const chunks = [];
    process.stdin.on("data", (c) => chunks.push(c));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.resume();
  });
}

function git(args, cwd) {
  return spawnSync("git", args, { cwd, encoding: "utf8" });
}

async function main() {
  await drainStdin();

  const root = path.resolve(__dirname, "..", "..");
  if (!fs.existsSync(path.join(root, ".git"))) {
    process.exit(0);
  }

  const porcelain = git(["status", "--porcelain"], root);
  if (porcelain.status !== 0) {
    process.exit(0);
  }
  if (!porcelain.stdout || !porcelain.stdout.trim()) {
    process.exit(0);
  }

  const add = git(["add", "-A"], root);
  if (add.status !== 0) {
    process.exit(0);
  }

  const msg = `chore: auto-sync ${new Date().toISOString()}`;
  const commit = git(["commit", "-m", msg], root);
  if (commit.status !== 0) {
    process.exit(0);
  }

  git(["push"], root);
  process.exit(0);
}

main().catch(() => process.exit(0));
