var consumptionChartData = require('./consumptionChart.json');

module.exports = function (app) {
	app.get('/consumptionChartData', (req, res, next) => {
	    res.json(consumptionChartData);
	});
};