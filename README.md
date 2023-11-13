# Kit Platform (Take-Home Project)

Thank you for taking the time to interview with the Platform Squad at
BibleProject! In this project, you'll be presented with a fictional scenario for
an e-learning company and be asked to design and implement a software solution
for one of the company's new business initiatives. (The scenario is very similar
to one we actually face at BibleProject, but we've changed some of the details
to encourage you to feel free to be creative and not be overly constrained by
the work we've already done.)

## Scenario

Suppose you work for an e-learning SaaS company called _Kit_. Kit provides
corporate training for small and medium businesses around the world (90% of them
are in the United States). Employees of your corporate clients are assigned
training in the form of videos to watch, articles to read, and quizzes to fill
out, and your software platform provides on-demand access to these resources and
tracks user progress. Clients may supply their own videos and other resources,
or they may choose from a stock set of resources maintained by your company.

There are several teams at your company who work together to support the
product. Three in particular are relevant to this case study: (1) Content and
Integrations, who support curation of the content library as well as integrating
customer content into the system, (2) Web, who supports the frontend Web
application with which users interface, and (3) Platform, who supports the
application backend and infrastructure.

You are a software engineer on the Platform team, a squad that is growing and
taking on more responsibility as the organization looks to scale up, implement
innovative new training resources, and expand its global reach.

One of your team's projects for this quarter is to modernize the product's user
activity/progress tracking system. Currently the application is deployed as a
monolithic Web app which tracks a user's progress by maintaining a JSON file for
each user, an architecture which is problematic for several reasons.

Additionally, a new team is forming within your organization to create a mobile
version of the Web product, which will allow users to access training on a
smartphone or tablet, and it is a business requirement that user progress be
synchronized across platforms (Web, Android, iOS, etc.).

The goal is for the Platform team to create a backend User Activity service with
a GraphQL API so that the Web team can migrate their code and data to the new
GraphQL service, and so that any new mobile apps can use the same GraphQL API as
the Web and share a unified store of user data and progress.

For this exercise, you will implement one or more GraphQL services within an
Apollo Federation supergraph which provide an API for tracking users' activity
and progress on their corporate training.

This repo represents scaffolding into which your new services should be written
(more details in the sections below).

Your focus should be on the GraphQL API, Node.js backend application layer, data
stores, and other distributed system components as needed. You need not provide
a fully production-worthy ready-to-deploy solution---use mocks and fakes as
appropriate---but you should provide working code for the most essential parts
of the application and be prepared to explain the proposed architecture in
depth. Our goal is for this endeavor to be a conversation, not an exam.

## Repository Setup

This is an [Nx](https://nx.dev/) monorepo with an
[Apollo Federation](https://www.apollographql.com/docs/federation/) federated
GraphQL API.

To get you started, the graph currently has three rudimentary services, which
can be found in the `apps/` folder:

-   `gateway`: An Apollo Gateway that serves as the router for the federated
    graph (note we are not using the newer Apollo Router yet)
-   `services/auth`: A subgraph for authentication concerns
-   `services/content`: A subgraph for training content concerns

There is also a library `libs/user-access` which stubs out user authentication
calls - in the real system this would make calls to a provider like Firebase,
but integrating with Firebase is not really the main point of this exercise, so
you should feel free to leave those calls stubbed out, although you may end up
needing to create some new API methods for the library to expand the user access
functionality.

You can run and experiment with the supergraph by installing the dependencies
(`npm i`; Node.js 20 is recommended) and executing the following commands in
three separate terminal windows:

-   `npx nx serve services-auth`
-   `npx nx serve services-content`
-   `npx nx serve gateway`

Then navigate to http://localhost:6050 to query your supergraph.

Finding a better way to serve everything with a single command is left as an
exercise.

## Task

**Your task is to build out one or more new subgraphs that handle User
Progress/User Activity concerns as described in the problem statement and
integrate them into the supergraph and monorepo structure.**

Considerations include but are not limited to: federated entities, backend data
stores, REST API data sources, user data handling, and performance and
reliability. You need not go as far as actually deploying third party resources
(e.g. AWS RDS instances) - use mocks and fakes as appropriate - but your code
should run and you should be prepared to describe how the production environment
would be architected and deployed. Stellar solutions to this problem may include
Docker Compose stacks or other locally emulated cloud resources.

## Development Notes

-   Nx regards the name of, say, the Auth service as `services-auth` (i.e.
    instead of just `auth` or `services/auth`).
-   A shortcut for creating a new subgraph service is to use the `@nrwl/express`
    generator to create a new service in `apps` like so:

    ```sh
    npx nx g @nrwl/express:app --directory services myservice
    ```

    This command is how the boilerplate for the existing services was created.

-   In a similar vein, the `user-access` library was created using:

    ```sh
    npx nx g @nrwl/node:lib
    ```

-   You may notice that this monorepo is on an older version of Nx. Upgrading
    the dependencies is allowed and even encouraged! Just be prepared to explain
    the changes.
