import React, { useState } from 'react'

const Buy = () => {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('ETH')
  const [strategy, setStrategy] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Mock exchange rates (in real app, these would come from an API)
  const exchangeRates = {
    ETH: 3485.14, // 1 ETH = $2500 USD
    USD: 0.00029 // 1 USD = 0.0004 ETH
  }

  // Mock energy market data
  const energyData = {
    currentPrice: 0.12, // $0.12 per kWh
    priceChange24h: -1.2,
    gridDemand: 85.6, // GW
    renewablePercentage: 67.3,
    totalSupply: 120.4, // GW
    carbonIntensity: 245, // gCO2/kWh
    energyCreditsPrice: 0.15, // $0.15 per credit
    creditsAvailable: 1250000,
    totalCreditsIssued: 5000000
  }

  const buyingStrategies = [
    { value: 'market', label: 'Market Buy' },
    { value: 'limit', label: 'Limit Order' },
    { value: 'dca', label: 'Dollar Cost Average' },
    { value: 'grid', label: 'Grid Trading' },
    { value: 'momentum', label: 'Momentum Strategy' }
  ]

  const getConvertedAmount = () => {
    if (!amount || isNaN(amount) || amount <= 0) return null
    
    const numAmount = parseFloat(amount)
    if (currency === 'ETH') {
      return (numAmount * exchangeRates.ETH).toFixed(2)
    } else {
      return (numAmount * exchangeRates.USD).toFixed(6)
    }
  }

  const handleBuy = async () => {
    if (!amount || !strategy) {
      alert('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement actual buy logic here
      console.log('Buying Energy Credits:', { amount, currency, strategy })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('Energy Credits purchased successfully!')
      setAmount('')
      setStrategy('')
    } catch (error) {
      alert('Purchase failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const convertedAmount = getConvertedAmount()

  return (
    <div className="px-[5vw] mt-[1vh]">
      
    
<div className="flex gap-[2vw]">
      {/* Buy Form Section */}
      <div className="h-full flex flex-col justify-center">
      <div className="h-fit my-[10vh] pr-[2vw]">
        
        <div className="flex mb-6 w-full gap-[2vw]">
            <div className="h-[48px] flex flex-col justify-center">
        <label className=" text-[24px] font-light text-gray-400 leading-[1em] ">
          Amount
        </label></div>
        <div className="w-full flex flex-col">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-[2px] focus-within:border-orange-500">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-3 border-none outline-none text-base bg-transparent text-[20px]"
              disabled={isLoading}
            />
            <div className="flex border-l border-gray-300 bg-gray-50 px-[8px]">
              <button
                type="button"
                onClick={() => setCurrency('ETH')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-[3px] ${
                  currency === 'ETH' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                disabled={isLoading}
              >
                ETH
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-[3px] ${
                  currency === 'USD' 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                disabled={isLoading}
              >
                USD
              </button>
            </div>
          </div>
          <div className="h-[40px]">
          {convertedAmount && (
            <div className="mt-2 text-[20px] text-left text-gray-500">
              ≈ {convertedAmount} {currency === 'ETH' ? 'USD' : 'ETH'}
            </div>
          )}
          </div>
        </div>
        </div>
        <div className="flex mb-6 w-full gap-[2vw]">
        <div className="h-[48px] flex flex-col justify-center">
          <label className=" text-[24px] font-light text-gray-400 leading-[1em] text-nowrap ">
            Buying strategy
          </label></div>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full px-4 py-3 text-[20px] border border-gray-300 rounded-lg text-base bg-white text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={isLoading}
          >
            <option value="">Select a strategy</option>
            {buyingStrategies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleBuy}
          disabled={isLoading || !amount || !strategy}
          className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg transition-all hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-[18px]"
        >
          {isLoading ? 'Processing...' : `Buy Energy Credits with ${currency}`}
        </button>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <p>Network Fee: ~0.002 ETH</p>
              <p>Processing Time: ~2-5 minutes</p>

          </div>
        </div>
      </div>
      </div>
            {/* Energy Market Overview Section */}
<div className=" bg-white rounded-xl p-10 shadow-lg border border-gray-100 w-[50%]">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">⚡</span>
          </div>
          <div>
            <h1 className="text-[32px] font-light text-gray-900">Energy Credits</h1>
            <p className="text-[16px] text-gray-500">GridSync Network</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-[48px] font-light text-gray-900">${energyData.energyCreditsPrice}</span>
          <span className="text-[20px] text-gray-500">per credit</span>
          <span className={`text-[20px] font-medium ${energyData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {energyData.priceChange24h >= 0 ? '+' : ''}{energyData.priceChange24h}%
          </span>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Grid Demand</p>
            <p className="text-[18px] font-medium text-gray-900">{energyData.gridDemand} GW</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Renewable %</p>
            <p className="text-[18px] font-medium text-gray-900">{energyData.renewablePercentage}%</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Carbon Intensity</p>
            <p className="text-[18px] font-medium text-gray-900">{energyData.carbonIntensity} gCO₂/kWh</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Credits Available</p>
            <p className="text-[18px] font-medium text-gray-900">{energyData.creditsAvailable.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* Recent Energy Transactions */}
      <div className="mt-8">
        <h3 className="text-[20px] font-light text-gray-900 mb-4">Recent Energy Transactions</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-[16px] font-medium text-gray-900">Market Buy</p>
              <p className="text-[14px] text-gray-500">2 minutes ago</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-medium text-gray-900">500 Credits</p>
              <p className="text-[14px] text-gray-500">$75.00</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-[16px] font-medium text-gray-900">Grid Trading</p>
              <p className="text-[14px] text-gray-500">5 minutes ago</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-medium text-gray-900">1,200 Credits</p>
              <p className="text-[14px] text-gray-500">$180.00</p>
            </div>
          </div>

        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Buy
