export interface PostParams {
  endpoint: string;
  body: any;
  headers?: any;
  isPublicRoute?: boolean;
  getCompleteResponse?: boolean;
}

export interface PutParams {
  endpoint: string;
  body: any;
  headers?: any;
  isPublicRoute?: boolean;
  getCompleteResponse?: boolean;
}

export interface GetParams {
  endpoint: string;
  params?: any;
  isPublicRoute?: boolean;
  headers?: any;
  getCompleteResponse?: boolean;
  responseType?: any;
}

export interface DeleteParamas {
  endpoint: string;
  isPublicRoute?: boolean;
  headers?: any;
}

export interface ErrorServicio {
  error?: any;
  mensajeError: string;
  responseStatus: number;
}

export interface ResponseData {
  status: string;
  message: string;
  data: any;
}

export interface HeadersConfig {
  dominio: string;
  headersConf: any;
}
