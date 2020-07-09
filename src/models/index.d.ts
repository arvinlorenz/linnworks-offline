import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class CustomerInfo {
  readonly emailAddress?: string;
  readonly address1?: string;
  readonly address2?: string;
  readonly address3?: string;
  readonly town?: string;
  readonly region?: string;
  readonly postCode?: string;
  readonly country?: string;
  readonly fullName?: string;
  readonly company?: string;
  readonly phoneNumber?: string;
  readonly countryId?: string;
  constructor(init: ModelInit<CustomerInfo>);
}

export declare class Item {
  readonly itemId?: string;
  readonly sku?: string;
  readonly itemSource?: string;
  readonly title?: string;
  readonly quantity?: number;
  readonly categoryName?: string;
  readonly stockLevelsSpecified?: boolean;
  readonly onOrder?: number;
  readonly inOrderBook?: number;
  readonly level?: number;
  readonly minimumLevel?: number;
  readonly availableStock?: number;
  readonly pricePerUnit?: number;
  readonly unitCost?: number;
  readonly despatchStockUnitCost?: number;
  readonly discount?: number;
  readonly tax?: number;
  readonly taxRate?: number;
  readonly cost?: number;
  readonly costIncTax?: number;
  readonly isService?: boolean;
  readonly salesTax?: number;
  readonly taxCostInclusive?: boolean;
  readonly partShipped?: boolean;
  readonly weight?: number;
  readonly market?: number;
  readonly channelSKU?: string;
  readonly channelTitle?: string;
  readonly binRack?: string;
  readonly stockItemIntId?: number;
  constructor(init: ModelInit<Item>);
}

export declare class ShippingInfo {
  readonly vendor?: string;
  readonly postalServiceId?: string;
  readonly postalServiceName?: string;
  readonly totalWeight?: string;
  readonly itemWeight?: string;
  readonly packageCategoryId?: string;
  readonly packageCategory?: string;
  readonly postageCost?: string;
  readonly postageCostExTax?: string;
  readonly trackingNumber?: string;
  readonly manualAdjust?: boolean;
  constructor(init: ModelInit<ShippingInfo>);
}

export declare class TotalInfo {
  readonly subtotal?: number;
  readonly postageCost?: number;
  readonly tax?: number;
  readonly totalCharge?: number;
  readonly paymentMethod?: string;
  readonly paymentMethodId?: string;
  readonly profitMargin?: number;
  readonly totalDiscount?: number;
  readonly currency?: string;
  readonly countryTaxRate?: number;
  readonly conversionRate?: number;
  constructor(init: ModelInit<TotalInfo>);
}

export declare class Order {
  readonly id: string;
  readonly processed?: boolean;
  readonly customerInfo?: CustomerInfo;
  readonly numOrderId?: string;
  readonly items?: Item[];
  readonly shippingInfo?: ShippingInfo;
  readonly totalsInfo?: TotalInfo;
  constructor(init: ModelInit<Order>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}