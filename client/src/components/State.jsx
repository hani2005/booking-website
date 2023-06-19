import { differenceInDays } from "date-fns"
import React, { useEffect, useState } from "react"
import { DateRange } from "react-date-range"

function State() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])
  useEffect(() => {
    if (state.startDate && state.endDate) {
      const dayCount = differenceInDays(state.endDate, state.startDate)
      setTotalPrice(dayCount)
    }
  }, [state, place.price])

  return (
    <DateRange
      rangeColors={["#000000"]}
      onChange={(item) => setState([item.selection])}
      ranges={state}
      minDate={new Date()}
      date={new Date()}
      showDateDisplay={false}
    />
  )
}

export default State
