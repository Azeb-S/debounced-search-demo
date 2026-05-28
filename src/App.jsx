// Import useEffect and useState hooks from React
import { useEffect, useState } from "react"

// Import CSS file for styling
import "./App.css"

// Array of sample food items
const items = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Watermelon",
  "Pineapple",
  "Grapes",
  "Peach",
  "Coffee",
  "Milk",
  "Bread",
  "Tuna",
  "Spinach"
]

// Main App component
export default function App() {

  // State for normal search input text
  const [naiveSearch, setNaiveSearch] = useState("")

  // State for debounced search input text
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Stores results for normal search
  const [naiveResults, setNaiveResults] = useState([])

  // Stores results for debounced search
  const [debouncedResults, setDebouncedResults] = useState([])

  // Counts how many times the normal search runs
  const [naiveCalls, setNaiveCalls] = useState(0)

  // Counts how many times the debounced search runs
  const [debouncedCalls, setDebouncedCalls] = useState(0)

  // Function that simulates an API search
  function fakeApiSearch(searchText) {

    // Filter items array
    // Keep only items that include the search text
    return items.filter((item) =>

      // Convert both strings to lowercase
      // Makes search case-insensitive
      item.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  // Runs every time user types in naive search input
  function handleNaiveChange(event) {

    // Get current input value
    const value = event.target.value

    // Update naive search state
    setNaiveSearch(value)

    // Increase API call count by 1
    setNaiveCalls((prev) => prev + 1)

    // Immediately run search and update results
    setNaiveResults(fakeApiSearch(value))
  }

  // useEffect runs whenever debouncedSearch changes
  useEffect(() => {

    // If input is empty
    if (debouncedSearch === "") {

      // Clear search results
      setDebouncedResults([])

      // Stop the rest of the effect
      return
    }

    // Start a timer
    // Wait 500 milliseconds before searching
    const timer = setTimeout(() => {

      // Increase debounced API call count
      setDebouncedCalls((prev) => prev + 1)

      // Run search after delay
      setDebouncedResults(fakeApiSearch(debouncedSearch))

    }, 500)

    // Cleanup function
    // Runs before the next effect
    return () => {

      // Cancel previous timer
      // Prevents unnecessary searches
      clearTimeout(timer)
    }

    // Dependency array
    // Effect runs every time debouncedSearch changes
  }, [debouncedSearch])

  // JSX UI
  return (

    // Main container
    <main className="app">

      {/* Main title */}
      <h1>Debounced Search</h1>

      {/* Description text */}
      <p>
        Compare a normal search that fires on every key press with a debounced
        search that waits until the user stops typing.
      </p>

      {/* Container holding both search sections */}
      <div className="demo-container">

        {/* Naive search section */}
        <section className="card">

          {/* Section title */}
          <h2>Naive Search</h2>

          {/* Explanation */}
          <p>Calls the search immediately on every key press.</p>

          {/* Search input */}
          <input

            // Input type
            type="text"

            // Placeholder text
            placeholder="Search food..."

            // Current input value
            value={naiveSearch}

            // Function runs every time user types
            onChange={handleNaiveChange}
          />

          {/* Display number of API calls */}
          <h3>API Calls: {naiveCalls}</h3>

          {/* Results list */}
          <ul>

            {/* Loop through results array */}
            {naiveResults.map((item) => (

              // Render each item
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Debounced search section */}
        <section className="card">

          {/* Section title */}
          <h2>Debounced Search</h2>

          {/* Explanation */}
          <p>Waits 500ms after typing stops before searching.</p>

          {/* Search input */}
          <input

            // Input type
            type="text"

            // Placeholder text
            placeholder="Search food..."

            // Current debounced input value
            value={debouncedSearch}

            // Update debounced search state when typing
            onChange={(event) => setDebouncedSearch(event.target.value)}
          />

          {/* Display debounced API calls */}
          <h3>API Calls: {debouncedCalls}</h3>

          {/* Results list */}
          <ul>

            {/* Loop through debounced results */}
            {debouncedResults.map((item) => (

              // Render each item
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}