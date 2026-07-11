---
title: "agent-skills 다루기"
description: "구글의 시니어 엔지니어가 만든 skills 를 다루는 방법"
date: "2026-07-11"
keywords: "Agent"
---

> [https://github.com/addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)

자주 사용하는 Skills 을 한번에 보기좋게 정리해놓은 포스팅

## api-and-interface-design
> Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. Use when creating REST or GraphQL endpoints, defining type contracts between modules, or establishing boundaries between frontend and backend.
### When to Use
* Designing new API endpoints
* Defining module boundaries or contracts between teams
* Creating component prop interfaces
* Establishing database schema that informs API shape
* Changing existing public interfaces


## browser-testing-with-devtools
> Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser. Use when you need to inspect the DOM, capture console errors, analyze network requests, profile performance, or verify visual output with real runtime data. Requires the chrome-devtools MCP server to be configured.
### When to Use
* Building or modifying anything that renders in a browser
* Debugging UI issues (layout, styling, interaction)
* Diagnosing console errors or warnings
* Analyzing network requests and API responses
* Profiling performance (Core Web Vitals, paint timing, layout shifts)
* Verifying that a fix actually works in the browser
* Automated UI testing through the agent
### When NOT to use
Backend-only changes, CLI tools, or code that doesn't run in a browser.


## ci-cd-and-automation
> Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to automate quality gates, configure test runners in CI, or establish deployment strategies.
### When to Use
* Setting up a new project's CI pipeline
* Adding or modifying automated checks
* Configuring deployment pipelines
* When a change should trigger automated verification
* Debugging CI failures


## code-review-and-quality
> Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch.
### When to Use
* Before merging any PR or change
* After completing a feature implementation
* When another agent or model produced code you need to evaluate
* When refactoring existing code
* After any bug fix (review both the fix and the regression test)


## code-simplification
> Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain, or extend than it should be. Use when reviewing code that has accumulated unnecessary complexity.
### When to Use
* After a feature is working and tests pass, but the implementation feels heavier than it needs to be
* During code review when readability or complexity issues are flagged
* When you encounter deeply nested logic, long functions, or unclear names
* When refactoring code written under time pressure
* When consolidating related logic scattered across files
* After merging changes that introduced duplication or inconsistency
### When NOT to use
* Code is already clean and readable — don't simplify for the sake of it
* You don't understand what the code does yet — comprehend before you simplify
* The code is performance-critical and the "simpler" version would be measurably slower
* You're about to rewrite the module entirely — simplifying throwaway code wastes effort


## context-engineering
> Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks, or when you need to configure rules files and context for a project.
### When to Use
* Starting a new coding session
* Agent output quality is declining (wrong patterns, hallucinated APIs, ignoring conventions)
* Switching between different parts of a codebase
* Setting up a new project for AI-assisted development
* The agent is not following project conventions


## debugging-and-error-recovery
> Guides systematic root-cause debugging. Use when tests fail, builds break, behavior doesn't match expectations, or you encounter any unexpected error. Use when you need a systematic approach to finding and fixing the root cause rather than guessing.
### When to Use
* Tests fail after a code change
* The build breaks
* Runtime behavior doesn't match expectations
* A bug report arrives
* An error appears in logs or console
* Something worked before and stopped working


## deprecation-and-migration
> Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another. Use when deciding whether to maintain or sunset existing code.
### When to Use
* Replacing an old system, API, or library with a new one
* Sunsetting a feature that's no longer needed
* Consolidating duplicate implementations
* Removing dead code that nobody owns but everybody depends on
* Planning the lifecycle of a new system (deprecation planning starts at design time)
* Deciding whether to maintain a legacy system or invest in migration


## documentation-and-adrs
> Records decisions and documentation. Use when making architectural decisions, changing public APIs, shipping features, or when you need to record context that future engineers and agents will need to understand the codebase.
### When to Use
* Making a significant architectural decision
* Choosing between competing approaches
* Adding or changing a public API
* Shipping a feature that changes user-facing behavior
* Onboarding new team members (or agents) to the project
* When you find yourself explaining the same thing repeatedly
### When NOT to use
Don't document obvious code. Don't add comments that restate what the code already says. Don't write docs for throwaway prototypes.


## doubt-driven-development
> Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matters more than speed, when working in unfamiliar code, when stakes are high (production, security-sensitive logic, irreversible operations), or any time a confident output would be cheaper to verify now than to debug later.
### When to Use
A decision is non-trivial when at least one of these is true:
* It introduces or modifies branching logic
* It crosses a module or service boundary
* It asserts a property the type system or compiler cannot verify (thread safety, idempotence, ordering, * invariants)
* Its correctness depends on context the future reader cannot see
* Its blast radius is irreversible (production deploy, data migration, public API change)

Apply the skill when:
* About to make an architectural decision under uncertainty
* About to commit non-trivial code
* About to claim a non-obvious fact ("this is safe", "this scales", "this matches the spec")
* Working in code you don't fully understand
### When NOT to use
* Mechanical operations (renaming, formatting, file moves)
* Following a clear, unambiguous user instruction
* Reading or summarizing existing code
* One-line changes with obvious correctness
* Pure tooling operations (running tests, listing files)
* The user has explicitly asked for speed over verification
If you doubt every keystroke, you ship nothing. The skill applies only to non-trivial decisions as defined above.


## frontend-ui-engineering
> Builds production-quality, accessible, responsive user-facing UIs. Use when building or modifying interfaces and pages, creating components, implementing layouts, meeting WCAG accessibility requirements, managing state, or when the output needs to look and feel production-quality rather than AI-generated.
### When to Use
* Building new UI components or pages
* Modifying existing user-facing interfaces
* Implementing responsive layouts
* Adding interactivity or state management
* Fixing visual or UX issues


## git-workflow-and-versioning
> Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, or when you need to organize work across multiple parallel streams. Use when cutting a release, choosing a semantic version bump, tagging, or writing a changelog.
### When to Use
Always. Every code change flows through git.


## idea-refine
> Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use when an idea is still vague, when you need to stress-test assumptions before committing to a plan, or when you want to expand options before converging on one. Triggers on "ideate", "refine this idea", or "stress-test my plan".


## incremental-implementation
> Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
### When to Use
* Implementing any multi-file change
* Building a new feature from a task breakdown
* Refactoring existing code
* Any time you're tempted to write more than ~100 lines before testing
### When NOT to use
Single-file, single-function changes where the scope is already minimal.


## interview-me
> Extracts what the user actually wants instead of what they think they should want. Achieves this through one-question-at-a-time interview until ~95% confidence about the underlying intent. Use when an ask is underspecified ("build me X" without "for whom" or "why now"), when the user explicitly invokes ("interview me", "grill me", "are we sure?", "stress-test my thinking"), or when you catch yourself silently filling in ambiguous requirements before any plan, spec, or code exists.
### When to Use
* The ask is missing at least one of: who the user is, why they want it, what success looks like, what the binding constraint is
* The request is conventional rather than specific ("build me X", "make it faster") and you can't unpack the convention without guessing
* You're tempted to start with assumptions you haven't surfaced
* The user hasn't said which value they're optimizing for when two reasonable ones are in tension (simplicity vs. flexibility, cost vs. speed)
* The user explicitly invokes: "interview me", "grill me", "before we start, are we sure?", "stress-test my thinking"
### When NOT to Use
* The ask is unambiguous and self-contained ("rename this variable", "fix this typo")
* The user has explicitly asked for speed over verification
* Pure information requests ("how does X work?", "what does this code do?")
* Mechanical operations (renames, formats, file moves)
* You already have ≥95% confidence; re-read the stop condition below before assuming you don't


## observability-and-instrumentation
> Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any feature that runs in production and you need evidence it works. Use when production issues are reported but you can't tell what happened from the available data.
### When to Use
* Building any feature that will run in production
* Adding a new service, endpoint, background job, or external integration
* A production incident took too long to diagnose ("we couldn't tell what happened")
* Setting up or reviewing alerting rules
* Reviewing a PR that adds I/O, retries, queues, or cross-service calls
### NOT for:
* Diagnosing a failure happening right now — use the `debugging-and-error-recovery` skill (observability is what makes that skill fast next time)
* Profiling and optimizing measured slowness — use the `performance-optimization` skill
* Launch-day monitoring checklists and rollback triggers — see the `shipping-and-launch` skill; this skill covers the instrumentation that feeds them


## performance-optimization
> Optimizes application performance across frontend, backend, queries, and databases. Use when performance requirements exist, when you suspect performance regressions, when Core Web Vitals or load times need improvement, when N+1 query patterns need fixing, or when profiling reveals bottlenecks.
### When to Use
* Performance requirements exist in the spec (load time budgets, response time SLAs)
* Users or monitoring report slow behavior
* Core Web Vitals scores are below thresholds
* You suspect a change introduced a regression
* Building features that handle large datasets or high traffic
### When NOT to use
Don't optimize before you have evidence of a problem. Premature optimization adds complexity that costs more than the performance it gains.


## planning-and-task-breakdown
> Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.
### When to Use
* You have a spec and need to break it into implementable units
* A task feels too large or vague to start
* Work needs to be parallelized across multiple agents or sessions
* You need to communicate scope to a human
* The implementation order isn't obvious
### When NOT to use
Single-file changes with obvious scope, or when the spec already contains well-defined tasks.


## security-and-hardening
> Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integrations. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services.
### When to  Use
* Building anything that accepts user input
* Implementing authentication or authorization
* Storing or transmitting sensitive data
* Integrating with external APIs or services
* Adding file uploads, webhooks, or callbacks
* Handling payment or PII data


## shipping-and-launch
> Prepares production launches. Use when preparing to deploy to production. Use when you need a pre-launch checklist, when setting up monitoring, when planning a staged rollout, or when you need a rollback strategy.
### When to Use
* Deploying a feature to production for the first time
* Releasing a significant change to users
* Migrating data or infrastructure
* Opening a beta or early access program
* Any deployment that carries risk (all of them)

## source-driven-development
> Grounds every implementation decision in official documentation. Use when you want authoritative, source-cited code free from outdated patterns. Use when building with any framework or library where correctness matters.
### When to Use
* The user wants code that follows current best practices for a given framework
* Building boilerplate, starter code, or patterns that will be copied across a project
* The user explicitly asks for documented, verified, or "correct" implementation
* Implementing features where the framework's recommended approach matters (forms, routing, data fetching, state management, auth)
* Reviewing or improving code that uses framework-specific patterns
* Any time you are about to write framework-specific code from memory
### When NOT to use
* Correctness does not depend on a specific version (renaming variables, fixing typos, moving files)
* Pure logic that works the same across all versions (loops, conditionals, data structures)
* The user explicitly wants speed over verification ("just do it quickly")


## spec-driven-development
> Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when requirements are unclear, ambiguous, or only exist as a vague idea.
### When to Use
* Starting a new project or feature
* Requirements are ambiguous or incomplete
* The change touches multiple files or modules
* You're about to make an architectural decision
* The task would take more than 30 minutes to implement
### When NOT to use
Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## test-driven-development
> Drives development with tests. Use when implementing any logic, fixing any bug, or changing any behavior. Use when you need to prove that code works, when a bug report arrives, or when you're about to modify existing functionality.
### When to Use
* Implementing any new logic or behavior
* Fixing any bug (the Prove-It Pattern)
* Modifying existing functionality
* Adding edge case handling
* Any change that could break existing behavior
### When NOT to Use
Pure configuration changes, documentation updates, or static content changes that have no behavioral impact.
### Related
For browser-based changes, combine TDD with runtime verification using Chrome DevTools MCP — see the Browser Testing section below.


## using-agent-skills
> Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.