/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
