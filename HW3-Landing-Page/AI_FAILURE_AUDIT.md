# AI Failure Audit — HW3 Resilient Event Hub

## 1. Purpose

This document records potential AI-generated implementation failures
and the safeguards used to prevent or detect them.

The goal is to make the implementation resilient, testable, and
maintainable rather than relying on generated code without verification.

---

## 2. Failure Mode: Countdown Drift

### Risk

A naive countdown may decrease a counter every second:

```javascript
seconds--;