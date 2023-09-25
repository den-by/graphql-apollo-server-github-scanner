# GitHub scanner

A tool to scan GitHub repositories using GraphQL queries

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Issues](#issues)

## Getting Started

These instructions will guide you through the process of setting up a local development environment.

### Prerequisites

- Git, Node.js, npm, should be installed
- A token for access to the GitHub API should be created

### Installation

A step-by-step sequence of examples that tell you how to get your development environment running.

1. Clone the repository to your local machine

   ```bash
   git clone {repo-link}
   ```

2. Navigate to the project directory

   ```bash
   cd {project-directory}
   ```

3. Install *pnpm* globally if not installed

   ```bash
   npm install -g pnpm
   ```

5. Navigate to the backend folder and copy `env.template` to `.env`

   ```bash
   cd backend
   cp env.template .env
   ```

6. Return to the project root

   ```bash
   cd ..
   ```

7. Install the project dependencies using *pnpm*

   ```bash
   pnpm i
   ```

### Issues
* [Code search in GitHub API not working](https://github.com/orgs/community/discussions/45538)
