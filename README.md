# DevOps

This repo doesn't contain a real project. It's basically a repository for testing and learning DevOps technologies, such as **AWS, GitHub Actions, Docker, Kubernetes**, etc.

The applications in this repo are microservices used for calculating fibonnaci numbers, but in a much more complex way intentionally. It consists of
- UI: to see the calculated numbers
- API: to handle requests that involves creating and getting the fib numbers
- Worker: to asynchronously calculate the number after someone asks for it
- Databases
    - Redis: to store the calculated numbers
    - PostgreSQL: to store the fib number indexes the user asks for

![fib-architecture](https://github.com/gustavenrique/devops/assets/81171856/64e1886c-a021-4a07-b1a2-a69c89e751ba)

---
Pretty much everything was inspired by [Stephen Grider](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)
