function calculate() {
  const cost = parseInt(document.getElementById('cost').value) || 0;
  const owned = parseInt(document.getElementById('owned').value) || 0;

  // Conversion rate and VBucks bundles
  const usdToVBucksRate = 0.00899;

  // Straight USD to VBucks conversion
  const usdEquivalent = (cost * usdToVBucksRate).toFixed(2);

  // Calculate remaining VBucks needed
  const requiredVBucks = Math.max(0, cost - owned);

  const finalCost = calculateVbucksCost(requiredVBucks)

  // Display results
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <p><strong>Required V-Bucks:</strong><span> ${requiredVBucks}</span></p>
      <p><strong>USD equivalent:</strong><span> $${usdEquivalent}</span></p>
      <p><strong>Minimum cost to purchase:</strong><span> $${finalCost.totalCost.toFixed(2)}</span></p>
  `;
}
function calculateVbucksCost(vbucks) {
// Array of V-Bucks packages and their prices
const packages = [
{ vbucks: 1000, price: 8.99 },
{ vbucks: 2800, price: 22.99 },
{ vbucks: 5000, price: 36.99 },
{ vbucks: 13500, price: 89.99 }
];

let totalCost = Infinity;
let maxVbucks = 0;
let bestCombination = null;

// Iterate over all combinations of packages
function calculateCost(remainingVbucks, currentCost, currentVbucks, index, currentCombination) {
if (index >= packages.length) {
  // If all packages have been considered
  if (remainingVbucks <= 0) {
      // Check if this combination is better
      if (
          currentCost < totalCost ||
          (currentCost === totalCost && currentVbucks > maxVbucks)
      ) {
          totalCost = currentCost;
          maxVbucks = currentVbucks;
          bestCombination = { ...currentCombination };
      }
  }
  return;
}

const pack = packages[index];

// Calculate the number of packages needed at this level
for (let count = 0; count <= Math.ceil((vbucks - currentVbucks) / pack.vbucks); count++) {
  currentCombination[pack.vbucks] = count;
  calculateCost(
      remainingVbucks - count * pack.vbucks,
      currentCost + count * pack.price,
      currentVbucks + count * pack.vbucks,
      index + 1,
      currentCombination
  );
  currentCombination[pack.vbucks] = 0; // Reset for next iteration
}
}

calculateCost(vbucks, 0, 0, 0, { 1000: 0, 2800: 0, 5000: 0, 13500: 0 });

return { totalCost, maxVbucks, bestCombination };
}

// Example usage:
// const vbucksNeeded = 2000;
// const result = calculateVbucksCost(vbucksNeeded);
// console.log(`Minimum cost for ${vbucksNeeded} VBucks: $${result.totalCost.toFixed(2)}`);
// console.log(`Maximum VBucks obtained: ${result.maxVbucks}`);
// console.log(`Combination of packages used:`, result.bestCombination);