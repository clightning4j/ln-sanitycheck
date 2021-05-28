interface NodeAddress {
  type: string;
  address: string;
  port: number;
}

interface ListFounds {
  outputs: Array<Object>;
  channels: Array<Object>;
}
