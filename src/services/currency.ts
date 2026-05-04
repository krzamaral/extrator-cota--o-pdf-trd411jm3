export const getExchangeRate = async (currency: string): Promise<number> => {
  if (currency === 'BRL' || !currency) return 1
  try {
    const res = await fetch(`https://economia.awesomeapi.com.br/last/${currency}-BRL`)
    if (!res.ok) return 1
    const data = await res.json()
    return parseFloat(data[`${currency}BRL`]?.bid || '1')
  } catch (error) {
    console.error('Error fetching exchange rate:', error)
    return 1
  }
}
