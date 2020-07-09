// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Order, CustomerInfo, Item, ShippingInfo, TotalInfo } = initSchema(schema);

export {
  Order,
  CustomerInfo,
  Item,
  ShippingInfo,
  TotalInfo
};