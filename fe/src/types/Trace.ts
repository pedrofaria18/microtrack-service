export interface Trace {
  _id: string;
  traceId: string;
  createdAt: string;
  updatedAt: string;
  events: Event[];
}

export interface Event {
  serviceName: string;
  checkpointName: string;
  timestamp: string;
  isError: boolean;
  genericData: any;
}
