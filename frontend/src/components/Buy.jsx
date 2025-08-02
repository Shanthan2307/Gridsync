import React, { useState, useEffect } from 'react'
import { useWallet } from '../WalletContext'
import ContractService from '../services/contractService'
import { ethers } from 'ethers'
import { CHAINLINK_FEEDS } from '../constants/contracts'

const Buy = () => {
  const { isConnected, account, provider, signer } = useWallet()
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('ETH')
  const [strategy, setStrategy] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [contractService, setContractService] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const [maxPrice, setMaxPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState(null)

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
    { value: 'dca', label: 'Dollar Cost Average (TWAP)' },
    { value: 'grid', label: 'Grid Trading' },
    { value: 'momentum', label: 'Momentum Strategy' }
  ]

  // Initialize contract service when wallet is connected
  useEffect(() => {
    if (isConnected && provider && signer) {
      const service = new ContractService(provider, signer)
      setContractService(service)
      fetchCurrentPrice()
    }
  }, [isConnected, provider, signer])

  // Fetch current ETH price from Chainlink
  const fetchCurrentPrice = async () => {
    if (!contractService) return
    
    try {
      const priceData = await contractService.getCurrentPrice(CHAINLINK_FEEDS.ETH_USD)
      // Chainlink prices are typically in 8 decimals, convert to USD
      const priceInUSD = Number(priceData.price) / 100000000
      setCurrentPrice(priceInUSD)
    } catch (error) {
      console.error('Error fetching current price:', error)
    }
  }

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
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!amount || !strategy) {
      alert('Please fill in all fields')
      return
    }

    if (strategy === 'limit' && !maxPrice) {
      alert('Please enter a maximum price for limit orders')
      return
    }

    setIsLoading(true)
    try {
      // Convert amount to wei if needed
      const amountInWei = currency === 'ETH' 
        ? ethers.parseEther(amount)
        : ethers.parseUnits(amount, 6) // USDC has 6 decimals

      // Convert max price to the format expected by Chainlink (8 decimals)
      const maxPriceInChainlinkFormat = maxPrice 
        ? ethers.parseUnits(maxPrice.toString(), 8)
        : null

      // Create energy credit order using smart contracts
      const orderResult = await contractService.createEnergyCreditOrder({
        userAddress: account,
        amount: amountInWei,
        strategy,
        maxPrice: maxPriceInChainlinkFormat,
        oracleAddress: CHAINLINK_FEEDS.ETH_USD
      })

      if (orderResult.success) {
        // Get order status
        const status = await contractService.getOrderStatus(
          orderResult.seriesId,
          CHAINLINK_FEEDS.ETH_USD,
          maxPriceInChainlinkFormat
        )
        setOrderStatus(status)

        alert(`Order created successfully!\nSeries ID: ${orderResult.seriesId}\nCan Execute: ${orderResult.canExecute ? 'Yes' : 'No'}`)
        
        // Reset form
        setAmount('')
        setStrategy('')
        setMaxPrice('')
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      alert(`Purchase failed: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const convertedAmount = getConvertedAmount()

  return (
    <div className="px-[5vw] mt-[1vh]">
      {/* Wallet Connection Check */}
      {!isConnected && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Wallet Not Connected
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please connect your wallet to use smart contract features.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    
<div className="flex gap-[2vw]">
      {/* Buy Form Section */}
      <div className="h-full flex flex-col justify-center">
      <div className="h-fit mt-[5vh] pr-[2vw]">
        
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

        {/* Max Price Input for Limit Orders */}
        {strategy === 'limit' && (
          <div className="flex mb-6 w-full gap-[2vw]">
            <div className="h-[48px] flex flex-col justify-center">
              <label className=" text-[24px] font-light text-gray-400 leading-[1em] text-nowrap ">
                Max Price (USD)
              </label>
            </div>
            <div className="w-full flex flex-col">
              <input
                type="number"
                placeholder="Enter maximum price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-3 text-[20px] border border-gray-300 rounded-lg text-base bg-white text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                disabled={isLoading}
              />
              {currentPrice && (
                <div className="mt-2 text-[16px] text-gray-500">
                  Current ETH Price: ${currentPrice.toFixed(2)} USD
                </div>
              )}
            </div>
          </div>
        )}

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

        {/* Order Status Display */}
        {orderStatus && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[18px] font-medium text-gray-900">Order Status</h3>
              <button
                onClick={async () => {
                  try {
                    const status = await contractService.getOrderStatus(
                      orderStatus.seriesId,
                      CHAINLINK_FEEDS.ETH_USD,
                      maxPrice ? ethers.parseUnits(maxPrice.toString(), 8) : null
                    )
                    setOrderStatus(status)
                  } catch (error) {
                    console.error('Error refreshing order status:', error)
                  }
                }}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Refresh
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Series ID:</span>
                <span className="font-mono text-gray-800">{orderStatus.seriesId.slice(0, 10)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Condition:</span>
                <span className={`font-medium ${orderStatus.timeConditionMet ? 'text-green-600' : 'text-red-600'}`}>
                  {orderStatus.timeConditionMet ? 'Met' : 'Not Met'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price Condition:</span>
                <span className={`font-medium ${orderStatus.priceConditionMet ? 'text-green-600' : 'text-red-600'}`}>
                  {orderStatus.priceConditionMet ? 'Met' : 'Not Met'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Can Execute:</span>
                <span className={`font-medium ${orderStatus.canExecute ? 'text-green-600' : 'text-red-600'}`}>
                  {orderStatus.canExecute ? 'Yes' : 'No'}
                </span>
              </div>
              {orderStatus.lastExecutionTime !== '0' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Execution:</span>
                  <span className="text-gray-800">
                    {new Date(Number(orderStatus.lastExecutionTime) * 1000).toLocaleString()}
                  </span>
                </div>
              )}
              {orderStatus.nextExecutionTime !== '0' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Execution:</span>
                  <span className="text-gray-800">
                    {new Date(Number(orderStatus.nextExecutionTime) * 1000).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
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

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Grid Demand</p>
            <p className="text-[16px] font-medium text-gray-900">{energyData.gridDemand} GW</p>
          </div>

          <div>
            <p className="text-[14px] text-gray-500 mb-1">Carbon Intensity</p>
            <p className="text-[16px] font-medium text-gray-900">{energyData.carbonIntensity} gCO₂/kWh</p>
          </div>
          <div>
            <p className="text-[14px] text-gray-500 mb-1">Credits Available</p>
            <p className="text-[16px] font-medium text-gray-900">{energyData.creditsAvailable.toLocaleString()}</p>
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
