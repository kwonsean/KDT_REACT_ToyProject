import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { PieChart, Pie, Sector, Cell } from 'recharts'
import styled from './ShoppingList.module.css'
import BuyList from './BuyList'

export default function Chart() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .post('/shopping?type=selectCategoryCount')
      .then((response) => {
        const { data } = response.data
        // console.log(data)
        setData(data)
      })
      .catch((error) => console.log(error))
  }, [])

  const COLORS = [
    '#FF4848',
    '#FF8042',
    '#FFBB28',
    '#00C49F',
    '#0088FE',
    '#1037FF',
    '#DB9FFF',
    '#E0C5AD',
    '#F6E785',
    '#F59E90',
    '#9FDEF5',
    '#8C32F0',
    '#FAF27F',
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const [itemDetail, setItemDetail] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [orderMode, setOrderMode] = useState('DESC')

  const onClickPie = (e) => {
    const category = e.name
    setSelectedCategory(category)
    axios
      .post('/shopping?type=selectCategoryDetail', {
        category,
      })
      .then((response) => {
        const { data } = response.data
        // console.log(data)
        setItemDetail(data)
      })
      .catch((error) => console.log(error))
  }

  const clickTitle = (order, mode) => {
    mode === 'DESC' ? setOrderMode('') : setOrderMode('DESC')
    // console.log(order, mode)
    // console.log(selectedCategory)
    axios
      .post('/shopping?type=orderDate', {
        category: selectedCategory,
        order,
        mode,
      })
      .then((response) => {
        const { data } = response.data
        // console.log(data)
        setItemDetail(data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', minWidth: 1000 }}>구매 비율 차트</h2>
      <PieChart width={1000} height={570} style={{ margin: `0 auto` }}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx='50%'
          cy='47%'
          innerRadius={180}
          outerRadius={230}
          fill='#8884d8'
          dataKey='value'
          onMouseEnter={onPieEnter}
          onClick={onClickPie}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {itemDetail.length > 0 ? (
        <div>
          <Row className={styled.rowTitle}>
            <Col xs='1'>순번</Col>
            <Col xs='1'>이미지</Col>
            <Col xs='6'>상품 명</Col>
            <Col
              xs='2'
              onClick={() => clickTitle('insertDate', orderMode)}
              style={{ cursor: 'pointer' }}
            >
              구매 일자
            </Col>
            <Col
              xs='2'
              onClick={() => clickTitle('buyCount', orderMode)}
              style={{ cursor: 'pointer' }}
            >
              구매 건수
            </Col>
          </Row>
          {itemDetail.map((item, index) => (
            <BuyList item={item} key={item.productId} index={index} />
          ))}
          <div
            style={{
              textAlign: 'right',
              fontSize: 20,
              marginBottom: 40,
              fontWeight: 700,
            }}
          >{`${itemDetail[0].category1} 카테고리에서 구매한 물품 종류는 ${
            itemDetail.length
          }개이고 총 구매 물품 갯수는 ${itemDetail
            .map((item) => item.buyCount)
            .reduce((a, b) => a + b)}개 입니다.`}</div>
        </div>
      ) : null}
    </div>
  )
}

// 차트를 그리는 함수
function renderActiveShape(props) {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={fill}
        style={{ fontSize: 30 }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ cursor: 'pointer' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`총 구매 건 ${value}건`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(구매 비율 ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}
