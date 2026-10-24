# Software Requirements Specification (SRS)
## Campus Canteen Ordering System

- **Document status:** Draft for classroom review
- **Version:** 0.1
- **Source:** Customer-discovery discussion in this repository

## 1. Purpose

The system will provide a simple way for students to view the canteen menu,
select food items, calculate an order total, submit an order, and view its
status. It will also help canteen staff review and process incoming orders.

## 2. Scope

### In scope for the initial learning prototype

- View menu items, prices, and availability.
- Select available menu items and quantities.
- Calculate and display the order total.
- Submit an order and show a confirmation/reference.
- View the status of an order.

### Out of scope for the initial prototype

- Real payment gateway integration.
- Off-campus delivery.
- Advanced stock forecasting or accounting integration.
- A final order-cancellation workflow; the policy requires stakeholder agreement.

## 3. Stakeholders and users

- **Student:** browses the menu and submits orders.
- **Canteen staff:** reviews incoming orders and updates order status.
- **College/canteen administration:** oversees the service and may maintain menu information.
- **Development team:** specifies, implements, tests, and maintains the system.

## 4. Functional requirements

### FR-001 — View menu

The system shall display menu items with their names, prices, and availability.
A short item description may be displayed when one is available.

**Acceptance criteria**
- Given that menu items exist, when a student opens the menu, each displayed item has a name and price.
- An unavailable item is clearly identified.
- Unavailable items cannot be added to a new order.

### FR-002 — Select menu items and quantities

The system shall allow a student to select one or more available menu items and
specify a positive whole-number quantity for each item.

**Acceptance criteria**
- A student can select more than one available item.
- Quantity must be an integer greater than zero.
- An unknown or unavailable item is rejected from the order.

### FR-003 — Calculate order total

The system shall calculate and display the order total by multiplying each
selected item's unit price by its quantity and adding the results. Taxes and
service charges are excluded from the initial prototype.

**Acceptance criteria**
- The displayed total equals the sum of unit price multiplied by quantity for all selected items.
- The total is recalculated when an item or quantity changes.
- The system rejects an empty order and invalid quantities.

### FR-004 — Submit an order

The system shall allow a student to submit a valid order containing at least
one available item and shall provide an order confirmation or reference.
Payment is simulated and no real payment gateway is required.

**Acceptance criteria**
- An order with at least one valid item can be submitted.
- An empty order cannot be submitted.
- A successful submission displays an order reference or confirmation.
- The confirmation reflects the order that was submitted.

### FR-005 — Track order status

The system shall allow a student to view the current status of their order.
The initial statuses are Submitted, Preparing, Ready, and Completed.

**Acceptance criteria**
- An order has a recognizable status.
- A student can view the status of their own order.
- Status changes made by authorized canteen staff are reflected when the order is viewed again.

## 5. Non-functional requirements

### NFR-001 — Menu response time

For this classroom exercise, the provisional target is that 95% of menu requests
complete within 2 seconds under 50 concurrent virtual users in a defined test
environment. The target must be confirmed and the test conditions documented
before the system is used in a real setting.

**Acceptance criteria**
- A performance test records response times for the agreed workload.
- The report identifies the test environment, number of virtual users, and measured percentile.
- The result is compared with the provisional target above.

### NFR-002 — Order privacy and authorization

The system shall prevent a student from viewing or changing another student's
private order. Canteen staff shall be able to access orders needed to process
them, subject to the permissions defined for the system.

**Acceptance criteria**
- A student can access their own order.
- A student cannot access another student's order by changing an order identifier or URL.
- Unauthorized access attempts are rejected without revealing another student's order details.

## 6. Business rules

- Only available menu items can be ordered.
- Quantities must be positive whole numbers.
- An order must contain at least one item.
- The total is calculated from item prices and quantities; taxes and service charges are excluded from the initial prototype.
- Initial order statuses are Submitted, Preparing, Ready, and Completed.
- Real payment processing is outside the initial scope.
- The cancellation policy remains unresolved and must not be implemented as a confirmed rule until the stakeholder decides it.

## 7. Assumptions and constraints

- This is an educational prototype for a college canteen.
- The menu and order data may be simulated in the earliest version.
- The performance target is a provisional classroom value, not a measured production guarantee.
- Authentication and authorization details must be designed before any real student information is used.

## 8. Open questions

- At what point, if any, can a student cancel an order?
- Which role is allowed to add, edit, or disable menu items?
- What authentication method will be used if the prototype becomes a deployed system?
- Who approves the performance target and test environment?

## 9. Validation and traceability

Each requirement has a unique identifier. The team will create a GitHub Issue for
each requirement and will include its ID in the Issue title and description.
The team will review the SRS for clarity, completeness, consistency, feasibility,
and testability. Implementation and test links will be added as they become
available in later labs.
