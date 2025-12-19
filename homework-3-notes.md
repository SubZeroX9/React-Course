# Homework 3 Notes

## Step 2 — Context-Based Sidebar (Global UI State)

### Step 2.1 — Sidebar Choice

**Type:** Filter Sidebar

**What opens it:**
- Hamburger menu button in the Header component (top-left)

**Where it appears:**
- Left side of the screen
- Fixed position, slides in from the left
- Overlay on mobile (with dark backdrop), push content on desktop
- Contains search input and category filter

### Step 2.2 — Layout/UI Context Design

**Context State:**
| State | Type | Description |
|-------|------|-------------|
| `isOpen` | `boolean` | Whether the sidebar is currently visible |

**Context Actions:**
| Action | Description |
|--------|-------------|
| `open()` | Opens the sidebar |
| `close()` | Closes the sidebar |
| `toggle()` | Toggles sidebar open/closed state |

**Provider Location:**
- `SidebarProvider` wraps the entire app inside `Router` in `App.tsx`
- This ensures all routes have access to sidebar state

**Components that READ from context:**
- `Header` - reads `isOpen` to show active state on toggle button
- `FilterSidebar` - reads `isOpen` to show/hide itself
- `ProductList` - reads `isOpen` to adjust content margin

**Components that TRIGGER actions only:**
- `Header` - calls `toggle()` on hamburger button click
- `FilterSidebar` - calls `close()` on overlay click and close button

### Step 2.3 — Context Summary

**SidebarContext** manages the visibility state of the filter sidebar across the application.

| Field/Action | Type | Description |
|--------------|------|-------------|
| `isOpen` | `boolean` | Current visibility state of the sidebar |
| `open()` | `() => void` | Sets `isOpen` to `true` |
| `close()` | `() => void` | Sets `isOpen` to `false` |
| `toggle()` | `() => void` | Flips `isOpen` between `true`/`false` |

The context is consumed via the `useSidebar()` hook, which throws an error if used outside the provider. State is persisted to localStorage under the key `"sidebar-open"` so it survives page refreshes.

**Screenshot:**
![Filter Sidebar](Images/filter-sidebar.gif)

---

## Step 3 — Persist Sidebar with a Custom localStorage Hook

**Custom Hook:** `useLocalStorage<T>(key, defaultValue)`

**How it works:**
- On first load: tries `localStorage.getItem(key)`, parses JSON, falls back to `defaultValue` if missing/invalid
- On every change: saves new value to localStorage via `JSON.stringify()`
- Uses `useState` internally with lazy initializer to avoid SSR issues
- `useEffect` syncs state changes back to localStorage

**Test Results:**
- Opened sidebar, refreshed → still open ✓
- Closed sidebar, refreshed → still closed ✓

**Files:**
- `src/context/SidebarContext.ts` - Context definition
- `src/context/SidebarProvider.tsx` - Provider component with localStorage persistence
- `src/hooks/useSidebar.ts` - Consumer hook
- `src/hooks/useLocalStorage.ts` - Custom hook for localStorage persistence

---

## Step 4 — Global Toast Store (Zustand)

### Step 4.1 — Library Choice

**Library:** Zustand

**Why Zustand?** I was familiar with the library and saw it as most fitting for this use case.

**Store Location:** `src/stores/toastStore.ts`

### Step 4.2 — Notification Shape

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (timestamp + random string) |
| `message` | `string` | Yes | The notification text to display |
| `type` | `'success' \| 'error' \| 'info' \| 'warning'` | Yes | Determines toast styling/color |
| `duration` | `number` | No | Auto-dismiss time in ms (default: 5000, 0 = never) |

**Store State:**
| State | Type | Description |
|-------|------|-------------|
| `toasts` | `Toast[]` | Array of active toast notifications |

**Store Actions:**
| Action | Description |
|--------|-------------|
| `addToast(message, type?, duration?)` | Add a toast notification, auto-removes after duration |
| `removeToast(id)` | Remove a specific toast by ID |
| `clearToasts()` | Remove all toasts |

### Step 4.3 — ToastContainer Component

**Location:** `src/lib/components/ToastContainer.tsx`

**How it works:**
- Subscribes to `useToastStore` to get the list of toasts
- Renders toasts in a fixed position container (bottom-right)
- Each toast has different styling based on `type`:
  - `success` → green background
  - `error` → red background
  - `info` → blue background
  - `warning` → yellow background
- Each toast has a close button (×) to manually dismiss
- Mounted in `App.tsx` at the root level

**Screenshots:**
- Error toast: ![Error Toast](Images/ErrorToastBar.png)
- Success toast: ![Success Toast](Images/SuccessToastBar.png)

---

## Step 5 — Connect Toasts to Real Events with TanStack Query

### Step 5.1 — Success Toasts

Connected via `MutationCache` in `src/main.tsx`:
- On any successful mutation → shows "Operation completed successfully" toast

### Step 5.2 — Error Toasts

Connected via `QueryCache` and `MutationCache` in `src/main.tsx`:
- On query error → shows "Failed to fetch data: {error.message}" toast
- On mutation error → shows "Operation failed: {error.message}" toast

**Implementation:**
```typescript
queryCache: new QueryCache({
  onError: (error) => {
    useToastStore.getState().addToast(
      `Failed to fetch data: ${error.message}`,
      'error'
    );
  },
}),
mutationCache: new MutationCache({
  onError: (error) => {
    useToastStore.getState().addToast(
      `Operation failed: ${error.message}`,
      'error'
    );
  },
  onSuccess: () => {
    useToastStore.getState().addToast(
      'Operation completed successfully',
      'success'
    );
  },
}),
```

---

## Step 9 — Reflection

### State Distribution

**TanStack Query:**
- Products list (paginated)
- Product details (single product by ID)
- Categories list
- Prefetch product on hover

**Context (React):**
- Sidebar visibility (`isOpen`, `open`, `close`, `toggle`)
- Persisted to localStorage

**Zustand:**
- Filter Store: search, category, pagination (global so sidebar works on all pages)
- Toast Store: notifications array with add/remove actions

**Local useState:**
- `pageInput` in ProductList (temporary input value synced with store)

### Example: Global State Was Correct

Moving filter state (search, category, page) from local `useState` to Zustand was necessary because `FilterSidebar` needed to be accessible from `ProductDetail` page. With local state, the sidebar only worked on `ProductList`. Global state solved this.

### Example: Local State Was Intentional

`pageInput` remains local in `ProductList` because it's a temporary value for the page number input field. It only syncs to the global `page` state when the user presses Enter or clicks away. No other component needs this temporary input value.

### Summary
What I have learned:
- **Server state** belongs in TanStack Query (automatic caching, refetching, sync)
- **UI visibility state** that needs persistence → Context + localStorage
- **Shared client state** across multiple components/pages → Zustand
- **Short Lifetime input values** → local useState
