// Example code to visualize address changes using JavaScript and Plotly
// Assumes that you have Plotly included in your HTML file and an element with id 'pc-transition-graph'

// Function to parse input data and generate a graph
function parseHexInput(input) {
    // Split input by new lines, filter out empty lines
    return input.trim().split('\n').filter(Boolean);
}

function plotHexAddresses(addresses) {
    const counts = addresses.map((_, index) => index);
    const yValues = addresses.map(hex => parseInt(hex, 16));

    const trace = {
        x: counts,
        y: yValues,
        type: 'scattergl', // Use scattergl for better performance with large datasets
        mode: 'lines+markers',
        marker: { color: 'blue' }
    };

    const layout = {
        title: 'Address Changes Over Time',
        xaxis: { title: 'Count' },
        yaxis: { title: 'Address (Hex)', tickformat: '0x' },
    };

    Plotly.newPlot('pc-transition-graph', [trace], layout);
}

// Function to handle file input
document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.body;

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const parsedAddresses = parseHexInput(content);
                plotHexAddresses(parsedAddresses);
            };
            reader.readAsText(file);
        }
    });

    // Example usage
    const exampleInput = `
    0x0000000000000010
    0x0000000000000020
    0x0000000000000030
    0x0000000000000020
    0x0000000000000040
    `;

    const parsedAddresses = parseHexInput(exampleInput);
    plotHexAddresses(parsedAddresses);
});
