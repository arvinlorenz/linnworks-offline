/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      processed
      customerInfo {
        emailAddress
        address1
        address2
        address3
        town
        region
        postCode
        country
        fullName
        company
        phoneNumber
        countryId
      }
      numOrderId
      items {
        itemId
        sku
        itemSource
        title
        quantity
        categoryName
        stockLevelsSpecified
        onOrder
        inOrderBook
        level
        minimumLevel
        availableStock
        pricePerUnit
        unitCost
        despatchStockUnitCost
        discount
        tax
        taxRate
        cost
        costIncTax
        isService
        salesTax
        taxCostInclusive
        partShipped
        weight
        market
        channelSKU
        channelTitle
        binRack
        stockItemIntId
      }
      shippingInfo {
        vendor
        postalServiceId
        postalServiceName
        totalWeight
        itemWeight
        packageCategoryId
        packageCategory
        postageCost
        postageCostExTax
        trackingNumber
        manualAdjust
      }
      totalsInfo {
        subtotal
        postageCost
        tax
        totalCharge
        paymentMethod
        paymentMethodId
        profitMargin
        totalDiscount
        currency
        countryTaxRate
        conversionRate
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      processed
      customerInfo {
        emailAddress
        address1
        address2
        address3
        town
        region
        postCode
        country
        fullName
        company
        phoneNumber
        countryId
      }
      numOrderId
      items {
        itemId
        sku
        itemSource
        title
        quantity
        categoryName
        stockLevelsSpecified
        onOrder
        inOrderBook
        level
        minimumLevel
        availableStock
        pricePerUnit
        unitCost
        despatchStockUnitCost
        discount
        tax
        taxRate
        cost
        costIncTax
        isService
        salesTax
        taxCostInclusive
        partShipped
        weight
        market
        channelSKU
        channelTitle
        binRack
        stockItemIntId
      }
      shippingInfo {
        vendor
        postalServiceId
        postalServiceName
        totalWeight
        itemWeight
        packageCategoryId
        packageCategory
        postageCost
        postageCostExTax
        trackingNumber
        manualAdjust
      }
      totalsInfo {
        subtotal
        postageCost
        tax
        totalCharge
        paymentMethod
        paymentMethodId
        profitMargin
        totalDiscount
        currency
        countryTaxRate
        conversionRate
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      processed
      customerInfo {
        emailAddress
        address1
        address2
        address3
        town
        region
        postCode
        country
        fullName
        company
        phoneNumber
        countryId
      }
      numOrderId
      items {
        itemId
        sku
        itemSource
        title
        quantity
        categoryName
        stockLevelsSpecified
        onOrder
        inOrderBook
        level
        minimumLevel
        availableStock
        pricePerUnit
        unitCost
        despatchStockUnitCost
        discount
        tax
        taxRate
        cost
        costIncTax
        isService
        salesTax
        taxCostInclusive
        partShipped
        weight
        market
        channelSKU
        channelTitle
        binRack
        stockItemIntId
      }
      shippingInfo {
        vendor
        postalServiceId
        postalServiceName
        totalWeight
        itemWeight
        packageCategoryId
        packageCategory
        postageCost
        postageCostExTax
        trackingNumber
        manualAdjust
      }
      totalsInfo {
        subtotal
        postageCost
        tax
        totalCharge
        paymentMethod
        paymentMethodId
        profitMargin
        totalDiscount
        currency
        countryTaxRate
        conversionRate
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
