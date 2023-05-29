import {
  Flex,
  Text,
  Wrap,
  WrapItem,
  Heading,
  Center,
  Card,
  CardHeader,
  CardBody,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { http } from '../utils/ky'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

function StatsView() {
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    http
      .get('/api/query/stats')
      .json()
      .then((data) => setStats(data))
  }, [])

  const data = {
    labels: ['Pins', 'Links', 'Users'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.pins, stats.links, stats.users],
        backgroundColor: ['#8884d8', '#82ca9d', '#ffc658'],
        borderWidth: 1
      }
    ]
  }
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  }

  return (
    <VStack spacing={4} align="center">
      <Card>
        <CardHeader>
          <Heading as="h2" size="md">
            统计数据
          </Heading>
        </CardHeader>
        <CardBody>
          <Center mb={4}>
            <Wrap gap={8}>
              <WrapItem>
                <Flex direction="row" align="baseline">
                  <Text fontSize="2xl" fontWeight="bold">
                    {stats.pins}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Pins
                  </Text>
                </Flex>
              </WrapItem>
              <WrapItem>
                <Flex direction="row" align="baseline">
                  <Text fontSize="2xl" fontWeight="bold">
                    {stats.links}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Links
                  </Text>
                </Flex>
              </WrapItem>
              <WrapItem>
                <Flex direction="row" align="baseline">
                  <Text fontSize="2xl" fontWeight="bold">
                    {stats.users}
                  </Text>
                  <Text fontSize="sm" color="gray.500" textAlign="center">
                    Users
                  </Text>
                </Flex>
              </WrapItem>
            </Wrap>
          </Center>
          <Bar data={data} options={options} />
        </CardBody>
      </Card>
    </VStack>
  )
}

export default StatsView
