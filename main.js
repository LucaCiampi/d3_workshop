d3.json('/data/stacked.json').then((data) => {
    console.log('data :>> ', data);
    let xDataset = [],
        yDataset = [];

    let refData = data[0];
    xDataset = refData.values.map(v => v[0])
    console.log('xDataset :>> ', xDataset);

    let ds = [];
    for (const d of data) {
        // ... (spread operator) ventile un tableau ou objet dans un autre
        ds = [d.key, ...d.values.map(v => v[1])];
        yDataset.push(ds);
    }

    generateStackedChart(xDataset, yDataset);
});

// _________________ Stacked Chart _________________
function generateStackedChart(xDataset, yDataset) {
    var chartPie = c3.generate({
        bindto: '#stackedChart',
        data: {
            x: 'x',
            columns: [['x', ...xDataset],...yDataset],
            type: 'area',
            groups: [yDataset.map(ds => ds[0])]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d/%m/%Y'
                }
            }
        }
    })
}

// _________________ Stacked Area Chart _________________
// var chartStackedArea = c3.generate({
//     data: {
//         columns: [
//             ['data1', 300, 350, 300, 0, 0, 120],
//             ['data2', 130, 100, 140, 200, 150, 50]
//         ],
//         types: {
//             data1: 'area-spline',
//             data2: 'area-spline'
//             // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
//         },
//         groups: [
//             ['data1', 'data2']
//         ]
//     }
// });

// _________________ Bubble Chart _________________
// const radius = 700;

// const svg = d3.select("#chart").append("svg")
//     .attr("width", radius)
//     .attr("height", radius)
//     .attr("id", "svg");

// const g = svg.append("g").attr("transform", "translate(2,2)");

// const packLayout = d3.pack()
//     .size([radius - 4, radius - 4]) // lié à la translation précédente
//     .padding(1.5);

// d3.json("data/colors.json").then(function (data) {
//     let root = d3.hierarchy(data)
//         .sum(d => d.population)
//         .sort((a, b) => b.value - a.value);

//     root = packLayout(root).descendants();

//     var node = g.selectAll(".node")
//         .data(root)
//         .enter().append("g")
//         .attr("class", d => d.children ? "node" : "leaf node")
//         .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

//     node.append("circle")
//         .attr("r", d => d.r);

//     node.append("title")
//         // .text(d => d.data.color + "\n" + format(d.value));
//         // .text(d => d.data.color + "\n" + d.value);

//     node.filter(d => !d.children)
//         .append("text")
//         .attr("dy", "0.3em")
//         // .text(d => d.data.color.substring(0, d.r / 3));
// });