import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import API from "../../api";
// import { FaWarehouse } from "react-icons/fa";
import { Chart as ChartJS } from 'chart.js/auto';
import { 
	// Chart,
	 Line } from 'react-chartjs-2';

export default function AdminDashboard() {
	const [data, setData] = useState(null);
	const [chartdata, setchartdata] = useState(null);

	useEffect(() => {
		API.get('general/dashboard')
			.then((_data) => {
				setData(_data);

				// Extract the labels and values from the results
				const labels = _data.d.map(d => `${d._id.month}/${d._id.day}/${d._id.year}`);
				const values = _data.d.map(d => d.count);
                console.log(labels,values,"labels");
				// Set up the chart data
				setchartdata({
					labels,
					datasets: [
						{
							label: 'Donations per day',
							data: values,
							fill: false,
							borderColor: 'rgb(75, 192, 192)',
							tension: 0.1
						}
					]
				});

			});
	}, []);

    const options = {
        maintainAspectRatio:false,
        responsive:true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
            },
          
        }
      };
	return (
		data == null ?
			<div>
				loading Data
			</div>
			:
			<div>
				<div className="row">
					<div className="col-md-4">
						<div className="bg-primary py-5 px-3 text-white shadow">
							<h4 className="d-flex justify-content-center">
								<span>
									{data.orgs}
								</span>
							</h4>
							<h4 className="d-flex justify-content-center">

								<span>

									Associated Organizations
								</span>
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="bg-primary py-5 px-3 text-white shadow">
							<h4 className="d-flex justify-content-center">
								<span>
									{data.riders}
								</span>
							</h4>
							<h4 className="d-flex justify-content-center">

								<span>

									Riders
								</span>
							</h4>
						</div>
					</div>
					<div className="col-md-4">
						<div className="bg-primary py-5 px-3 text-white shadow">
							<h4 className="d-flex justify-content-center">
								<span>
									{data.donations}
								</span>
							</h4>
							<h4 className="d-flex justify-content-center">

								<span>

									Donations
								</span>
							</h4>
						</div>
					</div>
				</div>
                <div style={{height:"350px"}} className="p-3 bg-white shadow mt-4">
                    <Line data={chartdata} options={options}  />
                </div>
			</div>
	);
}