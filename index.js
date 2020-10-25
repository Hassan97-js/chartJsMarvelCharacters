/* jshint esversion:8 */

/* Creating array of colors */
const colorData = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(36, 36, 36)',
    'rgb(255, 159, 64)',
    'rgb(75, 159, 64)',
    'rgb(255, 206, 192)',
    'rgb(153, 102, 255)',
    'rgb(222, 99, 132)',
    'rgb(70, 162, 235)',
    'rgb(45, 36, 36)',
    'rgb(227, 159, 64)',
    'rgb(23, 159, 64)',
    'rgb(124, 206, 192)',
    'rgb(197, 102, 255)',
    'rgb(34, 99, 132)',
    'rgb(42, 162, 235)',
    'rgb(65, 36, 36)',
    'rgb(98, 159, 64)',
    'rgb(129, 159, 64)',
    'rgb(244, 206, 192)'
];

/* Creating savedCharacters array to get reference of results array */
let savedCharacters = [];

/* getAllCharacters fetch the characters comics books amount & characters names */
function getAllCharacters() {
    const xs = [];
    const ys = [];

    let promise = async () => {
        try {
            const response = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7806e31d9b27489cb120effcda6b9b1a&hash=3f86b58dc6cf573ecd1058af04c698ac");
            const result = await response.json();
            const savedCharacters = result.data.results;
            const comics = savedCharacters.map((savedCharacter) => {
                ys.push(savedCharacter.comics.available);
            });
            console.log(comics);
            getCharactersNames(savedCharacters);
        } catch (err) {
            console.error(err);
        }
    };

    function getCharactersNames(characters) {
        characters.map(character => {
            console.log(character.name);
            xs.push(character.name);
        });
    }
    promise();
    return { xs, ys };
}

/* rgbToRgba function converts rgb values to rgba values with an alpha value */
function rgbToRgba(rgb, alpha = 1) {
    return `rgba(${rgb.substring(rgb.indexOf('(') + 1, rgb.length - 1).split(',').join()}, ${alpha})`;
}

/* drawChart function draws the chart */
/* I used setTimeout here because I faced a little problem with rendering the chart after getting the api's values. It renders the chart only when I resize the browser! So setTimeout function calls the chart.js built-in update function every half second to upadate the chart. */
function drawChart() {
    Chart.defaults.global.defaultFontFamily = "'Comic Neue', 'cursive'";
    const mydata = getAllCharacters();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mydata.xs,
            datasets: [{
                label: 'Number of comics books',
                data: mydata.ys,
                backgroundColor: colorData.map(color => rgbToRgba(color, 0.65)),
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 15,
                        fontStyle: "bold"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: 15,
                        fontStyle: "bold"
                    }
                }]
            },
            aspectRatio: 1,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Number Of Comics Books',
                fontSize: 25,
                fontColor: 'rgb(255, 99, 132)',
                padding: 20
            }
        }

    });
    setTimeout(function () { myChart.update(); }, 800);
}

drawChart();

