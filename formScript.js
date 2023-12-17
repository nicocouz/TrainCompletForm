// Function to fetch CSV data and set up event listeners
function setupCsvDropdown(csvFilePath, searchInputId, dropdownId) {
  fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
      const csvValues = csvData.trim().split('\n');

      // Event listener for input changes using event delegation
      document.getElementById(searchInputId).addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const results = csvValues.filter(value => value.toLowerCase().includes(query));
        displayDropdown(results.slice(0, 10), dropdownId, searchInputId);
      });
    })
    .catch(error => console.error(`Error fetching the CSV file for ${searchInputId}:`, error));
}

// Fetch CSV data and set up event listeners for departure
setupCsvDropdown('./liste-des-gares.csv', 'searchInputDepart', 'csvDropdownDepart');

// Fetch CSV data and set up event listeners for arrival
setupCsvDropdown('./liste-des-gares.csv', 'searchInputArrivee', 'csvDropdownArrivee');

// Function to display dropdown results
function displayDropdown(results, dropdownId, searchInputId) {
  const csvDropdown = document.getElementById(dropdownId);
  const searchInput = document.getElementById(searchInputId);

  if (!csvDropdown || !searchInput) {
    console.error(`Dropdown or search input not found for ${searchInputId}`);
    return;
  }

  csvDropdown.innerHTML = '';

  results.forEach(result => {
    const dropdownItem = document.createElement('div');
    dropdownItem.textContent = result;

    dropdownItem.addEventListener('click', function() {
      searchInput.value = result;
      csvDropdown.style.display = 'none';
    });

    csvDropdown.appendChild(dropdownItem);
  });

  csvDropdown.style.display = results.length > 0 ? 'block' : 'none';
}
