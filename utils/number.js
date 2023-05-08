import numbro from "numbro"
import Decimal from "decimal.js"

export const toCurrecyFormat = (num, precision = 2, minimum = 2) => {
  const fixedNumber = new Decimal(num).toFixed(precision, Decimal.ROUND_DOWN)
  const formatNumber = numbro(fixedNumber).format({
    thousandSeparated: true,
    roundingFunction: Math.floor,
    average: false,
    trimMantissa: false,
    mantissa: precision,
    optionalMantissa: true,
    trimMantissa: false,
  })

  if (!formatNumber.includes(".")) {
    const mutateFormatNumber = formatNumber + "."
    return mutateFormatNumber.padEnd(mutateFormatNumber.length + minimum, "0")
  }
  return formatNumber
}
