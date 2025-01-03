"use client"

import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import { programCountWithCategory, favoriteCount, watchLaterCount, FeaturedCount, RecommendedCount } from '@/lib/count'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function CustomPieChart() {
  const [data, setData] = useState([
    { name: 'Recommended', value: 0, color: 'hsl(var(--chart-1))' },
    { name: 'Featured', value: 0, color: 'hsl(var(--chart-2))' },
    { name: 'Favorites', value: 0, color: 'hsl(var(--chart-3))' },
    { name: 'Watch Later', value: 0, color: 'hsl(var(--chart-4))' },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [counts, favCounts, watchLaterCounts, RecommendedCounts, FeaturedCounts] = await Promise.all([
          programCountWithCategory(),
          favoriteCount(),
          watchLaterCount(),
          RecommendedCount(),
          FeaturedCount()
        ])

        setData([
          { name: 'Recommended', value: RecommendedCounts ?? 0, color: 'hsl(var(--chart-1))' },
          { name: 'Featured', value: FeaturedCounts ?? 0, color: 'hsl(var(--chart-2))' },
          { name: 'Favorites', value: favCounts ?? 0, color: 'hsl(var(--chart-3))' },
          { name: 'Watch Later', value: watchLaterCounts ?? 0, color: 'hsl(var(--chart-4))' },
        ])
      } catch (error) {
        console.error('Error fetching category counts:', error)
      }
    }

    fetchData()
  }, [])

  const renderLegend = () => (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {item.name} - {item.value}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Department Overview</CardTitle>
        <CardDescription>Distribution of programs across categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-9 ">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col md:justify-end md:items-end md:flex-1 md:ml-6">
            {renderLegend()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
