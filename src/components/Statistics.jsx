import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import _ from "lodash";

export default function Stat() {

    //States
    const [activityData, setActivityData] = useState([]);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    useEffect(() => {
        generateActivityData(trainings);
    }, [trainings]);

    // haetaan treenit fetch
    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch trainings');
                }
                return response.json();
            })
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    };

    // erotetaan ja määritellään data oikeisiin pylväisiin
    const generateActivityData = (trainings) => {
        const groupedData = _(trainings)
            .groupBy('activity')
            .map((activities, activity) => ({
                activity,
                duration: _.sumBy(activities, 'duration')
            }))
            .value();

        setActivityData(groupedData);
    };

    // Pylväskaavio
    return (
        <div style={{ width: 1300, height: 500 }}>
            <ResponsiveContainer>
                <BarChart
                    data={activityData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
