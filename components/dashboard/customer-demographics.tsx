"use client"

import { useState } from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, MapPin, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomerDemographicsProps {
  data: any[]
}

export function CustomerDemographics({ data }: CustomerDemographicsProps) {
  const [activeView, setActiveView] = useState("age");
  
  // Age distribution data
  const ageData = data.map((item) => ({
    name: item.age_group,
    value: Number(item.count),
  }));
  
  // Gender distribution data (simulated)
  const genderData = [
    { name: "Male", value: 45 },
    { name: "Female", value: 48 },
    { name: "Other", value: 7 },
  ];
  
  // Location data (simulated)
  const locationData = [
    { name: "Downtown", value: 35 },
    { name: "Suburbs", value: 30 },
    { name: "North Side", value: 20 },
    { name: "South Side", value: 15 },
  ];
  
  // Frequency data (simulated)
  const frequencyData = [
    { name: "Weekly", value: 25 },
    { name: "Monthly", value: 40 },
    { name: "Quarterly", value: 20 },
    { name: "Rarely", value: 15 },
  ];
  
  // Map visualization data based on active view
  const getActiveData = () => {
    switch (activeView) {
      case "age": return ageData;
      case "gender": return genderData;
      case "location": return locationData;
      case "frequency": return frequencyData;
      default: return ageData;
    }
  };
  
  // Color scheme for each category
  const colorSchemes = {
    age: ["#4F46E5", "#60A5FA", "#34D399", "#FBBF24", "#FB7185"],
    gender: ["#4F46E5", "#FB7185", "#94A3B8"],
    location: ["#4F46E5", "#06B6D4", "#10B981", "#8B5CF6"],
    frequency: ["#4F46E5", "#10B981", "#FBBF24", "#F43F5E"]
  };
  
  const getColors = () => {
    return colorSchemes[activeView as keyof typeof colorSchemes];
  };
  
  const activeData = getActiveData();
  const colors = getColors();
  
  // Calculate total customers
  const totalCustomers = activeData.reduce((sum, item) => sum + item.value, 0);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{data.name}</p>
          <div className="flex items-center space-x-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: payload[0].color }}
            />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">{data.value}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({((data.value / totalCustomers) * 100).toFixed(1)}%)
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend renderer
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {entry.value}
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({((entry.payload.value / totalCustomers) * 100).toFixed(0)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Customer Demographics</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
              Analysis of your customer base
            </CardDescription>
          </div>
          <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <Tabs value={activeView} onValueChange={setActiveView} className="mt-4">
          <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 h-9 grid grid-cols-4 w-full">
            <TabsTrigger value="age" className="text-xs">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Age
            </TabsTrigger>
            <TabsTrigger value="gender" className="text-xs">
              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
              Gender
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              Location
            </TabsTrigger>
            <TabsTrigger value="frequency" className="text-xs">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              Frequency
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="pt-4 px-3">
        <div className="h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {activeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={<CustomLegend />}
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 border border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Customers</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{totalCustomers.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-3 border border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">Top Segment</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {activeData.sort((a, b) => b.value - a.value)[0].name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

