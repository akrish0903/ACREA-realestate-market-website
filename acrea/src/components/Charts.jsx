import React, { useEffect, useState } from "react";
import { BarChart, Bar, PieChart, Pie, Tooltip, Legend, Cell, XAxis, YAxis, CartesianGrid, LineChart, Line, Area,AreaChart } from "recharts";
import axios from "axios";
import { Config } from "../config/Config";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#8dd1e1"];

const Charts = () => {
const [userTypeData, setUserTypeData] = useState([]);
const [propertyTypeData, setPropertyTypeData] = useState([]);
const [propertyCityData, setPropertyCityData] = useState([]);
  
//   const [userTrendData, setUserTrendData] = useState([]);
const [priceDistributionData, setPriceDistributionData] = useState([]);
const [favoritePropertiesData, setFavoritePropertiesData] = useState([]);


//   const fetchUserTrendData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4500/api/users/registrationTrend");
//       setUserTrendData(response.data);
//     } catch (error) {
//       console.error("Error fetching user trend data:", error);
//     }
//   };

const fetchPriceDistribution = async () => {
    try {
        const response = await axios.get("http://localhost:4500/api/properties/priceDistribution");
        setPriceDistributionData(response.data);
    } catch (error) {
        console.error("Error fetching price distribution data:", error);
    }
};

const fetchFavoriteProperties = async () => {
    try {
      const response = await axios.get("http://localhost:4500/api/properties/topFavoriteProperties");
      setFavoritePropertiesData(response.data);
    } catch (error) {
      console.error("Error fetching favorite properties:", error);
    }
};

useEffect(() => {
    fetchUserData();
    fetchPropertyData();
    // fetchUserTrendData();
    fetchPriceDistribution();
    fetchFavoriteProperties();
}, []);

const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4500/api/users/userTypeCount");
      setUserTypeData(response.data);
    } catch (error) {
      console.error("Error fetching user type data:", error);
    }
};

const fetchPropertyData = async () => {
    try {
      const response = await axios.get("http://localhost:4500/api/properties/propertyTypeCount");
      setPropertyTypeData(response.data.propertyTypes);
      setPropertyCityData(response.data.propertyCities);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
};
return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "20px" }}>
        <h4 style={{
            color: Config.color.primaryColor900,
            fontWeight: "bolder"
            }}>
            Analytic Dashboard
        </h4>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",paddingTop: "1rem",
            paddingBottom: "1rem"}}>
            <h2>User Types Distribution</h2>
            <PieChart width={400} height={300}>
                <Pie data={userTypeData} dataKey="count" nameKey="usrType" cx="50%" cy="50%" outerRadius={100}>
                {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>

            <h2>Property Types Distribution</h2>
            <BarChart width={600} height={300} data={propertyTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userListingType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>

            <h2>Properties by City</h2>
            <BarChart width={600} height={300} data={propertyCityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>


            {/* <h2>User Registration Trend (Monthly)</h2>
                <LineChart width={600} height={300} data={userTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart> */}

            <h2>Property Price Distribution</h2>
            <BarChart width={600} height={300} data={priceDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>

            <h2>Property Price Range Distribution</h2>
            <AreaChart width={600} height={300} data={priceDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>

            <h2>Top 5 Most Favorited Properties</h2>
            <BarChart width={600} height={300} data={favoritePropertiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="usrListingName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="favoriteCount" fill="#ffc658" />

            </BarChart>

            {/* <h2>User Registrations Over Time</h2>
            <LineChart width={600} height={300} data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart> */}




            {/* <h2>Property Features Comparison</h2>
            <RadarChart outerRadius={90} width={500} height={400} data={propertyFeatureData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" />
            <PolarRadiusAxis />
            <Radar name="Property A" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
            </RadarChart> */}


            {/* <h2>Price vs Square Feet</h2>
            <ScatterChart width={600} height={300}>
            <CartesianGrid />
            <XAxis dataKey="usrListingSquareFeet" name="Square Feet" unit="sqft" />
            <YAxis dataKey="usrPrice" name="Price" unit="$" />
            <Tooltip />
            <Scatter name="Properties" data={scatterData} fill="#8884d8" />
            </ScatterChart>


            <h2>Property Types by City</h2>
            <BarChart width={600} height={300} data={stackedCityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Land" stackId="a" fill="#8884d8" />
            <Bar dataKey="Apartment" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Villa" stackId="a" fill="#ffc658" />
            </BarChart> */}
 {/* <h2>Real Estate Insights</h2>
 <iframe style={{background: "#FFFFFF",border: "none",borderRadius: "2px"}}
  width="640" height="480" 
  src="https://charts.mongodb.com/charts-project-0-krswttu/embed/charts?id=636647e5-268a-4c9d-b3ed-ac8de8e4db7c&maxDataAge=3600&theme=light&autoRefresh=true"
  >
  </iframe> */}
      </div>
    </div>
  );
};

export default Charts;
