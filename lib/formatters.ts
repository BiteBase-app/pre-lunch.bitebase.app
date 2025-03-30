/**
 * Formats a number as currency
 * @param value The number to format
 * @param locale The locale to use for formatting
 * @param currency The currency code
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, locale = "en-US", currency = "USD"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formats a number with thousand separators
 * @param value The number to format
 * @param locale The locale to use for formatting
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Formats a date
 * @param date The date to format
 * @param locale The locale to use for formatting
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = "en-US"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj)
}

/**
 * Formats a percentage
 * @param value The number to format as percentage
 * @param locale The locale to use for formatting
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

