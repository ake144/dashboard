"use client"

import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import { channels, programCountWithCategory, programs } from '@/lib/count'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

export default function ImprovedCustomLineChart() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [counts, setCounts] = useState({
    channels: 0,
    movies: 0,
    tvShows: 0,
    sports: 0,
  })
  const [data, setData] = useState<Array<{ day: string; [key: string]: number | string }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programCounts, channelCount, ProgramWithCat] = await Promise.all([programs(), channels(), programCountWithCategory()])

        setCounts({
          channels: channelCount ?? 0,
          movies: ProgramWithCat.Movies ?? 0,
          tvShows: ProgramWithCat['TVShows'] ?? 0,
          sports: ProgramWithCat.Sports ?? 0,
        })

        const newData = DAYS.map(day => ({
          day,
          'Live TV': Math.floor(Math.random() * 50) + 10,
          'Movies': Math.floor(Math.random() * 40) + 10,
          'TV Shows': Math.floor(Math.random() * 30) + 10,
          'Sports': Math.floor(Math.random() * 20) + 10,
          'Others': Math.floor(Math.random() * 15) + 5,
        }))
        setData(newData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const config = {
    liveTV: { label: "Live TV", color: COLORS[0] },
    movies: { label: "Movies", color: COLORS[1] },
    tvShows: { label: "TV Shows", color: COLORS[2] },
    sports: { label: "Sports", color: COLORS[3] },
    others: { label: "Others", color: COLORS[4] },
  }

  const totalPrograms = Object.values(counts).reduce((sum, count) => sum + count, 0)

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Weekly Program Distribution</CardTitle>
        <CardDescription>Viewing trends across different program types</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-start justify-between gap-9">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  {Object.entries(config).map(([key, value]) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={value.label}
                      stroke={value.color}
                      activeDot={{ r: 8 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/4">
              <div className="bg-primary text-primary-foreground p-4 rounded-md text-center mb-4">
                <p className="text-2xl font-bold">{totalPrograms}</p>
                <p className="text-sm">Overall Programs</p>
              </div>
              <div className="grid grid-cols-1 ml-4 gap-3">
                {Object.entries(counts).map(([key, value], index) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </div>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
