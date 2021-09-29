import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";

import CountUp from "react-countup";

import { Weekday } from "types/user.type";

type Props = {
  weekdays: Weekday[];
};

const WeekContribution: React.FC<Props> = ({ weekdays }) => {
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const height = 300;

  const chartEl = useRef<HTMLDivElement | null>(null);

  const getAverage = (data: Weekday[]): number => {
    let total: number = 0;

    data.map((item) => (total += item.count));

    return Math.round(total / data.length);
  };

  const handleDrawLineChart = () => {
    const currentEl = chartEl.current;
    const width = currentEl?.offsetWidth as number;

    // 차트가 그려지는 요소
    const selection = d3
      .select(currentEl)
      .call((g) => g.select("svg").remove())
      .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

    const data = weekdays.map(({ day, count }) => ({
      d: day,
      v: count,
    }));

    // 차트의 x, y 범위
    const xDomain = (d3.extent(data, (d) => d.d) as unknown) as [
      number,
      number
    ];
    const yDomain = d3.max(data, (d) => d.v) as number;

    const xScale = d3
      .scaleLinear()
      .domain(xDomain)
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, yDomain])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line: Function = d3
      .line()
      .x((value: any) => xScale(value.d))
      .y((value: any) => yScale(value.v));

    const xAxis = (g: any) =>
      g
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .attr("class", "axis")
        .call(
          d3
            .axisBottom(xScale)
            .ticks(7)
            .tickFormat((d) => weeks[d as number])
            .tickSizeOuter(0)
        );
    const yAxis = (g: any) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("class", "axis")
        .call(d3.axisLeft(yScale));

    selection.append("g").call(xAxis);
    selection
      .append("g")
      .call(yAxis)
      .call((g) => g.select(".domain").remove());

    selection
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", (data) => line(data));
  };

  const average = useMemo<number>(() => getAverage(weekdays), [weekdays]);

  useEffect(() => {
    handleDrawLineChart();
  }, [height]);

  return (
    <Container>
      <h1>주간 커밋 그래프</h1>
      <Wrapper>
        <div
          ref={chartEl}
          style={{
            width: "100%",
            height,
          }}
        />
        <Average>
          <h1>주간 평균 커밋</h1>
          <CountUp
            className="average"
            duration={2}
            separator=","
            end={average}
          />
          <span>회</span>
        </Average>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  & > h1 {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ftGray};
    margin-bottom: 1.5rem;
  }

  .axis {
    color: ${({ theme }) => theme.colors.ftGray};
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  padding: 2rem 1.5rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0px 8px 28px 0px rgba(0, 0, 0, 0.1);
`;

const Average = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  & > h1 {
    margin-right: 0.5rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ftBlack};
  }

  .average {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.ftBlack};
  }

  & > span {
    margin-left: 1px;
    font-size: 1.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.ftBlack};
  }
`;

export default WeekContribution;
