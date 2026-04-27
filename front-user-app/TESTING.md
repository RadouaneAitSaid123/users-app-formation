# Testing Guide — Users App

This guide covers everything you need to write and run tests for this React application using **React Testing Library (RTL)**.

---

## Table of Contents

1. [Testing Stack Overview](#1-testing-stack-overview)
2. [Setup & Configuration](#2-setup--configuration)
3. [Test File Conventions](#3-test-file-conventions)
4. [Core Concepts to Know Before Writing Tests](#4-core-concepts-to-know-before-writing-tests)
5. [Components to Test](#5-components-to-test)
6. [Test Scenarios — Step by Step](#6-test-scenarios--step-by-step)
   - [Navbar](#61-navbar)
   - [InputSearch](#62-inputsearch)
   - [UserForm](#63-userform)
   - [UserList (Table)](#64-userlist-table)
   - [UserRow](#65-userrow)
   - [ConfirmModal](#66-confirmmodal)
   - [AlertContainer & AlertItem](#67-alertcontainer--alertitem)
   - [useUsers Hook](#68-useusers-hook)
   - [useUser Hook](#69-useuser-hook)
   - [AddUser Page](#610-adduser-page)
   - [EditUser Page](#611-edituser-page)
   - [UsersContainer Page](#612-userscontainer-page)
7. [How to Run Tests](#7-how-to-run-tests)

---

## 1. Testing Stack Overview

| Library | Version | Purpose |
|---|---|---|
| `@testing-library/react` | ^16.3.2 | Render components and interact with the DOM |
| `@testing-library/jest-dom` | ^6.9.1 | Extra matchers: `toBeInTheDocument()`, `toHaveValue()`, etc. |
| `@testing-library/user-event` | ^13.5.0 | Simulate real user interactions (typing, clicking) |
| `@testing-library/dom` | ^10.4.1 | Low-level DOM querying utilities |
| Jest (built into CRA) | — | Test runner, assertions, mocking |

> All libraries are already installed. You do NOT need to run `npm install`.

---

## 2. Setup & Configuration

### 2.1 — The `setupTests.js` file

Create React App (CRA) automatically generates `src/setupTests.js`. This file is executed **before every test file**. It imports `@testing-library/jest-dom`, which extends Jest's `expect()` with DOM-aware matchers.

**What it does:**
- Adds matchers like `toBeInTheDocument()`, `toHaveTextContent()`, `toBeDisabled()`, etc.
- You do not need to import it manually in each test file — CRA handles that.

**What to verify:** Open `src/setupTests.js` and confirm it contains the import for `@testing-library/jest-dom`. If the file does not exist, create it and add that single import.

### 2.2 — No extra configuration needed

Because this project uses CRA (`react-scripts`), Jest is already pre-configured. You do not need:
- A `jest.config.js` file
- A `babel.config.js` file
- Any extra plugins

### 2.3 — CSS imports in test environment

Your components import `.css` files (e.g., `Alert.css`, `ConfirmModal.css`). Jest cannot process CSS files by default, **but CRA already handles this** — CSS imports are automatically mocked in the test environment.

---

## 3. Test File Conventions

### Where to place test files

Two valid approaches — pick one and stay consistent:

**Option A — Co-located (recommended):** Place the test file next to the component it tests.
```
src/
  components/
    UserForm/
      index.jsx
      index.test.jsx     ← test file here
    Navbar/
      index.jsx
      index.test.jsx
```

**Option B — Centralized:** Place all tests in a `src/__tests__/` folder.
```
src/
  __tests__/
    UserForm.test.jsx
    Navbar.test.jsx
    useUsers.test.js
```

### File naming rules

- Test files must end in `.test.jsx`, `.test.js`, `.spec.jsx`, or `.spec.js`
- CRA/Jest automatically finds and runs any file matching these patterns

### Test file structure

Every test file follows this skeleton:

```
describe('ComponentName', () => {

  it('should do something specific', () => {
    // 1. Arrange  — render the component / prepare data
    // 2. Act      — simulate a user interaction
    // 3. Assert   — check what you expect to see
  });

});
```

The **Arrange / Act / Assert** pattern is the foundation of every test you will write.

---

## 4. Core Concepts to Know Before Writing Tests

### 4.1 — `render()`

`render()` from `@testing-library/react` mounts your component into a virtual DOM. After calling it, the component is live and you can query its output.

### 4.2 — `screen`

`screen` is an object that gives you access to everything rendered in the DOM. It is your main tool for finding elements.

| Query | When to use |
|---|---|
| `screen.getByText('...')` | Element with exact text must exist (throws if not found) |
| `screen.getByRole('button', { name: '...' })` | Find by ARIA role + accessible name (preferred) |
| `screen.getByPlaceholderText('...')` | Input found by its placeholder |
| `screen.getByLabelText('...')` | Input found by its label text |
| `screen.queryByText('...')` | Same as `getBy` but returns `null` instead of throwing — use for asserting absence |
| `screen.findByText('...')` | **Async** — returns a Promise, use with `await` for elements that appear after an API call |

**Priority rule:** Prefer `getByRole` > `getByLabelText` > `getByPlaceholderText` > `getByText`. This mirrors how real users and screen readers interact with your app.

### 4.3 — `userEvent` vs `fireEvent`

- `userEvent` simulates real user behavior (dispatches multiple real browser events)
- `fireEvent` is a lower-level utility that fires a single synthetic event
- **Always prefer `userEvent`** for typing, clicking, and form interactions

Usage: `userEvent.type(inputElement, 'hello')`, `userEvent.click(buttonElement)`

### 4.4 — Async testing

Many components in this app fetch data on mount. The DOM updates after the `fetch` resolves. Use these tools for async scenarios:

- `await screen.findByText('...')` — waits (up to a timeout) for the element to appear
- `waitFor(() => expect(...).toBe...)` — waits until an assertion stops throwing

### 4.5 — Mocking `fetch`

This app uses the native `window.fetch`. Jest does not mock it automatically. Before each async test that triggers an API call, you must replace `global.fetch` with a `jest.fn()` that returns a fake resolved Promise.

The mock must return an object that has a `.json()` method (because your hooks call `.then(res => res.json())`).

After each test, restore the original fetch with `jest.restoreAllMocks()` or by resetting it manually.

### 4.6 — Mocking React Router (`useNavigate`, `useParams`)

`UserRow`, `UsersView`, `AddUser`, and `EditUser` all use React Router hooks. In tests, you must wrap these components inside a `<MemoryRouter>` (from `react-router`).

- For pages that need a URL param (like `EditUser` which reads `:id`), use `<MemoryRouter initialEntries={['/users/edit/1']}>` combined with the appropriate `<Routes>` and `<Route>` wrappers.

### 4.7 — Providing Context (`AlertProvider`)

`AddUser`, `EditUser`, and `UsersContainer` call `useAlert()` which reads from `AlertContext`. If you render these components without the context, the hook will return `null` and the component will crash.

**Solution:** Always wrap these components inside `<AlertProvider>` when rendering them in tests.

### 4.8 — `renderHook()`

For testing custom hooks (`useUsers`, `useUser`) in isolation without mounting a full component, use `renderHook()` from `@testing-library/react`.

---

## 5. Components to Test

| File | Type | Uses Router | Uses Context | Needs fetch mock |
|---|---|---|---|---|
| `components/Navbar/index.jsx` | Stateless | No | No | No |
| `components/InputSearch.jsx` | Stateless | No | No | No |
| `components/UserForm/index.jsx` | Controlled form | No | No | No |
| `components/UserList/index.jsx` | List (with `useMemo`) | Yes (child) | No | No |
| `components/UserList/UserRow.jsx` | Row with actions | Yes | No | No |
| `components/ConfirmModal/index.jsx` | Conditional modal | No | No | No |
| `components/Alert/index.jsx` | Display only | No | No | No |
| `context/AlertContext.jsx` | Context + state | No | Self | No |
| `hooks/useUsers.js` | Custom hook | No | No | Yes |
| `hooks/useUser.js` | Custom hook | No | No | Yes |
| `pages/AddUser/index.jsx` | Page | Yes | Yes | Yes |
| `pages/EditUser/index.jsx` | Page | Yes | Yes | Yes |
| `pages/Users/index.jsx` (container) | Page | Yes | Yes | Yes |

---

## 6. Test Scenarios — Step by Step

---

### 6.1 Navbar

**File:** `src/components/Navbar/index.jsx`
**Test file to create:** `src/components/Navbar/index.test.jsx`

The Navbar is a stateless component with no props, no hooks, and no API calls. It is the simplest component to test — a perfect starting point.

---

#### Scenario 1 — Renders the "Home" link

**What you are testing:** The Home link is present in the DOM with the correct `href`.

**Steps:**
1. Import `render` and `screen` from `@testing-library/react`
2. Import the `Navbare` component
3. Inside a `describe('Navbar', ...)` block, write an `it('renders the Home link', ...)` test
4. Call `render(<Navbare />)` to mount the component
5. Use `screen.getByText('Home')` to find the element
6. Assert that the element is in the document using `.toBeInTheDocument()`
7. Also assert that it has the correct `href` attribute value `"/"` using `.toHaveAttribute('href', '/')`

---

#### Scenario 2 — Renders the "Users" link

**Steps:** Same pattern as Scenario 1, but search for `'Users'` text and assert `href="/users"`.

---

#### Scenario 3 — Renders the "Logout" button

**Steps:**
1. Render the component
2. Use `screen.getByRole('button', { name: /logout/i })` to find the button by its ARIA role and accessible name (the `i` flag makes it case-insensitive)
3. Assert it is in the document

---

### 6.2 InputSearch

**File:** `src/components/InputSearch.jsx`
**Test file to create:** `src/components/InputSearch/InputSearch.test.jsx` (or next to the file)

`InputSearch` receives `value` and `onChange` as props. You control both from the test.

---

#### Scenario 1 — Renders the input with the correct placeholder

**Steps:**
1. Import `render` and `screen`
2. Import `InputSearch`
3. Render the component, passing `value=""` and `onChange` as a `jest.fn()` (a mock function)
4. Use `screen.getByPlaceholderText('Search...')` to find the input
5. Assert it is in the document

---

#### Scenario 2 — Displays the value passed as a prop

**Steps:**
1. Render the component with `value="Alice"` and `onChange` as `jest.fn()`
2. Find the input using `getByPlaceholderText`
3. Assert that `input.value` equals `"Alice"` using `.toHaveValue('Alice')`

---

#### Scenario 3 — Calls `onChange` when the user types

**Steps:**
1. Create a mock function: `const handleChange = jest.fn()`
2. Render the component with `value=""` and `onChange={handleChange}`
3. Find the input element
4. Use `userEvent.type(input, 'Bob')` to simulate the user typing
5. Assert that `handleChange` was called using `expect(handleChange).toHaveBeenCalled()`

---

### 6.3 UserForm

**File:** `src/components/UserForm/index.jsx`
**Test file to create:** `src/components/UserForm/index.test.jsx`

`UserForm` is a controlled form component. It receives `handleChange`, `handleSubmit`, `user` (object), and `label` as props. It contains no internal state and makes no API calls — ideal for unit testing.

---

#### Scenario 1 — Renders all four input fields

**What you are testing:** All four inputs (Name, Lastname, Email, Phone) are rendered.

**Steps:**
1. Create a fake `user` object: `{ name: '', lastName: '', email: '', phone: '' }`
2. Render `<UserForm handleChange={jest.fn()} handleSubmit={jest.fn()} user={fakeUser} label="Add" />`
3. Use `screen.getByPlaceholderText('Enter user name')` and assert it is in the document
4. Repeat for `'Enter user lastname'`, `'Enter user email'`, `'Enter user phone'`

---

#### Scenario 2 — The button label is dynamic

**Steps:**
1. Render the form with `label="Add"`, find the button by role: `screen.getByRole('button', { name: 'Add' })`
2. Assert it is in the document
3. Re-render the form with `label="Edit"`, find the button with `{ name: 'Edit' }`
4. Assert it is in the document

---

#### Scenario 3 — Inputs display the values passed through props

**Steps:**
1. Render the form with `user={{ name: 'Alice', lastName: 'Dupont', email: 'alice@test.com', phone: '0600000000' }}`
2. Find the name input with `getByPlaceholderText('Enter user name')`
3. Assert its value with `.toHaveValue('Alice')`
4. Repeat for the other three fields

---

#### Scenario 4 — Calls `handleChange` when the user types

**Steps:**
1. Create a mock: `const handleChange = jest.fn()`
2. Render the form with `user={{ name: '', ... }}` and pass `handleChange` as the prop
3. Find the name input
4. Use `userEvent.type(input, 'Bob')` to simulate typing
5. Assert `handleChange` was called with `expect(handleChange).toHaveBeenCalled()`

---

#### Scenario 5 — Calls `handleSubmit` when the form is submitted

**Steps:**
1. Create a mock: `const handleSubmit = jest.fn()`
2. Render the form with `handleSubmit={handleSubmit}`
3. Find the submit button with `getByRole('button', { name: 'Add' })`
4. Use `userEvent.click(button)` to simulate a click
5. Assert `handleSubmit` was called: `expect(handleSubmit).toHaveBeenCalledTimes(1)`

---

#### Scenario 6 — Default browser form submission is prevented

**What you are testing:** The form calls `e.preventDefault()` so the page does not reload.

**Steps:**
1. Create a mock function for `handleSubmit`
2. Render the form
3. Find the form element with `screen.getByRole('form')` (note: this requires you to add `aria-label` to the `<form>` tag in the component — this is also a good accessibility improvement)
4. Alternatively, you can use `fireEvent.submit(formElement)` and assert that `handleSubmit` was called without any navigation or error
5. The test passing without throwing is itself evidence that `preventDefault` worked

---

### 6.4 UserList (Table)

**File:** `src/components/UserList/index.jsx`
**Test file to create:** `src/components/UserList/index.test.jsx`

`UserList` filters users by `search` using `useMemo` and renders a `UserRow` for each result. Since `UserRow` uses `useNavigate`, you must wrap the whole render in a `MemoryRouter`.

---

#### Scenario 1 — Renders table headers

**Steps:**
1. Wrap the render with `<MemoryRouter>`
2. Pass `users={[]}`, `search=""`, and `deleteUser={jest.fn()}`
3. Assert that `'Name'`, `'LastName'`, `'Email'`, `'Phone'`, `'Actions'` are all in the document using `screen.getByText`

---

#### Scenario 2 — Renders one row per user

**Steps:**
1. Create an array of 2 fake user objects, each with `{ id, name, lastName, email, phone }`
2. Render the component wrapped in `<MemoryRouter>` with `search=""`
3. Assert that each user's `name` and `email` appear in the document

---

#### Scenario 3 — Filters users by the `search` prop

**Steps:**
1. Create 3 fake users: `Alice`, `Bob`, `Alicia`
2. Render with `search="ali"` (case should not matter — the filter uses `toLowerCase`)
3. Assert that `'Alice'` and `'Alicia'` are in the document
4. Assert that `'Bob'` is **not** in the document using `screen.queryByText('Bob')` and `.not.toBeInTheDocument()`

---

#### Scenario 4 — Renders an empty table when no users match the filter

**Steps:**
1. Render 2 users with `search="zzz"` (no user matches)
2. Assert that no `<tr>` rows appear in the `<tbody>` — you can query by role `'row'` and check the count

---

### 6.5 UserRow

**File:** `src/components/UserList/UserRow.jsx`
**Test file to create:** `src/components/UserList/UserRow.test.jsx`

`UserRow` uses `useNavigate`, so it must always be wrapped in `<MemoryRouter>`.

---

#### Scenario 1 — Renders all user data in the correct cells

**Steps:**
1. Create a fake user: `{ id: 1, name: 'Alice', lastName: 'Dupont', email: 'alice@test.com', phone: '0600000000' }`
2. Render inside `<MemoryRouter>`: `<table><tbody><UserRow user={fakeUser} deleteUser={jest.fn()} /></tbody></table>` (the table wrapper is required for valid HTML)
3. Assert that `'Alice'`, `'Dupont'`, `'alice@test.com'`, `'0600000000'` are each in the document

---

#### Scenario 2 — Calls `deleteUser` with the correct ID when the delete button is clicked

**Steps:**
1. Create a mock: `const deleteUser = jest.fn()`
2. Render the row with `user={{ id: 42, name: 'Alice', ... }}` and `deleteUser={deleteUser}`
3. Find the delete button — since it only contains an icon (no text), query it by its CSS class or use `getAllByRole('button')` and pick the first one (the delete button is always first in the row)
4. Use `userEvent.click(deleteButton)`
5. Assert: `expect(deleteUser).toHaveBeenCalledWith(42)`

---

#### Scenario 3 — Navigates to the view route when the eye button is clicked

**Steps:**
1. This requires checking that `useNavigate` was called with the correct path
2. The simplest approach: mock `react-router`'s `useNavigate` using `jest.mock('react-router', ...)` — this replaces the entire module and lets you assert what path was navigated to
3. Read about `jest.mock()` with module factories before attempting this scenario

---

### 6.6 ConfirmModal

**File:** `src/components/ConfirmModal/index.jsx`
**Test file to create:** `src/components/ConfirmModal/index.test.jsx`

This is a conditional render component — it returns `null` when `show` is `false`.

---

#### Scenario 1 — Does not render when `show` is false

**Steps:**
1. Render the component with `show={false}`, `onConfirm={jest.fn()}`, `onCancel={jest.fn()}`, `userName="Alice"`
2. Use `screen.queryByText('Delete User')` to look for the modal title
3. Assert `.not.toBeInTheDocument()` — the modal should not be visible

---

#### Scenario 2 — Renders when `show` is true and displays the user name

**Steps:**
1. Render with `show={true}` and `userName="Alice Dupont"`
2. Assert that `'Delete User'` (the title) is in the document
3. Assert that `'Alice Dupont'` appears somewhere in the modal (inside the `<strong>` tag)
4. Use `screen.getByText(/Alice Dupont/i)` with a regex to be flexible

---

#### Scenario 3 — Calls `onCancel` when the "Cancel" button is clicked

**Steps:**
1. Create a mock: `const onCancel = jest.fn()`
2. Render with `show={true}`, pass `onCancel`
3. Find the Cancel button: `screen.getByRole('button', { name: /cancel/i })`
4. Click it with `userEvent.click`
5. Assert `onCancel` was called once

---

#### Scenario 4 — Calls `onConfirm` when the "Delete" button is clicked

**Steps:** Same pattern as Scenario 3, but find the button with `{ name: /delete/i }` and assert `onConfirm` was called.

---

#### Scenario 5 — Calls `onCancel` when the backdrop is clicked

**Steps:**
1. Render with `show={true}` and `onCancel={jest.fn()}`
2. Find the backdrop element — it has the CSS class `confirm-backdrop`. Use `document.querySelector('.confirm-backdrop')` or add a `data-testid="confirm-backdrop"` attribute to the component first (this is a recommended testing best practice)
3. Click the backdrop with `userEvent.click`
4. Assert `onCancel` was called

---

### 6.7 AlertContainer & AlertItem

**File:** `src/components/Alert/index.jsx`
**Test file to create:** `src/components/Alert/index.test.jsx`

---

#### Scenario 1 — Does not render when the alerts array is empty

**Steps:**
1. Render `<AlertContainer alerts={[]} onDismiss={jest.fn()} />`
2. Assert there is no `alert-stack` container in the DOM — use `queryByRole` or check for the absence of alert text

---

#### Scenario 2 — Renders one alert with the correct message and type

**Steps:**
1. Create a fake alert array: `[{ id: 1, message: 'User added successfully!', type: 'success' }]`
2. Render `<AlertContainer alerts={fakeAlerts} onDismiss={jest.fn()} />`
3. Assert that `'User added successfully!'` is in the document
4. Assert that the alert element has the CSS class `alert-success` using `.toHaveClass('alert-success')`

---

#### Scenario 3 — Renders multiple alerts

**Steps:**
1. Create an array with 2 alerts (different messages)
2. Render and assert that both messages are visible simultaneously

---

#### Scenario 4 — Calls `onDismiss` with the correct ID when the close button is clicked

**Steps:**
1. Create `const onDismiss = jest.fn()` and an alert with `id: 99`
2. Render with that alert
3. Find the close button — it has no text, only an icon. Use `getByRole('button')` (there is only one button per alert)
4. Click it
5. Assert: `expect(onDismiss).toHaveBeenCalledWith(99)`

---

### 6.8 `useUsers` Hook

**File:** `src/hooks/useUsers.js`
**Test file to create:** `src/hooks/useUsers.test.js`

You will use `renderHook` from `@testing-library/react` and mock `global.fetch`.

---

#### Scenario 1 — Returns `isLoading: true` initially

**Steps:**
1. Mock `global.fetch` to return a Promise that never resolves (to freeze the hook in the loading state)
2. Call `renderHook(() => useUsers())`
3. Destructure the `result.current` to get `{ isLoading }`
4. Assert `isLoading` is `true`

---

#### Scenario 2 — Returns the fetched users after the API call resolves

**Steps:**
1. Mock `global.fetch` so it resolves with a fake array of users: `[{ id: 1, name: 'Alice', ... }]`
2. The mock must return `{ json: () => Promise.resolve(fakeUsers) }` because the hook calls `.then(res => res.json())`
3. Call `renderHook(() => useUsers())`
4. Since the fetch is async, use `await waitFor(() => { ... })` around your assertion
5. Inside `waitFor`, assert that `result.current.users` equals your fake array
6. Also assert that `result.current.isLoading` is now `false`

---

#### Scenario 3 — Sets `error` when the fetch fails

**Steps:**
1. Mock `global.fetch` to return a rejected Promise: `jest.fn().mockRejectedValue(new Error('Network error'))`
2. Call `renderHook`
3. Use `waitFor` and assert that `result.current.error` equals `'Network error'`
4. Also assert `isLoading` is `false`

---

#### Scenario 4 — Calls the correct URL

**Steps:**
1. Mock `global.fetch` to resolve with an empty array
2. Render the hook
3. After it resolves, assert that `global.fetch` was called with `'http://localhost:5051/api/users'`
4. Use: `expect(global.fetch).toHaveBeenCalledWith('http://localhost:5051/api/users')`

---

### 6.9 `useUser` Hook

**File:** `src/hooks/useUser.js`
**Test file to create:** `src/hooks/useUser.test.js`

Same approach as `useUsers`, but this hook takes a `userId` argument and appends it to the URL.

---

#### Scenario 1 — Does NOT fetch when `userId` is undefined

**Steps:**
1. Mock `global.fetch` as `jest.fn()`
2. Call `renderHook(() => useUser(undefined))`
3. Assert that `global.fetch` was **never** called: `expect(global.fetch).not.toHaveBeenCalled()`

---

#### Scenario 2 — Fetches the correct URL with the given ID

**Steps:**
1. Mock `global.fetch` to resolve with a fake user object
2. Call `renderHook(() => useUser(5))`
3. After the hook resolves (use `waitFor`), assert that fetch was called with `'http://localhost:5051/api/users/5'`

---

#### Scenario 3 — Returns the user data after a successful fetch

**Steps:**
1. Create a fake user: `{ id: 5, name: 'Alice', lastName: 'Dupont', email: 'alice@test.com', phone: '0600' }`
2. Mock fetch to resolve with this object
3. Assert that `result.current.user` equals the fake user after resolution

---

### 6.10 AddUser Page

**File:** `src/pages/AddUser/index.jsx`
**Test file to create:** `src/pages/AddUser/index.test.jsx`

This page uses `useNavigate` (needs `MemoryRouter`) and `useAlert` (needs `AlertProvider`). It also calls `fetch` on submit.

---

#### Scenario 1 — Renders the "Add user form" title and the UserForm

**Steps:**
1. Wrap the render in both `<AlertProvider>` and `<MemoryRouter>`
2. Assert that `'Add user form'` heading is in the document: `screen.getByRole('heading', { name: /add user form/i })`
3. Assert that the `'Add'` button from UserForm is in the document

---

#### Scenario 2 — Sends a POST request with the correct data when the form is submitted

**Steps:**
1. Mock `global.fetch` to resolve with a success response: `{ json: () => Promise.resolve({}) }`
2. Render the page wrapped in context and router
3. Find each input by its placeholder text
4. Use `userEvent.type` to fill in Name, Lastname, Email, Phone
5. Click the `'Add'` submit button
6. After the click, use `await waitFor(...)` to let the Promise chain run
7. Assert that `global.fetch` was called with:
   - The URL: `'http://localhost:5051/api/users'`
   - The method: `'POST'`
   - The body containing the JSON-stringified user data
   - The correct Content-Type header
8. Use `expect(global.fetch).toHaveBeenCalledWith(url, expect.objectContaining({ method: 'POST' }))`

---

#### Scenario 3 — Shows a success alert after successful submission

**Steps:**
1. Mock fetch to resolve successfully
2. Render, fill the form, and submit
3. Use `await screen.findByText('User added successfully!')` (async query, waits for the alert to appear)
4. Assert it is in the document

---

#### Scenario 4 — Shows an error alert when the API call fails

**Steps:**
1. Mock `global.fetch` to reject: `jest.fn().mockRejectedValue(new Error('fail'))`
2. Render, fill the form, submit
3. Use `await screen.findByText('Failed to add user. Please try again.')`

---

### 6.11 EditUser Page

**File:** `src/pages/EditUser/index.jsx`
**Test file to create:** `src/pages/EditUser/index.test.jsx`

This page is more complex because it:
1. Reads `:id` from the URL via `useParams`
2. Fetches the existing user via the `useUser` hook (first API call on mount)
3. Pre-fills the form with the result
4. Sends a PATCH request on submit (second API call)

You need to simulate a route like `/users/edit/1`.

---

#### Scenario 1 — Shows "Loading..." while the user is being fetched

**Steps:**
1. Mock `global.fetch` so it never resolves (return a `new Promise(() => {})`)
2. Render the component inside a `<MemoryRouter initialEntries={['/users/edit/1']}>` with the corresponding `<Routes>` and `<Route path="/users/edit/:id">` wrapping the component
3. Also wrap with `<AlertProvider>`
4. Assert that `screen.getByText('Loading...')` is in the document

---

#### Scenario 2 — Pre-fills the form with the fetched user's data

**Steps:**
1. Create a fake user: `{ id: 1, name: 'Alice', lastName: 'Dupont', email: 'alice@test.com', phone: '0600' }`
2. Mock fetch to resolve with this user
3. Render inside a router with route `/users/edit/1`
4. Use `await screen.findByDisplayValue('Alice')` — this waits for the input to be populated with the value
5. Assert that `'Alice'` is the value of the name input using `.toHaveValue('Alice')`
6. Repeat for `lastName`, `email`, and `phone`

---

#### Scenario 3 — Sends a PATCH request on submit

**Steps:**
1. Mock fetch: first call (GET) resolves with the fake user, second call (PATCH) resolves with `{}`
2. To differentiate calls, you can make `fetch` return different responses based on call order using `mockResolvedValueOnce`
3. Render, wait for the form to be pre-filled
4. Change the name input: first clear it, then type a new name using `userEvent.clear` + `userEvent.type`
5. Click the `'Edit'` button
6. Assert that the second `fetch` call used `method: 'PATCH'` and the updated URL

---

#### Scenario 4 — Shows a success alert after a successful update

**Steps:**
1. Mock both fetch calls to resolve successfully
2. Render, wait for form to load, submit
3. Await `screen.findByText('User updated successfully!')`

---

### 6.12 UsersContainer Page

**File:** `src/pages/Users/index.jsx`
**Test file to create:** `src/pages/Users/index.test.jsx`

This is the most complete integration test. It tests the interaction between `useUsers`, `UsersView`, `UserList`, and `ConfirmModal`.

---

#### Scenario 1 — Shows the loading indicator while fetching

**Steps:**
1. Mock fetch to never resolve
2. Render wrapped in `<AlertProvider>` and `<MemoryRouter>`
3. Assert `screen.getByText(/loading data/i)` is in the document

---

#### Scenario 2 — Renders the users list after data loads

**Steps:**
1. Mock fetch to resolve with 2 fake users
2. Render the container
3. Use `await screen.findByText('Alice')` to wait for the data to appear
4. Assert both users' names are visible

---

#### Scenario 3 — Filters the list when the user types in the search input

**Steps:**
1. Mock fetch to resolve with users: `Alice`, `Bob`, `Alicia`
2. Render and wait for data to load (`await screen.findByText('Alice')`)
3. Find the search input with `screen.getByPlaceholderText('Search...')`
4. Use `userEvent.type` to type `'ali'`
5. Assert `'Alice'` and `'Alicia'` are visible
6. Assert `'Bob'` is no longer visible: `expect(screen.queryByText('Bob')).not.toBeInTheDocument()`

---

#### Scenario 4 — Opens the confirm modal when a delete button is clicked

**Steps:**
1. Mock fetch to resolve with one user: `{ id: 1, name: 'Alice', lastName: 'Dupont', ... }`
2. Render and wait for the user to appear
3. Find the delete button (the first `btn-danger` button) and click it
4. Assert that the modal title `'Delete User'` appears in the document
5. Assert that `'Alice Dupont'` appears in the modal message

---

#### Scenario 5 — Calls the DELETE API and removes the user after confirmation

**Steps:**
1. Mock fetch: first call (GET) returns the user list, second call (DELETE) resolves with `{}`
2. Render, wait for data, click the delete button, assert the modal is open
3. Click the `'Delete'` button inside the modal
4. Use `await waitFor(...)` to wait for the user to be removed
5. Assert the user's name is no longer in the document
6. Assert a success alert `'User deleted successfully.'` is shown
7. Assert the DELETE fetch was called with the correct URL and `{ method: 'DELETE' }`

---

#### Scenario 6 — Closes the modal without deleting when "Cancel" is clicked

**Steps:**
1. Mock fetch to resolve with a user list
2. Click the delete button to open the modal
3. Click `'Cancel'`
4. Assert the modal is gone (`queryByText('Delete User')` → `.not.toBeInTheDocument()`)
5. Assert the user is still visible in the table
6. Assert fetch was only called **once** (the initial GET) — the DELETE was never triggered

---

## 7. How to Run Tests

### Run all tests (watch mode)

```bash
npm test
```

This starts Jest in **interactive watch mode**. It watches for file changes and re-runs affected tests automatically. Press `a` to run all tests, `q` to quit.

### Run all tests once (no watch, good for CI)

```bash
npm test -- --watchAll=false
```

### Run a single test file

```bash
npm test -- --testPathPattern=UserForm
```

Replace `UserForm` with any part of the file name or path. Jest will only run files whose path matches the pattern.

### Run tests with coverage report

```bash
npm test -- --watchAll=false --coverage
```

This generates a coverage report in the terminal and in `coverage/lcov-report/index.html`. Open that HTML file in a browser for a visual overview of which lines are covered.

### Run a single `it()` or `describe()` block

Append `.only` to temporarily focus on one test:

```javascript
it.only('should render the submit button', () => { ... });
// or
describe.only('UserForm', () => { ... });
```

Remove `.only` when done — leaving it in will make all other tests in the file be skipped.

### Skip a test temporarily

Append `.skip` to a test you want to ignore without deleting it:

```javascript
it.skip('this test is not ready yet', () => { ... });
```

### Useful keyboard shortcuts in watch mode

| Key | Action |
|---|---|
| `a` | Run all tests |
| `f` | Run only failed tests |
| `p` | Filter by file name pattern |
| `t` | Filter by test name |
| `q` | Quit watch mode |
| `Enter` | Re-run the last run |

---

## Summary — Test Pyramid for This App

```
                    /\
                   /  \
                  / E2E \          (not covered here — e.g. Cypress/Playwright)
                 /________\
                /          \
               / Integration \     UsersContainer, AddUser, EditUser
              /______________\
             /                \
            /   Component tests \   UserForm, UserRow, ConfirmModal, AlertContainer
           /____________________\
          /                      \
         /    Unit (hooks/utils)   \  useUsers, useUser
        /____________________________\
```

Start at the bottom of the pyramid and work upward.
