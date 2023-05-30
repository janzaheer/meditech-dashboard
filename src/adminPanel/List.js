import React, { useEffect } from 'react'
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { HiOutlineUsers } from 'react-icons/hi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie } from 'recharts';
import 'react-medium-image-zoom/dist/styles.css';
import ScrollToTop from "react-scroll-to-top";



const List = () => {
     useEffect(()=>{
        getDummy()
     },[])
   

      const getDummy = async () => {
        // const options = {
        //     method: 'GET',
        //     url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        //     params: {q: '53.1,-0.13'},
        //     headers: {
        //       'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        //       'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        //     }
        //   };
        // try {
        //     const response = await axios.request(options);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }

        // await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json`,{
        //     headers : {
        //         'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        //               'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        //     }
        // })
        // console.log(response.data);
      }
      
     
    const data = [
        {
            name: 'Jan',
            TotalIncome: 4000,
            TotalExpense: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            TotalIncome: 3000,
            TotalExpense: 1398,
            amt: 2210,
        },
        {
            name: 'March',
            TotalIncome: 2000,
            TotalExpense: 9800,
            amt: 2290,
        },
        {
            name: 'April',
            TotalIncome: 2780,
            TotalExpense: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            TotalIncome: 1890,
            TotalExpense: 4800,
            amt: 2181,
        },
        {
            name: 'Jun',
            TotalIncome: 2390,
            TotalExpense: 3800,
            amt: 2500,
        },
        {
            name: 'Jul',
            TotalIncome: 3490,
            TotalExpense: 4300,
            amt: 2100,
        },
    ];
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
    ];
    return (
        <>
        <div className=''>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-4'>
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Earnings</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><AiOutlineDollarCircle /></h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">$ 93,438.78</h4>
                                <p className="card-text">Monthly revenue.</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Orders</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><BsCart3 /></h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">42,339</h4>
                                <p className="card-text">Monthly revenue.</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card shadow">
                            <div className="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Customer</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><HiOutlineUsers /></h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">39,354</h4>
                                <p className="card-text">30+new in 2 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className="card shadow">
                            <div className="card-body">
                                {/* <ResponsiveContainer > */}
                                <LineChart
                                    width={800}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="TotalIncome" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="TotalExpense" stroke="#438C7D" />
                                </LineChart>
                                {/* </ResponsiveContainer> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className="card shadow">
                            <div className="card-body">
                                {/* <ResponsiveContainer  height={100}> */}
                                <PieChart width={400} height={300}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={data02}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Pie dataKey="value" data={data01} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                                    <Tooltip />
                                </PieChart>
                                {/* </ResponsiveContainer> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='card '>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <ScrollToTop smooth />
        </div>
        </>
    )
}

export default List
