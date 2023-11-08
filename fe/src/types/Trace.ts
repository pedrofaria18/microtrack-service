export interface Trace {
  _id: string;
  traceId: string;
  createdAt: string;
  updatedAt: string;
  events: Event[];
}

export interface Event {
  id: string;
  serviceName: string;
  checkpointName: string;
  timestamp: string;
  isError: boolean;
  genericData: object;
}

export interface TraceNode {
  serviceName: string;
  checkpointName: string;
  timestamp: string;
  isError: boolean;
  genericData: object;
}

export interface TraceEdge {
  source: string;
  target: string;
}
